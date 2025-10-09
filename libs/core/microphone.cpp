#include "pxt.h"

namespace input {

#if MICROBIT_CODAL
// Forward declaration of soundLevelCodal from microphone library
int soundLevelCodal();
#endif

/**
* Reads the loudness through the microphone from 0 (silent) to 255 (loud)
*/
//% help=input/sound-level
//% blockId=soundLevel block="sound level"
//% parts="microphone"
//% weight=34 blockGap=8
//% group="Sound"
int soundLevel() {
#if MICROBIT_CODAL
    return soundLevelCodal();
#else
    int min = 1023;
    int max = 0;

    for (int i = 0; i < 32; i++) {
        int level = uBit.io.MICROPHONE.getAnalogValue();
        if (level > max) {
            max = level;
        }
        if (level < min) {
            min = level;
        }
        uBit.sleep(5); // Add a small delay to allow the analog input to settle
    }

    int range = max - min + 0.5;
    int level = floor(range / 4); // Divide by 4 to get a value between 0 and 255

    return level;
#endif
}

}