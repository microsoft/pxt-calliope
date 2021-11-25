#include "pxt.h"

namespace pins {
    void analogSetPitchVolume(int volume);
    int analogPitchVolume();
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
        if(frequency > 0) uBit.soundmotor.soundOn(frequency);
        else uBit.soundmotor.soundOff();
        if(ms > 0) {
            uBit.sleep(ms);
            uBit.soundmotor.soundOff();
        }

    }


    /**
    * Set the default output volume of the sound synthesizer.
    * @param volume the volume 0...255
    */
    //% blockId=synth_set_volume block="set volume %volume"
    //% volume.min=0 volume.max=255
    //% volume.defl=127
    //% help=music/set-volume
    //% weight=70
    //% group="Volume"
    //% blockGap=8
    //% blockHidden=true
    void setVolume(int volume) {
    #if MICROBIT_CODAL
        uBit.audio.setVolume(max(0, min(255, volume)));
    #else
        pins::analogSetPitchVolume(volume);
    #endif
    }

    /**
    * Returns the current output volume of the sound synthesizer.
    */
    //% blockId=synth_get_volume block="volume"
    //% help=music/volume
    //% weight=69
    //% group="Volume"
    //% blockGap=8
    //% blockHidden=true
    int volume() {
    #if MICROBIT_CODAL
        return uBit.audio.getVolume();
    #else
        return pins::analogPitchVolume();
    #endif
    }
}