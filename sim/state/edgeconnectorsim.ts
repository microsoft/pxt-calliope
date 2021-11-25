namespace pxsim {
    export enum PinFlags {
        Unused = 0,
        Digital = 0x0001,
        Analog = 0x0002,
        Input = 0x0004,
        Output = 0x0008,
        Touch = 0x0010
    }

    export class Pin {
        constructor(public id: number) { }
        touched = false;
        value = 0;
        period = 0;
        servoAngle = 0;
        mode = PinFlags.Unused;
        pitch = false;
        pull = 0; // PullDown
        servoContinuous = false;

        digitalReadPin(): number {
            this.mode = PinFlags.Digital | PinFlags.Input;
            return this.value > 100 ? 1 : 0;
        }

        digitalWritePin(value: number) {            
            this.mode = PinFlags.Digital | PinFlags.Output;
            this.value = value > 0 ? 200 : 0;
            runtime.queueDisplayUpdate();
        }

        setPull(pull: number) {
            this.pull = pull;
            switch(pull) {
                case PinPullMode.PullDown: this.value = 0; break;
                case PinPullMode.PullUp: this.value = 1023; break;
                default: this.value = Math_.randomRange(0, 1023); break;
            }
        }

        analogReadPin(): number {
            this.mode = PinFlags.Analog | PinFlags.Input;
            return this.value || 0;
        }

        analogWritePin(value: number) {
            value = value >> 0;
            this.mode = PinFlags.Analog | PinFlags.Output;
            this.value = Math.max(0, Math.min(1023, value));
            runtime.queueDisplayUpdate();
        }

        analogSetPeriod(micros: number) {
            micros = micros >> 0;
            this.mode = PinFlags.Analog | PinFlags.Output;
            this.period = micros;
            runtime.queueDisplayUpdate();
        }

        servoWritePin(value: number) {
            value = value >> 0;
            this.analogSetPeriod(20000);
            this.servoAngle = Math.max(0, Math.min(180, value));
            runtime.queueDisplayUpdate();
        }

        servoSetContinuous(value: boolean) {
            this.servoContinuous = !!value;
        }

        servoSetPulse(pinId: number, micros: number) {
            // TODO
        }

        isTouched(): boolean {
            this.mode = PinFlags.Touch | PinFlags.Analog | PinFlags.Input;
            return this.touched;
        }
    }

    export interface EdgeConnectorProps {
        pins: number[];
        servos?: { [name: string]: number; }
    }

    export class EdgeConnectorState {
        pins: Pin[];
        pitchVolume: number;
        pitchEnabled = true;

        constructor(public props: EdgeConnectorProps) {
            this.pins = props.pins.map(id => id != undefined ? new Pin(id) : null);
            this.pitchVolume = 0xff
        }

        public getPin(id: number) {
            return this.pins.filter(p => p && p.id == id)[0] || null
        }
    }

}