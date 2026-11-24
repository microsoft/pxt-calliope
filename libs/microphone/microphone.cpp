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

#else
// Calliope mini v1/v2: analog MEMS microphone on uBit.io.MIC (no codal
// LevelDetector). The old sampler took one ADC point sample every ~6 ms,
// which listens to the waveform only ~1% of the time and randomly misses
// short transients like claps. Instead, sample in dense sub-bursts of
// back-to-back ADC reads (~2.5 ms each, one conversion is ~68 us on nRF51)
// with a one-tick uBit.sleep() after every sub-burst. The sleep is
// load-bearing: the DAL idle fiber runs only when the run queue is empty,
// and it is what drains the deferred MessageBus queue — i.e. every
// registerWithDal handler and the display animation events that
// showLeds/showString block on. A watcher that stays runnable for tens of
// milliseconds starves those and makes the display stutter. With the
// per-sub-burst sleep the mic still listens ~40% of the time (vs ~1%
// before) and the worst gap between bursts is ~3.5 ms, shorter than any
// audible transient. Every 12 sub-bursts (~72 ms) the accumulated
// peak-to-peak amplitude (range/4, 0..255 like pxt-calliope) is compared
// against the thresholds with simple hysteresis.
#define CALLIOPE_ID_MICROPHONE 4001

#define MIC_SUBBURST_SAMPLES 32   // ~2.5 ms of back-to-back ADC reads
#define MIC_SUBBURSTS_PER_EVAL 12 // ~72 ms per evaluation window

static bool micFiberStarted;
// Dense sampling reads transients equal-or-higher than the old spaced
// sampling did (it no longer misses the peaks), so the clap band measured at
// 60-120 with the old sampler is a lower bound — re-measure before tuning.
// The block default of 128 stays unreachable in normal rooms on this scale.
static int loudThreshold = 64;
static int quietThreshold = 40;
static int lastSoundLevel;

static void sampleSubBurst(int *min, int *max) {
    for (int i = 0; i < MIC_SUBBURST_SAMPLES; i++) {
        int level = uBit.io.MIC.getAnalogValue();
        if (level > *max)
            *max = level;
        if (level < *min)
            *min = level;
    }
}

static int measureSoundLevelDal() {
    int min = 1023;
    int max = 0;
    for (int i = 0; i < MIC_SUBBURSTS_PER_EVAL; i++) {
        sampleSubBurst(&min, &max);
        // wakes on the next 6 ms scheduler tick; empties the run queue so the
        // idle fiber can deliver queued events and service idle components
        uBit.sleep(1);
    }
    return (max - min) / 4; // 0..255
}

static int readSoundLevelDal() {
    if (micFiberStarted)
        return lastSoundLevel; // at most one evaluation window (~72 ms) old
    return measureSoundLevelDal();
}

static void micWatcher() {
    // start below the loud threshold so a program that boots in silence gets
    // the first loud event as soon as it happens
    bool loud = false;
    while (true) {
        int level = measureSoundLevelDal(); // sleeps every sub-burst inside
        lastSoundLevel = level;
        if (!loud && level >= loudThreshold) {
            loud = true;
            MicroBitEvent(CALLIOPE_ID_MICROPHONE, (int)DetectedSound::Loud);
        } else if (loud && level <= quietThreshold) {
            loud = false;
            MicroBitEvent(CALLIOPE_ID_MICROPHONE, (int)DetectedSound::Quiet);
        }
    }
}

static void ensureMicFiber() {
    if (micFiberStarted)
        return;
    micFiberStarted = true;
    create_fiber(micWatcher);
}
#endif

/**
* Registers an event that runs when a sound is detected
*/
//% help=input/on-sound
//% blockId=input_on_sound block="on %sound sound"
//% parts="microphone"
//% weight=88 blockGap=12
//% group="Events"
void onSound(DetectedSound sound, Action handler) {
#if MICROBIT_CODAL
    init();
    const auto thresholdType = sound == DetectedSound::Loud ? LEVEL_THRESHOLD_HIGH : LEVEL_THRESHOLD_LOW;
    registerWithDal(DEVICE_ID_SYSTEM_LEVEL_DETECTOR, thresholdType, handler);
#else
    ensureMicFiber();
    registerWithDal(CALLIOPE_ID_MICROPHONE, (int)sound, handler);
#endif
}

/**
* Reads the loudness through the microphone from 0 (silent) to 255 (loud)
*/
//% help=input/sound-level
//% blockId=device_get_sound_level block="sound level"
//% parts="microphone"
//% weight=34 blockGap=8
//% group="Sensors"
int soundLevel() {
#if MICROBIT_CODAL
    init();
    return uBit.audio.levelSPL->getValue();
#else
    return readSoundLevelDal();
#endif
}

/**
* Sets the threshold for a sound type.
*/
//% help=input/set-sound-threshold
//% blockId=input_set_sound_threshold block="set %sound sound threshold to %value"
//% threshold.label="threshold"
//% parts="microphone"
//% threshold.min=0 threshold.max=255 threshold.defl=128
//% weight=14 blockGap=8
//% advanced=true
//% group="Configuration"
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
    if (SoundThreshold::Loud == sound)
        loudThreshold = threshold;
    else
        quietThreshold = threshold;
#endif
}
}
