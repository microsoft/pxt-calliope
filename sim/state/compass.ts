namespace pxsim.input {
    export function compassHeading(): number {
        let b = board().compassState;
        if (!b.usesHeading) {
            b.usesHeading = true;
            runtime.queueDisplayUpdate();
        }
        return b.heading;
    }

    export function assumeCalibrationCompass(){
    }

    export function clearCalibrationCompass(){
    }    

    export function isCalibratedCompass(): boolean {
        // let b = board().compassState;
        // return b.isCalibrated;
        // TODO
        return true;
    }

    export function magneticForce(): number {
        // TODO
        return 0;
    }

}