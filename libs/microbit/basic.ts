/**
  Well known colors
*/
enum Colors {
    //% blockIdentity=basic.color
    //% block=red
    Red = 0xFF0000,
    //% blockIdentity=basic.color
    //% block=orange
    Orange = 0xFFA500,
    //% blockIdentity=basic.color
    //% block=yellow
    Yellow = 0xFFFF00,
    //% blockIdentity=basic.color
    //% block=green
    Green = 0x00FF00,
    //% blockIdentity=basic.color
    //% block=blue
    Blue = 0x0000FF,
    //% blockIdentity=basic.color
    //% block=indigo
    Indigo = 0x4b0082,
    //% blockIdentity=basic.color
    //% block=violet
    Violet = 0x8a2be2,
    //% blockIdentity=basic.color
    //% block=purple
    Purple = 0xFF00FF,
    //% blockIdentity=basic.color
    //% block=white
    White = 0xFFFFFF
}

/**
 * Provides access to basic micro:bit functionality.
 */
//% color=#0078D7 weight=100
namespace basic {

    /**
    * Sets the color on the build-in LED
    */
    //% blockId=device_set_led_color block="set led to %color=color_id" icon="\uf00a"
    //% weight=50
    export function setLedColor(color: number) {
        // TODO
    }

    /**
     * Converts the color name to a number
     */
    //% blockId=color_id block="%c" shim=TD_ID
    export function color(c: Colors): number {
        return c;
    }
}