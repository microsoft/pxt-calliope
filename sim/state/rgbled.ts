namespace pxsim.basic {
    export function setLedColor(c: number) {
        board().rgbLedState = c;
        runtime.queueDisplayUpdate()
    }

    export function turnRgbLedOff() {
        board().rgbLedState = 0;
        runtime.queueDisplayUpdate()
    }
}