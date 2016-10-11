namespace pxsim.basic {
    export function setLedColor(c: number) {
        board().rgbLedState = c;
        runtime.queueDisplayUpdate()
    }
}