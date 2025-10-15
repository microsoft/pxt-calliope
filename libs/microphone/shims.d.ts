// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Registers an event that runs when a sound is detected
     */
    //% help=input/on-sound
    //% blockId=input_on_sound block="on %sound sound"
    //% parts="microphone"
    //% weight=33 blockGap=12
    //% group="Sound" shim=input::onSound
    function onSound(sound: DetectedSound, handler: () => void): void;

    /**
     * Sets the threshold for a sound type.
     */
    //% help=input/set-sound-threshold
    //% blockId=input_set_sound_threshold block="set %sound sound threshold to %value"
    //% parts="microphone"
    //% threshold.min=0 threshold.max=255
    //% weight=32 blockGap=8
    //% group="Sound" threshold.defl=128 shim=input::setSoundThreshold
    function setSoundThreshold(sound: SoundThreshold, threshold?: int32): void;
}

// Auto-generated. Do not edit. Really.
