/**
 * Generation of music tones.
 */
namespace music {

    let stopSoundHandlers: (() => void)[];
    const MICROBIT_MELODY_ID = 2000;




    export function _onStopSound(handler: () => void) {
        if (!stopSoundHandlers) {
            stopSoundHandlers = [];
        }
        stopSoundHandlers.push(handler);
    }

}
