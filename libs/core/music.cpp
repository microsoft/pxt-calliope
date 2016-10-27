#include "ksbit.h"

namespace music {
    void playTone(int freqency, int ms) {
        uBit.soundmotor.Sound_On(freqency);
        if(ms > 0) uBit.sleep(ms);
        uBit.soundmotor.Sound_Off();
    }
}
