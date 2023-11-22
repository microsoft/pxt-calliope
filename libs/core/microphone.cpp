#include "pxt.h"

#if MICROBIT_CODAL
#include "LevelDetector.h"
#include "LevelDetectorSPL.h"
#endif

#define MICROPHONE_MIN_CODAL 52.0f
#define MICROPHONE_MAX_CODAL 120.0f

//% color=#B4009E weight=99 icon="\uf192"
namespace input {
        
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
    LevelDetectorSPL* level = uBit.audio.levelSPL;
    if (NULL == level)
        return 0;
    const int micValue = level->getValue();
    const int scaled = max(MICROPHONE_MIN_CODAL, min(micValue, MICROPHONE_MAX_CODAL)) - MICROPHONE_MIN_CODAL;
    return min(0xff, scaled * 0xff / (MICROPHONE_MAX_CODAL - MICROPHONE_MIN_CODAL));
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