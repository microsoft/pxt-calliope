#include "ksbit.h"

namespace music {
    /**
     * Plays a tone through ``speaker`` for the given duration.
     * @param frequency pitch of the tone to play in Hertz (Hz)
     * @param ms tone duration in milliseconds (ms)
     */
    //% help=music/play-tone weight=90
    //% blockId=device_play_note block="play|tone %note=device_note|for %duration=device_beat" icon="\uf025" blockGap=8
    //% parts="speaker" async
    void playTone(int freqency, int ms) {
        uBit.soundmotor.soundOn(freqency);
        if(ms > 0) uBit.sleep(ms);
        uBit.soundmotor.soundOff();
    }
}
