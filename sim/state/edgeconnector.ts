namespace pxsim.input {
    export function onPinTouchEvent(pinId: number, pinEvent: number, handler: RefAction) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.isTouched();
        runtime.queueDisplayUpdate();
        pxtcore.registerWithDal(pin.id, pinEvent, handler);
    }

    // Deprecated pin blocks delegate to onPinTouchEvent (mirrors libs/core/input.cpp), so existing
    // programs using "on pin pressed/released" still work in the simulator.
    export function onPinPressed(pinId: number, handler: RefAction) {
        onPinTouchEvent(pinId, DAL.MICROBIT_BUTTON_EVT_CLICK, handler);
    }

    export function onPinReleased(pinId: number, handler: RefAction) {
        onPinTouchEvent(pinId, DAL.MICROBIT_BUTTON_EVT_UP, handler);
    }

    export function pinIsPressed(pinId: number): boolean {
        let pin = getPin(pinId);
        if (!pin) return false;
        return pin.isTouched();
    }
}

namespace pxsim {
    export function getPin(id: number) {
        return board().edgeConnectorState.getPin(id);
    }
}

namespace pxsim.pins {
    export let edgeConnectorSoundDisabled = false;

    export function digitalReadPin(pinId: number): number {
        let pin = getPin(pinId);
        if (!pin) return -1;
        pin.mode = PinFlags.Digital | PinFlags.Input;
        return pin.value >= 1 ? 1 : 0;
    }

    export function digitalWritePin(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Digital | PinFlags.Output;
        pin.value = value > 0 ? 1023 : 0;
        runtime.queueDisplayUpdate();
    }

    export function setPull(pinId: number, pull: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.setPull(pull);
    }

    export function analogReadPin(pinId: number): number {
        let pin = getPin(pinId);
        if (!pin) return -1;
        pin.mode = PinFlags.Analog | PinFlags.Input;
        return pin.value || 0;
    }

    export function analogWritePin(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Analog | PinFlags.Output;
        pin.value = value | 0;
        runtime.queueDisplayUpdate();
    }

    export function analogSetPeriod(pinId: number, micros: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Analog | PinFlags.Output;
        pin.period = micros;
        runtime.queueDisplayUpdate();
    }

    export function servoWritePin(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;

        analogSetPeriod(pinId, 20000);
        pin.servoAngle = value;
    }

    export function servoSetContinuous(pinId: number, value: boolean) {
        let pin = getPin(pinId);
        if (!pin) return;

        pin.servoSetContinuous(value);
    }

    export function servoSetPulse(pinId: number, micros: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        // TODO
    }

    export function analogSetPitchPin(pinId: number) {
        const b = board();
        if (!b) return;
        let pin = getPin(pinId);
        if (!pin) return;
        const ec = b.edgeConnectorState
        ec.pins.filter(p => !!p).forEach(p => p.pitch = false);
        pin.pitch = true;
    }

    export function setSoundOutputPinEnabled(enabled: boolean) {
        const b = board();
        if (!b) return;
        const ec = b.edgeConnectorState
        ec.pitchEnabled = !enabled;
    }

    export function analogSetPitchVolume(volume: number) {
        const ec = board().edgeConnectorState;
        ec.pitchVolume = Math.max(0, Math.min(0xff, volume | 0));
        AudioContextManager.setCurrentToneGain((ec.pitchVolume / 0xff) / 10);
    }

    export function analogPitchVolume() {
        const ec = board().edgeConnectorState;
        return ec.pitchVolume;
    }

    export function analogPitch(frequency: number, ms: number) {
        // update analog output
        const b = board();
        if (!b || isNaN(frequency) || isNaN(ms)) return;
        if (!b) return;
        const ec = b.edgeConnectorState;
        const pins = ec.pins;
        const pin = ec.pitchEnabled && (pins.filter(pin => !!pin && pin.pitch)[0] || pins[0]);
        // Only an explicitly-routed audio pin (via pins.setAudioPin) is shown on the board.
        // By default audio plays through the built-in speaker, so the fallback pin (P0) must
        // not light up with a "~"/value — we visualize only when a pitch pin was set.
        const visualPin = ec.pitchEnabled ? (pins.filter(p => !!p && p.pitch)[0] || null) : null;
        const pitchVolume = ec.pitchVolume | 0;
        if (visualPin && !edgeConnectorSoundDisabled) {
            visualPin.mode = PinFlags.Analog | PinFlags.Output;
            if (frequency <= 0 || pitchVolume <= 0) {
                visualPin.value = 0;
                visualPin.period = 0;
            } else {
                const v = 1 << (pitchVolume >> 5);
                visualPin.value = v;
                visualPin.period = 1000000 / frequency;
            }
            runtime.queueDisplayUpdate();
        }

        let cb = getResume();
        if (pin) {
            const v = pitchVolume / 0xff;
            AudioContextManager.tone(frequency, v / 10);
        }
        if (ms <= 0) cb();
        else {
            setTimeout(() => {
                AudioContextManager.stop();
                if (visualPin && !edgeConnectorSoundDisabled) {
                    visualPin.value = 0;
                    visualPin.period = 0;
                    visualPin.mode = PinFlags.Unused;
                }
                runtime.queueDisplayUpdate();
                cb()
            }, ms);
        }
    }

    export function pushButton(pinId: number) {
        const b = board();
        if (!b) return;
        const ec = b.edgeConnectorState;
        // TODO support buttons here
    }
}
namespace pxsim.music {
    export function setVolume(volume: number): void {
        pxsim.pins.analogSetPitchVolume(volume);
    }
    export function volume(): number {
        return pxsim.pins.analogPitchVolume();
    }
}

namespace pxsim.pins {
    export function setAudioPin(pinId: number) {
        pxsim.pins.analogSetPitchPin(pinId);
    }

    export function setAudioPinEnabled(enabled: boolean) {
        // Only the pin-gradient state is affected. Upstream also drew a
        // crossed-out headphone overlay here, but the Calliope artwork has
        // no audio-jack component, so that DOM path was removed.
        edgeConnectorSoundDisabled = !enabled;
    }
}