#include "ksbit.h"

namespace music {
    void playTone(int freqency, int ms) {
        uBit.soundmotor.soundOn(freqency);
        if(ms > 0) uBit.sleep(ms);
        uBit.soundmotor.soundOff();
    }
}
