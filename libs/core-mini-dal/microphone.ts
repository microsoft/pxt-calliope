/**
 * Events and data from sensors
 */
//% color=#C90072 weight=99
namespace input {
    /**
     * gets the level of loudness from 0 (silent) to 255 (loud)
     */
    //% blockId="loudness"
    //% block="Loudness"
    //% deprecated=true
    export function loudness(): number {
        return input.soundLevel()
    }
}
