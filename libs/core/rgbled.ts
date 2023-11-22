/**
  Well known colors
*/
enum Colors {
    //% blockIdentity=basic.color
    //% block=red
    Red = 0x00FF0000,
    //% blockIdentity=basic.color
    //% block=orange
    Orange = 0x00FFA500,
    //% blockIdentity=basic.color
    //% block=yellow
    Yellow = 0x00FFFF00,
    //% blockIdentity=basic.color
    //% block=green
    Green = 0x0000FF00,
    //% blockIdentity=basic.color
    //% block=blue
    Blue = 0x000000FF,
    //% blockIdentity=basic.color
    //% block=indigo
    Indigo = 0x004b0082,
    //% blockIdentity=basic.color
    //% block=violet
    Violet = 0x008a2be2,
    //% blockIdentity=basic.color
    //% block=purple
    Purple = 0x00FF00FF,
    //% blockIdentity=basic.color
    //% block=white
    White = 0xFFFFFFFF,
    //% blockIdentity=basic.color
    //% block=off
    Off = 0x00000000,
}

/**
 * Provides access to basic Calliope mini functionality.
 */
//% color=#54C9C9 weight=100 icon="\uf00a"
//% groups=['LED matrix', 'Control', 'RGB LED', 'others']
namespace basic {

    /**
     * Converts the color name to a number
     */
    //% blockId=color_id block="%c" shim=TD_ID
    //% group="RGB LED"
    //% weight=1
    //% deprecated=true
    export function color(c: Colors): number {
        return c;
    }

    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% weight=3
    //% help=basic/rgb
    //% blockId="core_rgb" block="red %red|green %green|blue %blue"
    //% group="RGB LED"
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

}
