enum ButtonEvent {
    //% blockIdentity="input.buttonEventValue"
    //% block="pressed down"
    Down = 1,   // MICROBIT_BUTTON_EVT_DOWN
    //% blockIdentity="input.buttonEventValue"
    //% block="released up"
    Up = 2,     // MICROBIT_BUTTON_EVT_UP
    //% blockIdentity="input.buttonEventValue"
    //% block="clicked"
    Click = 3,  // MICROBIT_BUTTON_EVT_CLICK
    //% blockIdentity="input.buttonEventValue"
    //% block="long clicked"
    LongClick = 4, // MICROBIT_BUTTON_EVT_LONG_CLICK
    //% blockIdentity="input.buttonEventValue"
    //% block="hold"
    Hold = 5,   // MICROBIT_BUTTON_EVT_HOLD
}

/**
 * Events and data from sensors
 */
//% color=#C90072 weight=99 icon="\uf192"
//% groups=['Events', 'States', 'Sensors', 'Configuration', 'System', 'others']
namespace input {

    /**
     * Returns the ID of a button event, for use as the changeable event type in
     * input.onButtonEvent / input.onPinTouchEvent (the shadow dropdown).
     */
    //% help=input/button-event
    //% weight=19 blockId="control_button_event_value" block="%id"
    //% advanced=true
    //% group="Events"
    export function buttonEventValue(id: ButtonEvent): number {
        return id;
    }

    /**
     * Default shadow for button events: clicked.
     */
    //% blockId="control_button_event_click" block="clicked"
    //% advanced=true blockHidden=true
    export function buttonEventClick(): number {
        return ButtonEvent.Click;
    }

    /**
     * Default shadow for pin touch events: pressed down.
     */
    //% blockId="control_button_event_down" block="pressed down"
    //% advanced=true blockHidden=true
    export function buttonEventDown(): number {
        return ButtonEvent.Down;
    }
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
    //% group="System"
    export function runningTime() {
        return control.millis();
    }

    /**
     * Gets the number of microseconds elapsed since power on.
     */
    //% help=input/running-time-micros weight=49
    //% blockId=device_get_running_time_micros block="running time (micros)"
    //% advanced=true
    //% group="System"
    export function runningTimeMicros() {
        return control.micros();
    }
}
