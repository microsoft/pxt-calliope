var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
var pxsim;
(function (pxsim) {
    var DalBoard = (function (_super) {
        __extends(DalBoard, _super);
        function DalBoard() {
            _super.call(this);
            // components
            this.fileSystem = new pxsim.FileSystemState();
            this.builtinParts["ledmatrix"] = this.ledMatrixState = new pxsim.LedMatrixState(pxsim.runtime);
            this.builtinParts["buttonpair"] = this.buttonPairState = new pxsim.ButtonPairState({
                ID_BUTTON_A: 1 /* MICROBIT_ID_BUTTON_A */,
                ID_BUTTON_B: 2 /* MICROBIT_ID_BUTTON_B */,
                ID_BUTTON_AB: 26 /* MICROBIT_ID_BUTTON_AB */,
                BUTTON_EVT_UP: 2 /* MICROBIT_BUTTON_EVT_UP */,
                BUTTON_EVT_CLICK: 3 /* MICROBIT_BUTTON_EVT_CLICK */
            });
            this.builtinParts["edgeconnector"] = this.edgeConnectorState = new pxsim.EdgeConnectorState({
                pins: [
                    7 /* MICROBIT_ID_IO_P0 */,
                    8 /* MICROBIT_ID_IO_P1 */,
                    9 /* MICROBIT_ID_IO_P2 */,
                    10 /* MICROBIT_ID_IO_P3 */,
                    11 /* MICROBIT_ID_IO_P4 */,
                    12 /* MICROBIT_ID_IO_P5 */,
                    13 /* MICROBIT_ID_IO_P6 */,
                    14 /* MICROBIT_ID_IO_P7 */,
                    15 /* MICROBIT_ID_IO_P8 */,
                    16 /* MICROBIT_ID_IO_P9 */,
                    17 /* MICROBIT_ID_IO_P10 */,
                    18 /* MICROBIT_ID_IO_P11 */,
                    19 /* MICROBIT_ID_IO_P12 */,
                    20 /* MICROBIT_ID_IO_P13 */,
                    21 /* MICROBIT_ID_IO_P14 */,
                    22 /* MICROBIT_ID_IO_P15 */,
                    23 /* MICROBIT_ID_IO_P16 */,
                    0,
                    0,
                    24 /* MICROBIT_ID_IO_P19 */,
                    25 /* MICROBIT_ID_IO_P20 */,
                    50 /* MICROBIT_ID_IO_P21 */
                ],
                servos: {
                    "P0": 19 /* MICROBIT_ID_IO_P12 */,
                    "P1": 7 /* MICROBIT_ID_IO_P0 */,
                    "P2": 8 /* MICROBIT_ID_IO_P1 */,
                    "P3": 23 /* MICROBIT_ID_IO_P16 */
                }
            });
            this.builtinParts["radio"] = this.radioState = new pxsim.RadioState(pxsim.runtime);
            this.builtinParts["accelerometer"] = this.accelerometerState = new pxsim.AccelerometerState(pxsim.runtime);
            this.builtinParts["serial"] = this.serialState = new pxsim.SerialState();
            this.builtinParts["thermometer"] = this.thermometerState = new pxsim.ThermometerState();
            this.builtinParts["lightsensor"] = this.lightSensorState = new pxsim.LightSensorState();
            this.builtinParts["compass"] = this.compassState = new pxsim.CompassState();
            this.builtinParts["neopixel"] = this.neopixelState = new pxsim.NeoPixelState();
            this.builtinParts["speaker"] = this.speakerState = new pxsim.SpeakerState();
            this.builtinParts["microservo"] = this.edgeConnectorState;
            this.builtinVisuals["buttonpair"] = function () { return new pxsim.visuals.ButtonPairView(); };
            this.builtinVisuals["ledmatrix"] = function () { return new pxsim.visuals.LedMatrixView(); };
            this.builtinVisuals["neopixel"] = function () { return new pxsim.visuals.NeoPixelView(); };
            this.builtinVisuals["microservo"] = function () { return new pxsim.visuals.MicroServoView(); };
            this.builtinPartVisuals["buttonpair"] = function (xy) { return pxsim.visuals.mkBtnSvg(xy); };
            this.builtinPartVisuals["ledmatrix"] = function (xy) { return pxsim.visuals.mkLedMatrixSvg(xy, 8, 8); };
            this.builtinPartVisuals["neopixel"] = function (xy) { return pxsim.visuals.mkNeoPixelPart(xy); };
            this.builtinPartVisuals["microservo"] = function (xy) { return pxsim.visuals.mkMicroServoPart(xy); };
        }
        DalBoard.prototype.receiveMessage = function (msg) {
            if (!pxsim.runtime || pxsim.runtime.dead)
                return;
            switch (msg.type || "") {
                case "eventbus":
                    var ev = msg;
                    this.bus.queue(ev.id, ev.eventid, ev.value);
                    break;
                case "serial":
                    var data = msg.data || "";
                    this.serialState.recieveData(data);
                    break;
                case "radiopacket":
                    var packet = msg;
                    this.radioState.recievePacket(packet);
                    break;
            }
        };
        DalBoard.prototype.initAsync = function (msg) {
            _super.prototype.initAsync.call(this, msg);
            var options = (msg.options || {});
            var boardDef = msg.boardDefinition;
            var cmpsList = msg.parts;
            var cmpDefs = msg.partDefinitions || {};
            var fnArgs = msg.fnArgs;
            var opts = {
                state: this,
                boardDef: boardDef,
                partsList: cmpsList,
                partDefs: cmpDefs,
                fnArgs: fnArgs,
                maxWidth: "100%",
                maxHeight: "100%",
            };
            var viewHost = new pxsim.visuals.BoardHost(pxsim.visuals.mkBoardView({
                visual: boardDef.visual
            }), opts);
            document.body.innerHTML = ""; // clear children
            document.body.appendChild(viewHost.getView());
            return Promise.resolve();
        };
        return DalBoard;
    }(pxsim.CoreBoard));
    pxsim.DalBoard = DalBoard;
    function initRuntimeWithDalBoard() {
        pxsim.U.assert(!pxsim.runtime.board);
        var b = new DalBoard();
        pxsim.runtime.board = b;
        pxsim.runtime.postError = function (e) {
            pxsim.led.setBrightness(255);
            var img = board().ledMatrixState.image;
            img.clear();
            img.set(0, 4, 255);
            img.set(1, 3, 255);
            img.set(2, 3, 255);
            img.set(3, 3, 255);
            img.set(4, 4, 255);
            img.set(0, 0, 255);
            img.set(1, 0, 255);
            img.set(0, 1, 255);
            img.set(1, 1, 255);
            img.set(3, 0, 255);
            img.set(4, 0, 255);
            img.set(3, 1, 255);
            img.set(4, 1, 255);
            pxsim.runtime.updateDisplay();
        };
    }
    pxsim.initRuntimeWithDalBoard = initRuntimeWithDalBoard;
    if (!pxsim.initCurrentRuntime) {
        pxsim.initCurrentRuntime = initRuntimeWithDalBoard;
    }
    function board() {
        return pxsim.runtime.board;
    }
    pxsim.board = board;
})(pxsim || (pxsim = {}));
/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtrunner.d.ts"/>
//HACK: allows instructions.html to access pxtblocks without requiring simulator.html to import blocks as well
if (!window.pxt)
    window.pxt = {};
var pxtrunner = pxt.runner;
var pxtdocs = pxt.docs;
var pxsim;
(function (pxsim) {
    var instructions;
    (function (instructions) {
        function drawInstructions() {
            pxsim.visuals.mkBoardView = function (opts) {
                return new pxsim.visuals.MicrobitBoardSvg({
                    runtime: pxsim.runtime,
                    theme: pxsim.visuals.randomTheme(),
                    disableTilt: false,
                    wireframe: opts.wireframe,
                });
            };
            var getQsVal = pxsim.parseQueryString();
            //project name
            var name = getQsVal("name") || "Untitled";
            // board def
            var boardDef = JSON.parse(getQsVal("board"));
            //parts list
            var parts = (getQsVal("parts") || "").split(" ");
            parts.sort();
            // parts definitions
            var partDefinitions = JSON.parse(getQsVal("partdefs") || "{}");
            //fn args
            var fnArgs = JSON.parse((getQsVal("fnArgs") || "{}"));
            //project code
            var tsCode = getQsVal("code");
            var tsPackage = getQsVal("package") || "";
            var codeSpinnerDiv = document.getElementById("proj-code-spinner");
            var codeContainerDiv = document.getElementById("proj-code-container");
            if (tsCode) {
                //we use the docs renderer to decompile the code to blocks and render it
                //TODO: render the blocks code directly
                var md = "```blocks\n" + tsCode + "\n```\n```package\n" + tsPackage + "\n```\n";
                pxtdocs.requireMarked = function () { return window.marked; };
                pxtrunner.renderMarkdownAsync(codeContainerDiv, md)
                    .done(function () {
                    var codeSvg = $("#proj-code-container svg");
                    if (codeSvg.length > 0) {
                        //code rendered successfully as blocks
                        codeSvg.css("width", "inherit");
                        codeSvg.css("height", "inherit");
                        //takes the svg out of the wrapper markdown
                        codeContainerDiv.innerHTML = "";
                        codeContainerDiv.appendChild(codeSvg[0]);
                    }
                    else {
                        //code failed to convert to blocks, display as typescript instead
                        codeContainerDiv.innerText = tsCode;
                    }
                    $(codeContainerDiv).show();
                    $(codeSpinnerDiv).hide();
                });
            }
            if (name)
                $("#proj-title").text(name);
            //init runtime
            if (!pxsim.initCurrentRuntime)
                pxsim.initCurrentRuntime = pxsim.initRuntimeWithDalBoard;
            instructions.renderParts({
                name: name,
                boardDef: boardDef,
                parts: parts,
                partDefinitions: partDefinitions,
                fnArgs: fnArgs
            });
        }
        instructions.drawInstructions = drawInstructions;
    })(instructions = pxsim.instructions || (pxsim.instructions = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function onGesture(gesture, handler) {
            var b = pxsim.board().accelerometerState;
            b.accelerometer.activate();
            if (gesture == 11 && !b.useShake) {
                b.useShake = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            pxsim.pxtcore.registerWithDal(27 /* MICROBIT_ID_GESTURE */, gesture, handler);
        }
        input.onGesture = onGesture;
        function acceleration(dimension) {
            var b = pxsim.board().accelerometerState;
            var acc = b.accelerometer;
            acc.activate();
            switch (dimension) {
                case 0: return acc.getX();
                case 1: return acc.getY();
                case 2: return acc.getZ();
                default: return Math.floor(Math.sqrt(acc.instantaneousAccelerationSquared()));
            }
        }
        input.acceleration = acceleration;
        function rotation(kind) {
            var b = pxsim.board().accelerometerState;
            var acc = b.accelerometer;
            acc.activate();
            var x = acc.getX(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var y = acc.getX(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var z = acc.getX(pxsim.MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var roll = Math.atan2(y, z);
            var pitch = Math.atan(-x / (y * Math.sin(roll) + z * Math.cos(roll)));
            var r = 0;
            switch (kind) {
                case 0:
                    r = pitch;
                    break;
                case 1:
                    r = roll;
                    break;
            }
            return Math.floor(r / Math.PI * 180);
        }
        input.rotation = rotation;
        function setAccelerometerRange(range) {
            var b = pxsim.board().accelerometerState;
            b.accelerometer.setSampleRange(range);
        }
        input.setAccelerometerRange = setAccelerometerRange;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
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
    (function (MicroBitCoordinateSystem) {
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["RAW"] = 0] = "RAW";
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["SIMPLE_CARTESIAN"] = 1] = "SIMPLE_CARTESIAN";
        MicroBitCoordinateSystem[MicroBitCoordinateSystem["NORTH_EAST_DOWN"] = 2] = "NORTH_EAST_DOWN";
    })(pxsim.MicroBitCoordinateSystem || (pxsim.MicroBitCoordinateSystem = {}));
    var MicroBitCoordinateSystem = pxsim.MicroBitCoordinateSystem;
    var Accelerometer = (function () {
        function Accelerometer(runtime) {
            this.runtime = runtime;
            this.sigma = 0; // the number of ticks that the instantaneous gesture has been stable.
            this.lastGesture = 0; // the last, stable gesture recorded.
            this.currentGesture = 0; // the instantaneous, unfiltered gesture detected.
            this.sample = { x: 0, y: 0, z: -1023 };
            this.shake = { x: false, y: false, z: false, count: 0, shaken: 0, timer: 0 }; // State information needed to detect shake events.
            this.isActive = false;
            this.sampleRange = 2;
            this.id = 4 /* MICROBIT_ID_ACCELEROMETER */;
        }
        Accelerometer.prototype.setSampleRange = function (range) {
            this.activate();
            this.sampleRange = Math.max(1, Math.min(8, range));
        };
        Accelerometer.prototype.activate = function () {
            if (!this.isActive) {
                this.isActive = true;
                this.runtime.queueDisplayUpdate();
            }
        };
        /**
         * Reads the acceleration data from the accelerometer, and stores it in our buffer.
         * This is called by the tick() member function, if the interrupt is set!
         */
        Accelerometer.prototype.update = function (x, y, z) {
            // read MSB values...
            this.sample.x = Math.floor(x);
            this.sample.y = Math.floor(y);
            this.sample.z = Math.floor(z);
            // Update gesture tracking
            this.updateGesture();
            // Indicate that a new sample is available
            pxsim.board().bus.queue(this.id, 1 /* MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE */);
        };
        Accelerometer.prototype.instantaneousAccelerationSquared = function () {
            // Use pythagoras theorem to determine the combined force acting on the device.
            return this.sample.x * this.sample.x + this.sample.y * this.sample.y + this.sample.z * this.sample.z;
        };
        /**
         * Service function. Determines the best guess posture of the device based on instantaneous data.
         * This makes no use of historic data (except for shake), and forms this input to the filter implemented in updateGesture().
         *
         * @return A best guess of the current posture of the device, based on instantaneous data.
         */
        Accelerometer.prototype.instantaneousPosture = function () {
            var force = this.instantaneousAccelerationSquared();
            var shakeDetected = false;
            // Test for shake events.
            // We detect a shake by measuring zero crossings in each axis. In other words, if we see a strong acceleration to the left followed by
            // a string acceleration to the right, then we can infer a shake. Similarly, we can do this for each acxis (left/right, up/down, in/out).
            //
            // If we see enough zero crossings in succession (MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD), then we decide that the device
            // has been shaken.
            if ((this.getX() < -400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.x) || (this.getX() > 400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.x)) {
                shakeDetected = true;
                this.shake.x = !this.shake.x;
            }
            if ((this.getY() < -400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.y) || (this.getY() > 400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.y)) {
                shakeDetected = true;
                this.shake.y = !this.shake.y;
            }
            if ((this.getZ() < -400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && this.shake.z) || (this.getZ() > 400 /* MICROBIT_ACCELEROMETER_SHAKE_TOLERANCE */ && !this.shake.z)) {
                shakeDetected = true;
                this.shake.z = !this.shake.z;
            }
            if (shakeDetected && this.shake.count < 4 /* MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD */ && ++this.shake.count == 4 /* MICROBIT_ACCELEROMETER_SHAKE_COUNT_THRESHOLD */)
                this.shake.shaken = 1;
            if (++this.shake.timer >= 10 /* MICROBIT_ACCELEROMETER_SHAKE_DAMPING */) {
                this.shake.timer = 0;
                if (this.shake.count > 0) {
                    if (--this.shake.count == 0)
                        this.shake.shaken = 0;
                }
            }
            if (this.shake.shaken)
                return 12 /* MICROBIT_ACCELEROMETER_EVT_SHAKE */;
            var sq = function (n) { return n * n; };
            if (force < sq(400 /* MICROBIT_ACCELEROMETER_FREEFALL_TOLERANCE */))
                return 7 /* MICROBIT_ACCELEROMETER_EVT_FREEFALL */;
            // TODO: fix this
            //if (force > sq(DAL.MICROBIT_ACCELEROMETER_3G_TOLERANCE))
            //    return DAL.MICROBIT_ACCELEROMETER_EVT_3G;
            if (force > sq(6144 /* MICROBIT_ACCELEROMETER_6G_TOLERANCE */))
                return 10 /* MICROBIT_ACCELEROMETER_EVT_6G */;
            if (force > sq(8192 /* MICROBIT_ACCELEROMETER_8G_TOLERANCE */))
                return 11 /* MICROBIT_ACCELEROMETER_EVT_8G */;
            // Determine our posture.
            if (this.getX() < (-1000 + 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 3 /* MICROBIT_ACCELEROMETER_EVT_TILT_LEFT */;
            if (this.getX() > (1000 - 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 4 /* MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT */;
            if (this.getY() < (-1000 + 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 2 /* MICROBIT_ACCELEROMETER_EVT_TILT_DOWN */;
            if (this.getY() > (1000 - 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 1 /* MICROBIT_ACCELEROMETER_EVT_TILT_UP */;
            if (this.getZ() < (-1000 + 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 6 /* MICROBIT_ACCELEROMETER_EVT_FACE_DOWN */;
            if (this.getZ() > (1000 - 200 /* MICROBIT_ACCELEROMETER_TILT_TOLERANCE */))
                return 5 /* MICROBIT_ACCELEROMETER_EVT_FACE_UP */;
            return 0;
        };
        Accelerometer.prototype.updateGesture = function () {
            // Determine what it looks like we're doing based on the latest sample...
            var g = this.instantaneousPosture();
            // Perform some low pass filtering to reduce jitter from any detected effects
            if (g == this.currentGesture) {
                if (this.sigma < 5 /* MICROBIT_ACCELEROMETER_GESTURE_DAMPING */)
                    this.sigma++;
            }
            else {
                this.currentGesture = g;
                this.sigma = 0;
            }
            // If we've reached threshold, update our record and raise the relevant event...
            if (this.currentGesture != this.lastGesture && this.sigma >= 5 /* MICROBIT_ACCELEROMETER_GESTURE_DAMPING */) {
                this.lastGesture = this.currentGesture;
                pxsim.board().bus.queue(27 /* MICROBIT_ID_GESTURE */, this.lastGesture);
            }
        };
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
        Accelerometer.prototype.getX = function (system) {
            if (system === void 0) { system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN; }
            this.activate();
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    return -this.sample.x;
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    return this.sample.y;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN.RAW:
                default:
                    return this.sample.x;
            }
        };
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
        Accelerometer.prototype.getY = function (system) {
            if (system === void 0) { system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN; }
            this.activate();
            switch (system) {
                case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                    return -this.sample.y;
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    return -this.sample.x;
                //case RAW:
                default:
                    return this.sample.y;
            }
        };
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
        Accelerometer.prototype.getZ = function (system) {
            if (system === void 0) { system = MicroBitCoordinateSystem.SIMPLE_CARTESIAN; }
            this.activate();
            switch (system) {
                case MicroBitCoordinateSystem.NORTH_EAST_DOWN:
                    return -this.sample.z;
                //case MicroBitCoordinateSystem.SIMPLE_CARTESIAN:
                //case MicroBitCoordinateSystem.RAW:
                default:
                    return this.sample.z;
            }
        };
        /**
          * Provides a rotation compensated pitch of the device, based on the latest update from the accelerometer.
          * @return The pitch of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getPitch();
          * @endcode
          */
        Accelerometer.prototype.getPitch = function () {
            this.activate();
            return Math.floor((360 * this.getPitchRadians()) / (2 * Math.PI));
        };
        Accelerometer.prototype.getPitchRadians = function () {
            this.recalculatePitchRoll();
            return this.pitch;
        };
        /**
          * Provides a rotation compensated roll of the device, based on the latest update from the accelerometer.
          * @return The roll of the device, in degrees.
          *
          * Example:
          * @code
          * uBit.accelerometer.getRoll();
          * @endcode
          */
        Accelerometer.prototype.getRoll = function () {
            this.activate();
            return Math.floor((360 * this.getRollRadians()) / (2 * Math.PI));
        };
        Accelerometer.prototype.getRollRadians = function () {
            this.recalculatePitchRoll();
            return this.roll;
        };
        /**
         * Recalculate roll and pitch values for the current sample.
         * We only do this at most once per sample, as the necessary trigonemteric functions are rather
         * heavyweight for a CPU without a floating point unit...
         */
        Accelerometer.prototype.recalculatePitchRoll = function () {
            var x = this.getX(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var y = this.getY(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            var z = this.getZ(MicroBitCoordinateSystem.NORTH_EAST_DOWN);
            this.roll = Math.atan2(y, z);
            this.pitch = Math.atan(-x / (y * Math.sin(this.roll) + z * Math.cos(this.roll)));
        };
        return Accelerometer;
    }());
    pxsim.Accelerometer = Accelerometer;
    var AccelerometerState = (function () {
        function AccelerometerState(runtime) {
            this.useShake = false;
            this.accelerometer = new Accelerometer(runtime);
        }
        return AccelerometerState;
    }());
    pxsim.AccelerometerState = AccelerometerState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function onButtonPressed(button, handler) {
            var b = pxsim.board().buttonPairState;
            if (button == b.props.ID_BUTTON_AB && !b.usesButtonAB) {
                b.usesButtonAB = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            pxsim.pxtcore.registerWithDal(button, 3 /* MICROBIT_BUTTON_EVT_CLICK */, handler);
        }
        input.onButtonPressed = onButtonPressed;
        function buttonIsPressed(button) {
            var b = pxsim.board().buttonPairState;
            if (button == b.abBtn.id && !b.usesButtonAB) {
                b.usesButtonAB = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            if (button == b.aBtn.id)
                return b.aBtn.pressed;
            if (button == b.bBtn.id)
                return b.bBtn.pressed;
            return b.abBtn.pressed || (b.aBtn.pressed && b.bBtn.pressed);
        }
        input.buttonIsPressed = buttonIsPressed;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function compassHeading() {
            var b = pxsim.board().compassState;
            if (!b.usesHeading) {
                b.usesHeading = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            return b.heading;
        }
        input.compassHeading = compassHeading;
        function magneticForce() {
            // TODO
            return 0;
        }
        input.magneticForce = magneticForce;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function onPinPressed(pinId, handler) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.isTouched();
            pxsim.pxtcore.registerWithDal(pin.id, 3 /* MICROBIT_BUTTON_EVT_CLICK */, handler);
        }
        input.onPinPressed = onPinPressed;
        function onPinReleased(pinId, handler) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.isTouched();
            pxsim.pxtcore.registerWithDal(pin.id, 2 /* MICROBIT_BUTTON_EVT_UP */, handler);
        }
        input.onPinReleased = onPinReleased;
        function pinIsPressed(pinId) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return false;
            return pin.isTouched();
        }
        input.pinIsPressed = pinIsPressed;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function getPin(id) {
        return pxsim.board().edgeConnectorState.getPin(id);
    }
    pxsim.getPin = getPin;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pins;
    (function (pins_1) {
        function digitalReadPin(pinId) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Digital | pxsim.PinFlags.Input;
            return pin.value > 100 ? 1 : 0;
        }
        pins_1.digitalReadPin = digitalReadPin;
        function digitalWritePin(pinId, value) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Digital | pxsim.PinFlags.Output;
            pin.value = value > 0 ? 1023 : 0;
            pxsim.runtime.queueDisplayUpdate();
        }
        pins_1.digitalWritePin = digitalWritePin;
        function setPull(pinId, pull) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.pull = pull;
        }
        pins_1.setPull = setPull;
        function analogReadPin(pinId) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Input;
            return pin.value || 0;
        }
        pins_1.analogReadPin = analogReadPin;
        function analogWritePin(pinId, value) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Output;
            pin.value = value ? 1 : 0;
            pxsim.runtime.queueDisplayUpdate();
        }
        pins_1.analogWritePin = analogWritePin;
        function analogSetPeriod(pinId, micros) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Output;
            pin.period = micros;
            pxsim.runtime.queueDisplayUpdate();
        }
        pins_1.analogSetPeriod = analogSetPeriod;
        function servoWritePin(pinId, value) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            analogSetPeriod(pinId, 20000);
            pin.servoAngle = Math.max(0, Math.min(180, value));
        }
        pins_1.servoWritePin = servoWritePin;
        function servoSetPulse(pinId, micros) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            // TODO
        }
        pins_1.servoSetPulse = servoSetPulse;
        function analogSetPitchPin(pinId) {
            var pin = pxsim.getPin(pinId);
            if (!pin)
                return;
            pxsim.board().edgeConnectorState.pins.filter(function (p) { return !!p; }).forEach(function (p) { return p.pitch = false; });
            pin.pitch = true;
        }
        pins_1.analogSetPitchPin = analogSetPitchPin;
        function analogPitch(frequency, ms) {
            // update analog output
            var pins = pxsim.board().edgeConnectorState.pins;
            var pin = pins.filter(function (pin) { return !!pin && pin.pitch; })[0] || pins[0];
            pin.mode = pxsim.PinFlags.Analog | pxsim.PinFlags.Output;
            if (frequency <= 0) {
                pin.value = 0;
                pin.period = 0;
            }
            else {
                pin.value = 512;
                pin.period = 1000000 / frequency;
            }
            pxsim.runtime.queueDisplayUpdate();
            var cb = pxsim.getResume();
            pxsim.AudioContextManager.tone(frequency, 1);
            if (ms <= 0)
                cb();
            else {
                setTimeout(function () {
                    pxsim.AudioContextManager.stop();
                    pin.value = 0;
                    pin.period = 0;
                    pin.mode = pxsim.PinFlags.Unused;
                    pxsim.runtime.queueDisplayUpdate();
                    cb();
                }, ms);
            }
        }
        pins_1.analogPitch = analogPitch;
    })(pins = pxsim.pins || (pxsim.pins = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var files;
    (function (files) {
        function appendLine(filename, text) {
            var b = pxsim.board();
            b.fileSystem.append(filename, text + "\r\n");
        }
        files.appendLine = appendLine;
        function appendString(filename, text) {
            var b = pxsim.board();
            b.fileSystem.append(filename, text);
        }
        files.appendString = appendString;
        function appendNumber(filename, value) {
            var b = pxsim.board();
            b.fileSystem.append(filename, value.toString());
        }
        files.appendNumber = appendNumber;
        function remove(filename) {
            var b = pxsim.board();
            b.fileSystem.remove(filename);
        }
        files.remove = remove;
    })(files = pxsim.files || (pxsim.files = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    (function (DisplayMode) {
        DisplayMode[DisplayMode["bw"] = 0] = "bw";
        DisplayMode[DisplayMode["greyscale"] = 1] = "greyscale";
    })(pxsim.DisplayMode || (pxsim.DisplayMode = {}));
    var DisplayMode = pxsim.DisplayMode;
    var LedMatrixState = (function () {
        function LedMatrixState(runtime) {
            this.image = createInternalImage(5);
            this.brigthness = 255;
            this.displayMode = DisplayMode.bw;
            this.font = createFont();
            this.animationQ = new pxsim.AnimationQueue(runtime);
        }
        return LedMatrixState;
    }());
    pxsim.LedMatrixState = LedMatrixState;
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(width, data) {
            _super.call(this);
            this.width = width;
            this.data = data;
        }
        Image.prototype.print = function () {
            console.log("Image id:" + this.id + " refs:" + this.refcnt + " size:" + this.width + "x" + Image.height);
        };
        Image.prototype.get = function (x, y) {
            if (x < 0 || x >= this.width || y < 0 || y >= 5)
                return 0;
            return this.data[y * this.width + x];
        };
        Image.prototype.set = function (x, y, v) {
            if (x < 0 || x >= this.width || y < 0 || y >= 5)
                return;
            this.data[y * this.width + x] = Math.max(0, Math.min(255, v));
        };
        Image.prototype.copyTo = function (xSrcIndex, length, target, xTargetIndex) {
            for (var x = 0; x < length; x++) {
                for (var y = 0; y < 5; y++) {
                    var value = this.get(xSrcIndex + x, y);
                    target.set(xTargetIndex + x, y, value);
                }
            }
        };
        Image.prototype.shiftLeft = function (cols) {
            for (var x = 0; x < this.width; ++x)
                for (var y = 0; y < 5; ++y)
                    this.set(x, y, x < this.width - cols ? this.get(x + cols, y) : 0);
        };
        Image.prototype.shiftRight = function (cols) {
            for (var x = this.width - 1; x >= 0; --x)
                for (var y = 0; y < 5; ++y)
                    this.set(x, y, x >= cols ? this.get(x - cols, y) : 0);
        };
        Image.prototype.clear = function () {
            for (var i = 0; i < this.data.length; ++i)
                this.data[i] = 0;
        };
        Image.height = 5;
        return Image;
    }(pxsim.RefObject));
    pxsim.Image = Image;
    function createInternalImage(width) {
        var img = createImage(width);
        pxsim.noLeakTracking(img);
        return img;
    }
    pxsim.createInternalImage = createInternalImage;
    function createImage(width) {
        return new Image(width, new Array(width * 5));
    }
    pxsim.createImage = createImage;
    function createImageFromBuffer(data) {
        return new Image(data.length / 5, data);
    }
    pxsim.createImageFromBuffer = createImageFromBuffer;
    function createImageFromString(text) {
        var font = pxsim.board().ledMatrixState.font;
        var w = font.width;
        var sprite = createInternalImage(6 * text.length - 1);
        var k = 0;
        for (var i = 0; i < text.length; i++) {
            var charCode = text.charCodeAt(i);
            var charStart = (charCode - 32) * 5;
            if (charStart < 0 || charStart + 5 > w) {
                charCode = " ".charCodeAt(0);
                charStart = (charCode - 32) * 5;
            }
            font.copyTo(charStart, 5, sprite, k);
            k = k + 5;
            if (i < text.length - 1) {
                k = k + 1;
            }
        }
        return sprite;
    }
    pxsim.createImageFromString = createImageFromString;
    function createFont() {
        var data = [0x0, 0x0, 0x0, 0x0, 0x0, 0x8, 0x8, 0x8, 0x0, 0x8, 0xa, 0x4a, 0x40, 0x0, 0x0, 0xa, 0x5f, 0xea, 0x5f, 0xea, 0xe, 0xd9, 0x2e, 0xd3, 0x6e, 0x19, 0x32, 0x44, 0x89, 0x33, 0xc, 0x92, 0x4c, 0x92, 0x4d, 0x8, 0x8, 0x0, 0x0, 0x0, 0x4, 0x88, 0x8, 0x8, 0x4, 0x8, 0x4, 0x84, 0x84, 0x88, 0x0, 0xa, 0x44, 0x8a, 0x40, 0x0, 0x4, 0x8e, 0xc4, 0x80, 0x0, 0x0, 0x0, 0x4, 0x88, 0x0, 0x0, 0xe, 0xc0, 0x0, 0x0, 0x0, 0x0, 0x8, 0x0, 0x1, 0x22, 0x44, 0x88, 0x10, 0xc, 0x92, 0x52, 0x52, 0x4c, 0x4, 0x8c, 0x84, 0x84, 0x8e, 0x1c, 0x82, 0x4c, 0x90, 0x1e, 0x1e, 0xc2, 0x44, 0x92, 0x4c, 0x6, 0xca, 0x52, 0x5f, 0xe2, 0x1f, 0xf0, 0x1e, 0xc1, 0x3e, 0x2, 0x44, 0x8e, 0xd1, 0x2e, 0x1f, 0xe2, 0x44, 0x88, 0x10, 0xe, 0xd1, 0x2e, 0xd1, 0x2e, 0xe, 0xd1, 0x2e, 0xc4, 0x88, 0x0, 0x8, 0x0, 0x8, 0x0, 0x0, 0x4, 0x80, 0x4, 0x88, 0x2, 0x44, 0x88, 0x4, 0x82, 0x0, 0xe, 0xc0, 0xe, 0xc0, 0x8, 0x4, 0x82, 0x44, 0x88, 0xe, 0xd1, 0x26, 0xc0, 0x4, 0xe, 0xd1, 0x35, 0xb3, 0x6c, 0xc, 0x92, 0x5e, 0xd2, 0x52, 0x1c, 0x92, 0x5c, 0x92, 0x5c, 0xe, 0xd0, 0x10, 0x10, 0xe, 0x1c, 0x92, 0x52, 0x52, 0x5c, 0x1e, 0xd0, 0x1c, 0x90, 0x1e, 0x1e, 0xd0, 0x1c, 0x90, 0x10, 0xe, 0xd0, 0x13, 0x71, 0x2e, 0x12, 0x52, 0x5e, 0xd2, 0x52, 0x1c, 0x88, 0x8, 0x8, 0x1c, 0x1f, 0xe2, 0x42, 0x52, 0x4c, 0x12, 0x54, 0x98, 0x14, 0x92, 0x10, 0x10, 0x10, 0x10, 0x1e, 0x11, 0x3b, 0x75, 0xb1, 0x31, 0x11, 0x39, 0x35, 0xb3, 0x71, 0xc, 0x92, 0x52, 0x52, 0x4c, 0x1c, 0x92, 0x5c, 0x90, 0x10, 0xc, 0x92, 0x52, 0x4c, 0x86, 0x1c, 0x92, 0x5c, 0x92, 0x51, 0xe, 0xd0, 0xc, 0x82, 0x5c, 0x1f, 0xe4, 0x84, 0x84, 0x84, 0x12, 0x52, 0x52, 0x52, 0x4c, 0x11, 0x31, 0x31, 0x2a, 0x44, 0x11, 0x31, 0x35, 0xbb, 0x71, 0x12, 0x52, 0x4c, 0x92, 0x52, 0x11, 0x2a, 0x44, 0x84, 0x84, 0x1e, 0xc4, 0x88, 0x10, 0x1e, 0xe, 0xc8, 0x8, 0x8, 0xe, 0x10, 0x8, 0x4, 0x82, 0x41, 0xe, 0xc2, 0x42, 0x42, 0x4e, 0x4, 0x8a, 0x40, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1f, 0x8, 0x4, 0x80, 0x0, 0x0, 0x0, 0xe, 0xd2, 0x52, 0x4f, 0x10, 0x10, 0x1c, 0x92, 0x5c, 0x0, 0xe, 0xd0, 0x10, 0xe, 0x2, 0x42, 0x4e, 0xd2, 0x4e, 0xc, 0x92, 0x5c, 0x90, 0xe, 0x6, 0xc8, 0x1c, 0x88, 0x8, 0xe, 0xd2, 0x4e, 0xc2, 0x4c, 0x10, 0x10, 0x1c, 0x92, 0x52, 0x8, 0x0, 0x8, 0x8, 0x8, 0x2, 0x40, 0x2, 0x42, 0x4c, 0x10, 0x14, 0x98, 0x14, 0x92, 0x8, 0x8, 0x8, 0x8, 0x6, 0x0, 0x1b, 0x75, 0xb1, 0x31, 0x0, 0x1c, 0x92, 0x52, 0x52, 0x0, 0xc, 0x92, 0x52, 0x4c, 0x0, 0x1c, 0x92, 0x5c, 0x90, 0x0, 0xe, 0xd2, 0x4e, 0xc2, 0x0, 0xe, 0xd0, 0x10, 0x10, 0x0, 0x6, 0xc8, 0x4, 0x98, 0x8, 0x8, 0xe, 0xc8, 0x7, 0x0, 0x12, 0x52, 0x52, 0x4f, 0x0, 0x11, 0x31, 0x2a, 0x44, 0x0, 0x11, 0x31, 0x35, 0xbb, 0x0, 0x12, 0x4c, 0x8c, 0x92, 0x0, 0x11, 0x2a, 0x44, 0x98, 0x0, 0x1e, 0xc4, 0x88, 0x1e, 0x6, 0xc4, 0x8c, 0x84, 0x86, 0x8, 0x8, 0x8, 0x8, 0x8, 0x18, 0x8, 0xc, 0x88, 0x18, 0x0, 0x0, 0xc, 0x83, 0x60];
        var nb = data.length;
        var n = nb / 5;
        var font = createInternalImage(nb);
        for (var c = 0; c < n; c++) {
            for (var row = 0; row < 5; row++) {
                var char = data[c * 5 + row];
                for (var col = 0; col < 5; col++) {
                    if ((char & (1 << col)) != 0)
                        font.set((c * 5 + 4) - col, row, 255);
                }
            }
        }
        return font;
    }
    pxsim.createFont = createFont;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var images;
    (function (images) {
        function createImage(img) {
            return img;
        }
        images.createImage = createImage;
        function createBigImage(img) {
            return img;
        }
        images.createBigImage = createBigImage;
    })(images = pxsim.images || (pxsim.images = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var ImageMethods;
    (function (ImageMethods) {
        function showImage(leds, offset, interval) {
            pxsim.pxtrt.nullCheck(leds);
            leds.copyTo(offset, 5, pxsim.board().ledMatrixState.image, 0);
            pxsim.runtime.queueDisplayUpdate();
            pxsim.basic.pause(interval);
        }
        ImageMethods.showImage = showImage;
        function plotImage(leds, offset) {
            pxsim.pxtrt.nullCheck(leds);
            leds.copyTo(offset, 5, pxsim.board().ledMatrixState.image, 0);
            pxsim.runtime.queueDisplayUpdate();
        }
        ImageMethods.plotImage = plotImage;
        function height(leds) {
            pxsim.pxtrt.nullCheck(leds);
            return pxsim.Image.height;
        }
        ImageMethods.height = height;
        function width(leds) {
            pxsim.pxtrt.nullCheck(leds);
            return leds.width;
        }
        ImageMethods.width = width;
        function plotFrame(leds, frame) {
            ImageMethods.plotImage(leds, frame * pxsim.Image.height);
        }
        ImageMethods.plotFrame = plotFrame;
        function showFrame(leds, frame, interval) {
            ImageMethods.showImage(leds, frame * pxsim.Image.height, interval);
        }
        ImageMethods.showFrame = showFrame;
        function pixel(leds, x, y) {
            pxsim.pxtrt.nullCheck(leds);
            return leds.get(x, y);
        }
        ImageMethods.pixel = pixel;
        function setPixel(leds, x, y, v) {
            pxsim.pxtrt.nullCheck(leds);
            leds.set(x, y, v);
        }
        ImageMethods.setPixel = setPixel;
        function clear(leds) {
            pxsim.pxtrt.nullCheck(leds);
            leds.clear();
        }
        ImageMethods.clear = clear;
        function setPixelBrightness(i, x, y, b) {
            pxsim.pxtrt.nullCheck(i);
            i.set(x, y, b);
        }
        ImageMethods.setPixelBrightness = setPixelBrightness;
        function pixelBrightness(i, x, y) {
            pxsim.pxtrt.nullCheck(i);
            return i.get(x, y);
        }
        ImageMethods.pixelBrightness = pixelBrightness;
        function scrollImage(leds, stride, interval) {
            pxsim.pxtrt.nullCheck(leds);
            if (stride == 0)
                stride = 1;
            var cb = pxsim.getResume();
            var off = stride > 0 ? 0 : leds.width - 1;
            var display = pxsim.board().ledMatrixState.image;
            pxsim.board().ledMatrixState.animationQ.enqueue({
                interval: interval,
                frame: function () {
                    if (off >= leds.width || off < 0)
                        return false;
                    if (stride > 0) {
                        display.shiftLeft(stride);
                        var c = Math.min(stride, leds.width - off);
                        leds.copyTo(off, c, display, 5 - stride);
                    }
                    else {
                        display.shiftRight(-stride);
                        var c = Math.min(-stride, leds.width - off);
                        leds.copyTo(off, c, display, 0);
                    }
                    off += stride;
                    return true;
                },
                whenDone: cb
            });
        }
        ImageMethods.scrollImage = scrollImage;
    })(ImageMethods = pxsim.ImageMethods || (pxsim.ImageMethods = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var basic;
    (function (basic) {
        function showNumber(x, interval) {
            if (interval < 0)
                return;
            var leds = pxsim.createImageFromString(x.toString());
            if (x < 0 || x >= 10)
                pxsim.ImageMethods.scrollImage(leds, 1, interval);
            else
                showLeds(leds, interval * 5);
        }
        basic.showNumber = showNumber;
        function showString(s, interval) {
            if (interval < 0)
                return;
            if (s.length == 0) {
                clearScreen();
                basic.pause(interval * 5);
            }
            else {
                if (s.length == 1)
                    showLeds(pxsim.createImageFromString(s), 0);
                else
                    pxsim.ImageMethods.scrollImage(pxsim.createImageFromString(s + " "), 1, interval);
            }
        }
        basic.showString = showString;
        function showLeds(leds, delay) {
            showAnimation(leds, delay);
        }
        basic.showLeds = showLeds;
        function clearScreen() {
            pxsim.board().ledMatrixState.image.clear();
            pxsim.runtime.queueDisplayUpdate();
        }
        basic.clearScreen = clearScreen;
        function showAnimation(leds, interval) {
            pxsim.ImageMethods.scrollImage(leds, 5, interval);
        }
        basic.showAnimation = showAnimation;
        function plotLeds(leds) {
            pxsim.ImageMethods.plotImage(leds, 0);
        }
        basic.plotLeds = plotLeds;
    })(basic = pxsim.basic || (pxsim.basic = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var led;
    (function (led) {
        function plot(x, y) {
            pxsim.board().ledMatrixState.image.set(x, y, 255);
            pxsim.runtime.queueDisplayUpdate();
        }
        led.plot = plot;
        function unplot(x, y) {
            pxsim.board().ledMatrixState.image.set(x, y, 0);
            pxsim.runtime.queueDisplayUpdate();
        }
        led.unplot = unplot;
        function point(x, y) {
            return !!pxsim.board().ledMatrixState.image.get(x, y);
        }
        led.point = point;
        function brightness() {
            return pxsim.board().ledMatrixState.brigthness;
        }
        led.brightness = brightness;
        function setBrightness(value) {
            pxsim.board().ledMatrixState.brigthness = value;
            pxsim.runtime.queueDisplayUpdate();
        }
        led.setBrightness = setBrightness;
        function stopAnimation() {
            pxsim.board().ledMatrixState.animationQ.cancelAll();
            pxsim.board().ledMatrixState.image.clear();
        }
        led.stopAnimation = stopAnimation;
        function setDisplayMode(mode) {
            pxsim.board().ledMatrixState.displayMode = mode;
            pxsim.runtime.queueDisplayUpdate();
        }
        led.setDisplayMode = setDisplayMode;
        function screenshot() {
            var img = pxsim.createImage(5);
            pxsim.board().ledMatrixState.image.copyTo(0, 5, img, 0);
            return img;
        }
        led.screenshot = screenshot;
        function enable(on) {
            pxsim.board().ledMatrixState.disabled = !on;
            pxsim.runtime.queueDisplayUpdate();
        }
        led.enable = enable;
    })(led = pxsim.led || (pxsim.led = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function lightLevel() {
            var b = pxsim.board().lightSensorState;
            if (!b.usesLightLevel) {
                b.usesLightLevel = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            return b.lightLevel;
        }
        input.lightLevel = lightLevel;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    /**
     * Error codes used in the micro:bit runtime.
    */
    (function (PanicCode) {
        // PANIC Codes. These are not return codes, but are terminal conditions.
        // These induce a panic operation, where all code stops executing, and a panic state is
        // entered where the panic code is diplayed.
        // Out out memory error. Heap storage was requested, but is not available.
        PanicCode[PanicCode["MICROBIT_OOM"] = 20] = "MICROBIT_OOM";
        // Corruption detected in the micro:bit heap space
        PanicCode[PanicCode["MICROBIT_HEAP_ERROR"] = 30] = "MICROBIT_HEAP_ERROR";
        // Dereference of a NULL pointer through the ManagedType class,
        PanicCode[PanicCode["MICROBIT_NULL_DEREFERENCE"] = 40] = "MICROBIT_NULL_DEREFERENCE";
    })(pxsim.PanicCode || (pxsim.PanicCode = {}));
    var PanicCode = pxsim.PanicCode;
    ;
    function panic(code) {
        console.log("PANIC:", code);
        throw new Error("PANIC " + code);
    }
    pxsim.panic = panic;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var basic;
    (function (basic) {
        basic.pause = pxsim.thread.pause;
        basic.forever = pxsim.thread.forever;
    })(basic = pxsim.basic || (pxsim.basic = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var control;
    (function (control) {
        control.inBackground = pxsim.thread.runInBackground;
        function reset() {
            pxsim.U.userError("reset not implemented in simulator yet");
        }
        control.reset = reset;
        function waitMicros(micros) {
            // TODO
        }
        control.waitMicros = waitMicros;
        function deviceName() {
            var b = pxsim.board();
            return b && b.id
                ? b.id.slice(0, 4)
                : "abcd";
        }
        control.deviceName = deviceName;
        function deviceSerialNumber() {
            var b = pxsim.board();
            return parseInt(b && b.id
                ? b.id.slice(1)
                : "42");
        }
        control.deviceSerialNumber = deviceSerialNumber;
        function onEvent(id, evid, handler) {
            pxsim.pxtcore.registerWithDal(id, evid, handler);
        }
        control.onEvent = onEvent;
        function raiseEvent(id, evid, mode) {
            // TODO mode?
            pxsim.board().bus.queue(id, evid);
        }
        control.raiseEvent = raiseEvent;
    })(control = pxsim.control || (pxsim.control = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pxtcore;
    (function (pxtcore) {
        function registerWithDal(id, evid, handler) {
            pxsim.board().bus.listen(id, evid, handler);
        }
        pxtcore.registerWithDal = registerWithDal;
    })(pxtcore = pxsim.pxtcore || (pxsim.pxtcore = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function runningTime() {
            return pxsim.runtime.runningTime();
        }
        input.runningTime = runningTime;
        function calibrate() {
        }
        input.calibrate = calibrate;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var pins;
    (function (pins) {
        function onPulsed(name, pulse, body) {
        }
        pins.onPulsed = onPulsed;
        function pulseDuration() {
            return 0;
        }
        pins.pulseDuration = pulseDuration;
        function createBuffer(sz) {
            return pxsim.BufferMethods.createBuffer(sz);
        }
        pins.createBuffer = createBuffer;
        function pulseIn(name, value, maxDuration) {
            var pin = pxsim.getPin(name);
            if (!pin)
                return 0;
            return 5000;
        }
        pins.pulseIn = pulseIn;
        function spiWrite(value) {
            // TODO
            return 0;
        }
        pins.spiWrite = spiWrite;
        function i2cReadBuffer(address, size, repeat) {
            // fake reading zeros
            return createBuffer(size);
        }
        pins.i2cReadBuffer = i2cReadBuffer;
        function i2cWriteBuffer(address, buf, repeat) {
            // fake - noop
        }
        pins.i2cWriteBuffer = i2cWriteBuffer;
        // this likely shouldn't be called
        function getPinAddress(name) {
            return pxsim.getPin(name);
        }
        pins.getPinAddress = getPinAddress;
        function setEvents(name, event) {
        }
        pins.setEvents = setEvents;
    })(pins = pxsim.pins || (pxsim.pins = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var devices;
    (function (devices) {
        function tellCameraTo(action) {
            // TODO
        }
        devices.tellCameraTo = tellCameraTo;
        function tellRemoteControlTo(action) {
            // TODO
        }
        devices.tellRemoteControlTo = tellRemoteControlTo;
        function raiseAlertTo(action) {
            // TODO
        }
        devices.raiseAlertTo = raiseAlertTo;
        function onSignalStrengthChanged(action) {
            // TODO
        }
        devices.onSignalStrengthChanged = onSignalStrengthChanged;
        function signalStrength() {
            // TODO
            return 0;
        }
        devices.signalStrength = signalStrength;
        function onGamepadButton(button, body) {
            // TODO
        }
        devices.onGamepadButton = onGamepadButton;
    })(devices = pxsim.devices || (pxsim.devices = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var bluetooth;
    (function (bluetooth) {
        function startIOPinService() {
            // TODO
        }
        bluetooth.startIOPinService = startIOPinService;
        function startLEDService() {
            // TODO
        }
        bluetooth.startLEDService = startLEDService;
        function startTemperatureService() {
            // TODO
        }
        bluetooth.startTemperatureService = startTemperatureService;
        function startMagnetometerService() {
            // TODO
        }
        bluetooth.startMagnetometerService = startMagnetometerService;
        function startAccelerometerService() {
            // TODO
        }
        bluetooth.startAccelerometerService = startAccelerometerService;
        function startButtonService() {
            // TODO
        }
        bluetooth.startButtonService = startButtonService;
        function startUartService() {
            // TODO
        }
        bluetooth.startUartService = startUartService;
        function uartWrite(s) {
            // TODO
        }
        bluetooth.uartWrite = uartWrite;
        function uartReadUntil(del) {
            // TODO
            return "";
        }
        bluetooth.uartReadUntil = uartReadUntil;
        function onBluetoothConnected(a) {
            // TODO
        }
        bluetooth.onBluetoothConnected = onBluetoothConnected;
        function onBluetoothDisconnected(a) {
            // TODO
        }
        bluetooth.onBluetoothDisconnected = onBluetoothDisconnected;
    })(bluetooth = pxsim.bluetooth || (pxsim.bluetooth = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var SpeakerState = (function () {
        function SpeakerState() {
        }
        return SpeakerState;
    }());
    pxsim.SpeakerState = SpeakerState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var music;
    (function (music) {
        function playTone(frequency, ms) {
            var b = pxsim.board();
            b.speakerState.frequency = frequency;
            b.speakerState.ms = ms;
            pxsim.runtime.queueDisplayUpdate();
            var cb = pxsim.getResume();
            pxsim.AudioContextManager.tone(frequency, 1);
            if (ms <= 0)
                cb();
            else {
                setTimeout(function () {
                    pxsim.AudioContextManager.stop();
                    b.speakerState.frequency = 0;
                    b.speakerState.ms = 0;
                    pxsim.runtime.queueDisplayUpdate();
                    cb();
                }, ms);
            }
        }
        music.playTone = playTone;
    })(music = pxsim.music || (pxsim.music = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function sendBufferAsm(buffer, pin) {
        var b = pxsim.board();
        if (b) {
            var np = b.neopixelState;
            if (np) {
                var buf = buffer.data;
                np.updateBuffer(buf, pin);
                pxsim.runtime.queueDisplayUpdate();
            }
        }
    }
    pxsim.sendBufferAsm = sendBufferAsm;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var RadioDatagram = (function () {
        function RadioDatagram(runtime) {
            this.runtime = runtime;
            this.datagram = [];
            this.lastReceived = RadioDatagram.defaultPacket();
        }
        RadioDatagram.prototype.queue = function (packet) {
            if (this.datagram.length < 4) {
                this.datagram.push(packet);
            }
            pxsim.runtime.board.bus.queue(29 /* MICROBIT_ID_RADIO */, 1 /* MICROBIT_RADIO_EVT_DATAGRAM */);
        };
        RadioDatagram.prototype.send = function (payload) {
            pxsim.Runtime.postMessage({
                type: "radiopacket",
                rssi: 0,
                serial: pxsim.board().radioState.bus.transmitSerialNumber ? pxsim.board().radioState.bus.serial : 0,
                time: 0,
                payload: payload
            });
        };
        RadioDatagram.prototype.recv = function () {
            var r = this.datagram.shift();
            if (!r)
                r = RadioDatagram.defaultPacket();
            return this.lastReceived = r;
        };
        RadioDatagram.defaultPacket = function () {
            return {
                rssi: -1,
                serial: 0,
                time: 0,
                payload: { type: -1 }
            };
        };
        return RadioDatagram;
    }());
    pxsim.RadioDatagram = RadioDatagram;
    var RadioBus = (function () {
        function RadioBus(runtime) {
            this.runtime = runtime;
            // uint8_t radioDefaultGroup = MICROBIT_RADIO_DEFAULT_GROUP;
            this.groupId = 0; // todo
            this.power = 0;
            this.serial = 0;
            this.transmitSerialNumber = false;
            this.datagram = new RadioDatagram(runtime);
            this.serial = Math.floor(Math.random() * Math.pow(2, 32)) - Math.pow(2, 31); // 32 bit signed integer
        }
        RadioBus.prototype.setGroup = function (id) {
            this.groupId = id & 0xff; // byte only
        };
        RadioBus.prototype.setTransmitPower = function (power) {
            this.power = Math.max(0, Math.min(7, power));
        };
        RadioBus.prototype.setTransmitSerialNumber = function (sn) {
            this.transmitSerialNumber = !!sn;
        };
        RadioBus.prototype.broadcast = function (msg) {
            pxsim.Runtime.postMessage({
                type: "eventbus",
                id: 2000 /* MES_BROADCAST_GENERAL_ID */,
                eventid: msg,
                power: this.power,
                group: this.groupId
            });
        };
        return RadioBus;
    }());
    pxsim.RadioBus = RadioBus;
    var RadioState = (function () {
        function RadioState(runtime) {
            this.bus = new RadioBus(runtime);
        }
        RadioState.prototype.recievePacket = function (packet) {
            this.bus.datagram.queue(packet);
        };
        return RadioState;
    }());
    pxsim.RadioState = RadioState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var radio;
    (function (radio) {
        var PacketPayloadType;
        (function (PacketPayloadType) {
            PacketPayloadType[PacketPayloadType["NUMBER"] = 0] = "NUMBER";
            PacketPayloadType[PacketPayloadType["VALUE"] = 1] = "VALUE";
            PacketPayloadType[PacketPayloadType["STRING"] = 2] = "STRING";
        })(PacketPayloadType || (PacketPayloadType = {}));
        function broadcastMessage(msg) {
            pxsim.board().radioState.bus.broadcast(msg);
        }
        radio.broadcastMessage = broadcastMessage;
        function onBroadcastMessageReceived(msg, handler) {
            pxsim.pxtcore.registerWithDal(2000 /* MES_BROADCAST_GENERAL_ID */, msg, handler);
        }
        radio.onBroadcastMessageReceived = onBroadcastMessageReceived;
        function setGroup(id) {
            pxsim.board().radioState.bus.setGroup(id);
        }
        radio.setGroup = setGroup;
        function setTransmitPower(power) {
            pxsim.board().radioState.bus.setTransmitPower(power);
        }
        radio.setTransmitPower = setTransmitPower;
        function setTransmitSerialNumber(transmit) {
            pxsim.board().radioState.bus.setTransmitSerialNumber(transmit);
        }
        radio.setTransmitSerialNumber = setTransmitSerialNumber;
        function sendNumber(value) {
            pxsim.board().radioState.bus.datagram.send({
                type: PacketPayloadType.NUMBER,
                numberData: value
            });
        }
        radio.sendNumber = sendNumber;
        function sendString(msg) {
            msg = msg.substr(0, 19);
            pxsim.board().radioState.bus.datagram.send({
                type: PacketPayloadType.STRING,
                stringData: msg
            });
        }
        radio.sendString = sendString;
        function writeValueToSerial() {
            var b = pxsim.board();
            writePacketToSerial(b, b.radioState.bus.datagram.recv());
        }
        radio.writeValueToSerial = writeValueToSerial;
        function writeReceivedPacketToSerial() {
            var b = pxsim.board();
            writePacketToSerial(b, b.radioState.bus.datagram.lastReceived);
        }
        radio.writeReceivedPacketToSerial = writeReceivedPacketToSerial;
        function sendValue(name, value) {
            name = name.substr(0, 12);
            var msg = [];
            msg.push();
            pxsim.board().radioState.bus.datagram.send({
                type: PacketPayloadType.VALUE,
                stringData: name,
                numberData: value
            });
        }
        radio.sendValue = sendValue;
        function receiveNumber() {
            var packet = pxsim.board().radioState.bus.datagram.recv();
            return receivedNumber();
        }
        radio.receiveNumber = receiveNumber;
        function receiveString() {
            var packet = pxsim.board().radioState.bus.datagram.recv();
            return receivedString();
        }
        radio.receiveString = receiveString;
        function receivedSignalStrength() {
            return pxsim.board().radioState.bus.datagram.lastReceived.rssi;
        }
        radio.receivedSignalStrength = receivedSignalStrength;
        function onDataReceived(handler) {
            pxsim.pxtcore.registerWithDal(29 /* MICROBIT_ID_RADIO */, 1 /* MICROBIT_RADIO_EVT_DATAGRAM */, handler);
            radio.receiveNumber();
        }
        radio.onDataReceived = onDataReceived;
        function receivedNumber() {
            return pxsim.board().radioState.bus.datagram.lastReceived.payload.numberData || 0;
        }
        radio.receivedNumber = receivedNumber;
        function receivedSerial() {
            return pxsim.board().radioState.bus.datagram.lastReceived.serial;
        }
        radio.receivedSerial = receivedSerial;
        function receivedString() {
            return pxsim.board().radioState.bus.datagram.lastReceived.payload.stringData || "";
        }
        radio.receivedString = receivedString;
        function receivedTime() {
            return pxsim.board().radioState.bus.datagram.lastReceived.time;
        }
        radio.receivedTime = receivedTime;
        function writePacketToSerial(b, p) {
            switch (p.payload.type) {
                case PacketPayloadType.NUMBER:
                    b.writeSerial("{\"t\":" + p.time + ",\"s\":" + p.serial + ",\"v\":" + p.payload.numberData + "}\r\n");
                    break;
                case PacketPayloadType.VALUE:
                    b.writeSerial("{\"t\":" + p.time + ",\"s\":" + p.serial + ",\"n\":\"" + p.payload.stringData + "\",\"v\":" + p.payload.numberData + "}\r\n");
                    break;
                case PacketPayloadType.STRING:
                    b.writeSerial("{\"t\":" + p.time + ",\"s\":" + p.serial + ",\"n\":\"" + p.payload.stringData + "\"}\r\n");
                    break;
                default:
            }
        }
    })(radio = pxsim.radio || (pxsim.radio = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var basic;
    (function (basic) {
        function setLedColor(c) {
            pxsim.board().rgbLedState = c;
            pxsim.runtime.queueDisplayUpdate();
        }
        basic.setLedColor = setLedColor;
    })(basic = pxsim.basic || (pxsim.basic = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var SerialState = (function () {
        function SerialState() {
            this.serialIn = [];
            this.serialOutBuffer = "";
        }
        SerialState.prototype.recieveData = function (data) {
            this.serialIn.push();
        };
        SerialState.prototype.readSerial = function () {
            var v = this.serialIn.shift() || "";
            return v;
        };
        SerialState.prototype.writeSerial = function (s) {
            for (var i = 0; i < s.length; ++i) {
                var c = s[i];
                this.serialOutBuffer += c;
                if (c == "\n") {
                    pxsim.Runtime.postMessage({
                        type: "serial",
                        data: this.serialOutBuffer,
                        id: pxsim.runtime.id
                    });
                    this.serialOutBuffer = "";
                    break;
                }
            }
        };
        return SerialState;
    }());
    pxsim.SerialState = SerialState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var serial;
    (function (serial) {
        function writeString(s) {
            pxsim.board().writeSerial(s);
        }
        serial.writeString = writeString;
        function readUntil(del) {
            return readString();
        }
        serial.readUntil = readUntil;
        function readString() {
            return pxsim.board().serialState.readSerial();
        }
        serial.readString = readString;
        function onDataReceived(delimiters, handler) {
            var b = pxsim.board();
            b.bus.listen(32 /* MICROBIT_ID_SERIAL */, 1 /* MICROBIT_SERIAL_EVT_DELIM_MATCH */, handler);
        }
        serial.onDataReceived = onDataReceived;
        function redirect(tx, rx, rate) {
            // TODO?
        }
        serial.redirect = redirect;
    })(serial = pxsim.serial || (pxsim.serial = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var motors;
    (function (motors) {
        function motorPower(power) {
            // TODO
        }
        motors.motorPower = motorPower;
        function motorCommand(command) {
        }
        motors.motorCommand = motorCommand;
        function dualMotorPower(motor, percent) {
        }
        motors.dualMotorPower = dualMotorPower;
    })(motors = pxsim.motors || (pxsim.motors = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var ThermometerState = (function () {
        function ThermometerState() {
            this.usesTemperature = false;
            this.temperature = 21;
        }
        return ThermometerState;
    }());
    pxsim.ThermometerState = ThermometerState;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var input;
    (function (input) {
        function temperature() {
            var b = pxsim.board();
            if (!b.thermometerState.usesTemperature) {
                b.thermometerState.usesTemperature = true;
                pxsim.runtime.queueDisplayUpdate();
            }
            return b.thermometerState.temperature;
        }
        input.temperature = temperature;
    })(input = pxsim.input || (pxsim.input = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        visuals.mkBoardView = function (opts) {
            return new visuals.MicrobitBoardSvg({
                runtime: pxsim.runtime,
                theme: visuals.randomTheme(),
                disableTilt: false,
                wireframe: opts.wireframe,
            });
        };
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
/// <reference path="../../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        function mkLedMatrixSvg(xy, rows, cols) {
            var result = { el: null, y: 0, x: 0, w: 0, h: 0, leds: [], ledsOuter: [], background: null };
            result.el = pxsim.svg.elt("g");
            var width = cols * visuals.PIN_DIST;
            var height = rows * visuals.PIN_DIST;
            var ledRad = Math.round(visuals.PIN_DIST * .35);
            var spacing = visuals.PIN_DIST;
            var padding = (spacing - 2 * ledRad) / 2.0;
            var x = xy[0], y = xy[1];
            var left = x - (ledRad + padding);
            var top = y - (ledRad + padding);
            result.x = left;
            result.y = top;
            result.w = width;
            result.h = height;
            result.background = pxsim.svg.child(result.el, "rect", { class: "sim-display", x: left, y: top, width: width, height: height });
            // ledsOuter
            result.leds = [];
            result.ledsOuter = [];
            var hoverRad = ledRad * 1.2;
            for (var i = 0; i < rows; ++i) {
                var y_1 = top + ledRad + i * spacing + padding;
                for (var j = 0; j < cols; ++j) {
                    var x_1 = left + ledRad + j * spacing + padding;
                    result.ledsOuter.push(pxsim.svg.child(result.el, "circle", { class: "sim-led-back", cx: x_1, cy: y_1, r: ledRad }));
                    result.leds.push(pxsim.svg.child(result.el, "circle", { class: "sim-led", cx: x_1, cy: y_1, r: hoverRad, title: "(" + j + "," + i + ")" }));
                }
            }
            //default theme
            pxsim.svg.fill(result.background, visuals.defaultLedMatrixTheme.background);
            pxsim.svg.fills(result.leds, visuals.defaultLedMatrixTheme.ledOn);
            pxsim.svg.fills(result.ledsOuter, visuals.defaultLedMatrixTheme.ledOff);
            //turn off LEDs
            result.leds.forEach(function (l) { return l.style.opacity = 0 + ""; });
            return result;
        }
        visuals.mkLedMatrixSvg = mkLedMatrixSvg;
        visuals.defaultLedMatrixTheme = {
            background: "#000",
            ledOn: "#ff5f5f",
            ledOff: "#DDD",
        };
        visuals.LED_MATRIX_STYLE = "\n            .sim-led-back:hover {\n                stroke:#a0a0a0;\n                stroke-width:3px;\n            }\n            .sim-led:hover {\n                stroke:#ff7f7f;\n                stroke-width:3px;\n            }\n            ";
        var LedMatrixView = (function () {
            function LedMatrixView() {
                this.DRAW_SIZE = 8;
                this.ACTIVE_SIZE = 5;
                this.style = visuals.LED_MATRIX_STYLE;
            }
            LedMatrixView.prototype.init = function (bus, state) {
                this.bus = bus;
                this.state = state;
                this.theme = visuals.defaultLedMatrixTheme;
                this.defs = [];
                this.element = this.buildDom();
            };
            LedMatrixView.prototype.moveToCoord = function (xy) {
                visuals.translateEl(this.element, xy);
            };
            LedMatrixView.prototype.updateTheme = function () {
                pxsim.svg.fill(this.background, this.theme.background);
                pxsim.svg.fills(this.leds, this.theme.ledOn);
                pxsim.svg.fills(this.ledsOuter, this.theme.ledOff);
            };
            LedMatrixView.prototype.updateState = function () {
                var _this = this;
                if (this.state.disabled) {
                    this.leds.forEach(function (led, i) {
                        var sel = led;
                        sel.style.opacity = 0 + "";
                    });
                    return;
                }
                var bw = this.state.displayMode == pxsim.DisplayMode.bw;
                var img = this.state.image;
                this.leds.forEach(function (led, i) {
                    var sel = led;
                    var dx = i % _this.DRAW_SIZE;
                    var dy = (i - dx) / _this.DRAW_SIZE;
                    if (dx < _this.ACTIVE_SIZE && dy < _this.ACTIVE_SIZE) {
                        var j = dx + dy * _this.ACTIVE_SIZE;
                        sel.style.opacity = ((bw ? img.data[j] > 0 ? 255 : 0 : img.data[j]) / 255.0) + "";
                    }
                    else {
                        sel.style.opacity = 0 + "";
                    }
                });
            };
            LedMatrixView.prototype.buildDom = function () {
                var res = mkLedMatrixSvg([0, 0], this.DRAW_SIZE, this.DRAW_SIZE);
                var display = res.el;
                this.background = res.background;
                this.leds = res.leds;
                this.ledsOuter = res.ledsOuter;
                return display;
            };
            return LedMatrixView;
        }());
        visuals.LedMatrixView = LedMatrixView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        var MB_STYLE = "\n        svg.sim {\n            margin-bottom:1em;\n        }\n        svg.sim.grayscale {\n            -moz-filter: grayscale(1);\n            -webkit-filter: grayscale(1);\n            filter: grayscale(1);\n        }\n        .sim-button {\n            pointer-events: none;\n        }\n\n        .sim-button-outer:hover {\n            stroke:grey;\n            stroke-width: 3px;\n        }\n        .sim-button-nut {\n            fill:#704A4A;\n            pointer-events:none;\n        }\n        .sim-button-nut:hover {\n            stroke:1px solid #704A4A;\n        }\n        .sim-pin:hover {\n            stroke:#D4AF37;\n            stroke-width:2px;\n        }\n\n        .sim-pin-touch.touched:hover {\n            stroke:darkorange;\n        }\n\n        .sim-led-back:hover {\n            stroke:#fff;\n            stroke-width:3px;\n        }\n        .sim-led:hover {\n            stroke:#ff7f7f;\n            stroke-width:3px;\n        }\n\n        .sim-systemled {\n            fill:#333;\n            stroke:#555;\n            stroke-width: 1px;\n        }\n\n        .sim-light-level-button {\n            stroke:#ccc;\n            stroke-width: 2px;\n        }\n\n        .sim-antenna {\n            fill-opacity:0.0;\n            stroke:#555;\n            stroke-width: 4px;\n        }\n\n        .sim-text {\n        font-family:\"Lucida Console\", Monaco, monospace;\n        font-size:14px;\n        fill:#fff;\n        pointer-events: none; user-select: none;\n        }\n        .sim-text.inverted {\n            fill:#000;\n        }\n\n        .sim-text-pin {\n        font-family:\"Lucida Console\", Monaco, monospace;\n        font-size:20px;\n        fill:#fff;\n        pointer-events: none;\n        }\n\n        .sim-thermometer {\n            stroke:#aaa;\n            stroke-width: 2px;\n        }\n\n        #rgbledcircle:hover {\n            r:8px;\n        }\n\n        /* animations */\n        .sim-theme-glow {\n            animation-name: sim-theme-glow-animation;\n            animation-timing-function: ease-in-out;\n            animation-direction: alternate;\n            animation-iteration-count: infinite;\n            animation-duration: 1.25s;\n        }\n        @keyframes sim-theme-glow-animation {\n            from { opacity: 1; }\n            to   { opacity: 0.75; }\n        }\n\n        .sim-flash {\n            animation-name: sim-flash-animation;\n            animation-duration: 0.1s;\n        }\n\n        @keyframes sim-flash-animation {\n            from { fill: yellow; }\n            to   { fill: default; }\n        }\n\n        .sim-flash-stroke {\n            animation-name: sim-flash-stroke-animation;\n            animation-duration: 0.4s;\n            animation-timing-function: ease-in;\n        }\n\n        @keyframes sim-flash-stroke-animation {\n            from { stroke: yellow; }\n            to   { stroke: default; }\n        }\n\n        /* wireframe */\n        .sim-wireframe * {\n            fill: none;\n            stroke: black;\n        }\n        .sim-wireframe .sim-display,\n        .sim-wireframe .sim-led,\n        .sim-wireframe .sim-led-back,\n        .sim-wireframe .sim-head,\n        .sim-wireframe .sim-theme,\n        .sim-wireframe .sim-button-group,\n        .sim-wireframe .sim-button-label,\n        .sim-wireframe .sim-button,\n        .sim-wireframe .sim-text-pin\n        {\n            visibility: hidden;\n        }\n        .sim-wireframe .sim-label\n        {\n            stroke: none;\n            fill: #777;\n        }\n        .sim-wireframe .sim-board {\n            stroke-width: 2px;\n        }\n    ";
        var BOARD_SVG = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Ebene_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"530px\" height=\"530px\" viewBox=\"0 0 530 530\" enable-background=\"new 0 0 530 530\" xml:space=\"preserve\">\n<path fill=\"#034854\" d=\"M520.5,298.5c-18.2,0-32.9-14.7-32.9-32.9s14.7-32.9,32.9-32.9c0.6,0,1.3,0,1.9,0.1\n\tc-19.4-9-44.4-27.4-72.1-63.3c-28.8-37.8-28.6-84.7-25.8-115c0.2-2.3,0.4-4.5,0.7-6.6c1.5-14.7-7.2-28.6-21.3-33.6l-1.1-0.4\n\tc-9.5-3.4-20.1-2-28.4,3.9c-1.4,1-2.9,2-4.5,3.1c-22.1,14.8-62.8,37.6-104.6,37.6c-39.2,0-80.1-22.2-104.7-38.3\n\tc5.7,5.9,9.3,14,9.3,22.9c0,18.2-14.7,32.9-32.9,32.9c-12.4,0-23.2-6.9-28.8-17c2.3,27.8-0.7,71.6-26.4,109.2\n\tC60.1,199.2,27,220.2,3.3,232.3c2-0.4,4.1-0.6,6.2-0.6c18.2,0,33,14.4,32.9,32.8c0,18.2-14.7,32.9-32.9,32.9c-2,0-4-0.2-5.9-0.5\n\tc17.2,5.6,37.6,16.2,71.3,56.2c34.4,40.4,35.9,94.5,32.3,124.1c-1.8,13.7,1.6,27.9,12.5,36.3c10.4,8.1,28.8,5.4,39.5-2.5\n\tc12.4-9.3,25.8-18.2,39.5-24.5c15.5-7.2,30.1-11.1,39.6-11.8c5-0.5,9.8-2.3,11.4-7.1c2-5.7,6.2-12.7,15.9-12.7\n\tc9.3,0,13.8,6.4,15.9,12c1.6,4.3,5.4,7.3,10,7.7c6.6,0.5,18.4,3.2,39.3,11.2c17,6.6,29.6,16.2,40.2,23.2\n\tc18.4,11.8,32.1,8.8,41.4,2.9c8.3-5.2,12.7-14.9,11.4-24.8c-3.1-22-5.8-73,22-121.1c21.5-36.7,54.4-56.1,77.5-67.5\n\tC522.3,298.5,521.4,298.5,520.5,298.5z M138,502.8c-8.7,0-15.7-7-15.7-15.7s7-15.7,15.7-15.7s15.7,7,15.7,15.7\n\tS146.6,502.8,138,502.8z M393.4,501.5c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7s15.7,7,15.7,15.7\n\tC409.1,494.5,402.1,501.5,393.4,501.5z M393.4,59.2c-8.6,0-15.7-6.9-15.7-15.7c0-8.8,6.9-15.7,15.7-15.7c8.8,0,15.7,6.9,15.7,15.7\n\tC409.1,52.3,401.9,59.2,393.4,59.2z\"/>\n<path id=\"EDGE_VCC\" fill=\"#EFDA48\" d=\"M393.4,10.8c-9.2,0-17.6,3.8-23.6,9.9c-5.8,5.9-9.3,14-9.3,22.9c0,18.2,14.7,32.9,32.9,32.9\n\tc14.4,0,26.6-9.3,31.1-22.1c1.2-3.4,1.8-7,1.8-10.8C426.3,25.5,411.5,10.8,393.4,10.8z M393.4,59.2c-8.6,0-15.7-6.9-15.7-15.7\n\tc0-8.8,6.9-15.7,15.7-15.7c8.8,0,15.7,6.9,15.7,15.7C409.1,52.3,401.9,59.2,393.4,59.2z\"/>\n<path fill=\"#BDD1CF\" d=\"M286.9,94h-41.7c-1.7,0-2.8-1.1-2.8-2.8v-32c0-1.7,1.1-2.8,2.8-2.8h41.7c1.7,0,2.8,1.1,2.8,2.8v32\n\tC289.7,92.8,288.3,94,286.9,94z\"/>\n<path id=\"EXT_PWR\" fill=\"#F2F2C8\" d=\"M449.4,343l-37-15.7c-0.3-0.1-0.7-0.2-1.1-0.2l-15.9-6.7l-3,7.4l13.5,5.6l-15.7,37.4l-13.6-5.8\n\tl-3,7.4l22.5,9.8l0.1-0.2l31.3,13.2c1.9,0.7,4.1,0,4.7-1.9l19.2-45.7C452,345.8,451.3,343.7,449.4,343z\"/>\n<polygon fill=\"#F8B133\" points=\"354,361 326.3,361 326.3,311.2 354,311.2 \"/>\n<polygon fill=\"#1D1D1B\" points=\"190.7,364.4 162.5,336.2 190.7,308 218.9,336.2 \"/>\n<polygon fill=\"#FFFFFF\" points=\"184.6,379.7 165.5,379.6 165.5,362.4 184.6,362.6 \"/>\n<rect id=\"ACCEL\" x=\"132.3\" y=\"241.8\" fill=\"#1D1D1B\" width=\"23.8\" height=\"14.4\"/>\n<path fill=\"#BDD1CF\" d=\"M326.6,84.1h-10.3c-1,0-2-0.9-2-2V66.9c0-1,0.9-2,2-2h10.3c1,0,2,0.9,2,2v15.2\n\tC328.4,83.2,327.6,84.1,326.6,84.1z\"/>\n<path fill=\"#FFFFFF\" d=\"M325.9,74.5c0-3.2-0.3-8.4-4.6-8.4c-5.1,0-4.6,5-4.6,8.4c0,3.2-0.2,8.4,4.6,8.4\n\tC326.6,82.9,325.9,77.6,325.9,74.5z\"/>\n<rect id=\"FLASH\" x=\"350\" y=\"90\" fill=\"#1D1D1B\" width=\"25.3\" height=\"30.8\"/>\n<rect id=\"G_A0\" x=\"80.5\" y=\"144.4\" transform=\"matrix(-0.5687 0.8226 -0.8226 -0.5687 301.6608 150.839)\" fill=\"#FFFFFF\" width=\"61.5\" height=\"20.3\"/>\n<circle id=\"G_A0_GND\" fill=\"#BDD1CF\" cx=\"124.8\" cy=\"135.6\" r=\"2.7\"/>\n<circle id=\"G_A0_VCC\" fill=\"#BDD1CF\" cx=\"115.6\" cy=\"148.2\" r=\"2.7\"/>\n<circle id=\"G_A0_SDA\" fill=\"#BDD1CF\" cx=\"107.4\" cy=\"160\" r=\"2.7\"/>\n<circle id=\"G_A0_SCL\" fill=\"#BDD1CF\" cx=\"98\" cy=\"173.5\" r=\"2.7\"/>\n<rect id=\"G_A1\" x=\"412.2\" y=\"123.3\" transform=\"matrix(-0.8226 0.5687 -0.5687 -0.8226 857.3843 40.5361)\" fill=\"#FFFFFF\" width=\"20.3\" height=\"61.5\"/>\n<circle id=\"G_A1_RX\" fill=\"#BDD1CF\" cx=\"408.9\" cy=\"135.2\" r=\"2.7\"/>\n<circle id=\"G_A1_TX\" fill=\"#BDD1CF\" cx=\"418.2\" cy=\"147.7\" r=\"2.7\"/>\n<circle id=\"G_A1_VCC\" fill=\"#BDD1CF\" cx=\"426.5\" cy=\"159.6\" r=\"2.7\"/>\n<circle id=\"G_A1_GND\" fill=\"#BDD1CF\" cx=\"435.7\" cy=\"173\" r=\"2.7\"/>\n<path fill=\"#FFFFFF\" d=\"M116.6,194.9l-37.7,13.2l9.6,30.1l39.3-14.2c7.3-2.3,9.6-9.1,7.3-16.4l-1.3-3.8\n\tC131.6,196.8,123.8,192.6,116.6,194.9z M131.6,216.4h-5.8v-2.1l1.3-0.2l-0.7-2.3h-5.7l-0.7,2.3l1.3,0.2v2.1h-5.8v-2.1l1.3-0.2\n\tl5.3-14.9h3.6l5.1,14.9l1.3,0.2L131.6,216.4L131.6,216.4z\"/>\n<path fill=\"#FFFFFF\" d=\"M411.7,193c-7.6-2.1-15.2,2.8-17.4,10.1l-1,3.8c-2.1,7.3,2.1,14.9,9.4,17.1l40,12.8l8.9-30.6L411.7,193z\n\t M413.1,215.1c-1,0.9-2.7,1.3-4.6,1.3H400v-2.1l1.8-0.3v-12.4l-1.8-0.3v-2.1h1.8h5.8c2,0,3.6,0.3,4.8,1.3c1,0.7,1.8,2,1.8,3.6\n\tc0,0.7-0.2,1.6-0.7,2.1c-0.3,0.7-1,1-1.8,1.5c1,0.2,1.8,0.7,2.3,1.5c0.5,0.7,0.7,1.6,0.7,2.5C414.7,213,414.2,214.1,413.1,215.1z\"/>\n<polygon fill=\"#FFFFFF\" points=\"122.8,202.8 120.9,208.8 124.8,208.8 \"/>\n<path fill=\"#FFFFFF\" d=\"M410.1,204.8c0.3-0.3,0.5-0.7,0.5-1.3c0-0.7-0.2-1-0.5-1.5c-0.3-0.3-0.9-0.3-1.8-0.3h-3v3.6h3.2\n\tC409.2,205.4,409.8,205.2,410.1,204.8z\"/>\n<path fill=\"#FFFFFF\" d=\"M408.5,208.7h-3.3v5h3.2c0.9,0,1.6-0.2,2.1-0.5c0.5-0.3,0.7-1,0.7-1.8c0-0.9-0.2-1.5-0.5-2\n\tC410.2,208.8,409.6,208.7,408.5,208.7z\"/>\n<rect x=\"75.5\" y=\"190.3\" transform=\"matrix(-0.4514 0.8923 -0.8923 -0.4514 290.9554 206.6756)\" fill=\"#F9EBA7\" width=\"12.8\" height=\"5\"/>\n<rect x=\"100\" y=\"202.6\" transform=\"matrix(-0.4514 0.8923 -0.8923 -0.4514 337.565 202.7501)\" fill=\"#F9EBA7\" width=\"12.8\" height=\"5\"/>\n<rect x=\"53.5\" y=\"233.5\" transform=\"matrix(-0.4514 0.8923 -0.8923 -0.4514 297.6011 288.9738)\" fill=\"#F9EBA7\" width=\"12.8\" height=\"5\"/>\n<rect x=\"78.2\" y=\"245.9\" transform=\"matrix(-0.4514 0.8923 -0.8923 -0.4514 344.3886 285.0334)\" fill=\"#F9EBA7\" width=\"12.8\" height=\"5\"/>\n<path id=\"BTN_A_BOX\" fill=\"#BDD1CF\" d=\"M90.1,244.3l-29.7-15.1c-0.9-0.5-1.3-1.6-0.9-2.7l15.1-30.1c0.5-0.9,1.6-1.3,2.7-0.9\n\tl29.7,15.1c0.9,0.5,1.3,1.6,0.9,2.7l-15.1,30.2C92.2,244.3,91,244.8,90.1,244.3z\"/>\n<circle id=\"BTN_A\" fill=\"#42767F\" cx=\"83.8\" cy=\"220\" r=\"11.6\"/>\n<circle fill=\"#1D1D1B\" cx=\"77.7\" cy=\"201.5\" r=\"3.9\"/>\n<circle fill=\"#1D1D1B\" cx=\"102.1\" cy=\"214\" r=\"3.9\"/>\n<circle fill=\"#1D1D1B\" cx=\"65.3\" cy=\"225.8\" r=\"3.9\"/>\n<circle fill=\"#1D1D1B\" cx=\"89.8\" cy=\"238.3\" r=\"3.9\"/>\n<rect x=\"423.2\" y=\"198.5\" transform=\"matrix(-0.8998 0.4362 -0.4362 -0.8998 898.2063 203.5292)\" fill=\"#F9EBA7\" width=\"5\" height=\"12.8\"/>\n<rect x=\"447.9\" y=\"186.5\" transform=\"matrix(-0.8998 0.4362 -0.4362 -0.8998 939.8604 170.0185)\" fill=\"#F9EBA7\" width=\"5\" height=\"12.8\"/>\n<rect x=\"444.3\" y=\"242.1\" transform=\"matrix(-0.8998 0.4362 -0.4362 -0.8998 957.366 277.2607)\" fill=\"#F9EBA7\" width=\"5\" height=\"12.8\"/>\n<rect x=\"469\" y=\"230\" transform=\"matrix(-0.8998 0.4362 -0.4362 -0.8998 998.9489 243.5197)\" fill=\"#F9EBA7\" width=\"5\" height=\"12.8\"/>\n<path id=\"BTN_B_BOX\" fill=\"#BDD1CF\" d=\"M471.6,229.7l-30.1,14.6c-0.9,0.5-2.1,0-2.5-0.9l-14.7-30.3c-0.5-0.9,0-2.1,0.9-2.5\n\tl30.1-14.6c0.9-0.5,2.1,0,2.5,0.9l14.7,30.3C473.1,227.9,472.8,229.2,471.6,229.7z\"/>\n<circle id=\"BTN_B\" fill=\"#BC1254\" cx=\"448.5\" cy=\"220\" r=\"11.6\"/>\n<circle fill=\"#1D1D1B\" cx=\"430\" cy=\"213.5\" r=\"3.9\"/>\n<circle fill=\"#1D1D1B\" cx=\"454.8\" cy=\"201.6\" r=\"3.9\"/>\n<circle fill=\"#1D1D1B\" cx=\"442\" cy=\"238.3\" r=\"3.9\"/>\n<circle fill=\"#1D1D1B\" cx=\"466.8\" cy=\"226.2\" r=\"3.9\"/>\n<polygon fill=\"#FFFFFF\" points=\"139,280.5 123.8,280.5 123.8,278.8 138.4,278.8 139.4,277.4 139.4,255.8 141.4,255.8 141.4,278.3 \n\t\"/>\n<polygon fill=\"#FFFFFF\" points=\"265.5,108.8 258.6,108.8 258.6,106.9 264.6,106.9 265.9,105.7 265.9,95.9 267.6,95.9 267.6,106.5 \n\t\"/>\n<polygon fill=\"#FFFFFF\" points=\"339.1,73.8 328.1,73.8 328.1,75.7 338.5,75.7 339.6,76.8 339.6,100.9 338.5,102.2 337.3,102.2 \n\t337.3,104 339.1,104 341.5,101.7 341.5,76.1 \"/>\n<polygon fill=\"#FFFFFF\" points=\"305.8,322.6 277.3,322.6 277.3,320.9 305.2,320.9 306.4,319.6 306.4,301.2 305.2,300 302,300 \n\t302,298.2 305.8,298.2 308.2,300.6 308.2,320.6 \"/>\n<polygon fill=\"#FFFFFF\" points=\"412.1,279.8 367.8,279.8 367.8,277.9 412.3,277.9 \"/>\n<polygon fill=\"#FFFFFF\" points=\"201.2,352.9 222.7,374.6 228.9,374.6 228.9,372.8 223.5,372.8 202.4,351.6 \"/>\n<polygon fill=\"#FFFFFF\" points=\"406.3,386.2 390.3,402.3 368.3,402.5 368.3,400.7 389.6,400.7 404.3,385.5 \"/>\n<path id=\"C_GND1\" fill=\"#EFDA48\" d=\"M165.3,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC170.3,436.8,167.9,434.6,165.3,434.6z M165.3,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.5,0,2.5,1,2.5,2.5\n\tS166.6,441.9,165.3,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"165.3\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P0\" fill=\"#EFDA48\" d=\"M182.2,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1\n\tC187.5,436.8,185.1,434.6,182.2,434.6z M182.2,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tS183.6,441.9,182.2,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"182.2\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P2\" fill=\"#EFDA48\" d=\"M199.3,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC204.5,436.8,202.2,434.6,199.3,434.6z M199.3,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tS200.7,441.9,199.3,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"199.3\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P4\" fill=\"#EFDA48\" d=\"M216.4,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC221.4,436.8,219.3,434.6,216.4,434.6z M216.4,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tS217.6,441.9,216.4,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"216.4\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P6\" fill=\"#EFDA48\" d=\"M233.5,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1\n\tC238.3,436.8,236.1,434.6,233.5,434.6z M233.5,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.5,0,2.5,1,2.5,2.5\n\tS234.7,441.9,233.5,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"233.5\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P8\" fill=\"#EFDA48\" d=\"M250.3,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC255.5,436.8,253.3,434.6,250.3,434.6z M250.3,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tS251.8,441.9,250.3,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"250.3\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_GND2\" fill=\"#EFDA48\" d=\"M267.5,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC272.6,436.8,270.2,434.6,267.5,434.6z M267.5,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tS268.9,441.9,267.5,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"267.5\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P10\" fill=\"#EFDA48\" d=\"M284.6,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1\n\tC289.7,436.8,287.4,434.6,284.6,434.6z M284.6,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tS285.8,441.9,284.6,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"284.6\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P12\" fill=\"#EFDA48\" d=\"M301.5,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC306.6,436.8,304.4,434.6,301.5,434.6z M301.5,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tS302.9,441.9,301.5,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"301.5\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P14\" fill=\"#EFDA48\" d=\"M318.7,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1\n\tC323.5,436.8,321.3,434.6,318.7,434.6z M318.7,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5S320,441.9,318.7,441.9\n\tz\"/>\n<circle fill=\"#1D1D1B\" cx=\"318.7\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P16\" fill=\"#EFDA48\" d=\"M335.4,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC340.7,436.8,338.5,434.6,335.4,434.6z M335.4,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5S337,441.9,335.4,441.9\n\tz\"/>\n<circle fill=\"#1D1D1B\" cx=\"335.4\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_P18\" fill=\"#EFDA48\" d=\"M352.7,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC357.8,436.8,355.5,434.6,352.7,434.6z M352.7,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tS354.1,441.9,352.7,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"352.7\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_VCC1\" fill=\"#EFDA48\" d=\"M369.7,434.6c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC374.6,436.8,372.5,434.6,369.7,434.6z M369.7,441.9c-1.3,0-2.5-1-2.5-2.5s1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tS370.9,441.9,369.7,441.9z\"/>\n<circle fill=\"#1D1D1B\" cx=\"369.7\" cy=\"439.6\" r=\"2.5\"/>\n<path id=\"C_VCC2\" fill=\"#EFDA48\" d=\"M165.3,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC170.4,419.7,167.9,417.4,165.3,417.4z M165.3,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.5,0,2.5,1,2.5,2.5\n\tC167.7,424,166.6,425,165.3,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"165.3\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P1\" fill=\"#EFDA48\" d=\"M182.2,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1\n\tC187.4,419.7,185.1,417.4,182.2,417.4z M182.2,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC184.7,424,183.6,425,182.2,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"182.2\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P3\" fill=\"#EFDA48\" d=\"M199.3,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC204.4,419.7,202.2,417.4,199.3,417.4z M199.3,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC201.9,424,200.7,425,199.3,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"199.3\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P5\" fill=\"#EFDA48\" d=\"M216.4,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC221.5,419.7,219.3,417.4,216.4,417.4z M216.4,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC218.7,424,217.6,425,216.4,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"216.4\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P7\" fill=\"#EFDA48\" d=\"M233.5,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1\n\tC238.6,419.7,236.1,417.4,233.5,417.4z M233.5,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.5,0,2.5,1,2.5,2.5\n\tC235.7,424,234.7,425,233.5,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"233.5\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P9\" fill=\"#EFDA48\" d=\"M250.3,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC255.4,419.7,253.3,417.4,250.3,417.4z M250.3,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC252.8,424,251.8,425,250.3,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"250.3\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_GND3\" fill=\"#EFDA48\" d=\"M267.5,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC272.6,419.7,270.2,417.4,267.5,417.4z M267.5,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC270,424,268.9,425,267.5,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"267.5\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P11\" fill=\"#EFDA48\" d=\"M284.6,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1\n\tC289.7,419.7,287.4,417.4,284.6,417.4z M284.6,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC286.9,424,285.8,425,284.6,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"284.6\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P13\" fill=\"#EFDA48\" d=\"M301.5,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC306.6,419.7,304.4,417.4,301.5,417.4z M301.5,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC303.9,424,302.9,425,301.5,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"301.5\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P15\" fill=\"#EFDA48\" d=\"M318.7,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1\n\tC323.8,419.7,321.3,417.4,318.7,417.4z M318.7,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC321,424,320,425,318.7,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"318.7\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P17\" fill=\"#EFDA48\" d=\"M335.4,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC340.6,419.7,338.5,417.4,335.4,417.4z M335.4,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC338.1,424,337,425,335.4,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"335.4\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_P19\" fill=\"#EFDA48\" d=\"M352.7,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC357.8,419.7,355.5,417.4,352.7,417.4z M352.7,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC355.2,424,354.1,425,352.7,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"352.7\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"C_GND4\" fill=\"#EFDA48\" d=\"M369.7,417.4c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tC374.8,419.7,372.5,417.4,369.7,417.4z M369.7,425c-1.3,0-2.5-1-2.5-2.5c0-1.3,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC372,424,370.9,425,369.7,425z\"/>\n<circle fill=\"#1D1D1B\" cx=\"369.7\" cy=\"422.4\" r=\"2.5\"/>\n<path id=\"M_GND1\" fill=\"#EFDA48\" d=\"M233.5,384.8c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1S236.1,384.8,233.5,384.8z\n\t M233.5,392.3c-1.3,0-2.5-1-2.5-2.5c0-1.5,1-2.5,2.5-2.5c1.5,0,2.5,1,2.5,2.5C236,391.3,234.7,392.3,233.5,392.3z\"/>\n<circle fill=\"#1D1D1B\" cx=\"233.5\" cy=\"389.7\" r=\"2.5\"/>\n<path id=\"M_OUT1\" fill=\"#EFDA48\" d=\"M250.3,384.8c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tS253.3,384.8,250.3,384.8z M250.3,392.3c-1.3,0-2.5-1-2.5-2.5c0-1.5,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC252.8,391.3,251.8,392.3,250.3,392.3z\"/>\n<circle fill=\"#1D1D1B\" cx=\"250.3\" cy=\"389.7\" r=\"2.5\"/>\n<path id=\"M_OUT2\" fill=\"#EFDA48\" d=\"M267.5,384.8c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tS270.2,384.8,267.5,384.8z M267.5,392.3c-1.3,0-2.5-1-2.5-2.5c0-1.5,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC270,391.3,268.9,392.3,267.5,392.3z\"/>\n<circle fill=\"#1D1D1B\" cx=\"267.5\" cy=\"389.7\" r=\"2.5\"/>\n<path id=\"M_GND2\" fill=\"#EFDA48\" d=\"M284.6,384.8c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1s5.1-2.3,5.1-5.1S287.4,384.8,284.6,384.8z\n\t M284.6,392.3c-1.3,0-2.5-1-2.5-2.5c0-1.5,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5C287.1,391.3,285.8,392.3,284.6,392.3z\"/>\n<circle fill=\"#1D1D1B\" cx=\"284.6\" cy=\"389.7\" r=\"2.5\"/>\n<path id=\"M_VM\" fill=\"#EFDA48\" d=\"M301.5,384.8c-2.8,0-5.1,2.3-5.1,5.1s2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1\n\tS304.4,384.8,301.5,384.8z M301.5,392.3c-1.3,0-2.5-1-2.5-2.5c0-1.5,1-2.5,2.5-2.5c1.3,0,2.5,1,2.5,2.5\n\tC304,391.3,302.9,392.3,301.5,392.3z\"/>\n<circle fill=\"#1D1D1B\" cx=\"301.5\" cy=\"389.7\" r=\"2.5\"/>\n<path id=\"EDGE_P0\" fill=\"#EFDA48\" d=\"M9.5,231.7c-2.1,0-4.2,0.2-6.2,0.6c-15.2,2.9-26.7,16.2-26.7,32.2c0,16.1,11.7,29.6,27,32.4\n\tc1.9,0.3,3.9,0.5,5.9,0.5c18.2,0,32.9-14.7,32.9-32.9C42.5,246.1,27.7,231.7,9.5,231.7z M9.5,279.9c-0.5,0-1.1,0-1.6-0.1\n\tc-0.2,0-0.5-0.1-0.7-0.1c-0.3,0-0.6-0.1-0.9-0.1c-0.2,0-0.4-0.1-0.6-0.2c-0.3-0.1-0.6-0.1-0.9-0.2c-0.1,0-0.3-0.1-0.4-0.2\n\tc-0.3-0.1-0.7-0.2-1-0.4c-0.1,0-0.1,0-0.1-0.1c-5.5-2.4-9.4-7.9-9.4-14.4c0-0.5,0-1.1,0.1-1.6c0-0.2,0.1-0.5,0.1-0.7\n\tc0-0.3,0.1-0.6,0.1-0.9c0-0.2,0.1-0.4,0.2-0.6c0.1-0.3,0.1-0.6,0.2-0.9c0-0.1,0.1-0.3,0.2-0.4c0.1-0.3,0.2-0.7,0.4-1\n\tc0-0.1,0-0.1,0.1-0.2c2.4-5.5,7.9-9.4,14.4-9.4c8.8,0,15.7,6.9,15.7,15.7S18.3,279.9,9.5,279.9z\"/>\n<circle fill=\"none\" cx=\"138\" cy=\"487.1\" r=\"15.7\"/>\n<rect id=\"LED_0_0\" x=\"210.7\" y=\"146.2\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_1_0\" x=\"236.8\" y=\"146.2\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_2_0\" x=\"262.7\" y=\"146.2\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_3_0\" x=\"288.7\" y=\"146.2\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_4_0\" x=\"314.6\" y=\"146.2\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_0_1\" x=\"210.7\" y=\"171.7\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_1_1\" x=\"236.8\" y=\"171.7\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_2_1\" x=\"262.7\" y=\"171.7\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_3_1\" x=\"288.7\" y=\"171.7\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_4_1\" x=\"314.6\" y=\"171.7\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_0_2\" x=\"210.7\" y=\"197\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_1_2\" x=\"236.8\" y=\"197\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_2_2\" x=\"262.7\" y=\"197\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_3_2\" x=\"288.7\" y=\"197\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_4_2\" x=\"314.6\" y=\"197\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_0_3\" x=\"210.7\" y=\"222.5\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_1_3\" x=\"236.8\" y=\"222.5\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_2_3\" x=\"262.7\" y=\"222.5\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_3_3\" x=\"288.7\" y=\"222.5\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_4_3\" x=\"314.6\" y=\"222.5\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_0_4\" x=\"210.7\" y=\"247.8\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_1_4\" x=\"236.8\" y=\"247.8\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_2_4\" x=\"262.7\" y=\"247.8\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_3_4\" x=\"288.7\" y=\"247.8\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"LED_4_4\" x=\"314.6\" y=\"247.8\" fill=\"#FFFFFF\" width=\"5.1\" height=\"12.9\"/>\n<rect id=\"rgbled\" x=\"254.5\" y=\"311.7\" fill=\"#FFFFFF\" width=\"25.5\" height=\"24.8\"/>\n<circle id=\"rgbledcircle\" fill=\"#BDD1CF\" cx=\"267.1\" cy=\"324\" r=\"9.6\"/>\n<rect id=\"SPKR\" x=\"408.4\" y=\"265.3\" transform=\"matrix(-0.3593 0.9332 -0.9332 -0.3593 868.265 -8.347)\" fill=\"#1D1D1B\" width=\"57.1\" height=\"57.1\"/>\n<polygon fill=\"#EFDA48\" points=\"353.4,181.9 353.4,171.1 372.8,171.1 372.8,181.9 \"/>\n<path id=\"MIC\" fill=\"#1D1D1B\" d=\"M358.4,174c-0.9,0-1.8,0.7-1.8,1.8c0,1,0.7,1.8,1.8,1.8s1.8-0.7,1.8-1.8\n\tC360.2,174.8,359.5,174,358.4,174z\"/>\n<polygon fill=\"#FFFFFF\" points=\"158.1,146.2 163.2,146.2 163.2,155.4 158.1,155.4 \"/>\n<path id=\"IF_LED\" fill=\"#BDD1CF\" d=\"M162.5,150.9c0-0.9-0.8-1.8-1.8-1.8c-0.9,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8\n\tC161.7,152.6,162.5,151.7,162.5,150.9z\"/>\n<rect x=\"175.7\" y=\"49.5\" fill=\"#FFFFFF\" width=\"9.5\" height=\"2.3\"/>\n<polygon fill=\"#FFFFFF\" points=\"350.9,49.6 350.9,45.6 348.6,45.6 348.6,49.6 344.8,49.6 344.8,51.9 348.6,51.9 348.6,56.2 \n\t350.9,56.2 350.9,51.9 354.8,51.9 354.8,49.6 \"/>\n<path fill=\"#FFFFFF\" d=\"M36.7,294.8c-0.3-0.3-0.6-0.6-1-0.7c-0.7-0.3-1.8-0.3-2.5,0c-0.4,0.2-0.7,0.4-0.9,0.7\n\tc-0.3,0.3-0.4,0.7-0.6,1.1c-0.1,0.4-0.2,0.9-0.2,1.5v2c0,0.6,0.1,1.1,0.2,1.5c0.1,0.4,0.3,0.8,0.6,1.1c0.3,0.3,0.6,0.6,1,0.7\n\tc0.4,0.2,0.8,0.2,1.3,0.2c0.5,0,0.9-0.1,1.3-0.2c0.4-0.2,0.7-0.4,0.9-0.7c0.3-0.3,0.4-0.7,0.6-1.1c0.1-0.4,0.2-0.9,0.2-1.5v-2\n\tc0-0.6-0.1-1.1-0.2-1.5C37.2,295.5,37,295.1,36.7,294.8z M35.8,296.5l-2.7,2.1v-1.5c0-0.7,0.1-1.2,0.4-1.5c0.2-0.3,0.5-0.5,1-0.5\n\tc0.4,0,0.7,0.1,0.9,0.3C35.6,295.8,35.8,296.1,35.8,296.5z M35.9,298.2v1.4c0,0.7-0.1,1.2-0.3,1.5c-0.2,0.3-0.5,0.5-1,0.5\n\tc-0.4,0-0.7-0.1-0.9-0.3c-0.2-0.2-0.3-0.5-0.4-0.9L35.9,298.2z\"/>\n<path fill=\"#FFFFFF\" d=\"M498.8,299.6c-0.1-0.2-0.1-0.4-0.3-0.6c-0.1-0.2-0.3-0.4-0.5-0.5c-0.1-0.1-0.2-0.1-0.3-0.2\n\tc0.1,0,0.1-0.1,0.2-0.1c0.2-0.2,0.3-0.3,0.4-0.5c0.1-0.2,0.2-0.4,0.3-0.6c0.1-0.2,0.1-0.4,0.1-0.6c0-0.4-0.1-0.8-0.2-1.1\n\tc-0.1-0.3-0.3-0.6-0.6-0.8c-0.2-0.2-0.5-0.4-0.9-0.5c-0.7-0.2-1.6-0.2-2.3,0c-0.3,0.1-0.7,0.3-0.9,0.5c-0.3,0.2-0.5,0.5-0.6,0.8\n\tc-0.1,0.3-0.2,0.7-0.2,1v0.3h1.6v-0.3c0-0.2,0-0.3,0.1-0.5c0.1-0.1,0.1-0.3,0.2-0.4c0.1-0.1,0.2-0.2,0.4-0.2\n\tc0.2-0.1,0.3-0.1,0.5-0.1c0.4,0,0.7,0.1,0.9,0.3c0.2,0.2,0.3,0.5,0.3,0.9c0,0.2,0,0.3-0.1,0.5c-0.1,0.1-0.1,0.3-0.3,0.4\n\tc-0.1,0.1-0.3,0.2-0.4,0.2c-0.2,0.1-0.4,0.1-0.6,0.1h-1v1.4h1c0.2,0,0.5,0,0.7,0.1c0.2,0.1,0.3,0.1,0.5,0.2c0.1,0.1,0.2,0.2,0.3,0.4\n\tc0.1,0.1,0.1,0.3,0.1,0.6c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.1,0.3-0.3,0.4c-0.1,0.1-0.2,0.2-0.4,0.2c-0.3,0.1-0.8,0.1-1.2,0\n\tc-0.2-0.1-0.3-0.1-0.4-0.2c-0.1-0.1-0.2-0.2-0.3-0.4c-0.1-0.1-0.1-0.3-0.1-0.5v-0.3H493v0.3c0,0.4,0.1,0.8,0.2,1.1\n\tc0.2,0.3,0.4,0.6,0.6,0.8c0.3,0.2,0.6,0.4,0.9,0.5c0.3,0.1,0.7,0.2,1.1,0.2c0.4,0,0.8-0.1,1.1-0.2c0.4-0.1,0.7-0.3,0.9-0.5\n\tc0.3-0.2,0.5-0.5,0.6-0.9c0.1-0.3,0.2-0.7,0.2-1.1C498.9,300.1,498.8,299.9,498.8,299.6z\"/>\n<polygon fill=\"#FFFFFF\" points=\"177.4,475.2 177.4,476.7 179.6,475.9 179.6,482.8 181.2,482.8 181.2,473.8 180.9,473.8 \"/>\n<path fill=\"#FFFFFF\" d=\"M349.5,481.4l1.8-2c0.2-0.2,0.4-0.5,0.6-0.7c0.2-0.2,0.4-0.5,0.5-0.7c0.2-0.3,0.3-0.5,0.4-0.8\n\tc0.1-0.3,0.1-0.5,0.1-0.8c0-0.4-0.1-0.7-0.2-1c-0.1-0.3-0.3-0.6-0.6-0.8c-0.2-0.2-0.5-0.4-0.9-0.5c-0.7-0.3-1.7-0.3-2.4,0\n\tc-0.4,0.1-0.7,0.4-0.9,0.6c-0.3,0.3-0.5,0.6-0.6,0.9c-0.1,0.3-0.2,0.7-0.2,1.1v0.3h1.6v-0.3c0-0.2,0-0.4,0.1-0.6\n\tc0.1-0.2,0.1-0.3,0.2-0.4c0.1-0.1,0.2-0.2,0.4-0.3c0.3-0.1,0.8-0.2,1.1,0c0.1,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.2,0.2,0.4\n\tc0.1,0.2,0.1,0.3,0.1,0.5c0,0.1,0,0.3-0.1,0.4c0,0.1-0.1,0.3-0.2,0.4c-0.1,0.2-0.2,0.3-0.4,0.6c-0.2,0.2-0.4,0.4-0.6,0.7l-2.8,3.1\n\tv1.1h6v-1.4H349.5z\"/>\n<polygon fill=\"#FFFFFF\" points=\"282.7,282 278.2,282 278.2,274.5 276.6,274.5 276.6,283.5 282.7,283.5 \"/>\n<path fill=\"#FFFFFF\" d=\"M288,274.5h-1.3l-2.9,8.9h1.6l0.7-2.2h2.4l0.7,2.2h1.6l-2.8-8.7L288,274.5z M288.2,279.8h-1.5l0.8-2.5\n\tL288.2,279.8z\"/>\n<path fill=\"#FFFFFF\" d=\"M296.1,280.5c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.4-0.3,0.5c-0.1,0.2-0.3,0.3-0.4,0.4\n\tc-0.3,0.2-0.9,0.2-1.2,0c-0.2-0.1-0.3-0.2-0.4-0.4c-0.1-0.2-0.2-0.3-0.3-0.5c-0.1-0.2-0.1-0.4-0.1-0.6l0-5.9h-1.5l0,6\n\tc0,0.4,0.1,0.8,0.2,1.2c0.1,0.4,0.3,0.7,0.6,1c0.3,0.3,0.6,0.5,0.9,0.7c0.4,0.2,0.8,0.2,1.2,0.2c0.4,0,0.8-0.1,1.2-0.2\n\ts0.7-0.4,1-0.7c0.3-0.3,0.5-0.6,0.6-1c0.1-0.4,0.2-0.8,0.2-1.2l0-5.9h-1.6L296.1,280.5z\"/>\n<polygon fill=\"#FFFFFF\" points=\"302.9,283.5 302.9,276 305.5,276 305.5,274.5 298.8,274.5 298.8,276 301.4,276 301.4,283.5 \"/>\n<path fill=\"#FFFFFF\" d=\"M309.4,283.6c0.4,0,0.7-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8c0.2-0.3,0.3-0.7,0.3-1.1\n\tc0-0.3,0-0.5-0.1-0.8c-0.1-0.2-0.2-0.4-0.3-0.6c-0.1-0.2-0.3-0.4-0.5-0.5c-0.2-0.1-0.4-0.3-0.6-0.4c-0.2-0.1-0.4-0.2-0.6-0.3\n\tc-0.2-0.1-0.4-0.2-0.6-0.2c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.4-0.2-0.5-0.3c-0.1-0.1-0.3-0.2-0.4-0.4c-0.1-0.1-0.1-0.3-0.1-0.5\n\tc0-0.2,0-0.3,0.1-0.5c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.3-0.2,0.4-0.2c0.4-0.1,0.8-0.1,1.1,0c0.2,0.1,0.3,0.2,0.4,0.3\n\tc0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2h1.6l0-0.3c0-0.4-0.1-0.8-0.3-1.2c-0.2-0.3-0.4-0.6-0.7-0.9\n\tc-0.3-0.2-0.6-0.4-1-0.6c-0.7-0.2-1.5-0.3-2.2,0c-0.4,0.1-0.7,0.3-1,0.5c-0.3,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.3,0.7-0.3,1.1\n\tc0,0.4,0.1,0.8,0.3,1.1c0.2,0.3,0.4,0.5,0.7,0.8c0.3,0.2,0.6,0.4,0.9,0.5c0.3,0.1,0.6,0.3,0.9,0.4c0.2,0.1,0.4,0.1,0.6,0.2\n\tc0.2,0.1,0.4,0.2,0.5,0.3c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.1,0.1,0.3,0.1,0.5c0,0.2,0,0.3-0.1,0.5c-0.1,0.1-0.2,0.2-0.3,0.3\n\tc-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0.1-0.8,0.1-1.2,0c-0.2-0.1-0.4-0.2-0.5-0.3c-0.1-0.1-0.3-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6\n\tl0-0.2h-1.6l0,0.3c0,0.4,0.1,0.8,0.3,1.2c0.2,0.3,0.4,0.6,0.8,0.9c0.3,0.2,0.6,0.4,1,0.5C308.6,283.5,309,283.6,309.4,283.6z\"/>\n<path fill=\"#FFFFFF\" d=\"M315.5,280.1h1.4c0.4,0,0.8-0.1,1.2-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.9\n\tc0.2-0.3,0.2-0.7,0.2-1.2c0-0.4-0.1-0.8-0.2-1.2c-0.2-0.3-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.7-0.2-1.2-0.2h-3v8.9\n\th1.6V280.1z M318,278.3c-0.1,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1h-1.4v-2.7h1.4c0.2,0,0.4,0,0.6,0.1\n\tc0.2,0.1,0.3,0.2,0.5,0.3c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.1,0.6c0,0.2,0,0.4-0.1,0.6C318.2,278.1,318.1,278.2,318,278.3z\n\t\"/>\n<path fill=\"#FFFFFF\" d=\"M322.6,280h1.2l1.6,3.3l0.1,0.1h1.5l0-0.4l-1.7-3.4c0.2-0.1,0.3-0.2,0.4-0.3c0.2-0.2,0.4-0.3,0.5-0.5\n\tc0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.1-0.5,0.1-0.8c0-0.5-0.1-0.9-0.2-1.2c-0.2-0.3-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.5\n\tc-0.4-0.1-0.8-0.2-1.2-0.2H321v8.9h1.6V280z M325.1,277.9c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.5,0.3\n\tc-0.2,0.1-0.4,0.1-0.6,0.1h-1.2v-2.7h1.1c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.5,0.3c0.1,0.1,0.2,0.2,0.3,0.4\n\tc0.1,0.2,0.1,0.4,0.1,0.6C325.2,277.5,325.2,277.7,325.1,277.9z\"/>\n<polygon fill=\"#FFFFFF\" points=\"333.7,282 329.7,282 329.7,279.6 333.2,279.6 333.2,278.1 329.7,278.1 329.7,276 333.7,276 \n\t333.7,274.5 328.1,274.5 328.1,283.5 333.7,283.5 \"/>\n<path fill=\"#FFFFFF\" d=\"M339.5,280.6c0,0.2-0.1,0.5-0.2,0.6c-0.1,0.2-0.2,0.3-0.3,0.5c-0.1,0.1-0.3,0.2-0.4,0.3\n\tc-0.3,0.1-0.9,0.2-1.2,0c-0.2-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.2-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6c-0.1-0.2-0.1-0.4-0.1-0.6\n\tc0-0.2,0-0.4,0-0.6v-1.2c0-0.2,0-0.4,0-0.6c0-0.2,0.1-0.4,0.1-0.6c0.1-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.3,0.3-0.4\n\tc0.1-0.1,0.3-0.2,0.4-0.3c0.3-0.1,0.9-0.1,1.2,0c0.2,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.3,0.3,0.5c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2\n\th1.6l0-0.3c0-0.4-0.2-0.8-0.3-1.2c-0.2-0.4-0.4-0.7-0.6-0.9c-0.3-0.3-0.6-0.5-0.9-0.6c-0.7-0.3-1.6-0.3-2.3-0.1\n\tc-0.3,0.1-0.6,0.3-0.8,0.4c-0.2,0.2-0.5,0.4-0.6,0.7c-0.2,0.3-0.3,0.5-0.4,0.8c-0.1,0.3-0.2,0.6-0.3,0.9c-0.1,0.3-0.1,0.6-0.1,1v1.2\n\tc0,0.3,0,0.6,0.1,1c0.1,0.3,0.1,0.6,0.2,0.9c0.1,0.3,0.3,0.6,0.4,0.8c0.2,0.3,0.4,0.5,0.6,0.7c0.2,0.2,0.5,0.3,0.8,0.5\n\tc0.3,0.1,0.7,0.2,1,0.2c0.4,0,0.8-0.1,1.2-0.2c0.4-0.1,0.7-0.3,0.9-0.6c0.3-0.3,0.5-0.6,0.6-0.9c0.2-0.3,0.3-0.7,0.3-1.1l0-0.3h-1.6\n\tL339.5,280.6z\"/>\n<polygon fill=\"#FFFFFF\" points=\"346.4,278.1 343.5,278.1 343.5,274.5 342,274.5 342,283.5 343.5,283.5 343.5,279.6 346.4,279.6 \n\t346.4,283.5 348,283.5 348,274.5 346.4,274.5 \"/>\n<polygon fill=\"#FFFFFF\" points=\"350.9,279.6 354.4,279.6 354.4,278.1 350.9,278.1 350.9,276 354.9,276 354.9,274.5 349.3,274.5 \n\t349.3,283.5 355,283.5 355,282 350.9,282 \"/>\n<path fill=\"#FFFFFF\" d=\"M361.2,279.4c0.2-0.2,0.4-0.3,0.6-0.5c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.1-0.5,0.1-0.8\n\tc0-0.5-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.8-0.2-1.2-0.2h-2.7v8.9h1.6V280h1.2l1.6,3.3\n\tl0.1,0.1h1.5l0-0.4l-1.7-3.4C360.9,279.6,361,279.5,361.2,279.4z M360.6,277.3c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.3-0.3,0.4\n\tc-0.1,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1H358v-2.7h1.1c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.5,0.3\n\tc0.1,0.1,0.2,0.3,0.3,0.4C360.6,276.9,360.6,277.1,360.6,277.3z\"/>\n<polygon fill=\"#FFFFFF\" points=\"50.5,274.5 48.9,274.5 48.9,283.5 54.6,283.5 54.6,282 50.5,282 \"/>\n<path fill=\"#FFFFFF\" d=\"M58.1,274.5l-2.9,8.9h1.6l0.7-2.2h2.4l0.7,2.2h1.6l-2.8-8.9H58.1z M59.5,279.8H58l0.8-2.5L59.5,279.8z\"/>\n<path fill=\"#FFFFFF\" d=\"M64.1,277.9c0-0.2,0.1-0.4,0.1-0.6c0.1-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.3,0.3-0.4\n\tc0.1-0.1,0.3-0.2,0.4-0.3c0.3-0.1,0.8-0.1,1.2,0c0.2,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2\n\th1.6l0-0.3c0-0.4-0.1-0.8-0.3-1.2c-0.2-0.3-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.6c-0.7-0.3-1.6-0.3-2.2,0\n\tc-0.3,0.1-0.6,0.3-0.8,0.5c-0.2,0.2-0.5,0.4-0.6,0.7c-0.2,0.3-0.3,0.5-0.4,0.8c-0.1,0.3-0.2,0.6-0.3,0.9c-0.1,0.3-0.1,0.6-0.1,1v1\n\tc0,0.3,0,0.7,0.1,1c0.1,0.3,0.2,0.6,0.3,0.9c0.1,0.3,0.3,0.6,0.5,0.8c0.2,0.3,0.4,0.5,0.7,0.7c0.3,0.2,0.5,0.4,0.9,0.5\n\tc0.3,0.1,0.7,0.2,1,0.2h0c0.6,0,1.1-0.1,1.6-0.3c0.5-0.2,0.9-0.6,1.3-1l0.1-0.1l0-3.4h-3.2v1.4h1.7l0,1.5c-0.1,0.1-0.1,0.1-0.2,0.2\n\tc-0.1,0.1-0.2,0.1-0.4,0.2c-0.1,0-0.3,0.1-0.4,0.1c-0.1,0-0.2,0-0.3,0l-0.1,0c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.3-0.2-0.4-0.3\n\tc-0.1-0.1-0.2-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6c-0.1-0.2-0.1-0.4-0.1-0.6c0-0.2,0-0.4-0.1-0.6v-1\n\tC64.1,278.3,64.1,278.1,64.1,277.9z M65.9,283.3L65.9,283.3L65.9,283.3L65.9,283.3z\"/>\n<polygon fill=\"#FFFFFF\" points=\"71.7,279.6 75.2,279.6 75.2,278.1 71.7,278.1 71.7,276 75.7,276 75.7,274.5 70.1,274.5 70.1,283.5 \n\t75.7,283.5 75.7,282 71.7,282 \"/>\n<path fill=\"#FFFFFF\" d=\"M82.7,279.6c-0.1-0.2-0.3-0.4-0.5-0.5c-0.2-0.1-0.4-0.3-0.6-0.4c-0.2-0.1-0.4-0.2-0.6-0.3\n\tc-0.2-0.1-0.4-0.2-0.6-0.2c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.4-0.2-0.5-0.3c-0.2-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.1-0.3-0.1-0.5\n\tc0-0.2,0-0.3,0.1-0.5c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.3-0.2,0.4-0.2c0.4-0.1,0.8-0.1,1.1,0c0.2,0.1,0.3,0.2,0.4,0.3\n\tc0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2h1.6l0-0.3c0-0.4-0.1-0.8-0.3-1.2c-0.2-0.3-0.4-0.6-0.7-0.9\n\tc-0.3-0.2-0.6-0.4-1-0.6c-0.7-0.2-1.5-0.3-2.2,0c-0.4,0.1-0.7,0.3-1,0.5c-0.3,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.3,0.7-0.3,1.1\n\tc0,0.4,0.1,0.8,0.3,1.1c0.2,0.3,0.4,0.5,0.7,0.8c0.3,0.2,0.6,0.4,0.9,0.5c0.3,0.1,0.6,0.3,0.9,0.4c0.2,0.1,0.4,0.1,0.6,0.2\n\tc0.2,0.1,0.4,0.2,0.6,0.3c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.1,0.1,0.3,0.1,0.5c0,0.2,0,0.3-0.1,0.5c-0.1,0.1-0.2,0.2-0.3,0.3\n\tc-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0.1-0.8,0.1-1.2,0c-0.2-0.1-0.4-0.1-0.5-0.3c-0.1-0.1-0.3-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6\n\tl0-0.2h-1.6l0,0.3c0,0.4,0.1,0.8,0.3,1.2c0.2,0.3,0.4,0.6,0.8,0.9c0.3,0.2,0.6,0.4,1,0.5c0.4,0.1,0.8,0.2,1.2,0.2\n\tc0.4,0,0.7-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8c0.2-0.3,0.3-0.7,0.3-1.1c0-0.3,0-0.5-0.1-0.8\n\tC82.9,280,82.8,279.8,82.7,279.6z\"/>\n<polygon fill=\"#FFFFFF\" points=\"85.8,279.6 89.3,279.6 89.3,278.1 85.8,278.1 85.8,276 89.9,276 89.9,274.5 84.2,274.5 84.2,283.5 \n\t89.9,283.5 89.9,282 85.8,282 \"/>\n<polygon fill=\"#FFFFFF\" points=\"95.4,280 92.6,274.5 91.1,274.5 91.1,283.5 92.7,283.5 92.7,278 95.5,283.5 97,283.5 97,274.5 \n\t95.4,274.5 \"/>\n<path fill=\"#FFFFFF\" d=\"M103.9,279.6c-0.1-0.2-0.3-0.4-0.5-0.5c-0.2-0.1-0.4-0.3-0.6-0.4c-0.2-0.1-0.4-0.2-0.6-0.3\n\tc-0.2-0.1-0.4-0.2-0.6-0.2c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.4-0.2-0.5-0.3c-0.1-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.1-0.3-0.1-0.5\n\tc0-0.2,0-0.3,0.1-0.5c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.3-0.2,0.4-0.2c0.4-0.1,0.8-0.1,1.1,0c0.2,0.1,0.3,0.2,0.4,0.3\n\tc0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2h1.6l0-0.3c0-0.4-0.1-0.8-0.3-1.2c-0.2-0.3-0.4-0.6-0.7-0.9\n\tc-0.3-0.2-0.6-0.4-1-0.6c-0.7-0.2-1.5-0.3-2.2,0c-0.4,0.1-0.7,0.3-1,0.5c-0.3,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.3,0.7-0.3,1.1\n\tc0,0.4,0.1,0.8,0.3,1.1c0.2,0.3,0.4,0.5,0.7,0.8c0.3,0.2,0.6,0.4,0.9,0.5c0.3,0.1,0.6,0.3,0.9,0.4c0.2,0.1,0.4,0.1,0.6,0.2\n\tc0.2,0.1,0.4,0.2,0.6,0.3c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.1,0.1,0.3,0.1,0.5c0,0.2,0,0.3-0.1,0.5c-0.1,0.1-0.2,0.2-0.3,0.3\n\tc-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0.1-0.8,0.1-1.2,0c-0.2-0.1-0.4-0.1-0.5-0.3c-0.1-0.1-0.3-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6\n\tl0-0.2H98l0,0.3c0,0.4,0.1,0.8,0.3,1.2c0.2,0.3,0.5,0.6,0.8,0.9c0.3,0.2,0.6,0.4,1,0.5c0.4,0.1,0.8,0.2,1.2,0.2\n\tc0.4,0,0.7-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8c0.2-0.3,0.3-0.7,0.3-1.1c0-0.3,0-0.5-0.1-0.8\n\tC104.2,280,104.1,279.8,103.9,279.6z\"/>\n<path fill=\"#FFFFFF\" d=\"M111.1,276.6c-0.1-0.3-0.2-0.6-0.4-0.9c-0.2-0.3-0.4-0.5-0.6-0.7c-0.2-0.2-0.5-0.4-0.8-0.5\n\tc-0.6-0.2-1.5-0.2-2.1,0c-0.3,0.1-0.6,0.3-0.8,0.5c-0.2,0.2-0.4,0.4-0.6,0.7c-0.2,0.3-0.3,0.6-0.4,0.8c-0.1,0.3-0.2,0.6-0.2,0.9\n\tc0,0.3-0.1,0.6-0.1,0.9v1c0,0.3,0,0.6,0.1,0.9c0.1,0.3,0.1,0.6,0.2,0.9c0.1,0.3,0.2,0.6,0.4,0.9c0.2,0.3,0.4,0.5,0.6,0.7\n\tc0.2,0.2,0.5,0.4,0.8,0.5c0.3,0.1,0.7,0.2,1,0.2c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.8-0.5c0.2-0.2,0.4-0.4,0.6-0.7\n\tc0.2-0.3,0.3-0.6,0.4-0.8c0.1-0.3,0.2-0.6,0.2-0.9c0-0.3,0.1-0.6,0.1-0.9v-1c0-0.3,0-0.6-0.1-0.9\n\tC111.3,277.2,111.2,276.9,111.1,276.6z M109.8,278.5v1c0,0.2,0,0.4,0,0.6c0,0.2-0.1,0.4-0.1,0.6c-0.1,0.2-0.1,0.4-0.2,0.6\n\tc-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.2,0.2-0.4,0.3c-0.3,0.1-0.8,0.1-1.1,0c-0.2-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.2-0.3-0.3-0.4\n\tc-0.1-0.2-0.2-0.4-0.2-0.6c-0.1-0.2-0.1-0.4-0.1-0.6c0-0.2,0-0.4,0-0.6v-1c0-0.2,0-0.4,0-0.6c0-0.2,0.1-0.4,0.1-0.6\n\tc0-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.3,0.3-0.4c0.1-0.1,0.3-0.2,0.4-0.3c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1\n\tc0.2,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.2,0.4,0.2,0.6c0.1,0.2,0.1,0.4,0.1,0.6\n\tC109.8,278.1,109.8,278.3,109.8,278.5z\"/>\n<path fill=\"#FFFFFF\" d=\"M117.3,279.4c0.2-0.2,0.4-0.3,0.5-0.5c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.1-0.5,0.1-0.8\n\tc0-0.5-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.8-0.2-1.2-0.2h-2.7v8.9h1.6V280h1.2l1.6,3.4\n\th1.5l0-0.4l-1.7-3.4C117.1,279.6,117.2,279.5,117.3,279.4z M116.8,277.3c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.3-0.3,0.4\n\tc-0.1,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1h-1.2v-2.7h1.1c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.5,0.3\n\tc0.1,0.1,0.2,0.2,0.3,0.4C116.7,276.9,116.8,277.1,116.8,277.3z\"/>\n<path fill=\"#FFFFFF\" d=\"M239.4,369.8c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.8-0.2-1.2-0.2h-3v8.9h1.6v-3.4h1.4c0.4,0,0.8-0.1,1.2-0.2\n\tc0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.9c0.2-0.3,0.2-0.7,0.2-1.2c0-0.4-0.1-0.8-0.2-1.2C239.9,370.3,239.7,370,239.4,369.8z\n\t M238.7,371.9c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1h-1.4v-2.7h1.4\n\tc0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.2,0.5,0.3c0.1,0.1,0.2,0.3,0.3,0.4C238.7,371.5,238.7,371.7,238.7,371.9z\"/>\n<path fill=\"#FFFFFF\" d=\"M246.1,373.9c0.2-0.2,0.4-0.3,0.6-0.5c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.1-0.5,0.1-0.8\n\tc0-0.5-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.8-0.2-1.2-0.2h-2.7v8.9h1.6v-3.4h1.2l1.6,3.4\n\th1.5l0-0.4l-1.7-3.4C245.8,374.1,246,374,246.1,373.9z M245.6,371.8c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.3-0.3,0.4\n\tc-0.1,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1h-1.2v-2.7h1.1c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.5,0.3\n\tc0.1,0.1,0.2,0.3,0.3,0.4C245.5,371.4,245.6,371.6,245.6,371.8z\"/>\n<path fill=\"#FFFFFF\" d=\"M254,371.2c-0.1-0.3-0.2-0.6-0.4-0.8c-0.2-0.3-0.4-0.5-0.6-0.7c-0.2-0.2-0.5-0.4-0.8-0.5\n\tc-0.6-0.2-1.4-0.2-2.1,0c-0.3,0.1-0.6,0.3-0.8,0.5c-0.2,0.2-0.4,0.4-0.6,0.7c-0.2,0.3-0.3,0.6-0.4,0.8c-0.1,0.3-0.2,0.6-0.2,0.9\n\tc0,0.3-0.1,0.6-0.1,0.9v1c0,0.3,0,0.6,0.1,0.9c0.1,0.3,0.1,0.6,0.2,0.9c0.1,0.3,0.2,0.6,0.4,0.9c0.2,0.3,0.4,0.5,0.6,0.7\n\tc0.2,0.2,0.5,0.4,0.8,0.5c0.3,0.1,0.7,0.2,1,0.2c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.8-0.5c0.2-0.2,0.4-0.4,0.6-0.7\n\tc0.2-0.3,0.3-0.6,0.4-0.8c0.1-0.3,0.2-0.6,0.2-0.9c0.1-0.3,0.1-0.6,0.1-0.9v-1c0-0.3,0-0.6-0.1-0.9\n\tC254.2,371.8,254.2,371.5,254,371.2z M252.8,373v1c0,0.2,0,0.4,0,0.6c0,0.2-0.1,0.4-0.1,0.6c-0.1,0.2-0.1,0.4-0.2,0.6\n\tc-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.4,0.3c-0.3,0.1-0.8,0.1-1.1,0c-0.2-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.2-0.3-0.3-0.5\n\tc-0.1-0.2-0.2-0.4-0.2-0.6c-0.1-0.2-0.1-0.4-0.1-0.6c0-0.2,0-0.4,0-0.6v-1c0-0.2,0-0.4,0-0.6c0-0.2,0.1-0.4,0.1-0.6\n\tc0-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.3,0.3-0.4c0.1-0.1,0.2-0.2,0.4-0.3c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1\n\tc0.2,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.2,0.4,0.2,0.6c0.1,0.2,0.1,0.4,0.1,0.6\n\tC252.8,372.7,252.8,372.9,252.8,373z\"/>\n<polygon fill=\"#FFFFFF\" points=\"261,370.3 261.1,370.2 261,369.1 255.2,369.1 255.2,370.5 259.1,370.5 255.2,376.8 255.1,376.8 \n\t255.1,378 261.2,378 261.2,376.6 257.1,376.6 \"/>\n<polygon fill=\"#FFFFFF\" points=\"264.2,374.1 267.7,374.1 267.7,372.7 264.2,372.7 264.2,370.5 268.2,370.5 268.2,369.1 262.6,369.1 \n\t262.6,378 268.3,378 268.3,376.6 264.2,376.6 \"/>\n<path fill=\"#FFFFFF\" d=\"M275.2,374.2c-0.1-0.2-0.3-0.4-0.5-0.5c-0.2-0.1-0.4-0.3-0.6-0.4c-0.2-0.1-0.4-0.2-0.6-0.3\n\tc-0.2-0.1-0.4-0.2-0.6-0.2c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.4-0.2-0.5-0.3c-0.1-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.1-0.3-0.1-0.5\n\tc0-0.2,0-0.3,0.1-0.5c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.3-0.2,0.4-0.2c0.4-0.1,0.8-0.1,1.1,0c0.2,0.1,0.3,0.2,0.4,0.3\n\tc0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2h1.6l0-0.3c0-0.4-0.1-0.8-0.3-1.2c-0.2-0.3-0.4-0.6-0.7-0.9\n\tc-0.3-0.2-0.6-0.4-1-0.6c-0.7-0.2-1.5-0.3-2.2,0c-0.4,0.1-0.7,0.3-1,0.5c-0.3,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.3,0.7-0.3,1.1\n\tc0,0.4,0.1,0.8,0.3,1.1c0.2,0.3,0.4,0.5,0.7,0.8c0.3,0.2,0.6,0.4,0.9,0.5c0.3,0.1,0.6,0.3,0.9,0.4c0.2,0.1,0.4,0.1,0.6,0.2\n\tc0.2,0.1,0.4,0.2,0.6,0.3c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.1,0.1,0.3,0.1,0.5c0,0.2,0,0.3-0.1,0.5c-0.1,0.1-0.2,0.2-0.3,0.3\n\tc-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0.1-0.8,0.1-1.2,0c-0.2-0.1-0.4-0.1-0.5-0.3c-0.1-0.1-0.3-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6\n\tl0-0.2h-1.6l0,0.3c0,0.4,0.1,0.8,0.3,1.2c0.2,0.3,0.5,0.6,0.8,0.9c0.3,0.2,0.7,0.4,1,0.5c0.4,0.1,0.8,0.2,1.2,0.2\n\tc0.4,0,0.7-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8c0.2-0.3,0.3-0.7,0.3-1.1c0-0.3,0-0.5-0.1-0.8\n\tC275.5,374.6,275.3,374.4,275.2,374.2z\"/>\n<path fill=\"#FFFFFF\" d=\"M282.3,374.2c-0.1-0.2-0.3-0.4-0.5-0.5c-0.2-0.1-0.4-0.3-0.6-0.4c-0.2-0.1-0.4-0.2-0.6-0.3\n\tc-0.2-0.1-0.4-0.2-0.6-0.2c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.4-0.2-0.5-0.3c-0.1-0.1-0.3-0.2-0.4-0.4c-0.1-0.1-0.1-0.3-0.1-0.5\n\tc0-0.2,0-0.3,0.1-0.5c0.1-0.1,0.2-0.3,0.3-0.3c0.1-0.1,0.3-0.2,0.4-0.2c0.4-0.1,0.8-0.1,1.1,0c0.2,0.1,0.3,0.2,0.4,0.3\n\tc0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2h1.6l0-0.3c0-0.4-0.1-0.8-0.3-1.2c-0.2-0.3-0.4-0.6-0.7-0.9\n\tc-0.3-0.2-0.6-0.4-1-0.6c-0.7-0.2-1.5-0.3-2.2,0c-0.4,0.1-0.7,0.3-1,0.5c-0.3,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.3,0.7-0.3,1.1\n\tc0,0.4,0.1,0.8,0.3,1.1c0.2,0.3,0.4,0.5,0.7,0.8c0.3,0.2,0.6,0.4,0.9,0.5c0.3,0.1,0.6,0.3,0.9,0.4c0.2,0.1,0.4,0.1,0.6,0.2\n\tc0.2,0.1,0.4,0.2,0.6,0.3c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.1,0.1,0.3,0.1,0.5c0,0.2,0,0.3-0.1,0.5c-0.1,0.1-0.2,0.2-0.3,0.3\n\tc-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0.1-0.8,0.1-1.2,0c-0.2-0.1-0.3-0.1-0.5-0.3c-0.1-0.1-0.3-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6\n\tl0-0.2h-1.6l0,0.3c0,0.4,0.1,0.8,0.3,1.2c0.2,0.3,0.4,0.6,0.8,0.9c0.3,0.2,0.7,0.4,1,0.5c0.4,0.1,0.8,0.2,1.2,0.2\n\tc0.4,0,0.7-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8c0.2-0.3,0.3-0.7,0.3-1.1c0-0.3,0-0.5-0.1-0.8\n\tC282.5,374.6,282.4,374.4,282.3,374.2z\"/>\n<path fill=\"#FFFFFF\" d=\"M289.5,371.2c-0.1-0.3-0.3-0.6-0.4-0.8c-0.2-0.3-0.4-0.5-0.6-0.7c-0.2-0.2-0.5-0.4-0.8-0.5\n\tc-0.6-0.2-1.4-0.2-2.1,0c-0.3,0.1-0.6,0.3-0.8,0.5c-0.2,0.2-0.4,0.4-0.6,0.7c-0.2,0.3-0.3,0.6-0.4,0.8c-0.1,0.3-0.2,0.6-0.2,0.9\n\tc-0.1,0.3-0.1,0.6-0.1,0.9v1c0,0.3,0,0.6,0.1,0.9c0.1,0.3,0.1,0.6,0.2,0.9c0.1,0.3,0.2,0.6,0.4,0.8c0.2,0.3,0.4,0.5,0.6,0.7\n\tc0.2,0.2,0.5,0.4,0.8,0.5c0.3,0.1,0.7,0.2,1,0.2c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.8-0.5c0.2-0.2,0.4-0.4,0.6-0.7\n\tc0.2-0.3,0.3-0.6,0.4-0.8c0.1-0.3,0.2-0.6,0.2-0.9c0.1-0.3,0.1-0.6,0.1-0.9v-1c0-0.3,0-0.6-0.1-0.9\n\tC289.7,371.8,289.6,371.5,289.5,371.2z M288.2,373v1c0,0.2,0,0.4,0,0.6c0,0.2-0.1,0.4-0.1,0.6c-0.1,0.2-0.1,0.4-0.2,0.6\n\tc-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.4,0.3c-0.3,0.1-0.8,0.1-1.1,0c-0.2-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.2-0.3-0.3-0.5\n\tc-0.1-0.2-0.2-0.4-0.2-0.6c-0.1-0.2-0.1-0.4-0.1-0.6c0-0.2,0-0.4,0-0.6v-1c0-0.2,0-0.4,0-0.6c0-0.2,0.1-0.4,0.1-0.6\n\tc0-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.3,0.3-0.4c0.1-0.1,0.3-0.2,0.4-0.3c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1\n\tc0.2,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.2,0.4,0.2,0.6c0.1,0.2,0.1,0.4,0.1,0.6\n\tC288.2,372.7,288.2,372.9,288.2,373z\"/>\n<path fill=\"#FFFFFF\" d=\"M295.7,373.9c0.2-0.2,0.4-0.3,0.6-0.5c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.1-0.5,0.1-0.8\n\tc0-0.5-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.8-0.2-1.2-0.2h-2.7v8.9h1.6v-3.4h1.2l1.6,3.3\n\tl0.1,0.1h1.5l0-0.4l-1.7-3.4C295.4,374.1,295.6,374,295.7,373.9z M295.2,371.8c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.3-0.3,0.4\n\tc-0.1,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1h-1.2v-2.7h1.1c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.5,0.3\n\tc0.1,0.1,0.2,0.2,0.3,0.4C295.1,371.4,295.2,371.6,295.2,371.8z\"/>\n<path fill=\"#FFFFFF\" d=\"M239.2,103.5h-1.6l0,5.9c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.4-0.3,0.5c-0.1,0.2-0.3,0.3-0.4,0.4\n\tc-0.3,0.2-0.9,0.2-1.2,0c-0.2-0.1-0.3-0.2-0.4-0.4c-0.1-0.2-0.2-0.3-0.3-0.5c-0.1-0.2-0.1-0.4-0.1-0.6l0-5.9h-1.5l0,6\n\tc0,0.4,0.1,0.8,0.2,1.2c0.1,0.4,0.4,0.7,0.6,1c0.3,0.3,0.6,0.5,0.9,0.7c0.4,0.2,0.8,0.2,1.2,0.2c0.4,0,0.8-0.1,1.2-0.2\n\tc0.4-0.2,0.7-0.4,1-0.7c0.3-0.3,0.5-0.6,0.6-1c0.1-0.4,0.2-0.8,0.2-1.2L239.2,103.5z\"/>\n<path fill=\"#FFFFFF\" d=\"M246.5,110c0-0.3,0-0.5-0.1-0.8c-0.1-0.2-0.2-0.4-0.3-0.6c-0.1-0.2-0.3-0.4-0.5-0.5\n\tc-0.2-0.1-0.4-0.3-0.6-0.4c-0.2-0.1-0.4-0.2-0.6-0.3c-0.2-0.1-0.4-0.2-0.6-0.2c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.4-0.2-0.5-0.3\n\tc-0.1-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.1-0.3-0.1-0.5c0-0.2,0-0.3,0.1-0.5c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.3-0.2,0.4-0.2\n\tc0.4-0.1,0.8-0.1,1.1,0c0.2,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2h1.6l0-0.3\n\tc0-0.4-0.1-0.8-0.3-1.2c-0.2-0.3-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.6c-0.7-0.2-1.5-0.3-2.2,0c-0.4,0.1-0.7,0.3-1,0.5\n\tc-0.3,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.3,0.7-0.3,1.1c0,0.4,0.1,0.8,0.3,1.1c0.2,0.3,0.4,0.6,0.7,0.8c0.3,0.2,0.6,0.4,0.9,0.5\n\tc0.3,0.1,0.6,0.3,0.9,0.4c0.2,0.1,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.2,0.6,0.3c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.1,0.1,0.3,0.1,0.5\n\tc0,0.2,0,0.3-0.1,0.5c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0.1-0.8,0.1-1.2,0c-0.2-0.1-0.4-0.1-0.5-0.3\n\tc-0.1-0.1-0.3-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6l0-0.2h-1.6l0,0.3c0,0.4,0.1,0.8,0.3,1.2c0.2,0.3,0.4,0.6,0.8,0.9\n\tc0.3,0.2,0.7,0.4,1,0.5c0.4,0.1,0.8,0.2,1.2,0.2c0.4,0,0.7-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8\n\tC246.4,110.8,246.5,110.5,246.5,110z\"/>\n<path fill=\"#FFFFFF\" d=\"M250.5,112.4c0.4,0,0.8-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8c0.2-0.3,0.3-0.7,0.3-1.2\n\tc0-0.3,0-0.5-0.1-0.8c-0.1-0.2-0.2-0.5-0.4-0.7c-0.2-0.2-0.3-0.4-0.5-0.5c0,0-0.1-0.1-0.1-0.1c0,0,0,0,0,0c0.2-0.1,0.3-0.3,0.5-0.4\n\tc0.1-0.2,0.2-0.4,0.3-0.6c0.1-0.2,0.1-0.4,0.1-0.7c0-0.4-0.1-0.8-0.3-1.1c-0.2-0.3-0.4-0.6-0.7-0.8c-0.3-0.2-0.6-0.3-1-0.4\n\tc-0.4-0.1-0.7-0.1-1.1-0.1h-2.8v8.9H250.5L250.5,112.4z M249.2,108.5h1.4c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.4,0.2\n\tc0.1,0.1,0.2,0.2,0.3,0.4c0.1,0.2,0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.5c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.5,0.3\n\tc-0.2,0.1-0.3,0.1-0.5,0.1h-1.4V108.5z M251.6,106.5c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.2c-0.2,0.1-0.3,0.1-0.5,0.1\n\th-1.2V105h1.2c0.2,0,0.4,0,0.5,0.1c0.2,0,0.3,0.1,0.4,0.2c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.1,0.3,0.1,0.5\n\tC251.7,106.2,251.7,106.3,251.6,106.5z\"/>\n<path fill=\"#FFFFFF\" d=\"M307.2,103.6c0.2-0.2,0.4-0.3,0.5-0.5c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.1-0.5,0.1-0.8\n\tc0-0.5-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.8-0.2-1.2-0.2h-2.7v8.9h1.6v-3.4h1.2l1.6,3.3\n\tl0.1,0.1h1.5l0-0.4l-1.7-3.4C306.9,103.7,307,103.7,307.2,103.6z M306.6,101.5c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.3-0.3,0.4\n\tc-0.1,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1H304v-2.7h1.1c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.5,0.3\n\tc0.1,0.1,0.2,0.2,0.3,0.4C306.6,101,306.6,101.2,306.6,101.5z\"/>\n<polygon fill=\"#FFFFFF\" points=\"315.2,106.2 311.1,106.2 311.1,103.7 314.6,103.7 314.6,102.3 311.1,102.3 311.1,100.1 315.1,100.1 \n\t315.1,98.7 309.5,98.7 309.5,107.6 315.2,107.6 \"/>\n<path fill=\"#FFFFFF\" d=\"M320,106c-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0.1-0.8,0.1-1.2,0c-0.2-0.1-0.4-0.2-0.5-0.3\n\tc-0.1-0.1-0.3-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6l0-0.2h-1.6l0,0.3c0,0.4,0.1,0.8,0.3,1.2c0.2,0.3,0.4,0.6,0.8,0.9\n\tc0.3,0.2,0.7,0.4,1,0.5c0.4,0.1,0.8,0.2,1.2,0.2c0.3,0,0.7-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8\n\tc0.2-0.3,0.3-0.7,0.3-1.1c0-0.3,0-0.5-0.1-0.8c-0.1-0.2-0.2-0.4-0.3-0.6c-0.1-0.2-0.3-0.4-0.5-0.5c-0.2-0.1-0.4-0.3-0.6-0.4\n\tc-0.2-0.1-0.4-0.2-0.6-0.3c-0.2-0.1-0.4-0.2-0.6-0.2c-0.2-0.1-0.4-0.1-0.6-0.2c-0.2-0.1-0.4-0.2-0.5-0.3c-0.2-0.1-0.3-0.2-0.4-0.4\n\tc-0.1-0.1-0.1-0.3-0.1-0.5c0-0.2,0-0.3,0.1-0.5c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.3-0.2,0.4-0.2c0.4-0.1,0.8-0.1,1.1,0\n\tc0.2,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2h1.6l0-0.3c0-0.4-0.1-0.8-0.3-1.2\n\tc-0.2-0.3-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.6c-0.7-0.2-1.5-0.3-2.2,0c-0.4,0.1-0.7,0.3-1,0.5c-0.3,0.2-0.5,0.5-0.7,0.8\n\tc-0.2,0.3-0.3,0.7-0.3,1.1c0,0.4,0.1,0.8,0.3,1.1c0.2,0.3,0.4,0.5,0.7,0.8c0.3,0.2,0.6,0.4,0.9,0.5c0.3,0.1,0.6,0.3,0.9,0.4\n\tc0.2,0.1,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.2,0.6,0.3c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.1,0.1,0.3,0.1,0.5c0,0.2,0,0.3-0.1,0.5\n\tC320.2,105.8,320.1,105.9,320,106z\"/>\n<polygon fill=\"#FFFFFF\" points=\"328.7,106.2 324.6,106.2 324.6,103.7 328.1,103.7 328.1,102.3 324.6,102.3 324.6,100.1 328.7,100.1 \n\t328.7,98.7 323,98.7 323,107.6 328.7,107.6 \"/>\n<polygon fill=\"#FFFFFF\" points=\"332.1,107.6 333.7,107.6 333.7,100.1 336.3,100.1 336.3,98.7 329.5,98.7 329.5,100.1 332.1,100.1 \n\t\"/>\n<path fill=\"#FFFFFF\" d=\"M134.3,157.5l-2.8,8.8h1.6l0.7-2.1h2.4l0.7,2.1h1.6l-2.8-8.8H134.3z M135.6,162.7h-1.5l0.7-2.4L135.6,162.7z\n\t\"/>\n<path fill=\"#FFFFFF\" d=\"M145.3,158.3c-0.3-0.3-0.6-0.6-0.9-0.7c-0.7-0.3-1.7-0.3-2.5,0c-0.4,0.2-0.7,0.4-0.9,0.7\n\tc-0.3,0.3-0.4,0.7-0.6,1.1c-0.1,0.4-0.2,0.9-0.2,1.5v1.9c0,0.6,0.1,1,0.2,1.5c0.1,0.4,0.3,0.8,0.6,1.1c0.3,0.3,0.6,0.5,0.9,0.7\n\tc0.4,0.2,0.8,0.2,1.2,0.2c0.5,0,0.9-0.1,1.2-0.2c0.4-0.2,0.7-0.4,0.9-0.7c0.2-0.3,0.4-0.7,0.6-1.1c0.1-0.4,0.2-0.9,0.2-1.5v-1.9\n\tc0-0.5-0.1-1-0.2-1.5C145.7,159,145.6,158.6,145.3,158.3z M144.4,160.1l-2.7,2.1v-1.4c0-0.7,0.1-1.2,0.3-1.5c0.2-0.3,0.5-0.4,1-0.4\n\tc0.4,0,0.7,0.1,0.9,0.3C144.3,159.3,144.4,159.7,144.4,160.1z M144.5,161.7v1.4c0,0.7-0.1,1.2-0.3,1.5c-0.2,0.3-0.5,0.5-1,0.5\n\tc-0.4,0-0.7-0.1-0.9-0.3c-0.2-0.2-0.3-0.5-0.4-0.9L144.5,161.7z\"/>\n<path fill=\"#FFFFFF\" d=\"M387.6,166.2h1.6l-2.7-8.6l-0.1-0.2h-1.3l-2.8,8.8h1.6l0.7-2.1h2.4L387.6,166.2z M386.5,162.6H385l0.7-2.4\n\tL386.5,162.6z\"/>\n<polygon fill=\"#FFFFFF\" points=\"393.4,166.2 395,166.2 395,157.4 394.7,157.4 391.2,158.7 391.2,160.2 393.4,159.4 \"/>\n<path fill=\"#FFFFFF\" d=\"M314.5,402.4c-0.2-0.2-0.3-0.4-0.5-0.5c0,0-0.1-0.1-0.1-0.1c0,0,0,0,0,0c0.2-0.1,0.3-0.3,0.5-0.4\n\tc0.1-0.2,0.2-0.4,0.3-0.6c0.1-0.2,0.1-0.4,0.1-0.7c0-0.4-0.1-0.8-0.3-1.1c-0.2-0.3-0.4-0.6-0.7-0.8c-0.3-0.2-0.6-0.3-1-0.4\n\tc-0.4-0.1-0.7-0.1-1.1-0.1H309v8.9h3c0.4,0,0.8-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8c0.2-0.3,0.3-0.7,0.3-1.2\n\tc0-0.3,0-0.5-0.1-0.8C314.8,402.8,314.7,402.6,314.5,402.4z M310.6,402.6h1.4c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.4,0.2\n\tc0.1,0.1,0.2,0.2,0.3,0.4c0.1,0.2,0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.5c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.5,0.3\n\tc-0.2,0.1-0.4,0.1-0.5,0.1h-1.4V402.6z M313.1,400.5c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.2c-0.2,0.1-0.3,0.1-0.5,0.1\n\th-1.2V399h1.2c0.2,0,0.4,0,0.5,0.1c0.2,0,0.3,0.1,0.4,0.2c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.1,0.3,0.1,0.5\n\tC313.2,400.2,313.2,400.4,313.1,400.5z\"/>\n<path fill=\"#FFFFFF\" d=\"M319.7,397.6h-1.3l-2.9,8.9h1.6l0.7-2.2h2.4l0.7,2.2h1.6l-2.8-8.7L319.7,397.6z M319.8,402.9h-1.5l0.8-2.5\n\tL319.8,402.9z\"/>\n<polygon fill=\"#FFFFFF\" points=\"322.7,399 325.2,399 325.2,406.5 326.8,406.5 326.8,399 329.4,399 329.4,397.6 322.7,397.6 \"/>\n<polygon fill=\"#FFFFFF\" points=\"330,399 332.6,399 332.6,406.5 334.2,406.5 334.2,399 336.8,399 336.8,397.6 330,397.6 \"/>\n<polygon fill=\"#FFFFFF\" points=\"339.3,402.6 342.8,402.6 342.8,401.2 339.3,401.2 339.3,399 343.3,399 343.3,397.6 337.7,397.6 \n\t337.7,406.5 343.4,406.5 343.4,405 339.3,405 \"/>\n<path fill=\"#FFFFFF\" d=\"M349.3,406.5h1.5l0-0.4l-1.7-3.4c0.2-0.1,0.3-0.2,0.4-0.3c0.2-0.2,0.4-0.3,0.6-0.5c0.1-0.2,0.3-0.4,0.4-0.7\n\tc0.1-0.3,0.1-0.5,0.1-0.8c0-0.5-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.8-0.2-1.2-0.2h-2.7\n\tv8.9h1.6v-3.4h1.2L349.3,406.5z M348.9,400.9c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1h-1.2V399\n\th1.1c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.5,0.3c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.1,0.6\n\tC349,400.5,349,400.7,348.9,400.9z\"/>\n<polygon fill=\"#FFFFFF\" points=\"351.8,399 353.8,399 353.8,405 351.8,405 351.8,406.5 357.4,406.5 357.4,405 355.4,405 355.4,399 \n\t357.4,399 357.4,397.6 351.8,397.6 \"/>\n<polygon fill=\"#FFFFFF\" points=\"360.6,402.6 364.1,402.6 364.1,401.2 360.6,401.2 360.6,399 364.6,399 364.6,397.6 359,397.6 \n\t359,406.5 364.6,406.5 364.6,405 360.6,405 \"/>\n<path fill=\"#FFFFFF\" d=\"M256.6,303.4h1.5l0-0.4l-1.7-3.4c0.2-0.1,0.3-0.2,0.4-0.3c0.2-0.2,0.4-0.3,0.5-0.5c0.2-0.2,0.3-0.4,0.4-0.7\n\tc0.1-0.3,0.1-0.5,0.1-0.8c0-0.5-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.8-0.2-1.2-0.2h-2.7\n\tv8.9h1.6V300h1.2L256.6,303.4z M256.3,297.8c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1h-1.2v-2.7\n\th1.1c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.5,0.3c0.1,0.1,0.2,0.2,0.3,0.4c0.1,0.2,0.1,0.4,0.1,0.6\n\tC256.4,297.5,256.4,297.7,256.3,297.8z\"/>\n<path fill=\"#FFFFFF\" d=\"M262.2,303.5c0.6,0,1.1-0.1,1.6-0.3c0.5-0.2,0.9-0.6,1.3-1l0.1-0.1l0-3.4h-3.2v1.4h1.7l0,1.5\n\tc-0.1,0.1-0.1,0.1-0.2,0.2c-0.1,0.1-0.2,0.1-0.4,0.2c-0.1,0-0.3,0.1-0.4,0.1c-0.1,0-0.3,0-0.4,0c-0.2,0-0.4,0-0.6-0.1\n\tc-0.2-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.2-0.3-0.3-0.4c-0.1-0.2-0.2-0.4-0.2-0.6c-0.1-0.2-0.1-0.4-0.1-0.6c0-0.2,0-0.4-0.1-0.6v-1\n\tc0-0.2,0-0.4,0-0.6c0-0.2,0.1-0.4,0.1-0.6c0.1-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.3,0.3-0.4c0.1-0.1,0.3-0.2,0.4-0.3\n\tc0.3-0.1,0.8-0.1,1.2,0c0.2,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.3,0.3,0.4c0.1,0.2,0.1,0.4,0.2,0.6l0,0.2h1.6l0-0.3\n\tc0-0.4-0.1-0.8-0.3-1.2c-0.2-0.3-0.4-0.6-0.7-0.9c-0.3-0.2-0.6-0.4-1-0.6c-0.7-0.3-1.6-0.3-2.2,0c-0.3,0.1-0.6,0.3-0.8,0.5\n\tc-0.2,0.2-0.5,0.4-0.6,0.7c-0.2,0.3-0.3,0.5-0.4,0.8c-0.1,0.3-0.2,0.6-0.3,0.9c-0.1,0.3-0.1,0.6-0.1,1v1c0,0.3,0,0.7,0.1,1\n\tc0.1,0.3,0.2,0.7,0.3,0.9c0.1,0.3,0.3,0.6,0.5,0.8c0.2,0.3,0.4,0.5,0.7,0.7c0.3,0.2,0.5,0.4,0.9,0.5\n\tC261.5,303.5,261.8,303.5,262.2,303.5L262.2,303.5z M262.2,303.3L262.2,303.3L262.2,303.3L262.2,303.3z\"/>\n<path fill=\"#FFFFFF\" d=\"M269.2,303.4c0.4,0,0.8-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.5,0.7-0.8c0.2-0.3,0.3-0.7,0.3-1.2\n\tc0-0.3,0-0.5-0.1-0.8c-0.1-0.2-0.2-0.5-0.4-0.7c-0.2-0.2-0.3-0.4-0.5-0.5c0,0-0.1-0.1-0.1-0.1c0,0,0,0,0,0c0.2-0.1,0.3-0.3,0.5-0.4\n\tc0.1-0.2,0.2-0.4,0.3-0.6c0.1-0.2,0.1-0.4,0.1-0.7c0-0.4-0.1-0.8-0.3-1.1c-0.2-0.3-0.4-0.6-0.7-0.8c-0.3-0.2-0.6-0.3-1-0.4\n\tc-0.4-0.1-0.7-0.1-1.1-0.1h-2.8v8.9H269.2L269.2,303.4z M267.9,299.5h1.4c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.1,0.4,0.2\n\tc0.1,0.1,0.2,0.2,0.3,0.4c0.1,0.1,0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.5c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.5,0.3\n\tc-0.2,0.1-0.4,0.1-0.5,0.1h-1.4V299.5z M270.3,297.4c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.2c-0.2,0.1-0.3,0.1-0.5,0.1\n\th-1.2v-2.1h1.2c0.2,0,0.4,0,0.5,0.1c0.2,0,0.3,0.1,0.4,0.2c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.1,0.3,0.1,0.5\n\tC270.4,297.2,270.4,297.3,270.3,297.4z\"/>\n<polygon fill=\"#FFFFFF\" points=\"278.2,294.5 276.6,294.5 276.6,303.4 282.3,303.4 282.3,302 278.2,302 \"/>\n<polygon fill=\"#FFFFFF\" points=\"285.2,299.5 288.7,299.5 288.7,298.1 285.2,298.1 285.2,295.9 289.2,295.9 289.2,294.5 283.6,294.5 \n\t283.6,303.4 289.2,303.4 289.2,302 285.2,302 \"/>\n<path fill=\"#FFFFFF\" d=\"M295.6,295.7c-0.3-0.4-0.8-0.7-1.3-0.9c-0.5-0.2-1-0.3-1.7-0.3h-2.2v8.9h2.2c0.6,0,1.2-0.1,1.7-0.3\n\tc0.5-0.2,0.9-0.5,1.3-0.9c0.3-0.4,0.6-0.8,0.8-1.3c0.2-0.5,0.3-1.1,0.3-1.7v-0.6c0-0.6-0.1-1.2-0.3-1.7\n\tC296.2,296.5,296,296,295.6,295.7z M295.1,298.6v0.6c0,0.4-0.1,0.8-0.2,1.1c-0.1,0.3-0.2,0.6-0.4,0.9c-0.2,0.2-0.4,0.4-0.7,0.6\n\tc-0.3,0.1-0.6,0.2-1.1,0.2h-0.6v-6.1h0.6c0.4,0,0.8,0.1,1.1,0.2c0.3,0.1,0.5,0.3,0.7,0.6c0.2,0.2,0.3,0.5,0.4,0.9\n\tC295,297.9,295.1,298.2,295.1,298.6z\"/>\n<g>\n\t<path fill=\"#FFFFFF\" d=\"M128.3,354.3l-0.7-1.1l0.9-0.7c0.1-0.2,0.1-0.5,0-0.8c0-0.3-0.2-0.6-0.3-0.9c-0.4-0.7-0.9-1-1.6-1.1\n\t\tc-0.7-0.1-1.4,0.1-2.2,0.6l-0.3,0.2c-0.8,0.4-1.3,1-1.6,1.6c-0.3,0.6-0.2,1.3,0.1,1.9c0.2,0.3,0.4,0.6,0.6,0.8\n\t\tc0.2,0.2,0.5,0.3,0.7,0.4l1.1-0.4l0.7,1.1l-1.5,0.9c-0.5-0.1-1-0.3-1.5-0.7c-0.5-0.4-0.9-0.8-1.2-1.4c-0.6-1-0.7-2.1-0.4-3.1\n\t\tc0.3-1.1,1.1-1.9,2.2-2.6l0.3-0.1c1.1-0.6,2.2-0.8,3.3-0.6c1.1,0.2,1.9,0.9,2.5,1.9c0.3,0.6,0.5,1.2,0.6,1.8c0.1,0.6,0,1.2-0.2,1.7\n\t\tL128.3,354.3z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M124.9,358l0.4,0.5l8-1.5l0.9,1.6l-5.3,6.2l0.2,0.6l-0.9,0.5l-1.5-2.6l0.9-0.5l0.4,0.5l0.9-0.9l-1.4-2.5\n\t\tl-1.2,0.3l0.2,0.6l-0.9,0.5l-1.5-2.6L124.9,358z M128.7,359.5l1,1.8l2.2-2.4l0,0L128.7,359.5z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M128.8,367l0.9-0.5l0.6,0.7l5.5-3.2l-0.3-0.9l0.9-0.5l0.5,0.8l0.9,1.5l0.5,0.8l-0.9,0.5l-0.6-0.7l-5.4,3.1\n\t\tl1.2,2.2l1-0.5l0.7,1.2l-2.1,1.2L128.8,367z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M132.8,373.9l0.9-0.5l0.6,0.7l5.5-3.2l-0.3-0.9l0.9-0.5l0.5,0.8l0.9,1.5l0.5,0.8l-0.9,0.5l-0.6-0.7\n\t\tl-5.4,3.1l1.2,2.2l1-0.5l0.7,1.2l-2.1,1.2L132.8,373.9z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M143.6,377l0.9-0.5l1.8,3.2l-0.9,0.5l-0.6-0.7l-5.5,3.2l0.3,0.9l-0.9,0.5l-1.8-3.2l0.9-0.5l0.6,0.7l5.5-3.2\n\t\tL143.6,377z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M147.2,390c-1.1,0.6-2.2,0.9-3.3,0.6c-1.1-0.2-2-0.8-2.6-1.9c-0.6-1-0.7-2.1-0.4-3.1\n\t\tc0.4-1.1,1.1-1.9,2.2-2.6l0.1-0.1c1.1-0.6,2.2-0.9,3.3-0.7c1.1,0.2,1.9,0.8,2.5,1.9c0.6,1,0.7,2.1,0.4,3.2\n\t\tc-0.4,1.1-1.1,1.9-2.2,2.6L147.2,390z M146.4,388.4c0.8-0.5,1.3-1,1.6-1.6c0.3-0.6,0.3-1.2-0.1-1.9c-0.4-0.6-0.9-1-1.6-1\n\t\tc-0.7,0-1.4,0.2-2.2,0.6l-0.1,0.1c-0.8,0.5-1.4,1-1.7,1.6c-0.3,0.6-0.3,1.2,0.1,1.9c0.4,0.6,0.9,1,1.6,1c0.7,0,1.4-0.2,2.2-0.6\n\t\tL146.4,388.4z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M153.9,392.7c0.5,0.9,0.7,1.7,0.5,2.5c-0.2,0.8-0.6,1.4-1.3,1.8c-0.7,0.4-1.5,0.5-2.2,0.3\n\t\tc-0.7-0.2-1.4-0.8-1.9-1.7l-0.7-1.3l-1.7,1l0.3,0.9l-0.9,0.5l-1.8-3.2l0.9-0.5l0.6,0.7l5.5-3.2l-0.3-0.9l0.9-0.5l0.5,0.8\n\t\tL153.9,392.7z M149.5,393.5l0.7,1.3c0.2,0.4,0.6,0.7,0.9,0.8c0.4,0.1,0.7,0,1.1-0.2c0.4-0.2,0.6-0.5,0.7-0.9c0.1-0.4,0-0.7-0.2-1.2\n\t\tl-0.7-1.3L149.5,393.5z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M154.8,404l-1.5-2.6l-2.2,1.3l1.4,2.5l1-0.5l0.7,1.2l-2.1,1.2l-3.5-6l0.9-0.5l0.6,0.7l5.5-3.2l-0.3-0.9\n\t\tl0.9-0.5l0.5,0.8l3,5.2l-2.1,1.2l-0.7-1.2l0.9-0.6l-1.4-2.4l-1.9,1.1l1.5,2.6L154.8,404z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M113.9,357.7l-1.3,0.9c0.7,0,1.3,0.1,1.8,0.3c0.5,0.3,1,0.7,1.3,1.3c0.3,0.6,0.5,1.1,0.5,1.6\n\t\ts-0.2,1-0.6,1.4c0.6,0,1.1,0.2,1.6,0.4c0.5,0.3,0.9,0.7,1.2,1.2c0.2,0.4,0.4,0.9,0.5,1.3c0.1,0.4,0,0.9-0.1,1.3\n\t\tc-0.2,0.4-0.4,0.9-0.8,1.3c-0.4,0.4-0.9,0.8-1.6,1.2l-9.5,5.5l-1.6-2.7l9.6-5.5c0.5-0.3,0.8-0.6,0.9-1c0.1-0.3,0-0.7-0.2-1\n\t\tc-0.2-0.3-0.4-0.5-0.7-0.6c-0.3-0.1-0.6-0.1-0.9-0.1l-10.1,5.8l-1.5-2.6l9.6-5.5c0.5-0.3,0.8-0.6,0.9-0.9c0.1-0.3,0-0.7-0.2-1\n\t\tc-0.2-0.3-0.4-0.6-0.7-0.7c-0.3-0.1-0.5-0.1-0.8-0.1l-10.1,5.9l-1.6-2.7l13-7.6L113.9,357.7z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M121.9,371.5l4,7l-10.7,6.2l2.2,3.9l-2.4,1.4l-6.3-10.8l2.4-1.4l2.3,4.1l8.3-4.8l-2.3-4.1L121.9,371.5z\n\t\t M127.5,373.3c0.4-0.3,0.9-0.3,1.4-0.2c0.5,0.1,0.8,0.4,1.1,1c0.3,0.5,0.4,1,0.3,1.5s-0.4,0.8-0.9,1.1c-0.5,0.3-0.9,0.3-1.4,0.2\n\t\tc-0.5-0.1-0.8-0.5-1.2-1c-0.3-0.5-0.4-1-0.3-1.5C126.8,374,127.1,373.6,127.5,373.3z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M131.7,388.4l-1.7,1.2c0.9,0.1,1.8,0.4,2.5,0.8c0.7,0.5,1.4,1.1,1.8,1.9c0.4,0.7,0.6,1.3,0.8,2\n\t\tc0.1,0.7,0.1,1.3-0.1,1.9c-0.2,0.6-0.5,1.3-1.1,1.9c-0.5,0.6-1.2,1.2-2.2,1.7l-8.2,4.7l-1.7-2.9l8.1-4.7c0.5-0.3,1-0.6,1.2-1\n\t\ts0.5-0.7,0.6-1c0.1-0.4,0.1-0.7,0-1.1c-0.1-0.4-0.3-0.8-0.5-1.2c-0.4-0.6-0.8-1.1-1.4-1.4c-0.6-0.3-1.2-0.5-1.8-0.5l-9.4,5.4\n\t\tl-1.7-2.9l13-7.6L131.7,388.4z\"/>\n\t<path fill=\"#FFFFFF\" d=\"M138.5,400.4l4,7l-10.7,6.2l2.2,3.9l-2.4,1.4l-6.3-10.8l2.4-1.4l2.3,4.1l8.3-4.8l-2.3-4.1L138.5,400.4z\n\t\t M144.1,402.2c0.4-0.3,0.9-0.3,1.4-0.2c0.5,0.1,0.8,0.4,1.1,1c0.3,0.5,0.4,1,0.3,1.5s-0.4,0.8-0.9,1.1c-0.5,0.3-0.9,0.3-1.4,0.2\n\t\tc-0.5-0.1-0.8-0.5-1.2-1c-0.3-0.5-0.4-1-0.3-1.5C143.4,402.8,143.7,402.5,144.1,402.2z\"/>\n\t<g>\n\t\t<path fill=\"#FFFFFF\" d=\"M126.3,333.7l-3.9-6.8c-0.6-1-1.9-1.4-2.9-0.8c0,0-5.8,3.3-5.1,2.9c4.3-2.4,5.8-7.9,3.3-12.2\n\t\t\tc-2.4-4.3-7.9-5.8-12.2-3.3c-0.6,0.4-5.2,3-8.5,4.9l-12.1-5.3c-8.3-3.5-16.3,5.5-11.8,13.3l1.1,1.8c6.1-2.5,14.2-4.7,20.6-3.5\n\t\t\tl0.1,0.2l4.7,8.2c-2.2,6.1-8.3,11.7-13.6,15.7l1.5,2.6c1.6,2.9,5.3,3.9,8.2,2.3l19.9-11.3l10.1-5.7\n\t\t\tC126.5,336,126.9,334.7,126.3,333.7z M111.1,316.7l3.6,6.4l-4.3,2.5c-1.4,0.8-3.2,0.3-4-1.1l-0.8-1.3c-0.8-1.4-0.3-3.2,1.1-4\n\t\t\tL111.1,316.7z M97.7,322.3l7.2-0.3l-4.6,4.9L97.7,322.3z M100.4,327.1l6.6-1.4l-3.9,6.1L100.4,327.1z M110.2,333.2l9.5-5.4\n\t\t\tl4.4,7.7l-9.5,5.4L110.2,333.2z\"/>\n\t\t<path fill=\"#FFFFFF\" d=\"M83.6,344.8c0.6-5.8,6.4-13.5,11.2-19.9l-17,9.7L83.6,344.8z\"/>\n\t</g>\n</g>\n<circle fill=\"none\" cx=\"393.4\" cy=\"485.9\" r=\"15.7\"/>\n<circle fill=\"none\" cx=\"138\" cy=\"487.1\" r=\"15.7\"/>\n<path id=\"EDGE_P3\" fill=\"#EFDA48\" d=\"M522.4,232.8c-0.6,0-1.3-0.1-1.9-0.1c-18.2,0-32.9,14.7-32.9,32.9s14.7,32.9,32.9,32.9\n\tc0.9,0,1.8,0,2.7-0.1c16.9-1.4,30.2-15.5,30.2-32.8C553.4,248.1,539.7,233.8,522.4,232.8z M520.5,281c-8.5,0-15.6-6.8-15.7-15.6\n\tc0.1-8.6,7-15.6,15.7-15.6c8.6,0,15.6,7,15.7,15.6C536.1,274.1,529.2,281,520.5,281z\"/>\n<path id=\"EDGE_P2\" fill=\"#EFDA48\" d=\"M393.4,453c-18.2,0-32.9,14.7-32.9,32.9c0,18.2,14.7,32.9,32.9,32.9\n\tc18.2,0,32.9-14.7,32.9-32.9C426.1,467.8,411.3,453,393.4,453z M393.4,501.5c-8.6,0-15.7-6.9-15.7-15.7c0-8.6,6.9-15.7,15.7-15.7\n\tc8.6,0,15.7,6.9,15.7,15.7C408.9,494.4,401.9,501.5,393.4,501.5z\"/>\n<path id=\"EDGE_P1\" fill=\"#EFDA48\" d=\"M138,454.2c-18.2,0-32.9,14.7-32.9,32.9c0,18.2,14.7,32.9,32.9,32.9s32.9-14.7,32.9-32.9\n\tC170.9,469.1,156.1,454.2,138,454.2z M138,502.8c-8.6,0-15.7-6.9-15.7-15.7c0-8.8,6.9-15.7,15.7-15.7s15.7,6.9,15.7,15.7\n\tC153.6,495.9,146.7,502.8,138,502.8z\"/>\n<path id=\"EDGE_GND\" fill=\"#EFDA48\" d=\"M160.6,20c-6-6.2-14.4-10-23.6-10C118.7,10,104,24.7,104,42.9c0,5.8,1.5,11.2,4.1,15.9\n\tc5.6,10.2,16.4,17,28.8,17c18.2,0,32.9-14.7,32.9-32.9C169.8,34,166.3,25.9,160.6,20z M136.9,58.4c-8.7,0-15.7-7.1-15.7-15.7\n\ts6.9-15.7,15.7-15.7c8.7,0,15.7,6.9,15.7,15.7S145.5,58.4,136.9,58.4z\"/>\n</svg>\n";
        var pinNames = [
            "BTN_A", "BTN_B",
            "EDGE_P0", "EDGE_P1", "EDGE_P2", "EDGE_P3", "EDGE_GND", "EDGE_VCC",
            "C_GND1", "C_GND2", "C_GND3", "C_GND4", "C_VCC1", "C_VCC2",
            "C_P0", "C_P2", "C_P4", "C_P6", "C_P8", "C_P10", "C_P12", "C_P14", "C_P16", "C_P18",
            "C_P1", "C_P3", "C_P5", "C_P7", "C_P9", "C_P11", "C_P13", "C_P15", "C_P17", "C_P19",
            "M_GND1", "M_GND2", "M_OUT1", "M_OUT2", "M_VM",
            "G_A0_GND", "G_A0_VCC", "G_A0_SDA", "G_A0_SCL",
            "G_A1_RX", "G_A1_TX", "G_A1_VCC", "G_A1_GND"
        ];
        var pinTitles = [
            "Button A", "Button B",
            "P0", "P1, ANALOG IN", "P2, ANALOG IN", "P3", "GND", "+3v3",
            "GND", "GND", "GND", "GND", "+3v3", "+3v3",
            "C0", "C2", "C4", "C6", "C8", "C10", "C12", "C14", "C16", "C18",
            "C1", "C3", "C5", "C7", "C9", "C11", "C13", "C15", "C17", "C19",
            "GND", "GND", "MOTOR B", "MOTOR A", "MOTOR VM",
            "GND", "+3v3", "C18, I2C - SDA", "C19, I2C - SCL",
            "C16, Serial - RX", "C17, Serial - TX", "+3v3", "GND"
        ];
        var MB_WIDTH = 530;
        var MB_HEIGHT = 530;
        visuals.themes = ["#3ADCFE"].map(function (accent) {
            return {
                accent: accent,
                pin: "#EFDA48",
                pinTouched: "#FFA500",
                pinActive: "#FF5500",
                ledOn: "#ff5555",
                ledOff: "#e0e1e2",
                buttonOuter: "#979797",
                buttonUps: ["#186A8C", "#D82E50"],
                buttonDown: "#FFA500",
                virtualButtonDown: "#FFA500",
                virtualButtonOuter: "#333",
                virtualButtonUp: "#fff",
                lightLevelOn: "yellow",
                lightLevelOff: "#555"
            };
        });
        function randomTheme() {
            return visuals.themes[Math.floor(Math.random() * visuals.themes.length)];
        }
        visuals.randomTheme = randomTheme;
        var MicrobitBoardSvg = (function () {
            function MicrobitBoardSvg(props) {
                var _this = this;
                this.props = props;
                this.pinNmToCoord = {
                    "EXT_PWR": [
                        92.30997467041016,
                        -42.92474937438965
                    ],
                    "SPKR": [
                        106.44635391235352,
                        -16.370698928833008
                    ],
                    "BTN_A": [
                        93.8138427734375,
                        56.631452560424805
                    ],
                    "BTN_B": [
                        204.92835235595703,
                        56.631452560424805
                    ],
                    // rings
                    "EDGE_P0": [
                        56.002254486083984,
                        95.43130111694336
                    ],
                    "EDGE_P1": [
                        103.00893783569336,
                        175.82388305664062
                    ],
                    "EDGE_P2": [
                        195.90512084960938,
                        175.3082733154297
                    ],
                    "EDGE_P3": [
                        241.79466247558594,
                        95.3883285522461
                    ],
                    "EDGE_GND": [
                        103.00893783569336,
                        14.86682915687561
                    ],
                    "EDGE_VCC": [
                        195.64733123779297,
                        14.86682915687561
                    ],
                    "C_GND1": [
                        113.1493148803711,
                        159.83989715576172
                    ],
                    "C_GND2": [
                        150.27342987060547,
                        159.83989715576172
                    ],
                    "C_GND3": [
                        150.27342987060547,
                        153.5666275024414
                    ],
                    "C_GND4": [
                        187.39752960205078,
                        153.5666275024414
                    ],
                    "C_VCC1": [
                        187.39752960205078,
                        159.83989715576172
                    ],
                    "C_VCC2": [
                        113.1922836303711,
                        153.5666275024414
                    ],
                    "C_P0": [
                        119.33667373657227,
                        159.83989715576172
                    ],
                    "C_P2": [
                        125.52401733398438,
                        159.83989715576172
                    ],
                    "C_P4": [
                        131.71136474609375,
                        159.83989715576172
                    ],
                    "C_P6": [
                        137.89871978759766,
                        159.83989715576172
                    ],
                    "C_P8": [
                        144.08607482910156,
                        159.83989715576172
                    ],
                    "C_P10": [
                        156.46077728271484,
                        159.83989715576172
                    ],
                    "C_P12": [
                        162.64812469482422,
                        159.83989715576172
                    ],
                    "C_P14": [
                        168.83545684814453,
                        159.83989715576172
                    ],
                    "C_P16": [
                        175.02281951904297,
                        159.83989715576172
                    ],
                    "C_P20": [
                        181.2101821899414,
                        159.83989715576172
                    ],
                    "C_P1": [
                        119.379638671875,
                        153.5666275024414
                    ],
                    "C_P3": [
                        125.56698226928711,
                        153.5666275024414
                    ],
                    "C_P5": [
                        131.71136474609375,
                        153.5666275024414
                    ],
                    "C_P7": [
                        137.89871978759766,
                        153.5666275024414
                    ],
                    "C_P9": [
                        144.08607482910156,
                        153.5666275024414
                    ],
                    "C_P11": [
                        156.46077728271484,
                        153.5666275024414
                    ],
                    "C_P13": [
                        162.64812469482422,
                        153.5666275024414
                    ],
                    "C_P15": [
                        168.83545684814453,
                        153.5666275024414
                    ],
                    "C_P21": [
                        175.02281951904297,
                        153.5666275024414
                    ],
                    "C_P19": [
                        181.2101821899414,
                        153.5666275024414
                    ],
                    "M_GND1": [
                        137.89871978759766,
                        141.70752716064453
                    ],
                    "M_GND2": [
                        156.46077728271484,
                        141.70752716064453
                    ],
                    "M_OUT1": [
                        144.08607482910156,
                        141.70752716064453
                    ],
                    "M_OUT2": [
                        150.27342987060547,
                        141.70752716064453
                    ],
                    "M_VM": [
                        162.64812469482422,
                        141.70752716064453
                    ],
                    "G_A0_GND": [
                        82.47036743164062,
                        72.35763549804688
                    ],
                    "G_A0_VCC": [
                        78.34546279907227,
                        76.3106689453125
                    ],
                    "G_A0_SDA": [
                        74.65023803710938,
                        80.00588989257812
                    ],
                    "G_A0_SCL": [
                        70.43940734863281,
                        84.21672821044922
                    ],
                    "G_A1_RX": [
                        216.52963256835938,
                        71.4982795715332
                    ],
                    "G_A1_TX": [
                        220.65453338623047,
                        75.53724670410156
                    ],
                    "G_A1_VCC": [
                        224.34976959228516,
                        79.23247528076172
                    ],
                    "G_A1_GND": [
                        228.56060028076172,
                        83.44330978393555
                    ]
                };
                this.lastFlashTime = 0;
                this.lastAntennaFlash = 0;
                this.buildDom();
                if (props && props.wireframe)
                    pxsim.svg.addClass(this.element, "sim-wireframe");
                if (props && props.theme)
                    this.updateTheme();
                if (props && props.runtime) {
                    this.board = this.props.runtime.board;
                    this.board.updateSubscribers.push(function () { return _this.updateState(); });
                    this.updateState();
                    this.attachEvents();
                }
            }
            MicrobitBoardSvg.prototype.getView = function () {
                return {
                    el: this.element,
                    y: 0,
                    x: 0,
                    w: MB_WIDTH,
                    h: MB_HEIGHT
                };
            };
            MicrobitBoardSvg.prototype.getCoord = function (pinNm) {
                return this.pinNmToCoord[pinNm];
            };
            MicrobitBoardSvg.prototype.highlightPin = function (pinNm) {
                //TODO: for instructions
            };
            MicrobitBoardSvg.prototype.getPinDist = function () {
                return 10;
            };
            MicrobitBoardSvg.prototype.recordPinCoords = function () {
                var _this = this;
                pinNames.forEach(function (nm, i) {
                    var p = _this.pins[i];
                    var r = p.getBoundingClientRect();
                    _this.pinNmToCoord[nm] = [r.left + r.width / 2, r.top + r.height / 2];
                });
                console.log(JSON.stringify(this.pinNmToCoord, null, 2));
            };
            MicrobitBoardSvg.prototype.updateTheme = function () {
                var theme = this.props.theme;
                pxsim.svg.fills(this.leds, theme.ledOn);
                pxsim.svg.fills(this.ledsOuter, theme.ledOff);
                pxsim.svg.fills(this.buttonsOuter.slice(0, 2), theme.buttonOuter);
                pxsim.svg.fill(this.buttons[0], theme.buttonUps[0]);
                pxsim.svg.fill(this.buttons[1], theme.buttonUps[1]);
                pxsim.svg.fill(this.buttonsOuter[2], theme.virtualButtonOuter);
                pxsim.svg.fill(this.buttons[2], theme.virtualButtonUp);
                this.pinGradients.forEach(function (lg) { return pxsim.svg.setGradientColors(lg, theme.pin, theme.pinActive); });
                pxsim.svg.setGradientColors(this.lightLevelGradient, theme.lightLevelOn, theme.lightLevelOff);
                pxsim.svg.setGradientColors(this.thermometerGradient, theme.ledOff, theme.ledOn);
            };
            MicrobitBoardSvg.prototype.updateState = function () {
                var _this = this;
                var state = this.board;
                if (!state)
                    return;
                var theme = this.props.theme;
                var bpState = state.buttonPairState;
                var buttons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
                buttons.forEach(function (btn, index) {
                    pxsim.svg.fill(_this.buttons[index], btn.pressed ? (btn.virtual ? theme.virtualButtonDown : theme.buttonDown) : (btn.virtual ? theme.virtualButtonUp : theme.buttonUps[index]));
                });
                if (state.ledMatrixState.disabled) {
                    this.leds.forEach(function (led, i) {
                        var sel = led;
                        sel.style.opacity = "0";
                    });
                }
                else {
                    var bw_1 = state.ledMatrixState.displayMode == pxsim.DisplayMode.bw;
                    var img_1 = state.ledMatrixState.image;
                    this.leds.forEach(function (led, i) {
                        var sel = led;
                        sel.style.opacity = ((bw_1 ? img_1.data[i] > 0 ? 255 : 0 : img_1.data[i]) / 255.0) + "";
                    });
                }
                this.updatePins();
                this.updateTilt();
                this.updateHeading();
                this.updateLightLevel();
                this.updateTemperature();
                this.updateButtonAB();
                this.updateGestures();
                this.updateRgbLed();
                this.updateSpeaker();
                if (!pxsim.runtime || pxsim.runtime.dead)
                    pxsim.svg.addClass(this.element, "grayscale");
                else
                    pxsim.svg.removeClass(this.element, "grayscale");
            };
            MicrobitBoardSvg.prototype.updateRgbLed = function () {
                var state = this.board;
                if (state.rgbLedState) {
                    if (!this.rgbLed)
                        this.rgbLed = this.element.getElementById("rgbledcircle");
                    var c = state.rgbLedState;
                    var b = c & 0xFF;
                    var g = (c >> 8) & 0xFF;
                    var r = (c >> 16) & 0xFF;
                    var w = (c >> 24) & 0xFF;
                    var ch = "rgba(" + r + ", " + g + ", " + b + ", 1)";
                    pxsim.svg.fill(this.rgbLed, ch);
                }
                else if (this.rgbLed) {
                    pxsim.svg.fill(this.rgbLed, 'white');
                }
            };
            MicrobitBoardSvg.prototype.updateSpeaker = function () {
                var state = this.board;
                if (state.speakerState.frequency) {
                }
                else {
                }
            };
            MicrobitBoardSvg.prototype.updateGestures = function () {
                var _this = this;
                var state = this.board;
                if (state.accelerometerState.useShake && !this.shakeButton) {
                    var shake = this.mkBtn(26, MB_HEIGHT - 45);
                    this.shakeButton = shake.inner;
                    pxsim.svg.fill(this.shakeButton, this.props.theme.virtualButtonUp);
                    pxsim.svg.buttonEvents(shake.outer, function (ev) { }, function (ev) {
                        pxsim.svg.fill(_this.shakeButton, _this.props.theme.virtualButtonDown);
                    }, function (ev) {
                        pxsim.svg.fill(_this.shakeButton, _this.props.theme.virtualButtonUp);
                        _this.board.bus.queue(27 /* MICROBIT_ID_GESTURE */, 11); // GESTURE_SHAKE
                    });
                    var shakeText = pxsim.svg.child(shake.outer, "text", { x: 15, y: MB_HEIGHT - 10, class: "sim-text inverted" });
                    shakeText.textContent = "SHAKE";
                }
            };
            MicrobitBoardSvg.prototype.updateButtonAB = function () {
                var state = this.board;
                if (state.buttonPairState.usesButtonAB && this.buttons[2].style.visibility != "visible") {
                    this.buttonsOuter[2].style.visibility = "visible";
                    this.buttons[2].style.visibility = "visible";
                    this.updateTheme();
                }
            };
            MicrobitBoardSvg.prototype.updatePin = function (pin, index) {
                if (!pin)
                    return;
                var text = this.pinTexts[index];
                var v = "";
                if (pin.mode & pxsim.PinFlags.Analog) {
                    v = Math.floor(100 - (pin.value || 0) / 1023 * 100) + "%";
                    if (text)
                        text.textContent = (pin.period ? "~" : "") + (pin.value || 0) + "";
                }
                else if (pin.mode & pxsim.PinFlags.Digital) {
                    v = pin.value > 0 ? "0%" : "100%";
                    if (text)
                        text.textContent = pin.value > 0 ? "1" : "0";
                }
                else if (pin.mode & pxsim.PinFlags.Touch) {
                    v = pin.touched ? "0%" : "100%";
                    if (text)
                        text.textContent = "";
                }
                else {
                    v = "100%";
                    if (text)
                        text.textContent = "";
                }
                if (v)
                    pxsim.svg.setGradientValue(this.pinGradients[index], v);
            };
            MicrobitBoardSvg.prototype.updateTemperature = function () {
                var _this = this;
                var state = this.board;
                if (!state || !state.thermometerState.usesTemperature)
                    return;
                var tmin = -5;
                var tmax = 50;
                if (!this.thermometer) {
                    var gid = "gradient-thermometer";
                    this.thermometerGradient = pxsim.svg.linearGradient(this.defs, gid);
                    var ty_1 = MB_HEIGHT - 180;
                    this.thermometer = pxsim.svg.child(this.g, "rect", {
                        class: "sim-thermometer",
                        x: 28,
                        y: ty_1,
                        width: 10,
                        height: 80,
                        rx: 5, ry: 5,
                        fill: "url(#" + gid + ")"
                    });
                    this.thermometerText = pxsim.svg.child(this.g, "text", {
                        class: 'sim-text',
                        x: 48, y: ty_1 + 78
                    });
                    this.updateTheme();
                    var pt_1 = this.element.createSVGPoint();
                    pxsim.svg.buttonEvents(this.thermometer, function (ev) {
                        var cur = pxsim.svg.cursorPoint(pt_1, _this.element, ev);
                        var t = Math.max(0, Math.min(1, (cur.y - ty_1 - 5) / 70));
                        state.thermometerState.temperature = Math.floor(tmax - t * (tmax - tmin));
                        _this.updateTemperature();
                    }, function (ev) { }, function (ev) { });
                }
                var t = Math.max(tmin, Math.min(tmax, state.thermometerState.temperature));
                var per = Math.floor((state.thermometerState.temperature - tmin) / (tmax - tmin) * 100);
                pxsim.svg.setGradientValue(this.thermometerGradient, 100 - per + "%");
                this.thermometerText.textContent = t + "°C";
            };
            MicrobitBoardSvg.prototype.updateHeading = function () {
                var xc = 258;
                var yc = 75;
                var state = this.board;
                if (!state || !state.compassState.usesHeading)
                    return;
                /*
                if (!this.headInitialized) {
                    let p = this.head.firstChild.nextSibling as SVGPathElement;
                    p.setAttribute("d", "m269.9,50.134647l0,0l-39.5,0l0,0c-14.1,0.1 -24.6,10.7 -24.6,24.8c0,13.9 10.4,24.4 24.3,24.7l0,0l39.6,0c14.2,0 40.36034,-22.97069 40.36034,-24.85394c0,-1.88326 -26.06034,-24.54606 -40.16034,-24.64606m-0.2,39l0,0l-39.3,0c-7.7,-0.1 -14,-6.4 -14,-14.2c0,-7.8 6.4,-14.2 14.2,-14.2l39.1,0c7.8,0 14.2,6.4 14.2,14.2c0,7.9 -6.4,14.2 -14.2,14.2l0,0l0,0z");
                    this.updateTheme();
                    let pt = this.element.createSVGPoint();
                    svg.buttonEvents(
                        this.head,
                        (ev: MouseEvent) => {
                            let cur = svg.cursorPoint(pt, this.element, ev);
                            state.compassState.heading = Math.floor(Math.atan2(cur.y - yc, cur.x - xc) * 180 / Math.PI + 90);
                            if (state.compassState.heading < 0) state.compassState.heading += 360;
                            this.updateHeading();
                        });
                    this.headInitialized = true;
                }
    
                let txt = state.compassState.heading.toString() + "°";
                if (txt != this.headText.textContent) {
                    svg.rotateElement(this.head, xc, yc, state.compassState.heading + 180);
                    this.headText.textContent = txt;
                } */
            };
            MicrobitBoardSvg.prototype.flashSystemLed = function () {
                if (!this.systemLed)
                    this.systemLed = pxsim.svg.child(this.g, "circle", { class: "sim-systemled", cx: 160.8, cy: 150.9, r: 4 });
                var now = Date.now();
                if (now - this.lastFlashTime > 150) {
                    this.lastFlashTime = now;
                    pxsim.svg.animate(this.systemLed, "sim-flash");
                }
            };
            MicrobitBoardSvg.prototype.flashAntenna = function () {
                if (!this.antenna) {
                    var ax = 480;
                    var dax = 18;
                    var ayt = 10;
                    var ayb = 40;
                    this.antenna = pxsim.svg.child(this.g, "polyline", { class: "sim-antenna", points: ax + "," + ayb + " " + ax + "," + ayt + " " + (ax += dax) + "," + ayt + " " + ax + "," + ayb + " " + (ax += dax) + "," + ayb + " " + ax + "," + ayt + " " + (ax += dax) + "," + ayt + " " + ax + "," + ayb + " " + (ax += dax) + "," + ayb + " " + ax + "," + ayt + " " + (ax += dax) + "," + ayt });
                }
                var now = Date.now();
                if (now - this.lastAntennaFlash > 200) {
                    this.lastAntennaFlash = now;
                    pxsim.svg.animate(this.antenna, 'sim-flash-stroke');
                }
            };
            MicrobitBoardSvg.prototype.updatePins = function () {
                var _this = this;
                var state = this.board;
                if (!state)
                    return;
                state.edgeConnectorState.pins.forEach(function (pin, i) { return _this.updatePin(pin, i); });
            };
            MicrobitBoardSvg.prototype.updateLightLevel = function () {
                var _this = this;
                var state = this.board;
                if (!state || !state.lightSensorState.usesLightLevel)
                    return;
                if (!this.lightLevelButton) {
                    var gid = "gradient-light-level";
                    this.lightLevelGradient = pxsim.svg.linearGradient(this.defs, gid);
                    var cx = 30;
                    var cy_1 = 45;
                    var r_1 = 20;
                    this.lightLevelButton = pxsim.svg.child(this.g, "circle", {
                        cx: cx + "px", cy: cy_1 + "px", r: r_1 + "px",
                        class: 'sim-light-level-button',
                        fill: "url(#" + gid + ")"
                    });
                    var pt_2 = this.element.createSVGPoint();
                    pxsim.svg.buttonEvents(this.lightLevelButton, function (ev) {
                        var pos = pxsim.svg.cursorPoint(pt_2, _this.element, ev);
                        var rs = r_1 / 2;
                        var level = Math.max(0, Math.min(255, Math.floor((pos.y - (cy_1 - rs)) / (2 * rs) * 255)));
                        if (level != _this.board.lightSensorState.lightLevel) {
                            _this.board.lightSensorState.lightLevel = level;
                            _this.applyLightLevel();
                        }
                    }, function (ev) { }, function (ev) { });
                    this.lightLevelText = pxsim.svg.child(this.g, "text", { x: cx - r_1 - 7, y: cy_1 + r_1 + 8, text: '', class: 'sim-text inverted' });
                    this.updateTheme();
                }
                pxsim.svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(state.lightSensorState.lightLevel * 100 / 255))) + '%');
                this.lightLevelText.textContent = state.lightSensorState.lightLevel.toString();
            };
            MicrobitBoardSvg.prototype.applyLightLevel = function () {
                var lv = this.board.lightSensorState.lightLevel;
                pxsim.svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(lv * 100 / 255))) + '%');
                this.lightLevelText.textContent = lv.toString();
            };
            MicrobitBoardSvg.prototype.updateTilt = function () {
                if (this.props.disableTilt)
                    return;
                var state = this.board;
                if (!state || !state.accelerometerState.accelerometer.isActive)
                    return;
                var x = state.accelerometerState.accelerometer.getX();
                var y = -state.accelerometerState.accelerometer.getY();
                var af = 8 / 1023;
                var s = 1 - Math.min(0.1, Math.pow(Math.max(Math.abs(x), Math.abs(y)) / 1023, 2) / 35);
                this.element.style.transform = "perspective(30em) rotateX(" + y * af + "deg) rotateY(" + x * af + "deg) scale(" + s + ", " + s + ")";
                this.element.style.perspectiveOrigin = "50% 50% 50%";
                this.element.style.perspective = "30em";
            };
            MicrobitBoardSvg.prototype.buildDom = function () {
                var _this = this;
                this.element = new DOMParser().parseFromString(BOARD_SVG, "image/svg+xml").querySelector("svg");
                pxsim.svg.hydrate(this.element, {
                    "version": "1.0",
                    "viewBox": "0 0 " + MB_WIDTH + " " + MB_HEIGHT,
                    "class": "sim",
                    "x": "0px",
                    "y": "0px",
                    "width": MB_WIDTH + "px",
                    "height": MB_HEIGHT + "px",
                });
                this.style = pxsim.svg.child(this.element, "style", {});
                this.style.textContent = MB_STYLE;
                this.defs = pxsim.svg.child(this.element, "defs", {});
                this.g = pxsim.svg.elt("g");
                this.element.appendChild(this.g);
                // filters
                var glow = pxsim.svg.child(this.defs, "filter", { id: "filterglow", x: "-5%", y: "-5%", width: "120%", height: "120%" });
                pxsim.svg.child(glow, "feGaussianBlur", { stdDeviation: "5", result: "glow" });
                var merge = pxsim.svg.child(glow, "feMerge", {});
                for (var i = 0; i < 3; ++i)
                    pxsim.svg.child(merge, "feMergeNode", { in: "glow" });
                // leds
                this.leds = [];
                this.ledsOuter = [];
                var left = Number(this.element.getElementById("LED_0_0").getAttribute("x"));
                var top = Number(this.element.getElementById("LED_0_0").getAttribute("y"));
                var ledoffw = Number(this.element.getElementById("LED_1_0").getAttribute("x")) - left;
                var ledoffh = Number(this.element.getElementById("LED_0_1").getAttribute("y")) - top;
                var ledw = 5.1;
                var ledh = 12.9;
                for (var i = 0; i < 5; ++i) {
                    var ledtop = i * ledoffh + top;
                    for (var j = 0; j < 5; ++j) {
                        var ledleft = j * ledoffw + left;
                        var k = i * 5 + j;
                        this.ledsOuter.push(pxsim.svg.child(this.g, "rect", { class: "sim-led-back", x: ledleft, y: ledtop, width: ledw, height: ledh }));
                        this.leds.push(pxsim.svg.child(this.g, "rect", { class: "sim-led", x: ledleft - 1, y: ledtop - 1, width: ledw + 2, height: ledh + 2, rx: 2, ry: 2, title: "(" + j + "," + i + ")" }));
                    }
                }
                // https://www.microbit.co.uk/device/pins
                // P0, P1, P2
                this.pins = pinNames.map(function (n) {
                    var p = _this.element.getElementById(n);
                    if (!p)
                        console.log("missing " + n);
                    pxsim.svg.addClass(p, "sim-pin");
                    return p;
                });
                this.pins.forEach(function (p, i) { return pxsim.svg.hydrate(p, { title: pinTitles[i] }); });
                this.pinGradients = this.pins.map(function (pin, i) {
                    var gid = "gradient-pin-" + i;
                    var lg = pxsim.svg.linearGradient(_this.defs, gid);
                    pin.setAttribute("fill", "url(#" + gid + ")");
                    return lg;
                });
                this.pinTexts = [67, 165, 275].map(function (x) { return pxsim.svg.child(_this.g, "text", { class: "sim-text-pin", x: x, y: 345 }); });
                // BTN A, B
                var btnids = ["BTN_A", "BTN_B"];
                this.buttonsOuter = btnids.map(function (n) { return _this.element.getElementById(n + "_BOX"); });
                this.buttonsOuter.forEach(function (b) { return pxsim.svg.addClass(b, "sim-button-outer"); });
                this.buttons = btnids.map(function (n) { return _this.element.getElementById(n); });
                this.buttons.forEach(function (b) { return pxsim.svg.addClass(b, "sim-button"); });
                // BTN A+B
                var outerBtn = function (left, top) {
                    var button = _this.mkBtn(left, top);
                    _this.buttonsOuter.push(button.outer);
                    _this.buttons.push(button.inner);
                    return button;
                };
                var ab = outerBtn(69, MB_HEIGHT - 45);
                var abtext = pxsim.svg.child(ab.outer, "text", { x: 67, y: MB_HEIGHT - 10, class: "sim-text inverted" });
                abtext.textContent = "A+B";
                this.buttonsOuter[2].style.visibility = "hidden";
                this.buttons[2].style.visibility = "hidden";
            };
            MicrobitBoardSvg.prototype.mkBtn = function (left, top) {
                var btnr = 2;
                var btnw = 20;
                var btnn = 1.6;
                var btnnm = 2;
                var btnb = 5;
                var btng = pxsim.svg.child(this.g, "g", { class: "sim-button-group" });
                pxsim.svg.child(btng, "rect", { class: "sim-button-outer", x: left, y: top, rx: btnr, ry: btnr, width: btnw, height: btnw });
                pxsim.svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnnm, r: btnn });
                pxsim.svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnw - btnnm, r: btnn });
                pxsim.svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnw - btnnm, r: btnn });
                pxsim.svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnnm, r: btnn });
                var outer = btng;
                var inner = pxsim.svg.child(btng, "circle", {
                    class: "sim-button",
                    cx: left + btnw / 2,
                    cy: top + btnw / 2,
                    r: btnb
                });
                return { outer: outer, inner: inner };
            };
            MicrobitBoardSvg.prototype.attachEvents = function () {
                var _this = this;
                pxsim.Runtime.messagePosted = function (msg) {
                    switch (msg.type || "") {
                        case "serial":
                            _this.flashSystemLed();
                            break;
                        case "radiopacket":
                            _this.flashAntenna();
                            break;
                    }
                };
                var tiltDecayer = 0;
                this.element.addEventListener(pxsim.pointerEvents.move, function (ev) {
                    var state = _this.board;
                    if (!state.accelerometerState.accelerometer.isActive)
                        return;
                    if (tiltDecayer) {
                        clearInterval(tiltDecayer);
                        tiltDecayer = 0;
                    }
                    var bbox = _this.element.getBoundingClientRect();
                    var ax = (ev.clientX - bbox.width / 2) / (bbox.width / 3);
                    var ay = (ev.clientY - bbox.height / 2) / (bbox.height / 3);
                    var x = -Math.max(-1023, Math.min(1023, Math.floor(ax * 1023)));
                    var y = -Math.max(-1023, Math.min(1023, Math.floor(ay * 1023)));
                    var z2 = 1023 * 1023 - x * x - y * y;
                    var z = Math.floor((z2 > 0 ? -1 : 1) * Math.sqrt(Math.abs(z2)));
                    state.accelerometerState.accelerometer.update(x, y, z);
                    _this.updateTilt();
                }, false);
                this.element.addEventListener(pxsim.pointerEvents.leave, function (ev) {
                    var state = _this.board;
                    if (!state.accelerometerState.accelerometer.isActive)
                        return;
                    if (!tiltDecayer) {
                        tiltDecayer = setInterval(function () {
                            var accx = state.accelerometerState.accelerometer.getX(pxsim.MicroBitCoordinateSystem.RAW);
                            accx = Math.floor(Math.abs(accx) * 0.85) * (accx > 0 ? 1 : -1);
                            var accy = state.accelerometerState.accelerometer.getY(pxsim.MicroBitCoordinateSystem.RAW);
                            accy = Math.floor(Math.abs(accy) * 0.85) * (accy > 0 ? 1 : -1);
                            var accz = -Math.sqrt(Math.max(0, 1023 * 1023 - accx * accx - accy * accy));
                            if (Math.abs(accx) <= 24 && Math.abs(accy) <= 24) {
                                clearInterval(tiltDecayer);
                                tiltDecayer = 0;
                                accx = 0;
                                accy = 0;
                                accz = -1023;
                            }
                            state.accelerometerState.accelerometer.update(accx, accy, accz);
                            _this.updateTilt();
                        }, 50);
                    }
                }, false);
                this.pins.forEach(function (pin, index) {
                    if (!_this.board.edgeConnectorState.pins[index])
                        return;
                    var pt = _this.element.createSVGPoint();
                    pxsim.svg.buttonEvents(pin, 
                    // move
                    function (ev) {
                        var state = _this.board;
                        var pin = state.edgeConnectorState.pins[index];
                        var svgpin = _this.pins[index];
                        if (pin.mode & pxsim.PinFlags.Input) {
                            var cursor = pxsim.svg.cursorPoint(pt, _this.element, ev);
                            var v = (400 - cursor.y) / 40 * 1023;
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        _this.updatePin(pin, index);
                    }, 
                    // start
                    function (ev) {
                        var state = _this.board;
                        var pin = state.edgeConnectorState.pins[index];
                        var svgpin = _this.pins[index];
                        pxsim.svg.addClass(svgpin, "touched");
                        if (pin.mode & pxsim.PinFlags.Input) {
                            var cursor = pxsim.svg.cursorPoint(pt, _this.element, ev);
                            var v = (400 - cursor.y) / 40 * 1023;
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        _this.updatePin(pin, index);
                    }, 
                    // stop
                    function (ev) {
                        var state = _this.board;
                        var pin = state.edgeConnectorState.pins[index];
                        var svgpin = _this.pins[index];
                        pxsim.svg.removeClass(svgpin, "touched");
                        _this.updatePin(pin, index);
                        return false;
                    });
                });
                this.pins.slice(0, 3).forEach(function (btn, index) {
                    btn.addEventListener(pxsim.pointerEvents.down, function (ev) {
                        var state = _this.board;
                        state.edgeConnectorState.pins[index].touched = true;
                        _this.updatePin(state.edgeConnectorState.pins[index], index);
                    });
                    btn.addEventListener(pxsim.pointerEvents.leave, function (ev) {
                        var state = _this.board;
                        state.edgeConnectorState.pins[index].touched = false;
                        _this.updatePin(state.edgeConnectorState.pins[index], index);
                    });
                    btn.addEventListener(pxsim.pointerEvents.up, function (ev) {
                        var state = _this.board;
                        state.edgeConnectorState.pins[index].touched = false;
                        _this.updatePin(state.edgeConnectorState.pins[index], index);
                        _this.board.bus.queue(state.edgeConnectorState.pins[index].id, 2 /* MICROBIT_BUTTON_EVT_UP */);
                        _this.board.bus.queue(state.edgeConnectorState.pins[index].id, 3 /* MICROBIT_BUTTON_EVT_CLICK */);
                    });
                });
                var bpState = this.board.buttonPairState;
                var stateButtons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
                this.buttonsOuter.slice(0, 2).forEach(function (btn, index) {
                    btn.addEventListener(pxsim.pointerEvents.down, function (ev) {
                        var state = _this.board;
                        stateButtons[index].pressed = true;
                        pxsim.svg.fill(_this.buttons[index], _this.props.theme.buttonDown);
                    });
                    btn.addEventListener(pxsim.pointerEvents.leave, function (ev) {
                        var state = _this.board;
                        stateButtons[index].pressed = false;
                        pxsim.svg.fill(_this.buttons[index], _this.props.theme.buttonUps[index]);
                    });
                    btn.addEventListener(pxsim.pointerEvents.up, function (ev) {
                        var state = _this.board;
                        stateButtons[index].pressed = false;
                        pxsim.svg.fill(_this.buttons[index], _this.props.theme.buttonUps[index]);
                        _this.board.bus.queue(stateButtons[index].id, 2 /* MICROBIT_BUTTON_EVT_UP */);
                        _this.board.bus.queue(stateButtons[index].id, 3 /* MICROBIT_BUTTON_EVT_CLICK */);
                    });
                });
                this.buttonsOuter[2].addEventListener(pxsim.pointerEvents.down, function (ev) {
                    var state = _this.board;
                    stateButtons[0].pressed = true;
                    stateButtons[1].pressed = true;
                    stateButtons[2].pressed = true;
                    pxsim.svg.fill(_this.buttons[0], _this.props.theme.buttonDown);
                    pxsim.svg.fill(_this.buttons[1], _this.props.theme.buttonDown);
                    pxsim.svg.fill(_this.buttons[2], _this.props.theme.buttonDown);
                });
                this.buttonsOuter[2].addEventListener(pxsim.pointerEvents.leave, function (ev) {
                    var state = _this.board;
                    stateButtons[0].pressed = false;
                    stateButtons[1].pressed = false;
                    stateButtons[2].pressed = false;
                    pxsim.svg.fill(_this.buttons[0], _this.props.theme.buttonUps[0]);
                    pxsim.svg.fill(_this.buttons[1], _this.props.theme.buttonUps[1]);
                    pxsim.svg.fill(_this.buttons[2], _this.props.theme.virtualButtonUp);
                });
                this.buttonsOuter[2].addEventListener(pxsim.pointerEvents.up, function (ev) {
                    var state = _this.board;
                    stateButtons[0].pressed = false;
                    stateButtons[1].pressed = false;
                    stateButtons[2].pressed = false;
                    pxsim.svg.fill(_this.buttons[0], _this.props.theme.buttonUps[0]);
                    pxsim.svg.fill(_this.buttons[1], _this.props.theme.buttonUps[1]);
                    pxsim.svg.fill(_this.buttons[2], _this.props.theme.virtualButtonUp);
                    _this.board.bus.queue(stateButtons[2].id, 2 /* MICROBIT_BUTTON_EVT_UP */);
                    _this.board.bus.queue(stateButtons[2].id, 3 /* MICROBIT_BUTTON_EVT_CLICK */);
                });
            };
            return MicrobitBoardSvg;
        }());
        visuals.MicrobitBoardSvg = MicrobitBoardSvg;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>
/// <reference path="../../libs/core/shims.d.ts"/>
/// <reference path="../../libs/core/enums.d.ts"/>
var pxsim;
(function (pxsim) {
    var visuals;
    (function (visuals) {
        var PIXEL_SPACING = visuals.PIN_DIST * 3;
        var PIXEL_RADIUS = visuals.PIN_DIST;
        var CANVAS_WIDTH = 1.2 * visuals.PIN_DIST;
        var CANVAS_HEIGHT = 12 * visuals.PIN_DIST;
        var CANVAS_VIEW_WIDTH = CANVAS_WIDTH;
        var CANVAS_VIEW_HEIGHT = CANVAS_HEIGHT;
        var CANVAS_VIEW_PADDING = visuals.PIN_DIST * 4;
        var CANVAS_LEFT = 1.4 * visuals.PIN_DIST;
        var CANVAS_TOP = visuals.PIN_DIST;
        // For the instructions parts list
        function mkNeoPixelPart(xy) {
            if (xy === void 0) { xy = [0, 0]; }
            var NP_PART_XOFF = -13.5;
            var NP_PART_YOFF = -11;
            var NP_PART_WIDTH = 87.5;
            var NP_PART_HEIGHT = 190;
            var NEOPIXEL_PART_IMG = "<svg viewBox=\"-5 -1 53 112\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:bx=\"https://boxy-svg.com\">\n  <rect x=\"2.5\" width=\"38\" height=\"100\" style=\"fill: rgb(68, 68, 68);\"/>\n  <rect x=\"11.748\" y=\"3.2\" width=\"1.391\" height=\"2.553\" style=\"fill: none; stroke-linejoin: round; stroke-width: 3; stroke: rgb(165, 103, 52);\"/>\n  <rect x=\"20.75\" y=\"3.2\" width=\"1.391\" height=\"2.553\" style=\"fill: none; stroke-linejoin: round; stroke-width: 3; stroke: rgb(165, 103, 52);\"/>\n  <rect x=\"29.75\" y=\"3.2\" width=\"1.391\" height=\"2.553\" style=\"fill: none; stroke-linejoin: round; stroke-width: 3; stroke: rgb(165, 103, 52);\"/>\n  <g>\n    <rect x=\"9\" y=\"16.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"22.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"28.563\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"11.607\" y=\"14.833\" width=\"19.787\" height=\"18.697\" style=\"fill: rgb(0, 0, 0);\"/>\n    <ellipse style=\"fill: rgb(216, 216, 216);\" cx=\"21.5\" cy=\"24.181\" rx=\"7\" ry=\"7\"/>\n  </g>\n  <path d=\"M -7.25 -103.2 L -2.5 -100.003 L -12 -100.003 L -7.25 -103.2 Z\" style=\"fill: rgb(68, 68, 68);\" transform=\"matrix(-1, 0, 0, -1, 0, 0)\" bx:shape=\"triangle -12 -103.2 9.5 3.197 0.5 0 1@ad6f5cac\"/>\n  <path d=\"M -16.75 -103.197 L -12 -100 L -21.5 -100 L -16.75 -103.197 Z\" style=\"fill: rgb(68, 68, 68);\" transform=\"matrix(-1, 0, 0, -1, 0, 0)\" bx:shape=\"triangle -21.5 -103.197 9.5 3.197 0.5 0 1@07d73149\"/>\n  <path d=\"M -26.25 -103.2 L -21.5 -100.003 L -31 -100.003 L -26.25 -103.2 Z\" style=\"fill: rgb(68, 68, 68);\" transform=\"matrix(-1, 0, 0, -1, 0, 0)\" bx:shape=\"triangle -31 -103.2 9.5 3.197 0.5 0 1@54403e2d\"/>\n  <path d=\"M -35.75 -103.197 L -31 -100 L -40.5 -100 L -35.75 -103.197 Z\" style=\"fill: rgb(68, 68, 68);\" transform=\"matrix(-1, 0, 0, -1, 0, 0)\" bx:shape=\"triangle -40.5 -103.197 9.5 3.197 0.5 0 1@21c9b772\"/>\n  <g transform=\"matrix(1, 0, 0, 1, 0.000002, 29.999994)\">\n    <rect x=\"9\" y=\"16.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"22.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"28.563\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"11.607\" y=\"14.833\" width=\"19.787\" height=\"18.697\" style=\"fill: rgb(0, 0, 0);\"/>\n    <ellipse style=\"fill: rgb(216, 216, 216);\" cx=\"21.5\" cy=\"24.181\" rx=\"7\" ry=\"7\"/>\n  </g>\n  <g transform=\"matrix(1, 0, 0, 1, 0.000005, 59.999992)\">\n    <rect x=\"9\" y=\"16.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"22.562\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"9\" y=\"28.563\" width=\"25\" height=\"3.238\" style=\"fill: rgb(216, 216, 216);\"/>\n    <rect x=\"11.607\" y=\"14.833\" width=\"19.787\" height=\"18.697\" style=\"fill: rgb(0, 0, 0);\"/>\n    <ellipse style=\"fill: rgb(216, 216, 216);\" cx=\"21.5\" cy=\"24.181\" rx=\"7\" ry=\"7\"/>\n  </g>\n</svg>";
            var x = xy[0], y = xy[1];
            var l = x + NP_PART_XOFF;
            var t = y + NP_PART_YOFF;
            var w = NP_PART_WIDTH;
            var h = NP_PART_HEIGHT;
            var img = pxsim.svg.elt("image");
            pxsim.svg.hydrate(img, {
                class: "sim-neopixel-strip", x: l, y: t, width: w, height: h,
                href: pxsim.svg.toDataUri(NEOPIXEL_PART_IMG)
            });
            return { el: img, x: l, y: t, w: w, h: h };
        }
        visuals.mkNeoPixelPart = mkNeoPixelPart;
        var NeoPixel = (function () {
            function NeoPixel(xy) {
                if (xy === void 0) { xy = [0, 0]; }
                var el = pxsim.svg.elt("rect");
                var r = PIXEL_RADIUS;
                var cx = xy[0], cy = xy[1];
                var y = cy - r;
                pxsim.svg.hydrate(el, { x: "-50%", y: y, width: "100%", height: r * 2, class: "sim-neopixel" });
                this.el = el;
                this.cy = cy;
            }
            NeoPixel.prototype.setRgb = function (rgb) {
                var hsl = visuals.rgbToHsl(rgb);
                var h = hsl[0], s = hsl[1], l = hsl[2];
                // at least 70% luminosity
                l = Math.max(l, 60);
                var fill = "hsl(" + h + ", " + s + "%, " + l + "%)";
                this.el.setAttribute("fill", fill);
            };
            return NeoPixel;
        }());
        visuals.NeoPixel = NeoPixel;
        var NeoPixelCanvas = (function () {
            function NeoPixelCanvas(pin) {
                this.pixels = [];
                this.pin = pin;
                var el = pxsim.svg.elt("svg");
                pxsim.svg.hydrate(el, {
                    "class": "sim-neopixel-canvas",
                    "x": "0px",
                    "y": "0px",
                    "width": CANVAS_WIDTH + "px",
                    "height": CANVAS_HEIGHT + "px",
                });
                this.canvas = el;
                this.background = pxsim.svg.child(el, "rect", { class: "sim-neopixel-background hidden" });
                this.updateViewBox(-CANVAS_VIEW_WIDTH / 2, 0, CANVAS_VIEW_WIDTH, CANVAS_VIEW_HEIGHT);
            }
            NeoPixelCanvas.prototype.updateViewBox = function (x, y, w, h) {
                this.viewBox = [x, y, w, h];
                pxsim.svg.hydrate(this.canvas, { "viewBox": x + " " + y + " " + w + " " + h });
                pxsim.svg.hydrate(this.background, { "x": x, "y": y, "width": w, "height": h });
            };
            NeoPixelCanvas.prototype.update = function (colors) {
                if (!colors || colors.length <= 0)
                    return;
                for (var i = 0; i < colors.length; i++) {
                    var pixel = this.pixels[i];
                    if (!pixel) {
                        var cxy = [0, CANVAS_VIEW_PADDING + i * PIXEL_SPACING];
                        pixel = this.pixels[i] = new NeoPixel(cxy);
                        pxsim.svg.hydrate(pixel.el, { title: "offset: " + i });
                        this.canvas.appendChild(pixel.el);
                    }
                    var color = colors[i];
                    pixel.setRgb(color);
                }
                //show the canvas if it's hidden
                pxsim.svg.removeClass(this.background, "hidden");
                //resize if necessary
                var _a = [this.pixels[0], this.pixels[this.pixels.length - 1]], first = _a[0], last = _a[1];
                var yDiff = last.cy - first.cy;
                var newH = yDiff + CANVAS_VIEW_PADDING * 2;
                var _b = this.viewBox, oldX = _b[0], oldY = _b[1], oldW = _b[2], oldH = _b[3];
                if (oldH < newH) {
                    var scalar = newH / oldH;
                    var newW = oldW * scalar;
                    this.updateViewBox(-newW / 2, oldY, newW, newH);
                }
            };
            NeoPixelCanvas.prototype.setLoc = function (xy) {
                var x = xy[0], y = xy[1];
                pxsim.svg.hydrate(this.canvas, { x: x, y: y });
            };
            return NeoPixelCanvas;
        }());
        visuals.NeoPixelCanvas = NeoPixelCanvas;
        ;
        function digitalPinToPinNumber(gpioPin) {
            var MICROBIT_ID_IO_P0 = 7; //TODO: don't hardcode this, import enums.d.ts
            if (gpioPin == "*") {
                return MICROBIT_ID_IO_P0;
            }
            var pinSplit = gpioPin.split("DigitalPin.P");
            pxsim.U.assert(pinSplit.length === 2, "Unknown format for pin (for NeoPixel): " + gpioPin);
            var pinNumStr = pinSplit[1];
            var pinNum = Number(pinNumStr) + MICROBIT_ID_IO_P0;
            return pinNum;
        }
        function parseNeoPixelMode(modeStr) {
            var modeMap = {
                "NeoPixelMode.RGB": pxsim.NeoPixelMode.RGB,
                "NeoPixelMode.RGBW": pxsim.NeoPixelMode.RGBW
            };
            return modeMap[modeStr] || pxsim.NeoPixelMode.RGB;
        }
        var NeoPixelView = (function () {
            function NeoPixelView() {
                this.style = "\n            .sim-neopixel-canvas {\n            }\n            .sim-neopixel-canvas-parent:hover {\n                transform-origin: center;\n                transform: scale(4) translateY(-60px);\n            }\n            .sim-neopixel-canvas .hidden {\n                visibility:hidden;\n            }\n            .sim-neopixel-background {\n                fill: rgba(255,255,255,0.9);\n            }\n            .sim-neopixel-strip {\n            }\n        ";
            }
            NeoPixelView.prototype.init = function (bus, state, svgEl, otherParams) {
                pxsim.U.assert(!!otherParams["mode"], "NeoPixels assumes a RGB vs RGBW mode is passed to it");
                pxsim.U.assert(!!otherParams["pin"], "NeoPixels assumes a pin is passed to it");
                var modeStr = otherParams["mode"];
                this.mode = parseNeoPixelMode(modeStr);
                this.state = state;
                this.stripGroup = pxsim.svg.elt("g");
                this.element = this.stripGroup;
                var pinStr = otherParams["pin"];
                this.pin = digitalPinToPinNumber(pinStr);
                this.lastLocation = [0, 0];
                var part = mkNeoPixelPart();
                this.part = part;
                this.stripGroup.appendChild(part.el);
                var canvas = new NeoPixelCanvas(this.pin);
                this.canvas = canvas;
                var canvasG = pxsim.svg.elt("g", { class: "sim-neopixel-canvas-parent" });
                this.overElement = canvasG;
                canvasG.appendChild(canvas.canvas);
                this.updateStripLoc();
            };
            NeoPixelView.prototype.moveToCoord = function (xy) {
                var x = xy[0], y = xy[1];
                var loc = [x, y];
                this.lastLocation = loc;
                this.updateStripLoc();
            };
            NeoPixelView.prototype.updateStripLoc = function () {
                var _a = this.lastLocation, x = _a[0], y = _a[1];
                pxsim.U.assert(typeof x === "number" && typeof y === "number", "invalid x,y for NeoPixel strip");
                this.canvas.setLoc([x + CANVAS_LEFT, y + CANVAS_TOP]);
                pxsim.svg.hydrate(this.part.el, { transform: "translate(" + x + " " + y + ")" }); //TODO: update part's l,h, etc.
            };
            NeoPixelView.prototype.updateState = function () {
                var colors = this.state.getColors(this.pin, this.mode);
                this.canvas.update(colors);
            };
            NeoPixelView.prototype.updateTheme = function () { };
            return NeoPixelView;
        }());
        visuals.NeoPixelView = NeoPixelView;
    })(visuals = pxsim.visuals || (pxsim.visuals = {}));
})(pxsim || (pxsim = {}));
