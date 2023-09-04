const compassImagesLeft = [
    images.createImage(`
    . . # . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `),
    images.createImage(`
    . # . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `),
    images.createImage(`
    # . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `),
    images.createImage(`
    . . . . .
    # . . . .
    . . # . .
    . . . . .
    . . . . .
    `),
    images.createImage(`
    . . . . .
    . . . . .
    # . # . .
    . . . . .
    . . . . .
    `),
    images.createImage(`
    . . . . .
    . . . . .
    . . # . .
    # . . . .
    . . . . .
    `),
    images.createImage(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    # . . . .
    `),
    images.createImage(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . # . . .
    `)];

const compassImagesRight = [
    images.createImage(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . # . .
    `),
    images.createImage(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . # .
    `),
    images.createImage(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . #
    `),
    images.createImage(`
    . . . . .
    . . . . .
    . . # . .
    . . . . #
    . . . . .
    `),
    images.createImage(`
    . . . . .
    . . . . .
    . . # . #
    . . . . .
    . . . . .
    `),
    images.createImage(`
    . . . . .
    . . . . #
    . . # . .
    . . . . .
    . . . . .
    `),
    images.createImage(`
    . . . . #
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `),
    images.createImage(`
    . . . # .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)];

const compassImages = compassImagesLeft.concat(compassImagesRight);
const compassImagesDownside = compassImagesRight.concat(compassImagesLeft);


namespace basic {
    /**
     * Draws needle on the screen which always points to north
     * @param interval the amount of time (milliseconds) to show the needle. Default is 600.
     */
    //% weight=50 blockGap=8
    //% help=basic/show-compass
    //% blockId=basic_show_compass
    //% block="show compass needle for $interval|ms"
    //% interval.shadow=timePicker
    //% interval.min=1
    //% interval.defl=600
    //% parts="ledmatrix"
    //% advanced=true
    //% group="LED matrix"
    export function showCompass(interval = 600) {
        let i = 0
        let startTime = input.runningTime()
        let endTime = startTime + interval
        let refreshRate = 100
        let rest = 0
        
        while ((endTime) > (input.runningTime() + refreshRate)) {
            i = Math.round((input.compassHeading() - 11.25) / 22.5)
            let images = (input.isGesture(Gesture.ScreenDown)) ? compassImagesDownside : compassImages;
            images[i].showImage(0, refreshRate)
        }

        rest = (endTime - input.runningTime())
        if(rest > 0) {
            i = Math.round((input.compassHeading() - 11.25) / 22.5)
            let images = (input.isGesture(Gesture.ScreenDown)) ? compassImagesDownside : compassImages;
            images[i].showImage(0, rest) 
        }    
    }

}