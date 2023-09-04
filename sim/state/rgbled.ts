namespace pxsim.basic {
    export function setLedColor(c: number) {
    }

    export function setLedColors(c1: number, c2: number, c3: number) {
    }

    export function setLedColorDal(c: number) {
        board().rgbLedState = c;
        runtime.queueDisplayUpdate()
    }

    export function setLedColorsCodal(c1: number, c2: number, c3: number) {
        board().rgbLedState = c1;
        runtime.queueDisplayUpdate()
    }

    export function turnRgbLedOff() {
        board().rgbLedState = 0;
        runtime.queueDisplayUpdate()
    }
}