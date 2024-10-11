/**
 * Generation of music tones.
 */
//% color=#DF4600 weight=98 icon="\uf025"
//% groups='["Melody", "Tone", "Volume", "Silence", "Tempo", "State", "Melody Advanced"]'
namespace music {

    let stopSoundHandlers: (() => void)[];
    const MICROBIT_MELODY_ID = 2000;

    /**
     * Gets the melody array of a built-in melody.
     * @param melody the melody name
     */
    //% weight=60 help=music/built-in-playable-melody
    //% blockId=device_builtin_melody_playable block="melody $melody"
    //% toolboxParent=music_playable_play_default_bkg
    //% toolboxParentArgument=toPlay
    //% duplicateShadowOnDrag
    //% group="Melody Advanced"
    export function builtInPlayableMelody(melody: Melodies): StringArrayPlayable {
        return new StringArrayPlayable(getMelody(melody), undefined);
    }

    /**
     * Registers code to run on various melody events
     */
    //% blockId=melody_on_event block="music on %value"
    //% help=music/on-event weight=59 blockGap=32
    //% group="Melody Advanced"
    export function onEvent(value: MusicEvent, handler: () => void) {
        control.onEvent(MICROBIT_MELODY_ID, value, handler);
    }


    export function _onStopSound(handler: () => void) {
        if (!stopSoundHandlers) {
            stopSoundHandlers = [];
        }
        stopSoundHandlers.push(handler);
    }

}
