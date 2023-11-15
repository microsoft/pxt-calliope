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
     * Do something when the logo is touched and released again. Calliope mini 3 block.
     * @param body the code to run when the logo is pressed
     */
    //% weight=83 blockGap=32
    //% blockId=input_logo_event block="on logo $action"
    //% group="Logo"
    //% parts="logotouch"
    //% help="input/on-logo-event"
    void onLogoEvent(TouchButtonEvent action, Action body) {
#if MICROBIT_CODAL
        registerWithDal(uBit.logo.id, action, body);
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
    }

    /**
     * Get the logo state (pressed or not). Calliope mini 3 block.
     */
    //% weight=58
    //% blockId="input_logo_is_pressed" block="logo is pressed"
    //% blockGap=8
    //% group="Logo"
    //% parts="logotouch"
    //% help="input/logo-is-pressed"
    bool logoIsPressed() {
#if MICROBIT_CODAL
        return uBit.logo.isPressed();
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
        return false;
#endif
    }
}
