#include "pxt.h"

namespace pins {
    void analogPitch(int frequency, int ms);
}

namespace music {

    /**
     * Plays a tone through ``speaker`` for the given duration.
     * @param frequency pitch of the tone to play in Hertz (Hz)
     * @param ms tone duration in milliseconds (ms)
     */
    //%
    //% parts="speaker" async useEnumVal=1
    void speakerPlayTone(int frequency, int ms) {
#if MICROBIT_CODAL
        pins::analogPitch(frequency, ms);
#else
        if(frequency > 0) uBit.soundmotor.soundOn(frequency);
        else uBit.soundmotor.soundOff();
        if(ms > 0) {
            uBit.sleep(ms);
            uBit.soundmotor.soundOff();
        }
#endif
    }

}