const enum PinEvent {
    //% block="pulse high"
    PulseHigh = DAL.MICROBIT_PIN_EVT_PULSE_HI,  // DEVICE_PIN_EVT_PULSE_HI
    //% block="pulse low"
    PulseLow = DAL.MICROBIT_PIN_EVT_PULSE_LO,  // DEVICE_PIN_EVT_PULSE_LO
    //% block="rise"
    Rise = DAL.MICROBIT_PIN_EVT_RISE,  // DEVICE_PIN_EVT_RISE
    //% block="fall"
    Fall = DAL.MICROBIT_PIN_EVT_FALL,  // DEVICE_PIN_EVT_FALL
}

//% noRefCounting fixedInstances
interface DigitalInOutPin {
    digitalRead(): boolean;

    digitalWrite(value: boolean): void;

    onPulsed(pulse: PulseValue, body: () => void): void;

    onEvent(event: PinEvent, body: () => void): void;

    pulseIn(value: PulseValue, maxDuration?: number): number;

    setPull(pull: PinPullMode): void;
}

//% noRefCounting fixedInstances
interface AnalogInPin extends DigitalInOutPin {
    analogRead(): number;
}

//% noRefCounting fixedInstances
interface AnalogOutPin extends DigitalInOutPin {
    analogWrite(value: number): void;
}

//% noRefCounting fixedInstances
interface AnalogInOutPin extends AnalogInPin, AnalogOutPin {
}

//% noRefCounting fixedInstances
interface PwmOnlyPin extends DigitalInOutPin, AnalogOutPin {
    //% parts=microservo trackArgs=0
    analogSetPeriod(period: number): void;

    //% parts=microservo trackArgs=0
    servoWrite(value: number): void;

    //% parts=microservo trackArgs=0
    servoSetPulse(duration: number): void;
}

//% noRefCounting fixedInstances
interface PwmPin extends PwmOnlyPin, DigitalInOutPin, AnalogInPin {
}

//% noRefCounting fixedInstances
class MicrobitPin implements AnalogInPin, AnalogOutPin, AnalogInOutPin, PwmOnlyPin {
    public id: number;
    constructor(id: number) {
        this.id = id;
    }

    protected digitalId(): DigitalPin {
        return <DigitalPin>this.id;
    }

    protected analogId(): AnalogPin {
        return <AnalogPin>this.id;
    }

    digitalRead(): boolean {
        return pins.digitalReadPin(this.digitalId()) != 0;
    }

    digitalWrite(value: boolean): void {
        pins.digitalWritePin(this.digitalId(), value ? 1 : 0);
    }

    onPulsed(pulse: PulseValue, body: () => void): void {
        pins.onPulsed(this.digitalId(), pulse, body);
    }

    onEvent(event: PinEvent, body: () => void): void {
        // TODO
    }

    pulseIn(value: PulseValue, maxDuration?: number): number {
        return pins.pulseIn(this.digitalId(), value, maxDuration);
    }

    setPull(pull: PinPullMode): void {
        pins.setPull(this.digitalId(), pull);
    }

    analogRead(): number {
        return pins.analogReadPin(this.analogId());
    }

    analogWrite(value: number): void {
        pins.analogWritePin(this.analogId(), value);
    }

    analogSetPeriod(period: number): void {
        pins.analogSetPeriod(this.analogId(), period);
    }

    servoWrite(value: number): void {
        pins.servoWritePin(this.analogId(), value);
    }

    servoSetPulse(duration: number): void {
        pins.servoSetPulse(this.analogId(), duration);
    }
}

namespace pins {
    /**
     * Pin P0
     */
    //% fixedInstance whenUsed
    export const P0: PwmPin = new MicrobitPin(DigitalPin.P0);

    /**
     * Pin P1
     */
    //% fixedInstance whenUsed
    export const P1: PwmPin = new MicrobitPin(DigitalPin.P1);

    /**
     * Pin P2
     */
    //% fixedInstance whenUsed
    export const P2: PwmPin = new MicrobitPin(DigitalPin.P2);

    /**
     * Pin P3
     */
    //% fixedInstance whenUsed
    export const P3: PwmPin = new MicrobitPin(DigitalPin.P3);

    /**
     * Pin C4
     */
    //% fixedInstance whenUsed
    export const C4: AnalogInPin = new MicrobitPin(DigitalPin.C4);

    /**
     * Pin C5
     */
    //% fixedInstance whenUsed
    export const C5: AnalogInPin = new MicrobitPin(DigitalPin.C5);

    /**
     * Pin C6
     */
    //% fixedInstance whenUsed
    export const C6: AnalogInPin = new MicrobitPin(DigitalPin.C6);

    /**
     * Pin C7
     */
    //% fixedInstance whenUsed
    export const C7: DigitalInOutPin = new MicrobitPin(DigitalPin.C7);

    /**
     * Pin C8
     */
    //% fixedInstance whenUsed
    export const C8: DigitalInOutPin = new MicrobitPin(DigitalPin.C8);

    /**
     * Pin C9
     */
    //% fixedInstance whenUsed
    export const C9: DigitalInOutPin = new MicrobitPin(DigitalPin.C9);

    /**
     * Pin C10
     */
    //% fixedInstance whenUsed
    export const C10: DigitalInOutPin = new MicrobitPin(DigitalPin.C10);

    /**
     * Pin C11
     */
    //% fixedInstance whenUsed
    export const C11: DigitalInOutPin = new MicrobitPin(DigitalPin.C11);

    /**
     * Pin C12
     */
    //% fixedInstance whenUsed
    export const C12: DigitalInOutPin = new MicrobitPin(DigitalPin.C12);


    /**
     * Pin C16
     */
    //% fixedInstance whenUsed
    export const C16: AnalogInPin = new MicrobitPin(DigitalPin.C16);

    /**
     * Pin C17
     */
    //% fixedInstance whenUsed
    export const C17: AnalogInPin = new MicrobitPin(DigitalPin.C17);

    /**
     * Pin C18
     */
    //% fixedInstance whenUsed
    export const C18: DigitalInOutPin = new MicrobitPin(DigitalPin.C18);

    /**
     * Pin C19
     */
    //% fixedInstance whenUsed
    export const C19: DigitalInOutPin = new MicrobitPin(DigitalPin.C19);
}