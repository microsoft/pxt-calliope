#include "ksbit.h"

namespace music {
    /**
     * Plays a tone through ``speaker`` for the given duration.
     * @param frequency pitch of the tone to play in Hertz (Hz)
     * @param ms tone duration in milliseconds (ms)
     */
    //% help=music/play-tone weight=90
    //% blockId=device_play_note block="play|tone %note=device_note|for %duration=device_beat" icon="\uf025" blockGap=8
    //% parts="speaker"
    void playTone(int freqency, int ms) {
        uBit.soundmotor.soundOn(freqency);
        if(ms > 0) uBit.sleep(ms);
        uBit.soundmotor.soundOff();
    }

    /**
     * Plays a tone through ``speaker``.
     * @param frequency pitch of the tone to play in Hertz (Hz)
     */
    //% help=music/ring-tone weight=80
    //% blockId=device_ring block="ring tone (Hz)|%note=device_note" icon="\uf025" blockGap=8
    //% parts="speaker"
   void ringTone(int frequency) {
      playTone(frequency, 0);
   }
}
