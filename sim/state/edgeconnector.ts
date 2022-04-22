namespace pxsim.input {
    export function onPinTouchEvent(pinId: number, pinEvent: number, handler: RefAction) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.isTouched();
        runtime.queueDisplayUpdate(); 
        pxtcore.registerWithDal(pin.id, pinEvent, handler);
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
    export function digitalReadPin(pinId: number): number {
        let pin = getPin(pinId);
        if (!pin) return -1;
        pin.mode = PinFlags.Digital | PinFlags.Input;
        return pin.value > 100 ? 1 : 0;
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
        if (!b) return;
        const ec = b.edgeConnectorState;
        const pins = ec.pins;
        const pin = ec.pitchEnabled && (pins.filter(pin => !!pin && pin.pitch)[0] || pins[0]);
        const pitchVolume = ec.pitchVolume | 0;
        if (pin) {
            pin.mode = PinFlags.Analog | PinFlags.Output;
            if (frequency <= 0 || pitchVolume <= 0) {
                pin.value = 0;
                pin.period = 0;
            } else {
                const v = 1 << (pitchVolume >> 5);
                pin.value = v;
                pin.period = 1000000 / frequency;
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
                if (pin) {
                    pin.value = 0;
                    pin.period = 0;
                    pin.mode = PinFlags.Unused;
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
}