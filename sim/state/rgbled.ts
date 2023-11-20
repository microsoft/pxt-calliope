namespace pxsim.basic {
    export function setLedColor(c: number) {
        board().rgbLedLeftState = c;
        board().rgbLedState = c;
        board().rgbLedRightState = c;
        runtime.queueDisplayUpdate();
    }

    export function setLedColors(c1: number, c2: number, c3: number) {
    }

    export function setLedColorDal(c: number) {
        board().rgbLedState = c;
        runtime.queueDisplayUpdate()
    }

    export function setLedColorsCodal(c1: number, c2: number, c3: number) {
        board().rgbLedLeftState = c1;
        board().rgbLedState = c2;
        board().rgbLedRightState = c3;
        runtime.queueDisplayUpdate()
    }

    export function turnRgbLedOff() {
        board().rgbLedLeftState = 0;
        board().rgbLedState = 0;
        board().rgbLedRightState = 0;
        runtime.queueDisplayUpdate()
    }
}