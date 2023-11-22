#include "pxt.h"


/**
 * Provides access to basic Calliope mini functionality.
 */
namespace basic {

    /**
     * Draws an image on the LED screen.
     * @param leds the pattern of LED to turn on/off.
     * @param interval time in milliseconds to pause after drawing.
     */
    //% help=basic/show-leds
    //% weight=85 blockGap=8
    //% imageLiteral=1 async
    //% blockId=device_show_leds
    //% block="show leds" icon="\uf00a"
    //% parts="ledmatrix"
    //% group="LED matrix"
    void showLeds(ImageLiteral_ leds, int interval = 400) {
      uBit.display.print(MicroBitImage(imageBytes(leds)), 0, 0, 0, interval);
    }

    /**
     * Display text on the display, one character at a time. If the string fits on the screen (i.e. is one letter), does not scroll.
     * @param text the text to scroll on the screen, eg: "hi!"
     * @param interval how fast to shift characters; eg: 50, 100, 150, 200
     */
    //% help=basic/show-string
    //% weight=100 blockGap=16
    //% block="show|string %text || in an interval of %interval ms"
    //% async
    //% blockId=device_print_message
    //% parts="ledmatrix"
    //% text.shadowOptions.toString=true
    //% expandableArgumentMode="toggle"
    //% interval.defl=150
    //% group="LED matrix"
    void showString(String text, int interval = 150) {
      if (interval <= 0)
        interval = 1;
      int l = text ? text->getUTF8Size() : 0;
      if (l == 0) {
        uBit.display.clear();
        fiber_sleep(interval * 5);
      } else if (l > 1) {
        uBit.display.scroll(MSTR(text), interval);
      } else {
        uBit.display.printChar(text->getUTF8Data()[0], interval * 5);
      }
    }

    /**
     * Turn off all LEDs
     */
    //% help=basic/clear-screen weight=75
    //% blockId=device_clear_display block="clear screen"
    //% parts="ledmatrix"
    //% group="LED matrix"
    //% advanced=true
    void clearScreen() {
      uBit.display.image.clear();
    }

    /**
     * Shows a sequence of LED screens as an animation.
     * @param leds pattern of LEDs to turn on/off
     * @param interval time in milliseconds between each redraw.
     */
    //% help=basic/show-animation weight=83 imageLiteral=1 async
    //% parts="ledmatrix"
    //% group="LED matrix"
    void showAnimation(ImageLiteral_ leds, int interval = 400) {
      uBit.display.animate(MicroBitImage(imageBytes(leds)), interval, 5, 0, 0);
    }

    /**
     * Draws an image on the LED screen.
     * @param leds pattern of LEDs to turn on/off
     */
    //% help=basic/plot-leds weight=80
    //% parts="ledmatrix"
    //% group="LED matrix"
    void plotLeds(ImageLiteral_ leds) {
      MicroBitImage i(imageBytes(leds));
      uBit.display.print(i, 0, 0, 0, 0);
    }

    /**
     * Repeats the code forever in the background. On each iteration, allows other codes to run.
     * @param body code to execute
     */
    //% help=basic/forever weight=55 blockGap=16 blockAllowMultiple=1 afterOnStart=true
    //% blockId=device_forever block="forever" icon="\uf01e"
    //% group="Control"
    void forever(Action a) {
      runForever(a);
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=basic/pause weight=50
    //% async block="pause (ms) %pause" blockGap=16
    //% blockId=device_pause icon="\uf110"
    //% pause.shadow=timePicker
    //% group="Control"
    void pause(int ms) {
      fiber_sleep(ms);
    }

}