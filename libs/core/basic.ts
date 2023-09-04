/**
 * Provides access to basic micro:bit functionality.
 */
//% color=#54C9C9 weight=100 icon="\uf00a"
//% groups=['LED matrix', 'Control', 'RGB LED', 'others']
namespace basic {
    
    /**
     * Scroll a number on the screen. If the number fits on the screen (i.e. is a single digit), do not scroll.
     * @param interval speed of scroll; eg: 50, 100, 150, 200
     */
    //% help=basic/show-number
    //% weight=95
    //% blockId=device_show_number
    //% block="show|number %number || in an interval of %interval ms" blockGap=8
    //% async
    //% parts="ledmatrix"
    //% expandableArgumentMode="toggle"
    //% interval.defl=150
    //% group="LED matrix"
    export function showNumber(value: number, interval?: number) {
        if (isNaN(value))
            showString("?")
        else
            showString(Math.roundWithPrecision(value, 2).toString(), interval);
    }

}

/**
 * Pause for the specified time in milliseconds
 * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
 */
    function pause(ms: number): void {
    if (isNaN(ms)) ms = 20
    basic.pause(ms);
}

/**
 * Repeats the code forever in the background. On each iteration, allows other codes to run.
 * @param body code to execute
 */
function forever(a: () => void): void {
    basic.forever(a);
}