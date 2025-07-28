#include "pxt.h"

#if MICROBIT_CODAL
#include "LevelDetector.h"
#include "LevelDetectorSPL.h"
#endif

enum class DetectedSound {
    //% block="loud"
    Loud = 2,
    //% block="quiet"
    Quiet = 1
};

enum class SoundThreshold {
    //% block="loud"
    Loud = 2,
    //% block="quiet"
    Quiet = 1
};
namespace input {

#if MICROBIT_CODAL
bool didInit;

void init() {
    if (didInit) {
        return;
    }

    didInit = true;
    uBit.audio.levelSPL->setUnit(LEVEL_DETECTOR_SPL_8BIT);
}

#endif

/**
* Registers an event that runs when a sound is detected
*/
//% help=input/on-sound
//% blockId=input_on_sound block="on %sound sound"
//% parts="microphone"
//% weight=33 blockGap=12
//% group="Sound"
void onSound(DetectedSound sound, Action handler) {
#if MICROBIT_CODAL
    init();
    const auto thresholdType = sound == DetectedSound::Loud ? LEVEL_THRESHOLD_HIGH : LEVEL_THRESHOLD_LOW;
    registerWithDal(DEVICE_ID_SYSTEM_LEVEL_DETECTOR, thresholdType, handler);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}


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
    init();
    return uBit.audio.levelSPL->getValue();
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

/**
* Sets the threshold for a sound type.
*/
//% help=input/set-sound-threshold
//% blockId=input_set_sound_threshold block="set %sound sound threshold to %value"
//% parts="microphone"
//% threshold.min=0 threshold.max=255 threshold.defl=128
//% weight=32 blockGap=8
//% group="Sound"
void setSoundThreshold(SoundThreshold sound, int threshold) {
#if MICROBIT_CODAL
    init();
    LevelDetectorSPL* level = uBit.audio.levelSPL;
    if (NULL == level)
        return;
    if (SoundThreshold::Loud == sound)
        level->setHighThreshold(threshold);
    else
        level->setLowThreshold(threshold);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}
}