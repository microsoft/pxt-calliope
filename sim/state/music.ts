namespace pxsim {
    export class SpeakerState {
        frequency: number;
        ms: number;
    }
    
}
namespace pxsim.music {
    export function setBuiltInSpeakerEnabled(enabled: boolean) {
        const b = board();
        if (!b) return;

        // TODO some rendering about this
        // b.ensureHardwareVersion(2);
        b.speakerEnabled = !!enabled;
    }

    export function speakerPlayTone(frequency: number, ms: number) {
        const b = board();
        b.speakerState.frequency = frequency;
        b.speakerState.ms = ms;

        runtime.queueDisplayUpdate();
        let cb = getResume();
        AudioContextManager.tone(frequency, 1);
        if (ms <= 0) cb();
        else {
            setTimeout(() => {
                AudioContextManager.stop();
                b.speakerState.frequency = 0;
                b.speakerState.ms = 0;
                runtime.queueDisplayUpdate();
                cb()
            }, ms);
        }
    }

    export function setSilenceLevel(level: number) { 
        // ignore in v1,v2
    }

    export function isSoundPlaying(): boolean {
        const audioActive = pxsim.AudioContextManager.isAudioElementActive();
        const soundExpressionPlaying = pxsim.codal.music.isSoundExpPlaying();
        return audioActive || soundExpressionPlaying || pxsim.record.audioIsPlaying();
    }
}