namespace pxsim.input {
    function accForGesture(gesture: number) {
        let b = board().accelerometerState;
        b.accelerometer.activate();
        // Track that this particular gesture is being used by the program so the UI
        // can expose the corresponding control. Keep legacy useShake boolean for
        // backward compatibility.
        if (!b.usedGestures) b.usedGestures = {};
        if (!b.usedGestures[gesture]) {
            b.usedGestures[gesture] = true;
            runtime.queueDisplayUpdate();
        }
        if (gesture == 11 && !b.useShake) { // SHAKE
            b.useShake = true;
            // runtime.queueDisplayUpdate() already called above for usedGestures
        }
        return b;
    }

    export function onGesture(gesture: number, handler: RefAction) {
        const b = accForGesture(gesture);
        pxtcore.registerWithDal(DAL.MICROBIT_ID_GESTURE, gesture, handler);
    }

    export function isGesture(gesture: number): boolean {
        const b = accForGesture(gesture);
        b.accelerometer.activate();
        return b.accelerometer.getGesture() == gesture;
    }

    export function acceleration(dimension: number): number {
        let b = board().accelerometerState;
        let acc = b.accelerometer;
        switch (dimension) {
            case 0:
                acc.activate(AccelerometerFlag.X);
                return acc.getX();
            case 1:
                acc.activate(AccelerometerFlag.Y);
                return acc.getY();
            case 2:
                acc.activate(AccelerometerFlag.Z);
                return acc.getZ();
            default:
                acc.activate(AccelerometerFlag.Strength);
                return acc.getStrength();
        }
    }

    export function rotation(kind: number): number {
        const b = board().accelerometerState;
        const acc = b.accelerometer;
        switch (kind) {
            case 0: {
                acc.activate(AccelerometerFlag.Pitch);
                return acc.getPitch(); 
            }
            case 1: {
                acc.activate(AccelerometerFlag.Roll);
                return acc.getRoll(); 
            }
            default: return 0;
        }
    }

    export function setAccelerometerRange(range: number) {
        let b = board().accelerometerState;
        b.accelerometer.setSampleRange(range);
    }
}

namespace pxsim {
    interface AccelerometerSample {
        x: number;
        y: number;
        z: number;
    }

    interface ShakeHistory {
        x: boolean;
        y: boolean;
        z: boolean;
        count: number;
        shaken: number;
        timer: number;
    }

    /**
      * Co-ordinate systems that can be used.
      * RAW: Unaltered data. Data will be returned directly from the accelerometer.
      * 
      * SIMPLE_CARTESIAN: Data will be returned based on an easy to understand alignment, consistent with the cartesian system taught in schools.
      * When held upright, facing the user:
      * 
      *                            /
      *    +--------------------+ z
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * y  +--------------------+  x-->
      *
      *
      * NORTH_EAST_DOWN: Data will be returned based on the industry convention of the North East Down (NED) system.
      * When held upright, facing the user:
      * 
      *                            z
      *    +--------------------+ /
      *    |                    |
      *    |       .....        |
      *    | *     .....      * |
      * ^  |       .....        |
      * |  |                    |
      * x  +--------------------+  y-->
      *
      */
    export enum MicroBitCoordinateSystem {
        RAW,
        SIMPLE_CARTESIAN,
        NORTH_EAST_DOWN
    }

    export enum AccelerometerFlag {
        X = 1,
        Y = 1 << 1,
        Z = 1 << 2,
        Strength = 1 << 3,
        Pitch = 1 << 4,
        Roll = 1 << 5
    }

    export class Accelerometer {
        private sigma: number = 0;              // the number of ticks that the instantaneous gesture has been stable.
        private lastGesture: number = 0;       // the last, stable gesture recorded.
        private currentGesture: number = 0     // the instantaneous, unfiltered gesture detected.
        private sample: AccelerometerSample = { x: 0, y: 0, z: -1023 }
        private shake: ShakeHistory = { x: false, y: false, z: false, count: 0, shaken: 0, timer: 0 }; // State information needed to detect shake events.
        private pitch: number;
        private roll: number;
        private id: number;
        public isActive = false;
        public sampleRange = 2;
    public flags: AccelerometerFlag = <any>0;

        constructor(public runtime: Runtime) {
            this.id = DAL.MICROBIT_ID_ACCELEROMETER;
        }

        public setSampleRange(range: number) {
            this.activate();
            this.sampleRange = Math.max(1, Math.min(8, range));
        }

        public activate(flags?: AccelerometerFlag) {
            if (!this.isActive) {
                this.isActive = true;
                this.runtime.queueDisplayUpdate();
            }
            if (!!flags)
                this.flags |= flags;
        }

        /**
         * Reads the acceleration data from the accelerometer, and stores it in our buffer.
         * This is called by the tick() member function, if the interrupt is set!
         */
        public update(x: number, y: number, z: number) {
            // read MSB values...
            this.sample.x = Math.floor(x);
            this.sample.y = Math.floor(y);
            this.sample.z = Math.floor(z);

            // Update gesture tracking
            this.updateGesture();

            // Indicate that a new sample is available
            board().bus.queue(this.id, DAL.MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE)
        }

        public getStrength() {
            return Math.floor(Math.sqrt(this.instantaneousAccelerationSquared()));
        }

        updateEnvironmentGlobals() {
            // update debugger
            if (this.isActive) {
                if (this.flags & AccelerometerFlag.X)
                    this.runtime.environmentGlobals[pxsim.localization.lf("acceleration.x")] = this.sample.x;
                if (this.flags & AccelerometerFlag.Y)
                    this.runtime.environmentGlobals[pxsim.localization.lf("acceleration.y")] = this.sample.y;
                if (this.flags & AccelerometerFlag.Z)
                    this.runtime.environmentGlobals[pxsim.localization.lf("acceleration.z")] = this.sample.z;
                if (this.flags & AccelerometerFlag.Strength)
                    this.runtime.environmentGlobals[pxsim.localization.lf("acceleration.strength")] = Math.sqrt(this.instantaneousAccelerationSquared());
                if (this.flags & AccelerometerFlag.Pitch)
                    this.runtime.environmentGlobals[pxsim.localization.lf("acceleration.pitch")] = this.getPitch();
                if (this.flags & AccelerometerFlag.Roll)
                    this.runtime.environmentGlobals[pxsim.localization.lf("acceleration.roll")] = this.getRoll();
            }
        }

        private instantaneousAccelerationSquared() {
            // Use pythagoras theorem to determine the combined force acting on the device.
            return this.sample.x * this.sample.x + this.sample.y * this.sample.y + this.sample.z * this.sample.z;
        }

        /**
         * Service function. Determines the best guess posture of the device based on instantaneous data.
         * This makes no use of historic data (except for shake), and forms this input to the filter implemented in updateGesture().
         *
         * @return A best guess of the current posture of the device, based on instantaneous data.
         */
        private instantaneousPosture(): number {
            let force = this.instantaneousAccelerationSquared();
            let shakeDetected = false;

            // Test for shake events.
            // We detect a shake by measuring zero crossings in each axis. In other words, if we see a strong acceleration to the left followed by
            // a string acceleration to the right, then we can infer a shake. Similarly, we can do this for each acxis (left/right, up/down, in/out).
            //
            // If we see enough zero crossings in succession (MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD), then we decide that the device
            // has been shaken.
            if ((this.getX() < -DAL.MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE && this.shake.x) || (this.getX() > DAL.MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE && !this.shake.x)) {
                shakeDetected = true;
                this.shake.x = !this.shake.x;
            }

            if ((this.getY() < -DAL.MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE && this.shake.y) || (this.getY() > DAL.MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE && !this.shake.y)) {
                shakeDetected = true;
                this.shake.y = !this.shake.y;
            }

            if ((this.getZ() < -DAL.MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE && this.shake.z) || (this.getZ() > DAL.MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE && !this.shake.z)) {
                shakeDetected = true;
                this.shake.z = !this.shake.z;
            }

            if (shakeDetected && this.shake.count < DAL.MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD && ++this.shake.count == DAL.MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD)
                this.shake.shaken = 1;

            if (++this.shake.timer >= DAL.MICROBIT_ACCELEROMETER_SHAKE_DAMPING) {
                this.shake.timer = 0;
                if (this.shake.count > 0) {
                    if (--this.shake.count == 0)
                        this.shake.shaken = 0;
                }
            }

            if (this.shake.shaken)
                return DAL.MICROBIT_ACCELEROMETER_EVT_SHAKE;

            let sq = (n: number) => n * n

            if (force < sq(DAL.MICROBIT_ACCELEROMETER_FREEFALL_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_FREEFALL;

            if (force > sq(DAL.MICROBIT_ACCELEROMETER_3G_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_3G;

            if (force > sq(DAL.MICROBIT_ACCELEROMETER_6G_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_6G;

            if (force > sq(DAL.MICROBIT_ACCELEROMETER_8G_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_8G;

            // Determine our posture.
            if (this.getX() < (-1000 + DAL.MICROBIT_ACCELEROMETER_TILT_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_TILT_LEFT;

            if (this.getX() > (1000 - DAL.MICROBIT_ACCELEROMETER_TILT_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT;

            if (this.getY() < (-1000 + DAL.MICROBIT_ACCELEROMETER_TILT_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_TILT_DOWN;

            if (this.getY() > (1000 - DAL.MICROBIT_ACCELEROMETER_TILT_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_TILT_UP;

            if (this.getZ() < (-1000 + DAL.MICROBIT_ACCELEROMETER_TILT_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_FACE_UP;

            if (this.getZ() > (1000 - DAL.MICROBIT_ACCELEROMETER_TILT_TOLERANCE))
                return DAL.MICROBIT_ACCELEROMETER_EVT_FACE_DOWN;

            return 0;
        }

        updateGesture() {
            // Determine what it looks like we're doing based on the latest sample...
            let g = this.instantaneousPosture();

            // Perform some low pass filtering to reduce jitter from any detected effects
            if (g != this.currentGesture) {
                this.currentGesture = g;
                this.sigma = 0;
            } else if (this.sigma < DAL.MICROBIT_ACCELEROMETER_GESTURE_DAMPING) {
                ++this.sigma;
            }

            if (this.currentGesture !== this.lastGesture && this.sigma >= DAL.MICROBIT_ACCELEROMETER_GESTURE_DAMPING) {
                this.enqueueCurrentGesture();
            }
        }

        forceGesture(gesture: number) {
            this.currentGesture = gesture;
            this.enqueueCurrentGesture();
        }

        private enqueueCurrentGesture() {
            this.lastGesture = this.currentGesture;
            board().bus.queue(DAL.MICROBIT_ID_GESTURE, this.lastGesture);
        }

        /**
          * Reads the X axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the X axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getX();
          * uBit.accelerometer.getX(RAW);
          * @endcode
          */
        public getX(system: MicroBitCoordinateSystem = MicroBitCoordinateSystem.SIMPLE_CARTESIAN): number {
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    return -this.sample.x;

                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    return this.sample.y;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN.RAW:
                default:
                    return this.sample.x;
            }
        }

        /**
          * Reads the Y axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Y axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getY();
          * uBit.accelerometer.getY(RAW);
          * @endcode
          */
        public getY(system: MicroBitCoordinateSystem = MicroBitCoordinateSystem.SIMPLE_CARTESIAN): number {
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    return -this.sample.y;

                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    return -this.sample.x;
                //case RAW:
                default:
                    return this.sample.y;
            }
        }

        /**
          * Reads the Z axis value of the latest update from the accelerometer.
          * @param system The coordinate system to use. By default, a simple cartesian system is provided.
          * @return The force measured in the Z axis, in milli-g.
          *
          * Example:
          * @code
          * uBit.accelerometer.getZ();
          * uBit.accelerometer.getZ(RAW);
          * @endcode
          */
        public getZ(system: MicroBitCoordinateSystem = MicroBitCoordinateSystem.SIMPLE_CARTESIAN): number {
            switch (system) {
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    return -this.sample.z;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                //case MicroBitCoordinateSystem.RAW:
                default:
                    return this.sample.z;
            }
        }

        /**
          * Provides a rotation compensated pitch of the device, based on the latest update from the accelerometer.
          * @return The pitch of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getPitch();
          * @endcode
          */
        public getPitch(): number {
            return Math.floor((360 * this.getPitchRadians()) / (2 * Math.PI));
        }

        getPitchRadians(): number {
            this.recalculatePitchRoll();
            return this.pitch;
        }

        /**
          * Provides a rotation compensated roll of the device, based on the latest update from the accelerometer.
          * @return The roll of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getRoll();
          * @endcode
          */
        public getRoll(): number {
            return Math.floor((360 * this.getRollRadians()) / (2 * Math.PI));
        }

        getRollRadians(): number {
            this.recalculatePitchRoll();
            return this.roll;
        }

        getGesture(): number {
            return this.lastGesture;
        }

        /**
         * Recalculate roll and pitch values for the current sample.
         * We only do this at most once per sample, as the necessary trigonemteric functions are rather
         * heavyweight for a CPU without a floating point unit...
         */
        recalculatePitchRoll() {
            let x = this.getX(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            let y = this.getY(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            let z = this.getZ(MicroBitCoordinateSystem.NORTH_EAST_DOWN);

            this.roll = Math.atan2(y, z);
            this.pitch = Math.atan(-x / (y * Math.sin(this.roll) + z * Math.cos(this.roll)));
        }

    }

    export class AccelerometerState {
        accelerometer: Accelerometer;
        useShake = false;
        // map of gesture id -> true when the program registers onGesture for it
        usedGestures?: { [gesture: number]: boolean };

        constructor(runtime: Runtime) {
            this.accelerometer = new Accelerometer(runtime);
        }

        shake() {
            this.accelerometer.forceGesture(DAL.MICROBIT_ACCELEROMETER_EVT_SHAKE); // SHAKE == 11
        }
    }
}