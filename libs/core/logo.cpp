#include "pxt.h"

/**
 * An action on a touch button
 */
enum TouchButtonEvent {
    //% block=pressed
    Pressed = MICROBIT_BUTTON_EVT_CLICK,
    //% block=touched
    Touched = MICROBIT_BUTTON_EVT_DOWN,
    //% block=released
    Released = MICROBIT_BUTTON_EVT_UP,
    //% block="long pressed"
    LongPressed = MICROBIT_BUTTON_EVT_LONG_CLICK
};

namespace input {
    /**
     * Do something when the logo is touched and released again.
     * @param body the code to run when the logo is pressed
     */
    //% weight=83 blockGap=32
    //% blockId=input_logo_event block="on logo $action"
    //% group="Calliope mini V3"
    //% parts="logotouch"
    //% help="input/on-logo-event"
    void onLogoEvent(TouchButtonEvent action, Action body) {
#if MICROBIT_CODAL
        registerWithDal(uBit.io.logo.id, action, body);
#else
        // mini V1/V2 have no touch logo: ignore the registration instead of
        // panicking, so a program using this block still runs on those boards.
        (void)action; (void)body;
#endif
    }

    /**
     * Get the logo state (pressed or not).
     */
    //% weight=58
    //% blockId="input_logo_is_pressed" block="logo is pressed"
    //% blockGap=8
    //% group="Calliope mini V3"
    //% parts="logotouch"
    //% help="input/logo-is-pressed"
    bool logoIsPressed() {
#if MICROBIT_CODAL
        return uBit.io.logo.isTouched();
#else
        // no touch logo on mini V1/V2 -> never pressed (see onLogoEvent)
        return false;
#endif
    }
}
