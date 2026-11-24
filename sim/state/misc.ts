namespace pxsim {
    /**
     * Error codes used in the micro:bit runtime.
    */
    export enum PanicCode {
        // PANIC Codes. These are not return codes, but are terminal conditions.
        // These induce a panic operation, where all code stops executing, and a panic state is
        // entered where the panic code is diplayed.

        // Out out memory error. Heap storage was requested, but is not available.
        MICROBIT_OOM = 20,

        // Corruption detected in the micro:bit heap space
        MICROBIT_HEAP_ERROR = 30,

        // Dereference of a NULL pointer through the ManagedType class,
        MICROBIT_NULL_DEREFERENCE = 40,
    };

    export function panic(code: number) {
        console.log("PANIC:", code)
        throw new Error("PANIC " + code)
    }

    export interface RuntimeOptions {
        theme: string;
    }
}

namespace pxsim.basic {
    export var pause = thread.pause;
    export var forever = thread.forever;
}

namespace pxsim.control {
    export var inBackground = thread.runInBackground;

    export function onEvent(id: number, evid: number, handler: RefAction, flags: number) {
        if (id == DAL.MICROBIT_ID_BUTTON_AB) {
            const b = board().buttonPairState;
            if (!b.usesButtonAB) {
                b.usesButtonAB = true;
                runtime.queueDisplayUpdate();
            }
        }
        pxtcore.registerWithDal(id, evid, handler, flags)
    }

    export function eventTimestamp() {
        return board().bus.getLastEventTime()
    }

    export function eventValue() {
        return board().bus.getLastEventValue()
    }
}

namespace pxsim.input {
    export function calibrateCompass() {
        // device calibrates...
    }
}

namespace pxsim.pins {
    export function onPulsed(name: number, pulse: number, body: RefAction) {
    }

    export function pulseDuration(): number {
        return 0;
    }

    export function createBuffer(sz: number) {
        return pxsim.BufferMethods.createBuffer(sz)
    }

    export function pulseIn(name: number, value: number, maxDuration: number): number {
        let pin = getPin(name);
        if (!pin) return 0;

        return 5000;
    }

    export function spiWrite(value: number): number {
        // TODO
        return 0;
    }

    export function spiTransfer(cmd: RefBuffer, resp: RefBuffer): void {
        // TODO
    }

    export function spiFrequency(f: number): void {
        // TODO
    }

    export function spiFormat(bits: number, mode: number): void {
        // TODO
    }

    export function spiPins(mosi: number, miso: number, sck: number) {
        // TODO
    }

    export function i2cReadBuffer(address: number, size: number, repeat?: boolean): RefBuffer {
        // fake reading zeros
        return createBuffer(size)
    }

    export function i2cWriteBuffer(address: number, buf: RefBuffer, repeat?: boolean): void {
        // fake - noop
    }

    // this likely shouldn't be called
    export function getPinAddress(name: number) {
        return getPin(name)
    }

    export function setEvents(name: number, event: number) {
    }

    export function setMatrixWidth(pin: number, width: number) {
        const lp = neopixelState(pin);
        if (!lp) return;
        lp.width = width;
    }
}

namespace pxsim.devices {
    export function tellCameraTo(action: number) {
        // TODO
    }
    export function tellRemoteControlTo(action: number) {
        // TODO
    }
    export function raiseAlertTo(action: number) {
        // TODO
    }
    export function onSignalStrengthChanged(action: number) {
        // TODO
    }
    export function signalStrength(): number {
        // TODO
        return 0;
    }
    export function onGamepadButton(button: number, body: RefAction) {
        // TODO
    }
}

namespace pxsim.bluetooth {
    export function startIOPinService(): void {
        // TODO
    }
    export function startLEDService(): void {
        // TODO
    }
    export function startTemperatureService(): void {
        // TODO
    }
    export function startMagnetometerService(): void {
        // TODO
    }
    export function startAccelerometerService(): void {
        // TODO
    }
    export function startButtonService(): void {
        // TODO
    }
    export function startUartService(): void {
        // TODO
    }
    export function uartWriteString(s: string): void {
        serial.writeString(s)
    }

    export function uartWriteBuffer(b: RefBuffer): void {
        serial.writeBuffer(b);
    }

    export function uartReadBuffer(): RefBuffer {
        return pins.createBuffer(0);
    }

    export function uartReadUntil(del: string): string {
        return serial.readUntil(del);
    }
    export function onUartDataReceived(delimiters: string, handler: RefAction) {
        let b = board();
        b.bus.listen(DAL.MICROBIT_ID_BLE_UART, DAL.MICROBIT_UART_S_EVT_DELIM_MATCH, handler);
    }
    export function onBluetoothConnected(a: RefAction) {
        // TODO
    }
    export function onBluetoothDisconnected(a: RefAction) {
        // TODO
    }
    export function advertiseUrl(url: string, power: number, connectable: boolean) { }
    export function advertiseUidBuffer(nsAndInstance: RefBuffer, power: number, connectable: boolean) { }
    export function stopAdvertising() { }
    export function setTransmitPower(power: number) { }
}

namespace pxsim.light {

    // Decode a GRB buffer and update the board's rgbLed state fields.
    // Tightly coupled to the producer, libs/core/rgbled.ts: it prescales every
    // channel to _rgbBrightnessPercent (20%) of the requested color, and this
    // decode reverses exactly that factor (* 100 / 20) — keep the two in sync.
    // Other producers writing raw full-brightness WS2812 data to pin 151 (e.g.
    // the neopixel extension) will therefore render saturated/over-bright here.
    function updateRgbLedState(data: Uint8Array) {
        const b = board() as DalBoard;
        if (!b) return;
        // buffer layout per LED: [G, R, B], each channel at 20% of original
        const toColor = (off: number) => {
            const r = Math.min(255, Math.round(data[off + 1] * 100 / 20));
            const g = Math.min(255, Math.round(data[off]     * 100 / 20));
            const bv = Math.min(255, Math.round(data[off + 2] * 100 / 20));
            return (r << 16) | (g << 8) | bv;
        };
        if (data.length >= 9) {
            // 3-LED send: left=LED0, center=LED1, right=LED2
            b.rgbLedLeftState  = toColor(0);
            b.rgbLedState      = toColor(3);
            b.rgbLedRightState = toColor(6);
        } else if (data.length >= 3) {
            // single-LED send
            const c = toColor(0);
            b.rgbLedLeftState  = c;
            b.rgbLedState      = c;
            b.rgbLedRightState = c;
        }
        runtime.queueDisplayUpdate();
    }

    export function sendWS2812Buffer(buffer: RefBuffer, pin: number) {
        pxsim.sendBufferAsm(buffer, pin)
        if (pin === 151 /* MICROBIT_ID_IO_RGB / DigitalPin.RGB */)
            updateRgbLedState(buffer.data);
    }

    export function sendWS2812BufferWithBrightness(buffer: RefBuffer, pin: number, brightness: number) {
        const clone = new RefBuffer(new Uint8Array(buffer.data))
        const data = clone.data;
        for(let i =0; i < data.length; ++i) {
            data[i] = (data[i] * brightness) >> 8;
        }
        pxsim.sendBufferAsm(clone, pin)
        if (pin === 151 /* MICROBIT_ID_IO_RGB / DigitalPin.RGB */)
            updateRgbLedState(clone.data);
    }

    export function setMode(pin: number, mode: number) {
        const lp = neopixelState(pin);
        if (!lp) return;
        lp.mode = mode & 0xff;
    }

}
