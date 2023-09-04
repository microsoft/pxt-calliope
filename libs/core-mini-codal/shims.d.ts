// Auto-generated. Do not edit.
declare namespace music {

    /**
     * Set the default output volume of the sound synthesizer.
     * @param volume the volume 0...255
     */
    //% blockId=synth_set_volume block="set volume %volume"
    //% volume.min=0 volume.max=255
    //%
    //% help=music/set-volume
    //% weight=70
    //% group="Volume"
    //% blockGap=8 volume.defl=127 shim=music::setVolume
    function setVolume(volume?: int32): void;

    /**
     * Returns the current output volume of the sound synthesizer.
     */
    //% blockId=synth_get_volume block="volume"
    //% help=music/volume
    //% weight=69
    //% group="Volume"
    //% blockGap=8 shim=music::volume
    function volume(): int32;

    /**
     * Turn the built-in speaker on or off.
     * Disabling the speaker resets the sound pin to the default of P0.
     * @param enabled whether the built-in speaker is enabled in addition to the sound pin
     */
    //% blockId=music_set_built_in_speaker_enable block="set built-in speaker $enabled"
    //% group="State"
    //% parts=builtinspeaker
    //% help=music/set-built-in-speaker-enabled
    //% enabled.shadow=toggleOnOff
    //% weight=0 shim=music::setBuiltInSpeakerEnabled
    function setBuiltInSpeakerEnabled(enabled: boolean): void;

    /**
     * Check whether any sound is being played, no matter the source
     */
    //% blockId=music_sound_is_playing block="sound is playing"
    //% group="State"
    //% help=music/volume
    //% weight=0 shim=music::isSoundPlaying
    function isSoundPlaying(): boolean;

    /**
     * Defines an optional sample level to generate during periods of silence.
     **/
    //% group="State"
    //% help=music/set-silence-level
    //% level.min=0
    //% level.max=1024
    //%
    //% weight=1 level.defl=0 shim=music::setSilenceLevel
    function setSilenceLevel(level?: int32): void;
}

// Auto-generated. Do not edit. Really.
