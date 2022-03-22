/*
The MIT License (MIT)

Copyright (c) 2013-2016 The MicroPython-on-micro:bit Developers, as listed
in the accompanying AUTHORS file

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Images from file microbitconstimage.cpp https://github.com/bbcmicrobit/micropython

enum IconNames {
    //% block="heart"
    //% jres=icons.heart
    Heart = 0,
    //% block="small heart"
    //% jres=icons.smallheart
    SmallHeart,
    //% block="yes"
    //% jres=icons.yes
    Yes,
    //% block="no"
    //% jres=icons.no
    No,
    //% block="happy"
    //% jres=icons.happy
    Happy,
    //% block="sad"
    //% jres=icons.sad
    Sad,
    //% block="confused"
    //% jres=icons.confused
    Confused,
    //% block="angry"
    //% jres=icons.angry
    Angry,
    //% block="asleep"
    //% jres=icons.asleep
    Asleep,
    //% block="surprised"
    //% jres=icons.surprised
    Surprised,
    //% block="silly"
    //% jres=icons.silly
    Silly,
    //% block="fabulous"
    //% jres=icons.fabulous
    Fabulous,
    //% block="meh"
    //% jres=icons.meh
    Meh,
    //% block="arrow north"
    //% jres=icons.arrownorth
    ArrowNorth,
    //% block="arrow north east"
    //% jres=icons.arrownortheast
    ArrowNorthEast,
    //% block="arrow East"
    //% jres=icons.arroweast
    ArrowEast,
    //% block="arrow south east"
    //% jres=icons.arrowsoutheast
    ArrowSouthEast,
    //% block="arrow south"
    //% jres=icons.arrowsouth
    ArrowSouth,
    //% block="arrow south west"
    //% jres=icons.arrowsouthwest
    ArrowSouthWest,
    //% block="arrow west"
    //% jres=icons.arrowwest
    ArrowWest,
    //% block="arrow north west"
    //% jres=icons.arrownorthwest
    ArrowNorthWest
}


namespace basic {

    /**
     * Draws the selected icon on the LED screen
     * @param icon the predefined icon id
     * @param interval the amount of time (milliseconds) to block the LED Matrix for showing the icon. Default is 200.
     */
    //% weight=90 blockGap=8
    //% blockId=basic_show_icon
    //% block="show icon %i || for %interval ms" icon="\uf00a"
    //% parts="ledmatrix"
    //% help=basic/show-icon
    //% icon.fieldEditor="imagedropdown"
    //% icon.fieldOptions.columns="5"
    //% icon.fieldOptions.width="380"
    //% icon.fieldOptions.maxRows=4
    //% expandableArgumentMode="toggle"
    //% interval.defl=200
    //% group="LED matrix"
    export function showIcon(icon: IconNames, interval = 200) {
        let res = images.iconImage(icon)
        res.showImage(0, interval)
    }

}


namespace images {

    //% weight=50 blockGap=8
    //% help=images/icon-image
    //% blockId=builtin_image block="icon image %i"
    //% i.fieldEditor="imagedropdown"
    //% i.fieldOptions.columns="5"
    //% i.fieldOptions.width="380"
    //% i.fieldOptions.maxRows=4
    export function iconImage(i: IconNames): Image {
        switch (i) {
            case IconNames.Heart: return images.createImage(`
                                        . # . # .
                                        # # # # #
                                        # # # # #
                                        . # # # .
                                        . . # . .`);

            case IconNames.SmallHeart: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . # # # .
                                        . . # . .
                                        . . . . .`);
            //faces
            case IconNames.Happy: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        # . . . #
                                        . # # # .`);
            case IconNames.Sad: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # # # .
                                        # . . . #`);
            case IconNames.Confused: return images.createImage(`
                                        . . . . .
                                        . # . # .
                                        . . . . .
                                        . # . # .
                                        # . # . #`);
            case IconNames.Angry: return images.createImage(`
                                        # . . . #
                                        . # . # .
                                        . . . . .
                                        # # # # #
                                        # . # . #`);
            case IconNames.Asleep: return images.createImage(`
                                        . . . . .
                                        # # . # #
                                        . . . . .
                                        . # # # .
                                        . . . . .`);
            case IconNames.Surprised: return images.createImage(`
                                        . # . # .
                                        . . . . .
                                        . . # . .
                                        . # . # .
                                        . . # . .`);
            case IconNames.Silly: return images.createImage(`
                                        # . . . #
                                        . . . . .
                                        # # # # #
                                        . . . # #
                                        . . . # #`);
            case IconNames.Fabulous: return images.createImage(`
                                        # # # # #
                                        # # . # #
                                        . . . . .
                                        . # . # .
                                        . # # # .`);
            case IconNames.Meh: return images.createImage(`
                                        # # . # #
                                        . . . . .
                                        . . . # .
                                        . . # . .
                                        . # . . .`);
            case IconNames.Yes: return images.createImage(`
                                        . . . . .
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        . # . . .`);
            case IconNames.No: return images.createImage(`
                                        # . . . #
                                        . # . # .
                                        . . # . .
                                        . # . # .
                                        # . . . #`);
            // arrows
            case IconNames.ArrowNorth: return images.createImage(`
                                        . . # . .
                                        . # # # .
                                        # . # . #
                                        . . # . .
                                        . . # . .`);
            case IconNames.ArrowNorthEast: return images.createImage(`
                                        . . # # #
                                        . . . # #
                                        . . # . #
                                        . # . . .
                                        # . . . .`);
            case IconNames.ArrowEast: return images.createImage(`
                                        . . # . .
                                        . . . # .
                                        # # # # #
                                        . . . # .
                                        . . # . .`);
            case IconNames.ArrowSouthEast: return images.createImage(`
                                        # . . . .
                                        . # . . .
                                        . . # . #
                                        . . . # #
                                        . . # # #`);
            case IconNames.ArrowSouth: return images.createImage(`
                                        . . # . .
                                        . . # . .
                                        # . # . #
                                        . # # # .
                                        . . # . .`);
            case IconNames.ArrowSouthWest: return images.createImage(`
                                        . . . . #
                                        . . . # .
                                        # . # . .
                                        # # . . .
                                        # # # . .`);
            case IconNames.ArrowWest: return images.createImage(`
                                        . . # . .
                                        . # . . .
                                        # # # # #
                                        . # . . .
                                        . . # . .`);
            case IconNames.ArrowNorthWest: return images.createImage(`
                                        # # # . .
                                        # # . . .
                                        # . # . .
                                        . . . # .
                                        . . . . #`);
            default: return images.createImage(`
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        `);
        }
    }

}
