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
        let value = 0
        let max = pins.analogReadPin(AnalogPin.MIC)
        let min = max
        for (let index = 0; index < 32; index++) {
            value = pins.analogReadPin(AnalogPin.MIC)
            if (value > max) {
                max = value
            } else if (value < min) {
                min = value
            }
        }
        value = Math.floor((max - min) / 4)
        return value
    }
}
