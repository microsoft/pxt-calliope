/**
 * Provides access to basic calliope mini functionality.
 */
namespace basic {

    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color1 The color of the first LED in RGB format (e.g., 0xFF0000 for red).
     * @param color2 The second LED color.
     * @param color3 The third LED color.
     * @param brightness The LED brightness in percent.
     */
    //% help=basic/set-led-colors
    //% blockId=device_set_led_colors
    //% block="set LED to %color1=colorNumberPicker %color2=colorNumberPicker %color3=colorNumberPicker"
    //% color1.defl=0xff0000
    //% color2.defl=0xff0000
    //% color3.defl=0xff0000
    //% brightness.defl=20
    //% expandableArgumentMode="toggle"
    //% weight=10
    //% group="RGB LED"
    //% inlineInputMode=inline
    //% hidden=1
    export function  setLedColors(color1: number, color2: number, color3: number, brightness: number = 20) {
        setLedColorDal(color1);
    }

}