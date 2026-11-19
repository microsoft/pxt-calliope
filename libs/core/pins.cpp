#include "pxt.h"

#if MICROBIT_CODAL
#include "Pin.h"
#define PinCompat codal::Pin
#undef Button               // need to get codal Button back in scope here
#include "MicroBitButton.h" // this include is missing in MicroBit.h from codal-microbit-v2 when DEVICE_BLE=0
#else
#define PinCompat MicroBitPin
#endif

// Pin-ID fallbacks. The shared DigitalPin/AnalogPin enums and getPin() reference
// MICROBIT_ID_IO_P16..P20, but not every variant defines all of them: the v3 codal
// names these pins A1_RX/A1_TX/A0_SCL/A0_SDA (so MICROBIT_ID_IO_P16/P17/P19/P20 are
// absent there), and the Lancaster micro:bit v1 DAL lacks P17/P18. Define the numeric
// IDs (== ID_PIN_Px) so the shared code compiles on every variant.
#ifndef MICROBIT_ID_IO_P16
#define MICROBIT_ID_IO_P16 116
#endif
#ifndef MICROBIT_ID_IO_P17
#define MICROBIT_ID_IO_P17 117
#endif
#ifndef MICROBIT_ID_IO_P18
#define MICROBIT_ID_IO_P18 118
#endif
#ifndef MICROBIT_ID_IO_P19
#define MICROBIT_ID_IO_P19 119
#endif
#ifndef MICROBIT_ID_IO_P20
#define MICROBIT_ID_IO_P20 120
#endif
#ifndef MICROBIT_ID_IO_RGB
#define MICROBIT_ID_IO_RGB 151
#endif
#ifndef MICROBIT_ID_IO_M_A_IN1
#define MICROBIT_ID_IO_M_A_IN1 152
#endif
#ifndef MICROBIT_ID_IO_M_A_IN2
#define MICROBIT_ID_IO_M_A_IN2 153
#endif
#ifndef MICROBIT_ID_IO_M_B_IN1
#define MICROBIT_ID_IO_M_B_IN1 154
#endif
#ifndef MICROBIT_ID_IO_M_B_IN2
#define MICROBIT_ID_IO_M_B_IN2 155
#endif
#ifndef MICROBIT_ID_IO_M_MODE
#define MICROBIT_ID_IO_M_MODE 156
#endif

enum class DigitalPin {
    //% blockIdentity="pins._digitalPin"
    P0 = MICROBIT_ID_IO_P0,
    //% blockIdentity="pins._digitalPin"
    P1 = MICROBIT_ID_IO_P1,
    //% blockIdentity="pins._digitalPin"
    P2 = MICROBIT_ID_IO_P2,
    //% blockIdentity="pins._digitalPin"
    P3 = MICROBIT_ID_IO_P3,
    //% blockIdentity="pins._digitalPin"
    C4 = MICROBIT_ID_IO_P4,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P4 = MICROBIT_ID_IO_P4,
    //% blockIdentity="pins._digitalPin"
    C5 = MICROBIT_ID_IO_P5,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P5 = MICROBIT_ID_IO_P5,
    //% blockIdentity="pins._digitalPin"
    C6 = MICROBIT_ID_IO_P6,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P6 = MICROBIT_ID_IO_P6,
    //% blockIdentity="pins._digitalPin"
    C7 = MICROBIT_ID_IO_P7,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P7 = MICROBIT_ID_IO_P7,
    //% blockIdentity="pins._digitalPin"
    C8 = MICROBIT_ID_IO_P8,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P8 = MICROBIT_ID_IO_P8,
    //% blockIdentity="pins._digitalPin"
    C9 = MICROBIT_ID_IO_P9,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P9 = MICROBIT_ID_IO_P9,
    //% blockIdentity="pins._digitalPin"
    C10 = MICROBIT_ID_IO_P10,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P10 = MICROBIT_ID_IO_P10,
    //% blockIdentity="pins._digitalPin"
    C11 = MICROBIT_ID_IO_P11,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P11 = MICROBIT_ID_IO_P11,
    //% blockIdentity="pins._digitalPin"
    C12 = MICROBIT_ID_IO_P12,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P12 = MICROBIT_ID_IO_P12,
    //% blockIdentity="pins._digitalPin"
    C13 = MICROBIT_ID_IO_P13,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P13 = MICROBIT_ID_IO_P13,
    //% blockIdentity="pins._digitalPin"
    C14 = MICROBIT_ID_IO_P14,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P14 = MICROBIT_ID_IO_P14,
    //% blockIdentity="pins._digitalPin"
    C15 = MICROBIT_ID_IO_P15,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P15 = MICROBIT_ID_IO_P15,
    //% blockIdentity="pins._digitalPin"
    //% block="C16 (A1 RX)"
    C16 = MICROBIT_ID_IO_P16,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P16 = MICROBIT_ID_IO_P16,
    //% blockIdentity="pins._digitalPin"
    //% block="A1 RX" blockHidden=true
    A1_RX = MICROBIT_ID_IO_P16,
    //% blockIdentity="pins._digitalPin"
    //% block="C17 (A1 TX)"
    C17 = MICROBIT_ID_IO_P17,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P17 = MICROBIT_ID_IO_P17,
    //% blockIdentity="pins._digitalPin"
    //% block="A1 TX" blockHidden=true
    A1_TX = MICROBIT_ID_IO_P17,
    //% blockIdentity="pins._digitalPin"
    C18 = MICROBIT_ID_IO_P18,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P18 = MICROBIT_ID_IO_P18,
    //% blockIdentity="pins._digitalPin"
    //% block="C19 (A0 SCL)" blockHidden=true
    C19 = MICROBIT_ID_IO_P19,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P19 = MICROBIT_ID_IO_P19,
    //% blockIdentity="pins._digitalPin"
    //% block="A0 SCL" blockHidden=true
    A0_SCL = MICROBIT_ID_IO_P19,
    //% blockIdentity="pins._digitalPin"
    //% block="C20 (A0 SDA)" blockHidden=true
    C20 = MICROBIT_ID_IO_P20,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    P20 = MICROBIT_ID_IO_P20,
    //% blockIdentity="pins._digitalPin"
    //% block="A0 SDA" blockHidden=true
    A0_SDA = MICROBIT_ID_IO_P20,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    M_MODE = MICROBIT_ID_IO_M_MODE,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    M0_DIR = MICROBIT_ID_IO_M_A_IN1,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    M1_DIR = MICROBIT_ID_IO_M_B_IN1,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    M0_SPEED = MICROBIT_ID_IO_M_A_IN2,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=true
    M1_SPEED = MICROBIT_ID_IO_M_B_IN2,
    //% blockIdentity="pins._digitalPin"
    RGB = MICROBIT_ID_IO_RGB,
};

enum class AnalogPin {
    //% blockIdentity="pins._analogPin"
    P0 = MICROBIT_ID_IO_P0,
    //% blockIdentity="pins._analogPin"
    P1 = MICROBIT_ID_IO_P1,
    //% blockIdentity="pins._analogPin"
    P2 = MICROBIT_ID_IO_P2,
    //% blockIdentity="pins._analogPin"
    P3 = MICROBIT_ID_IO_P3,
    //% blockIdentity="pins._analogPin"
    C4 = MICROBIT_ID_IO_P4,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P4 = MICROBIT_ID_IO_P4,
    //% blockIdentity="pins._analogPin"
    C5 = MICROBIT_ID_IO_P5,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P5 = MICROBIT_ID_IO_P5,
    //% blockIdentity="pins._analogPin"
    C6 = MICROBIT_ID_IO_P6,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P6 = MICROBIT_ID_IO_P6,
    //% blockIdentity="pins._analogPin"
    C7 = MICROBIT_ID_IO_P7,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P7 = MICROBIT_ID_IO_P7,
    //% blockIdentity="pins._analogPin"
    C8 = MICROBIT_ID_IO_P8,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P8 = MICROBIT_ID_IO_P8,
    //% blockIdentity="pins._analogPin"
    C9 = MICROBIT_ID_IO_P9,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P9 = MICROBIT_ID_IO_P9,
    //% blockIdentity="pins._analogPin"
    C10 = MICROBIT_ID_IO_P10,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P10 = MICROBIT_ID_IO_P10,
    //% blockIdentity="pins._analogPin"
    C11 = MICROBIT_ID_IO_P11,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P11 = MICROBIT_ID_IO_P11,
    //% blockIdentity="pins._analogPin"
    C12 = MICROBIT_ID_IO_P12,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P12 = MICROBIT_ID_IO_P12,
    //% blockIdentity="pins._analogPin"
    C13 = MICROBIT_ID_IO_P13,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P13 = MICROBIT_ID_IO_P13,
    //% blockIdentity="pins._analogPin"
    C14 = MICROBIT_ID_IO_P14,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P14 = MICROBIT_ID_IO_P14,
    //% blockIdentity="pins._analogPin"
    C15 = MICROBIT_ID_IO_P15,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P15 = MICROBIT_ID_IO_P15,
    //% blockIdentity="pins._analogPin"
    //% block="C16 (A1 RX)"
    C16 = MICROBIT_ID_IO_P16,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P16 = MICROBIT_ID_IO_P16,
    //% blockIdentity="pins._analogPin"
    //% block="A1 RX" blockHidden=true
    A1_RX = MICROBIT_ID_IO_P16,
    //% blockIdentity="pins._analogPin"
    //% block="C17 (A1 TX)"
    C17 = MICROBIT_ID_IO_P17,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P17 = MICROBIT_ID_IO_P17,
    //% blockIdentity="pins._analogPin"
    //% block="A1 TX" blockHidden=true
    A1_TX = MICROBIT_ID_IO_P17,
    //% blockIdentity="pins._analogPin"
    C18 = MICROBIT_ID_IO_P18,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P18 = MICROBIT_ID_IO_P18,
    //% blockIdentity="pins._analogPin"
    //% block="C19 (A0 SCL)" blockHidden=true
    C19 = MICROBIT_ID_IO_P19,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P19 = MICROBIT_ID_IO_P19,
    //% blockIdentity="pins._analogPin"
    //% block="A0 SCL" blockHidden=true
    A0_SCL = MICROBIT_ID_IO_P19,
    //% blockIdentity="pins._analogPin"
    //% block="C20 (A0 SDA)" blockHidden=true
    C20 = MICROBIT_ID_IO_P20,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    P20 = MICROBIT_ID_IO_P20,
    //% blockIdentity="pins._analogPin"
    //% block="A0 SDA" blockHidden=true
    A0_SDA = MICROBIT_ID_IO_P20,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    M_MODE = MICROBIT_ID_IO_M_MODE,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    M0_DIR = MICROBIT_ID_IO_M_A_IN1,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    M1_DIR = MICROBIT_ID_IO_M_B_IN1,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    M0_SPEED = MICROBIT_ID_IO_M_A_IN2,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=true
    M1_SPEED = MICROBIT_ID_IO_M_B_IN2
};

enum class PulseValue {
    //% block=high
    High = MICROBIT_PIN_EVT_PULSE_HI,
    //% block=low
    Low = MICROBIT_PIN_EVT_PULSE_LO
};

enum class PinPullMode {
    //% block="down"
    PullDown = 0,
    //% block="up"
    PullUp = 1,
    //% block="none"
    PullNone = 2
};

enum class PinEventType {
    //% block="edge"
    Edge = MICROBIT_PIN_EVENT_ON_EDGE,
    //% block="pulse"
    Pulse = MICROBIT_PIN_EVENT_ON_PULSE,
    //% block="touch"
    Touch = MICROBIT_PIN_EVENT_ON_TOUCH,
    //% block="none"
    None = MICROBIT_PIN_EVENT_NONE
};


namespace pxt
{
MicroBitPin *getPin(int id) {
    switch (id) {
        case MICROBIT_ID_IO_P0: return &uBit.io.P0;
        case MICROBIT_ID_IO_P1: return &uBit.io.P1;
        case MICROBIT_ID_IO_P2: return &uBit.io.P2;
        case MICROBIT_ID_IO_P3: return &uBit.io.P3;
        case MICROBIT_ID_IO_P4: return &uBit.io.P4;
        case MICROBIT_ID_IO_P5: return &uBit.io.P5;
        case MICROBIT_ID_IO_P6: return &uBit.io.P6;
        case MICROBIT_ID_IO_P7: return &uBit.io.P7;
        case MICROBIT_ID_IO_P8: return &uBit.io.P8;
        case MICROBIT_ID_IO_P9: return &uBit.io.P9;
        case MICROBIT_ID_IO_P10: return &uBit.io.P10;
        case MICROBIT_ID_IO_P11: return &uBit.io.P11;
        case MICROBIT_ID_IO_P12: return &uBit.io.P12;
        case MICROBIT_ID_IO_P13: return &uBit.io.P13;
        case MICROBIT_ID_IO_P14: return &uBit.io.P14;
        case MICROBIT_ID_IO_P15: return &uBit.io.P15;
        // P16/P17/P19/P20 IO-member names differ by codal version: the Calliope pin-update
        // codal renames them to A1RX/A1TX/A0SCL/A0SDA AND defines MICROBIT_ID_IO_A1_RX,
        // while older codal and the v1/v2 DAL keep P16/P17/P19/P20. Key off the
        // MICROBIT_ID_IO_A1_RX define (NOT MICROBIT_CODAL — both codal versions set that).
        // Same pin IDs (116/117/119/120) on all variants.
        case MICROBIT_ID_IO_P16:
#ifdef MICROBIT_ID_IO_A1_RX
            return &uBit.io.A1RX;
#else
            return &uBit.io.P16;
#endif
        case MICROBIT_ID_IO_P17:
#ifdef MICROBIT_ID_IO_A1_RX
            return &uBit.io.A1TX;
#else
            return &uBit.io.P17;
#endif
#if MICROBIT_CODAL
        case MICROBIT_ID_IO_P18: return &uBit.io.P18; // both codal versions have P18; v1/v2 DAL has none
#endif
        case MICROBIT_ID_IO_P19:
#ifdef MICROBIT_ID_IO_A1_RX
            return &uBit.io.A0SCL;
#else
            return &uBit.io.P19;
#endif
        case MICROBIT_ID_IO_P20:
#ifdef MICROBIT_ID_IO_A1_RX
            return &uBit.io.A0SDA;
#else
            return &uBit.io.P20;
#endif
#ifdef MICROBIT_PIN_RGB
        case MICROBIT_ID_IO_RGB: return &uBit.io.RGB; // All Calliope variants (v1/v2 DAL, v3 codal)
#endif
#if MICROBIT_CODAL
        case MICROBIT_ID_IO_M_A_IN1: return &uBit.io.M_A_IN1;
        case MICROBIT_ID_IO_M_A_IN2: return &uBit.io.M_A_IN2;
        case MICROBIT_ID_IO_M_B_IN1: return &uBit.io.M_B_IN1;
        case MICROBIT_ID_IO_M_B_IN2: return &uBit.io.M_B_IN2;
        case MICROBIT_ID_IO_M_MODE: return &uBit.io.M_MODE;
        case 1001: return &uBit.io.usbTx;
        case 1002: return &uBit.io.usbRx;
#else
        // Calliope v1/v2 DAL: single DRV8837 motor
        // IDs aligned to codal: MOTOR_IN1=152=M_A_IN1, MOTOR_IN2=154=M_B_IN1, MOTOR_SLEEP=156=M_MODE
        case MICROBIT_ID_IO_M_A_IN1: return &uBit.io.MOTOR_IN1;
        case MICROBIT_ID_IO_M_B_IN1: return &uBit.io.MOTOR_IN2;
        case MICROBIT_ID_IO_M_MODE:   return &uBit.io.MOTOR_SLEEP;
#endif
        default: return NULL;
    }
}

} // pxt

namespace hardware {
    /**
     * Returns the number of physically present RGB LEDs.
     * 3 on Calliope mini v3 (codal), 1 on Calliope mini v1/v2 (DAL).
     */
    //%
    int _rgbLedCount() {
#if MICROBIT_CODAL
        return 3;
#else
        return 1;
#endif
    }
    //%
    int _motorDriverType() {
#if MICROBIT_CODAL
        return 2;  // Calliope v3 codal: dual H-bridge
#else
        return 1;  // Calliope v1/v2 DAL: single DRV8837
#endif
    }
} // hardware

namespace pins {
#if !MICROBIT_CODAL
    // --- Calliope v1/v2 (DAL) P0 PWM workaround -----------------------------
    // mbed-classic's nRF51 PWM HAL declares its channel table as
    //     static PinName pwm_pins[PWM_CHANNELS] = {NC};
    // which only initialises element 0 to NC; C zero-fills elements 1 and 2.
    // On the Calliope, P0 is nRF pin P0_0, and PinName P0_0 == 0 — so channels
    // 1 and 2 spuriously appear to be already assigned to P0 at boot.
    //
    // pwmout_init()/pwmout_pulsewidth_us() call pwm_get_channel() first and only
    // run pwm_connect() when it returns NC. For P0 it returns the bogus channel 1,
    // so the GPIOTE/PPI routing that actually toggles the pin is never set up and
    // P0 emits no PWM at all — servo write / analog write on P0 silently do
    // nothing (PINOP discards the DAL return code). P0 is the only affected pin,
    // because it is the only one whose PinName is 0.
    //
    // Fix: before the first PWM use of P0, write an analog value of 0 to it. That
    // reaches the HAL twice in one call and clears both bogus slots:
    //   setAnalogValue(0) -> obtainAnalogChannel() -> new DynamicPwm(P0_0)
    //                        -> pwmout_init() -> pwm_get_channel() hits slot 1,
    //                           so pwmout_pulsewidth_us(0) -> pwm_disconnect() frees it
    //                     -> PwmOut::write(0) -> pwmout_pulsewidth_us(0) -> frees slot 2
    // The table is then [NC,NC,NC], so the next call allocates cleanly and runs
    // pwm_connect(), and P0 produces PWM for the rest of the session.
    static bool p0PwmPrimed = false;
    static void primeP0Pwm(int name) {
        if (p0PwmPrimed || (int)name != MICROBIT_ID_IO_P0)
            return;
        p0PwmPrimed = true; // set first: setAnalogValue() re-enters via PINOP
        MicroBitPin *p0 = getPin(MICROBIT_ID_IO_P0);
        if (p0) p0->setAnalogValue(0);
    }
    #define PRIME_P0_PWM(name) primeP0Pwm((int)(name))
#else
    #define PRIME_P0_PWM(name) do {} while (0)
#endif

    #define PINOP(op) \
      MicroBitPin *pin = getPin((int)name); \
      if (!pin) return; \
      pin->op

    #define PINREAD(op) \
      MicroBitPin *pin = getPin((int)name); \
      if (!pin) return 0; \
      return pin->op


    //%
    MicroBitPin *getPinAddress(int id) {
        return getPin(id);
    }

    /**
     * Read the specified pin or connector as either 0 or 1
     * @param name pin to read from, eg: DigitalPin.P0
     */
    //% help=pins/digital-read-pin weight=30
    //% blockId=device_get_digital_pin block="digital read|pin %name" blockGap=8
    //% name.label="value"
    //% name.shadow=digital_pin_shadow
    int digitalReadPin(int name) {
        PINREAD(getDigitalValue());
    }

    /**
      * Set a pin or connector value to either 0 or 1.
      * @param name pin to write to, eg: DigitalPin.P0
      * @param value value to set on the pin, 1 eg,0
      */
    //% help=pins/digital-write-pin weight=29
    //% blockId=device_set_digital_pin block="digital write|pin %name|to %value"
    //% name.label="pin" value.label="value"
    //% value.min=0 value.max=1
    //% name.shadow=digital_pin_shadow
    void digitalWritePin(int name, int value) {
        PINOP(setDigitalValue(value));
    }

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     * @param name pin to write to, eg: AnalogPin.P0
     */
    //% help=pins/analog-read-pin weight=25
    //% blockId=device_get_analog_pin block="analog read|pin %name" blockGap="8"
    //% name.label="value"
    //% name.shadow=analog_read_write_pin_shadow
    int analogReadPin(int name) {
        PINREAD(getAnalogValue());
    }

    /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param name pin name to write to, eg: AnalogPin.P0
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
    //% help=pins/analog-write-pin weight=24
    //% blockId=device_set_analog_pin block="analog write|pin %name|to %value" blockGap=8
    //% name.label="pin" value.label="value"
    //% value.min=0 value.max=1023
    //% name.shadow=analog_pin_shadow
    void analogWritePin(int name, int value) {
        PRIME_P0_PWM(name);
        PINOP(setAnalogValue(value));
    }

    /**
     * Configure the pulse-width modulation (PWM) period of the analog output in microseconds.
     * If this pin is not configured as an analog output (using `analog write pin`), the operation has no effect.
     * @param name analog pin to set period to, eg: AnalogPin.P0
     * @param micros period in microseconds. eg:20000
     */
    //% help=pins/analog-set-period weight=23 blockGap=8
    //% blockId=device_set_analog_period block="analog set period|pin %pin|to (µs)%micros"
    //% name.label="pin" micros.label="microseconds"
    //% pin.shadow=analog_pin_shadow
    void analogSetPeriod(int name, int micros) {
        PINOP(setAnalogPeriodUs(micros));
    }

    /**
    * Configure the pin as a digital input and generate an event when the pin is pulsed either high or low.
    * @param name digital pin to register to, eg: DigitalPin.P0
    * @param pulse the value of the pulse, eg: PulseValue.High
    */
    //% help=pins/on-pulsed advanced=true
    //% blockId=pins_on_pulsed block="on|pin %pin|pulsed %pulse"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% group="Pulse"
    //% weight=25
    //% blockGap=8
    void onPulsed(DigitalPin name, PulseValue pulse, Action body) {
        MicroBitPin* pin = getPin((int)name);
        if (!pin) return;

        pin->eventOn(MICROBIT_PIN_EVENT_ON_PULSE);
        registerWithDal((int)name, (int)pulse, body);
    }

    /**
    * Get the duration of the last pulse in microseconds. This function should be called from a ``onPulsed`` handler.
    */
    //% help=pins/pulse-duration advanced=true
    //% blockId=pins_pulse_duration block="pulse duration (µs)"
    //% group="Pulse"
    //% weight=24
    //% blockGap=8
    int pulseDuration() {
        return pxt::lastEvent.timestamp;
    }

    /**
    * Return the duration of a pulse at a pin in microseconds.
    * @param name the pin which measures the pulse, eg: DigitalPin.P0
    * @param value the value of the pulse, eg: PulseValue.High
    * @param maximum duration in microseconds
    */
    //% blockId="pins_pulse_in" block="pulse in (µs)|pin %name|pulsed %value"
    //% name.label="pin"
    //% advanced=true
    //% help=pins/pulse-in
    //% name.shadow=digital_pin_shadow
    //% group="Pulse"
    //% weight=23
    //% blockGap=8
    int pulseIn(int name, PulseValue value, int maxDuration = 2000000) {
        MicroBitPin* pin = getPin((int)name);
        if (!pin) return 0;

#if MICROBIT_CODAL
        // set polarity
        pin->setPolarity(PulseValue::High == value ? 1 : 0);
        // record pulse
        int period = pin->getPulseUs(maxDuration);
        // timeout
        if (DEVICE_CANCELLED == period)
            return 0;
        // success!
        return period;
#else
        int pulse = value == PulseValue::High ? 1 : 0;
        uint64_t tick =  system_timer_current_time_us();
        uint64_t maxd = (uint64_t)maxDuration;
        while(pin->getDigitalValue() != pulse) {
            if(system_timer_current_time_us() - tick > maxd)
                return 0;
        }

        uint64_t start =  system_timer_current_time_us();
        while(pin->getDigitalValue() == pulse) {
            if(system_timer_current_time_us() - tick > maxd)
                return 0;
        }
        uint64_t end =  system_timer_current_time_us();
        return end - start;
#endif
    }

    /**
     * Write a value to the servo, controlling the shaft accordingly. On a standard servo, this will set the angle of the shaft (in degrees), moving the shaft to that orientation. On a continuous rotation servo, this will set the speed of the servo (with ``0`` being full-speed in one direction, ``180`` being full speed in the other, and a value near ``90`` being no movement).
     * @param name pin to write to, eg: AnalogPin.P0
     * @param value angle or rotation speed, eg:180,90,0
     */
    //% help=pins/servo-write-pin weight=20
    //% blockId=device_set_servo_pin block="servo write|pin %name|to %value" blockGap=8
    //% name.label="pin" value.label="angle"
    //% parts=microservo trackArgs=0
    //% value.min=0 value.max=180
    //% name.shadow=analog_pin_shadow
    //% group="Servo"
    void servoWritePin(int name, int value) {
        PRIME_P0_PWM(name);
        PINOP(setServoValue(value));
    }

    /**
    * Specifies that a continuous servo is connected.
    */
    //%
    void servoSetContinuous(int name, bool value) {
        // handled in simulator
    }

    /**
     * Configure the IO pin as an analog/pwm output and set a pulse width. The period is 20 ms period and the pulse width is set based on the value given in **microseconds** or `1/1000` milliseconds.
     * @param name pin name
     * @param micros pulse duration in microseconds, eg:1500
     */
    //% help=pins/servo-set-pulse weight=19
    //% blockId=device_set_servo_pulse block="servo set pulse|pin %value|to (µs) %micros"
    //% name.label="pin" micros.label="microseconds"
    //% value.shadow=analog_pin_shadow
    //% group="Servo"
    void servoSetPulse(int name, int micros) {
        PRIME_P0_PWM(name);
        PINOP(setServoPulseUs(micros));
    }


    PinCompat* pitchPin = NULL;
    uint8_t pitchVolume = 0xff;
    bool analogTonePlaying = false;
    bool edgeConnectorSoundDisabled = false;

    /**
     * Set the pin used when using analog pitch or music.
     * @param name pin to modulate pitch from
     */
    //% blockId=device_analog_set_pitch_pin block="analog set pitch pin %name"
    //% name.label="value"
    //% help=pins/analog-set-pitch-pin advanced=true
    //% name.shadow=analog_pin_shadow
    //% group="Pins"
    //% weight=12
    //% blockGap=8
    void analogSetPitchPin(int name) {
        pitchPin = getPin((int)name);
    }

    void pinAnalogSetPitch(PinCompat* pin, int frequency, int ms) {
      if (frequency <= 0 || pitchVolume == 0) {
        pin->setAnalogValue(0);
      } else {
        int v = 1 << (pitchVolume >> 5);
        pin->setAnalogValue(v);
        pin->setAnalogPeriodUs(1000000/frequency);
      }
    }

    /**
    * Sets the volume on the pitch pin
    * @param volume the intensity of the sound from 0..255
    */
    //% blockId=device_analog_set_pitch_volume block="analog set pitch volume $volume"
    //% volume.label="value"
    //% help=pins/analog-set-pitch-volume weight=3 advanced=true
    //% volume.min=0 volume.max=255
    //% deprecated
    void analogSetPitchVolume(int volume) {
        pitchVolume = max(0, min(0xff, volume));

        if (analogTonePlaying) {
            int v = pitchVolume == 0 ? 0 : 1 << (pitchVolume >> 5);
            if (NULL != pitchPin && !edgeConnectorSoundDisabled)
                pitchPin->setAnalogValue(v);
        }
    }

    /**
    * Gets the volume the pitch pin from 0..255
    */
    //% blockId=device_analog_pitch_volume block="analog pitch volume"
    //% help=pins/analog-pitch-volume weight=3 advanced=true
    //% deprecated
    int analogPitchVolume() {
        return pitchVolume;
    }

    /**
     * Send a pulse-width modulation (PWM) signal to the current pitch pin. Use `analog set pitch pin` to define the pitch pin.
     * @param frequency frequency to modulate in Hz.
     * @param ms duration of the pitch in milliseconds.
     */
    //% blockId=device_analog_pitch block="analog pitch %frequency|for (ms) %ms"
    //% frequency.label="frequency" ms.label="duration"
    //% help=pins/analog-pitch async advanced=true
    //% group="Pins"
    //% weight=14
    //% blockGap=8
    void analogPitch(int frequency, int ms) {
        // init pins if needed
        if (NULL == pitchPin) {
#if MICROBIT_CODAL
            pitchPin = &uBit.audio.virtualOutputPin;
#else
            // Calliope v1/v2 fallback (motors.ts startup normally sets this first):
            // IN2 (MOTOR_IN2) = static HIGH reference, IN1 (MOTOR_IN1) = PWM audio.
            // DRV8837: IN1=0,IN2=1 → Reverse; IN1=1,IN2=1 → Brake → OUT2 swings.
            uBit.io.MOTOR_SLEEP.setDigitalValue(1); // nSLEEP HIGH → driver active
            uBit.io.MOTOR_IN2.setDigitalValue(1);   // IN2 static HIGH
            pitchPin = &uBit.io.MOTOR_IN1;          // IN1 = PWM audio
            fiber_sleep(2);                         // tWAKE: DRV8837 needs ~1ms after nSLEEP
#endif
        }
        // set pitch
        analogTonePlaying = true;

#if MICROBIT_CODAL
        if (NULL != pitchPin)
            pinAnalogSetPitch(pitchPin, frequency, ms);
        // clear pitch
        if (ms > 0) {
            fiber_sleep(ms);
            if (NULL != pitchPin)
                pitchPin->setAnalogValue(0);
            analogTonePlaying = false;
            // causes issues with v2 DMA.
            // fiber_sleep(5);
        }
#else
        // Re-assert motor driver state before each tone.
        // MOTOR_SLEEP and MOTOR_IN2 are on different nRF pins from pitchPin (MOTOR_IN1),
        // so setDigitalValue here does NOT disrupt the analog/PWM state of pitchPin.
        // Shared DRV8837: IN2 (M1_DIR) HIGH while IN1 is idle DC-drives the motor output,
        // so only bias IN2 HIGH when actually sounding (frequency > 0). A rest/stop
        // (frequency <= 0) leaves IN1=IN2=0 → coast (motor released). nSLEEP stays HIGH:
        // coast with no PWM/no load draws <=200uA (datasheet), and avoids the ~1ms tWAKE
        // that an nSLEEP wake would add to every note onset.
        const bool toning = frequency > 0 && !edgeConnectorSoundDisabled;
        uBit.io.MOTOR_SLEEP.setDigitalValue(1);          // keep nSLEEP active
        uBit.io.MOTOR_IN2.setDigitalValue(toning ? 1 : 0); // IN2 HIGH only while sounding
        if (NULL != pitchPin && !edgeConnectorSoundDisabled)
            pinAnalogSetPitch(pitchPin, frequency, ms);
        // clear pitch
        if (ms > 0) {
            fiber_sleep(ms);
            if (NULL != pitchPin && !edgeConnectorSoundDisabled)
                pitchPin->setAnalogValue(0);
            uBit.io.MOTOR_IN2.setDigitalValue(0); // release motor after the tone (coast)
            analogTonePlaying = false;
            // causes issues with v2 DMA.
            // fiber_sleep(5);
        }
#endif
    }


    /**
    * Configure the pull direction of of a pin.
    * @param name pin to set the pull mode on, eg: DigitalPin.P0
    * @param pull one of the mbed pull configurations, eg: PinPullMode.PullUp
    */
    //% help=pins/set-pull advanced=true
    //% blockId=device_set_pull block="set pull|pin %pin|to %pull"
    //% name.label="pin"
    //% pin.shadow=digital_pin_shadow
    //% group="Pins"
    //% weight=15
    //% blockGap=8
    void setPull(int name, PinPullMode pull) {
#if MICROBIT_CODAL
        codal::PullMode m = pull == PinPullMode::PullDown
            ? codal::PullMode::Down
            : pull == PinPullMode::PullUp ? codal::PullMode::Up
            : codal::PullMode::None;
        PINOP(setPull(m));
#else
        PinMode m = pull == PinPullMode::PullDown
            ? PinMode::PullDown
            : pull == PinPullMode::PullUp ? PinMode::PullUp
            : PinMode::PullNone;
        PINOP(setPull(m));
#endif
    }

    /**
    * Configure the events emitted by this pin. Events can be subscribed to
    * using ``control.onEvent()``.
    * @param name pin to set the event mode on, eg: DigitalPin.P0
    * @param type the type of events for this pin to emit, eg: PinEventType.Edge
    */
    //% help=pins/set-events advanced=true
    //% blockId=device_set_pin_events block="set pin %pin|to emit %type|events"
    //% name.label="pin"
    //% pin.shadow=digital_pin_shadow
    //% group="Pins"
    //% weight=13
    //% blockGap=8
    void setEvents(int name, PinEventType type) {
        getPin((int)name)->eventOn((int)type);
    }

    /**
     * Create a new zero-initialized buffer.
     * @param size number of bytes in the buffer
     */
    //%
    Buffer createBuffer(int size)
    {
        return mkBuffer(NULL, size);
    }


    /**
     * Set the matrix width for Neopixel strip (already assigned to a pin).
     * Should be used in conjunction with `set matrix width` from Neopixel package.
     * @param name pin of Neopixel strip, eg: DigitalPin.P1
     * @param value width of matrix (at least ``2``)
     */
    //% help=pins/neopixel-matrix-width advanced=true
    //% blockId=pin_neopixel_matrix_width block="neopixel matrix width|pin %pin %width"
    //% pin.label="pin" width.label="width"
    //% pin.shadow=digital_pin_shadow
    //% width.defl=5 width.min=2
    //% group="Pins"
    //% weight=11
    //% blockGap=8
    void setMatrixWidth(int pin, int width) {}

#if MICROBIT_CODAL
#define BUFFER_TYPE uint8_t*
#else
#define BUFFER_TYPE char*
#endif

    /**
     * Read `size` bytes from a 7-bit I2C `address`.
     */
    //%
    Buffer i2cReadBuffer(int address, int size, bool repeat = false)
    {
      Buffer buf = createBuffer(size);
      uBit.i2c.read(address << 1, (BUFFER_TYPE)buf->data, size, repeat);
      return buf;
    }

    /**
     * Write bytes to a 7-bit I2C `address`.
     */
    //%
    int i2cWriteBuffer(int address, Buffer buf, bool repeat = false)
    {
      return uBit.i2c.write(address << 1, (BUFFER_TYPE)buf->data, buf->length, repeat);
    }

    SPI* spi = NULL;
    SPI* allocSPI() {
        if (NULL == spi)
            spi = new SPI(MOSI, MISO, SCK);
        return spi;
    }

    /**
    * Write to the SPI slave and return the response
    * @param value Data to be sent to the SPI slave
    */
    //% help=pins/spi-write advanced=true
    //% blockId=spi_write block="spi write %value"
    //% value.label="value"
    //% group="SPI"
    //% blockGap=8
    //% weight=53
    int spiWrite(int value) {
        auto p = allocSPI();
        return p->write(value);
    }

    /**
    * Write to and read from the SPI slave at the same time
    * @param command Data to be sent to the SPI slave (can be null)
    * @param response Data received from the SPI slave (can be null)
    */
    //% help=pins/spi-transfer argsNullable
    void spiTransfer(Buffer command, Buffer response) {
        if (!command && !response)
            target_panic(PANIC_INVALID_ARGUMENT);
        if (command && response && command->length != response->length)
            target_panic(PANIC_INVALID_ARGUMENT);
        auto p = allocSPI();
        unsigned len = command ? command->length : response->length;
#if MICROBIT_CODAL
        p->transfer(command ? command->data : NULL, command ? len : 0,
                    response ? response->data : NULL, response ? len : 0);
#else
        for (unsigned i = 0; i < len; ++i) {
            int v = p->write(command ? command->data[i] : 0);
            if (response) response->data[i] = v;
        }
#endif
    }

    /**
    * Set the SPI frequency
    * @param frequency the clock frequency, eg: 1000000
    */
    //% help=pins/spi-frequency advanced=true
    //% blockId=spi_frequency block="spi frequency %frequency"
    //% frequency.label="value"
    //% group="SPI"
    //% blockGap=8
    //% weight=55
    void spiFrequency(int frequency) {
        auto p = allocSPI();
        p->frequency(frequency);
    }

    /**
    * Set the SPI bits and mode
    * @param bits the number of bits, eg: 8
    * @param mode the mode, eg: 3
    */
    //% help=pins/spi-format advanced=true
    //% blockId=spi_format block="spi format|bits %bits|mode %mode"
    //% bits.label="bits" mode.label="mode"
    //% group="SPI"
    //% blockGap=8
    //% weight=54
    void spiFormat(int bits, int mode) {
        auto p = allocSPI();
        p->format(bits, mode);
    }

#if MICROBIT_CODAL
#define PIN_ARG(pin) *(getPin((int)(pin)))
#else
#define PIN_ARG(pin) (getPin((int)(pin)))->name
#endif

    /**
    * Set the MOSI, MISO, SCK pins used by the SPI connection
    *
    */
    //% help=pins/spi-pins advanced=true
    //% blockId=spi_pins block="spi set pins|MOSI %mosi|MISO %miso|SCK %sck"
    //% mosi.label="MOSI pin" miso.label="MISO pin" sck.label="SCK pin"
    //% mosi.shadow=digital_pin_shadow
    //% miso.shadow=digital_pin_shadow
    //% sck.shadow=digital_pin_shadow
    //% group="SPI"
    //% blockGap=8
    //% weight=51
    void spiPins(int mosi, int miso, int sck) {
        if (NULL != spi) {
            delete spi;
            spi = NULL;
        }
        spi = new SPI(PIN_ARG(mosi), PIN_ARG(miso), PIN_ARG(sck));
    }

    /**
    * Mounts a push button on the given pin
    */
    //% help=pins/push-button advanced=true
    void pushButton(int pin) {
        new MicroBitButton((PinName)getPin((int)(pin))->name, (int)pin, MICROBIT_BUTTON_ALL_EVENTS, PinMode::PullUp);
    }

    /**
    * Set the pin used when producing sounds and melodies. Default is P0.
    * @param name pin to modulate pitch from
    */
    //% blockId=pin_set_audio_pin block="set audio pin $name"
    //% name.label="value"
    //% help=pins/set-audio-pin
    //% name.shadow=digital_pin_shadow
    //% weight=1
    //% blockGap=8
    void setAudioPin(int name) {
#if MICROBIT_CODAL
        uBit.audio.setPin(*getPin((int)name));
        uBit.audio.setPinEnabled(!edgeConnectorSoundDisabled);
#else
        // v1 behavior
        pins::analogSetPitchPin(name);
#endif
    }

    /**
    * Sets whether or not audio will be output using a pin on the edge
    * connector.
    */
    //% blockId=pin_set_audio_pin_enabled
    //% block="set audio pin enabled $enabled"
    //% enabled.label="value"
    //% weight=0 help=pins/set-audio-pin-enabled
    void setAudioPinEnabled(bool enabled) {
        edgeConnectorSoundDisabled = !enabled;
#if MICROBIT_CODAL
        uBit.audio.setPinEnabled(enabled);
#endif
    }
}
