#include "pxt.h"

/**
 * Provides access to basic calliope mini functionality.
 */
namespace basic {

    // Define an array to hold RGB LED data
    uint8_t rgbBuffer[9] = {0};

    // Call this function once to initialize the Calliope mini board
    // void initializeMicroBit() {
    //     uBit.init();
    // }


    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color1 The color of the first LED in RGB format (e.g., 0xFF0000 for red).
     */
    //% blockId=device_set_led_colors-dal
    //% hidden=1
    void setLedColorDal(int color) {
#if MICROBIT_CODAL
        return;
#else
        if (!color) {
            uBit.rgb.off();
            return;
        }
        // Extract RGB components from the color value
        int w = (color >> 24) & 0xFF;
        int r = (color >> 16) & 0xFF;
        int g = (color >> 8) & 0xFF;
        int b = color & 0xFF;
        uBit.rgb.setColour(r, g, b, w);
#endif
    }


    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color1 The color of the first LED in RGB format (e.g., 0xFF0000 for red).
     * @param color2 The second LED color.
     * @param color3 The third LED color.
     * @param brightness The LED brightness in percent.
     */
    //% blockId=device_set_led_colors-codal
    //% hidden=1
    void setLedColorsCodal(int color1, int color2, int color3, int brightness = 20) {
#if MICROBIT_CODAL
        // Extract RGB components from the color values
        int r1 = ((color1 >> 16) & 0xFF) * brightness / 100;
        int g1 = ((color1 >> 8) & 0xFF) * brightness / 100;
        int b1 = (color1 & 0xFF) * brightness / 100;

        int r2 = ((color2 >> 16) & 0xFF) * brightness / 100;
        int g2 = ((color2 >> 8) & 0xFF) * brightness / 100;
        int b2 = (color2 & 0xFF) * brightness / 100;

        int r3 = ((color3 >> 16) & 0xFF) * brightness / 100;
        int g3 = ((color3 >> 8) & 0xFF) * brightness / 100;
        int b3 = (color3 & 0xFF) * brightness / 100;

        memset(rgbBuffer, 0, sizeof(rgbBuffer)); // Clear the buffer
        rgbBuffer[0] = g1;
        rgbBuffer[1] = r1;
        rgbBuffer[2] = b1;
        rgbBuffer[3] = g2;
        rgbBuffer[4] = r2;
        rgbBuffer[5] = b2;
        rgbBuffer[6] = g3;
        rgbBuffer[7] = r3;
        rgbBuffer[8] = b3;
        neopixel_send_buffer(uBit.io.RGB, rgbBuffer, sizeof(rgbBuffer));
#else
        setLedColorDal(color1);
#endif
    }


    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     */
    //% blockId=device_turn_rgb_led_off block="turn built-in LED off"
    //% help=basic/turn-rgb-led-off
    //% weight=10
    //% group="RGB LED"
    //% advanced=true
    void turnRgbLedOff() {
#if MICROBIT_CODAL
        setLedColorsCodal(0,0,0);
#else
        setLedColorDal(0);
#endif
    }


    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color The color of the LED in RGB format (e.g., 0xFF0000 for red).
     */
    //% help=basic/set-led-color
    //% blockId=device_set_led_color
    //% block="set LED to %color=colorNumberPicker"
    //% expandableArgumentMode="toggle"
    //% interval.defl=150
    //% color.defl=0xff0000
    //% color2.defl=0x000000
    //% color3.defl=0x000000
    //% weight=10
    //% group="RGB LED"
    void setLedColor(int color) {
#if MICROBIT_CODAL
        setLedColorsCodal(color, color, color);
#else
        setLedColorDal(color);
#endif
    }

}