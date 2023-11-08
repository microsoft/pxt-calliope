// Auto-generated. Do not edit.



    //% color=#008272 weight=30 icon="\uf1b9"
declare namespace motors {

    /**
     * Turns on the motor at a certain percent of power. Switches to single motor mode!
     * @param power %percent of power sent to the motor. Negative power goes backward. eg: 50
     */
    //% blockId=motor_power_dal shim=motors::motorPowerDal
    function motorPowerDal(power: int32): void;

    /**
     * Send break, coast or sleep commands to the motor. Has no effect in dual-motor mode.
     */
    //% blockId=motor_command_dal
    //% hidden=1 shim=motors::motorCommandDal
    function motorCommandDal(command: MotorCommand): void;

    /**
     * Controls two motors attached to the board. Switches to dual-motor mode!
     */
    //% blockId=dual_motor_power_dal
    //% hidden=1 shim=motors::dualMotorPowerDal
    function dualMotorPowerDal(motor: Motor, duty_percent: int32): void;
}


    /**
     * Provides access to basic calliope mini functionality.
     */

declare namespace basic {

    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     */
    //% blockId=device_turn_rgb_led_off block="turn built-in LED off"
    //% help=basic/turn-rgb-led-off
    //% weight=10
    //% group="RGB LED"
    //% advanced=true shim=basic::turnRgbLedOff
    function turnRgbLedOff(): void;

    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color1 The color of the first LED in RGB format (e.g., 0xFF0000 for red).
     */
    //% blockId=device_set_led_colors-dal
    //% hidden=1 shim=basic::setLedColorDal
    function setLedColorDal(color: int32): void;

    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color1 The color of the first LED in RGB format (e.g., 0xFF0000 for red).
     * @param color2 The second LED color.
     * @param color3 The third LED color.
     * @param brightness The LED brightness in percent.
     */
    //% blockId=device_set_led_colors-codal
    //% hidden=1 brightness.defl=20 shim=basic::setLedColorsCodal
    function setLedColorsCodal(color1: int32, color2: int32, color3: int32, brightness?: int32): void;

    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color The color of the LED in RGB format (e.g., 0xFF0000 for red).
     */
    //% help=basic/set-led-color
    //% blockId=device_set_led_color
    //% block="set LED to %color=colorNumberPicker"
    //% expandableArgumentMode="toggle"
    //%
    //%
    //%
    //%
    //% weight=10
    //% group="RGB LED" color.defl=0xff0000 shim=basic::setLedColor
    function setLedColor(color?: int32): void;
}

// Auto-generated. Do not edit. Really.
