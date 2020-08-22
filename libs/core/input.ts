/**
 * Events and data from sensors
 */
//% color=#C90072 weight=99
namespace input {
    /**
     * Attaches code to run when the screen is facing up.
     * @param body TODO
     */
    //% help=input/on-screen-up
    export function onScreenUp(body: () => void): void {
        onGesture(Gesture.ScreenUp, body);
    }

    /**
     * Attaches code to run when the screen is facing down.
     * @param body TODO
     */
    //% help=input/on-screen-down
    export function onScreenDown(body: () => void): void {
        onGesture(Gesture.ScreenDown, body);
    }

    /**
     * Attaches code to run when the device is shaken.
     * @param body TODO
     */
    //% deprecated=true
    //% help=input/on-shake
    export function onShake(body: () => void): void {
        onGesture(Gesture.Shake, body);
    }

    /**
     * Attaches code to run when the logo is oriented upwards and the board is vertical.
     * @param body TODO
     */
    //% help=input/on-logo-up
    export function onLogoUp(body: () => void): void {
        onGesture(Gesture.LogoUp, body);
    }

    /**
     * Attaches code to run when the logo is oriented downwards and the board is vertical.
     * @param body TODO
     */
    //% help=input/on-logo-down
    export function onLogoDown(body: () => void): void {
        onGesture(Gesture.LogoDown, body);
    }

    /**
     * Obsolete, use input.calibrateCompass instead.
     */
    //% weight=0 help=input/calibrate-compass
    export function calibrate() {
        input.calibrateCompass();
    }


    /**
     * Gets the number of milliseconds elapsed since power on.
     */
    //% help=input/running-time weight=50 blockGap=8
    //% blockId=device_get_running_time block="running time (ms)"
    //% advanced=true
    export function runningTime() {
        return control.millis();
    }

    /**
     * Gets the number of microseconds elapsed since power on.
     */
    //% help=input/running-time-micros weight=49
    //% blockId=device_get_running_time_micros block="running time (micros)"
    //% advanced=true
    export function runningTimeMicros() {
        return control.micros();
    }


     /**
      * gets the level of loudness in 0-100%
      */
    //% blockId="loudness"
    //% block="Loudness"

    export function loudness(): number {
        let value = 0
        let max = 0
        let min = 1023
        for (let index = 0; index < 32; index++) {
            value = pins.analogReadPin(50)
            if (value > max) {
                max = value
            } else if (value < min) {
                min = value
            }
        }
        value = (max - min) * 977 / 10000
        return value
    }


}
