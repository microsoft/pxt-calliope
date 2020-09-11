let compassImages = [
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
    `),
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

let compassImagesDownside = [
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
    `),
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




namespace images {
    /**
     * Draws needle on the screen which always points to north
     * @param interval the amount of time (milliseconds) to show the needle. Default is 600.
     */
    //% weight=50 blockGap=8
    //% blockId=basic_show_compass
    //% block="show compass needle for $interval|ms"
    //% interval.shadow=timePicker
    //% interval.min=1
    //% interval.defl=600
    //% parts="ledmatrix"
    //% advanced=true
    export function showCompass(interval = 600) {
        let i = 0
        let startTime = input.runningTime()
        let endTime = startTime + interval
        let refreshRate = 100
        let rest = 0
        
        while ((endTime) > (input.runningTime() + refreshRate)) {
            i = Math.round((input.compassHeading() - 11.25) / 22.5)
            if (input.isGesture(Gesture.ScreenDown)) {
                compassImagesDownside[i].showImage(0, refreshRate)
            } else {
                compassImages[i].showImage(0, refreshRate)
            }
        }

        rest = (endTime - input.runningTime())
        if(rest > 0) {
            i = Math.round((input.compassHeading() - 11.25) / 22.5)
            if (input.isGesture(Gesture.ScreenDown)) {
                compassImagesDownside[i].showImage(0, rest)
            } else {
                compassImages[i].showImage(0, rest)
            }
           
        }    
    }

}