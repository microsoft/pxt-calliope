#include "pxt.h"

#if MICROBIT_CODAL
#include "Pin.h"
#define PinCompat codal::Pin
#else
#define PinCompat MicroBitPin
#endif

enum class DigitalPin {
    P0 = MICROBIT_ID_IO_P0,   // edge connector 0
    P1 = MICROBIT_ID_IO_P1,    // edge connector 1
    P2 = MICROBIT_ID_IO_P2,    // edge connector 2
    P3 = MICROBIT_ID_IO_P3,   // edge connector 3

    C4 = MICROBIT_ID_IO_P4,    // -> P4
    //% blockHidden=true
    P4 = MICROBIT_ID_IO_P4,    // LED matrix COLUMN 1

    C5 = MICROBIT_ID_IO_P5,    // -> P5
    //% blockHidden=true
    P5 = MICROBIT_ID_IO_P5,    // LED matrix COLUMN 2

    C6 = MICROBIT_ID_IO_P6,   // -> P6
    //% blockHidden=true
    P6 = MICROBIT_ID_IO_P6,   // LED matrix COLUMN 3

    C7 = MICROBIT_ID_IO_P7,   // -> P7
    //% blockHidden=true
    P7 = MICROBIT_ID_IO_P7,   // LED matrix COLUMN 4

    C8 = MICROBIT_ID_IO_P8,   // -> P8
    //% blockHidden=true
    P8 = MICROBIT_ID_IO_P8,   // LED matrix COLUMN 5

    C9 = MICROBIT_ID_IO_P9,   // -> P9
    //% blockHidden=true
    P9 = MICROBIT_ID_IO_P9,   // LED matrix COLUMN 6

    C10 = MICROBIT_ID_IO_P10,   // -> P10
    //% blockHidden=true
    P10 = MICROBIT_ID_IO_P10,   // LED matrix COLUMN 7

    C11 = MICROBIT_ID_IO_P11,   // -> P11
    //% blockHidden=true
    P11 = MICROBIT_ID_IO_P11,   // LED matrix COLUMN 8

    C12 = MICROBIT_ID_IO_P12,   // -> P12
    //% blockHidden=true
    P12 = MICROBIT_ID_IO_P12,   // LED matrix COLUMN 9

    C13 = MICROBIT_ID_IO_P13,   // LED matrix ROW 1
    //% blockHidden=true
    P13 = MICROBIT_ID_IO_P13,   // LED matrix ROW 1

    C14 = MICROBIT_ID_IO_P14,   // LED matrix ROW 2
    //% blockHidden=true
    P14 = MICROBIT_ID_IO_P14,   // LED matrix ROW 2

    C15 = MICROBIT_ID_IO_P15,   // LED matrix ROW 3
    //% blockHidden=true
    P15 = MICROBIT_ID_IO_P15,   // LED matrix ROW 3

    //% block="C16 (A1 RX)"
    C16 = MICROBIT_ID_IO_A1_RX,   // -> A1_RX
    //% blockHidden=true
    P16 = MICROBIT_ID_IO_A1_RX,   // -> A1_RX
    //% block="A1 RX" blockHidden=true
    A1_RX = MICROBIT_ID_IO_A1_RX, // SCL

    //% block="C17 (A1 TX)"
    C17 = MICROBIT_ID_IO_A1_TX,   // -> A1_TX
    //% blockHidden=true
    P17 = MICROBIT_ID_IO_A1_TX,   // -> A1_TX
    //% block="A1 TX" blockHidden=true
    A1_TX = MICROBIT_ID_IO_A1_TX, // SDA

    C18 = MICROBIT_ID_IO_P18,
    //% blockHidden=true
    P18 = MICROBIT_ID_IO_P18,
    
    //% block="C19 (A0 SCL)" blockHidden=true
    A0_SCL = MICROBIT_ID_IO_A0_SCL, // SCL
    //% block="C20 (A0 SDA)" blockHidden=true
    A0_SDA = MICROBIT_ID_IO_A0_SDA, // SDA

    //% blockHidden=true
    M_MODE = MICROBIT_ID_IO_M_MODE,

    //% blockHidden=true
    M0_DIR = MICROBIT_ID_IO_M_A_IN1,

    //% blockHidden=true
    M1_DIR = MICROBIT_ID_IO_M_B_IN1,

    //% blockHidden=true
    M0_SPEED = MICROBIT_ID_IO_M_A_IN2,

    //% blockHidden=true
    M1_SPEED = MICROBIT_ID_IO_M_B_IN2,

    RGB = MICROBIT_ID_IO_RGB

};

enum class AnalogPin {
    P0 = MICROBIT_ID_IO_P0,   // edge connector 0
    P1 = MICROBIT_ID_IO_P1,    // edge connector 1
    P2 = MICROBIT_ID_IO_P2,    // edge connector 2
    //% block="P3 (write only)"
    P3 = MICROBIT_ID_IO_P3,   // edge connector 3

    C4 = MICROBIT_ID_IO_P4,    // -> P4
    //% blockHidden=true
    P4 = MICROBIT_ID_IO_P4,    // LED matrix COLUMN 1

    //% block="C5 (write only)"
    C5 = MICROBIT_ID_IO_P5,    // -> P5
    //% blockHidden=true
    P5 = MICROBIT_ID_IO_P5,    // BUTTON A

    //% block="C6 (write only)"
    C6 = MICROBIT_ID_IO_P6,   // -> P6
    //% blockHidden=true
    P6 = MICROBIT_ID_IO_P6,   // LED matrix COLUMN 4

    //% block="C7 (write only)"
    C7 = MICROBIT_ID_IO_P7,   // -> P7
    //% blockHidden=true
    P7 = MICROBIT_ID_IO_P7,   // LED matrix COLUMN 2

    //% block="C8 (write only)"
    C8 = MICROBIT_ID_IO_P8,   // -> P8
    //% blockHidden=true
    P8 = MICROBIT_ID_IO_P8,

    //% block="C9 (write only)"
    C9 = MICROBIT_ID_IO_P9,   // -> P9
    //% blockHidden=true
    P9 = MICROBIT_ID_IO_P9,

    C10 = MICROBIT_ID_IO_P10,   // -> P10
    //% blockHidden=true
    P10 = MICROBIT_ID_IO_P10,   // LED matrix COLUMN 5

    //% block="C11 (write only)"
    C11 = MICROBIT_ID_IO_P11,   // -> P11
    //% blockHidden=true
    P11 = MICROBIT_ID_IO_P11,   // BUTTON B

    //% block="C12 (write only)"
    C12 = MICROBIT_ID_IO_P12,   // -> P12
    //% blockHidden=true
    P12 = MICROBIT_ID_IO_P12,   // JACDAC

    //% block="C13 (write only)"
    C13 = MICROBIT_ID_IO_P13,   // -> P13
    //% blockHidden=true
    P13 = MICROBIT_ID_IO_P13,   // SPI CLCK

    //% block="C14 (write only)"
    C14 = MICROBIT_ID_IO_P14,   // -> P14
    //% blockHidden=true
    P14 = MICROBIT_ID_IO_P14,   // SPI MISO

    //% block="C15 (write only)"
    C15 = MICROBIT_ID_IO_P15,   // -> P15
    //% blockHidden=true
    P15 = MICROBIT_ID_IO_P15,   // SPI MOSI

    //% block="C16 (A1 RX)"
    C16 = MICROBIT_ID_IO_A1_RX,   // -> A1_RX
    //% blockHidden=true
    P16 = MICROBIT_ID_IO_A1_RX,   // -> A1_RX
    //% block="A1 RX" blockHidden=true
    A1_RX = MICROBIT_ID_IO_A1_RX, // SCL

    //% block="C17 (A1 TX, write only)"
    C17 = MICROBIT_ID_IO_A1_TX,   // -> A1_TX
    //% blockHidden=true
    P17 = MICROBIT_ID_IO_A1_TX,   // -> A1_TX
    //% block="A1 TX" blockHidden=true
    A1_TX = MICROBIT_ID_IO_A1_TX, // SDA

    C18 = MICROBIT_ID_IO_P18, // -> P18
    //% blockHidden=true
    P18 = MICROBIT_ID_IO_P18, // LED matrix COL 3
    
    //% block="C19 (A0 SCL)" blockHidden=true
    A0_SCL = MICROBIT_ID_IO_A0_SCL, // SCL
    //% block="C20 (A0 SDA)" blockHidden=true
    A0_SDA = MICROBIT_ID_IO_A0_SDA, // SDA

    //% //% block="Motor Mode (write only)" blockHidden=true
    M_MODE = MICROBIT_ID_IO_M_MODE,

    //% //% block="M0 Direction (write only)"blockHidden=true
    M0_DIR = MICROBIT_ID_IO_M_A_IN1,

    //% //% block="M1 Direction (write only)" blockHidden=true
    M1_DIR = MICROBIT_ID_IO_M_B_IN1,

    //% //% block="M0 Speed (write only)" blockHidden=true
    M0_SPEED = MICROBIT_ID_IO_M_A_IN2,

    //% //% block="M1 Speed (write only)" blockHidden=true
    M1_SPEED = MICROBIT_ID_IO_M_B_IN2,

    //% //% block="RGB (write only)" blockHidden=true
    RGB = MICROBIT_ID_IO_RGB,

    //% blockHidden=true
    MIC = MICROBIT_ID_LOGO // microphone
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
        case MICROBIT_ID_IO_P0: return &uBit.io.P0; // 2, 3
        case MICROBIT_ID_IO_P1: return &uBit.io.P1; // 2, 3
        case MICROBIT_ID_IO_P2: return &uBit.io.P2; // 2, 3
        case MICROBIT_ID_IO_P3: return &uBit.io.P3; // 2, 3
        case MICROBIT_ID_IO_P4: return &uBit.io.P4; // 2, 3
        case MICROBIT_ID_IO_P5: return &uBit.io.P5; // 2, 3
        case MICROBIT_ID_IO_P6: return &uBit.io.P6; // 2, 3
        case MICROBIT_ID_IO_P7: return &uBit.io.P7; // 2, 3
        case MICROBIT_ID_IO_P8: return &uBit.io.P8; // 2, 3
        case MICROBIT_ID_IO_P9: return &uBit.io.P9; // 2, 3
        case MICROBIT_ID_IO_P10: return &uBit.io.P10; // 2, 3
        case MICROBIT_ID_IO_P11: return &uBit.io.P11; // 2, 3
        case MICROBIT_ID_IO_P12: return &uBit.io.P12; // 2, 3
        case MICROBIT_ID_IO_P13: return &uBit.io.P13; // ?
        case MICROBIT_ID_IO_P14: return &uBit.io.P14; // ?
        case MICROBIT_ID_IO_P15: return &uBit.io.P15; // ?
        // P18 // 1, ?
        case MICROBIT_ID_IO_A0_SCL: return &uBit.io.A0SCL;
        case MICROBIT_ID_IO_A0_SDA: return &uBit.io.A0SDA; 
        case MICROBIT_ID_IO_A1_RX: return &uBit.io.A1RX;
        case MICROBIT_ID_IO_A1_TX: return &uBit.io.A1TX;
        
#if MICROBIT_CODAL
        // case MICROBIT_ID_IO_P18: return &uBit.io.P18; // ?
        case MICROBIT_ID_LOGO: return &uBit.io.logo;
        case MICROBIT_ID_IO_RGB: return &uBit.io.RGB;
        case MICROBIT_ID_IO_M_A_IN1: return &uBit.io.M_A_IN1;
        case MICROBIT_ID_IO_M_A_IN2: return &uBit.io.M_A_IN2;
        case MICROBIT_ID_IO_M_B_IN1: return &uBit.io.M_B_IN1;
        case MICROBIT_ID_IO_M_B_IN2: return &uBit.io.M_B_IN2;
        case MICROBIT_ID_IO_M_MODE: return &uBit.io.M_MODE;
        case 1001: return &uBit.io.usbTx;
        case 1002: return &uBit.io.usbRx;
#else
        case MICROBIT_ID_LOGO: return &uBit.io.MICROPHONE;
        // case MICROBIT_ID_IO_P18: return &uBit.io.A0SDA; //
#endif
        default: return NULL;
    }
}

} // pxt

namespace pins {
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
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Digital"
    int digitalReadPin(DigitalPin name) {
        PINREAD(getDigitalValue());
    }

    /**
      * Set a pin or connector value to either 0 or 1.
      * @param name pin to write to, eg: DigitalPin.P0
      * @param value value to set on the pin, 1 eg,0
      */
    //% help=pins/digital-write-pin weight=29
    //% blockId=device_set_digital_pin block="digital write|pin %name|to %value"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Digital"
    void digitalWritePin(DigitalPin name, int value) {
        PINOP(setDigitalValue(value));
    }

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     * @param name pin to write to, eg: AnalogPin.P0
     */
    //% help=pins/analog-read-pin weight=25
    //% blockId=device_get_analog_pin block="analog read|pin %name" blockGap="8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Analog"
    int analogReadPin(AnalogPin name) {
        PINREAD(getAnalogValue());
    }

    /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param name pin name to write to, eg: AnalogPin.P0
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
    //% help=pins/analog-write-pin weight=24
    //% blockId=device_set_analog_pin block="analog write|pin %name|to %value" blockGap=8
    //% value.min=0 value.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Analog"
    void analogWritePin(AnalogPin name, int value) {
        PINOP(setAnalogValue(value));
    }

    /**
     * Configure the pulse-width modulation (PWM) period of the analog output in microseconds.
     * If this pin is not configured as an analog output (using `analog write pin`), the operation has no effect.
     * @param name analog pin to set period to, eg: AnalogPin.P0
     * @param micros period in micro seconds. eg:20000
     */
    //% help=pins/analog-set-period weight=23 blockGap=8
    //% blockId=device_set_analog_period block="analog set period|pin %pin|to (µs)%micros"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% group="Analog"
    void analogSetPeriod(AnalogPin name, int micros) {
        PINOP(setAnalogPeriodUs(micros));
    }

    /**
    * Configure the pin as a digital input and generate an event when the pin is pulsed either high or low.
    * @param name digital pin to register to, eg: DigitalPin.P0
    * @param pulse the value of the pulse, eg: PulseValue.High
    */
    //% help=pins/on-pulsed weight=22 blockGap=16 advanced=true
    //% blockId=pins_on_pulsed block="on|pin %pin|pulsed %pulse"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% group="Pulse"
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
    //% weight=21 blockGap=8
    //% group="Pulse"
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
    //% weight=20 advanced=true
    //% help=pins/pulse-in
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Pulse"
    int pulseIn(DigitalPin name, PulseValue value, int maxDuration = 2000000) {
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

    // TODO FIX THIS IN THE DAL!
    inline void fixMotorIssue(AnalogPin name) {
#if MICROBIT_CODAL
#else
        NRF_TIMER2->SHORTS = TIMER_SHORTS_COMPARE3_CLEAR_Msk;
        NRF_TIMER2->INTENCLR = TIMER_INTENCLR_COMPARE3_Msk;
        NRF_TIMER2->PRESCALER = 4;
        NRF_TIMER2->CC[3] = 20000;
        NRF_TIMER2->TASKS_START = 1;
        NRF_TIMER2->EVENTS_COMPARE[3] = 0;
        PINOP(getDigitalValue());
#endif
    }

    /**
     * Write a value to the servo, controlling the shaft accordingly. On a standard servo, this will set the angle of the shaft (in degrees), moving the shaft to that orientation. On a continuous rotation servo, this will set the speed of the servo (with ``0`` being full-speed in one direction, ``180`` being full speed in the other, and a value near ``90`` being no movement).
     * @param name pin to write to, eg: AnalogPin.P0
     * @param value angle or rotation speed, eg:180,90,0
     */
    //% help=pins/servo-write-pin weight=20
    //% blockId=device_set_servo_pin block="servo write|pin %name|to %value" blockGap=8
    //% parts=microservo trackArgs=0
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Servo"
    void servoWritePin(AnalogPin name, int value) {
        PINOP(setServoValue(value));
    }

    /**
    * Specifies that a continuous servo is connected.
    */
    //%
    //% group="Servo"
    void servoSetContinuous(AnalogPin name, bool value) {
        // handled in simulator
    }

    /**
     * Configure the IO pin as an analog/pwm output and set a pulse width. The period is 20 ms period and the pulse width is set based on the value given in **microseconds** or `1/1000` milliseconds.
     * @param name pin name
     * @param micros pulse duration in micro seconds, eg:1500
     */
    //% help=pins/servo-set-pulse weight=19
    //% blockId=device_set_servo_pulse block="servo set pulse|pin %value|to (µs) %micros"
    //% value.fieldEditor="gridpicker" value.fieldOptions.columns=4
    //% value.fieldOptions.tooltips="false" value.fieldOptions.width="250"
    //% group="Servo"
    void servoSetPulse(AnalogPin name, int micros) {
        fixMotorIssue(name);
        PINOP(setServoPulseUs(micros));
    }


    PinCompat* pitchPin = NULL;
    PinCompat* pitchPin2 = NULL;
    uint8_t pitchVolume = 0xff;
    bool analogTonePlaying = false;
    bool edgeConnectorSoundDisabled = false;

    /**
     * Set the pin used when using analog pitch or music.
     * @param name pin to modulate pitch from
     */
    //% blockId=device_analog_set_pitch_pin block="analog set pitch pin %name"
    //% help=pins/analog-set-pitch-pin weight=3 advanced=true
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% blockHidden=true
    //% group="Pitch"
    void analogSetPitchPin(AnalogPin name) {
        pitchPin = getPin((int)name);
        pitchPin2 = NULL;
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
    //% help=pins/analog-set-pitch-volume weight=3 advanced=true
    //% volume.min=0 volume.max=255
    //% blockHidden=true
    //% group="Pitch"
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
    //% blockHidden=true
    //% group="Pitch"
    int analogPitchVolume() {
        return pitchVolume;
    }

    /**
     * Emit a plse-width modulation (PWM) signal to the current pitch pin. Use `analog set pitch pin` to define the pitch pin.
     * @param frequency frequency to modulate in Hz.
     * @param ms duration of the pitch in milli seconds.
     */
    //% blockId=device_analog_pitch block="analog pitch %frequency|for (ms) %ms"
    //% help=pins/analog-pitch async advanced=true
    //% group="Pitch"
    //% blockHidden=true
    //% weight=14
    //% blockGap=8
    void analogPitch(int frequency, int ms) {
        // init pins if needed
        if (NULL == pitchPin) {
#if MICROBIT_CODAL
            pitchPin = &uBit.audio.virtualOutputPin;
#else
            pitchPin = getPin((int)AnalogPin::P0);
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
        if (NULL != pitchPin && !edgeConnectorSoundDisabled)
            pinAnalogSetPitch(pitchPin, frequency, ms);
        // clear pitch
        if (ms > 0) {
            fiber_sleep(ms);
            if (NULL != pitchPin && !edgeConnectorSoundDisabled)
                pitchPin->setAnalogValue(0);
            analogTonePlaying = false;
            // causes issues with v2 DMA.
            // fiber_sleep(5);
        }
#endif
    }


    /**
    * Configure the pull directiion of of a pin.
    * @param name pin to set the pull mode on, eg: DigitalPin.P0
    * @param pull one of the mbed pull configurations, eg: PinPullMode.PullUp
    */
    //% help=pins/set-pull weight=3 advanced=true
    //% blockId=device_set_pull block="set pull|pin %pin|to %pull"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% group="Digital"
    void setPull(DigitalPin name, PinPullMode pull) {
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
    //% help=pins/set-events weight=4 advanced=true
    //% blockId=device_set_pin_events block="set pin %pin|to emit %type|events"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% group="Digital"
    void setEvents(DigitalPin name, PinEventType type) {
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
     * @param name pin of Neopixel strip, eg: DigitalPin.P0
     * @param value width of matrix (at least ``2``)
     */
    //% help=pins/neopixel-matrix-width weight=3 advanced=true
    //% blockId=pin_neopixel_matrix_width block="neopixel matrix width|pin %pin %width" blockGap=8
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% width.defl=5 width.min=2
    //% blockHidden=true
    void setMatrixWidth(DigitalPin pin, int width) {}

#if MICROBIT_CODAL
#define BUFFER_TYPE uint8_t*
#else
#define BUFFER_TYPE char*
#endif

    /**
     * Read `size` bytes from a 7-bit I2C `address`.
     */
    //%
    //% group="i2c"
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
    //% group="i2c"
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
    //% help=pins/spi-write weight=5 advanced=true
    //% blockId=spi_write block="spi write %value"
    //% group="spi"
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
    //% group="spi"
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
    //% help=pins/spi-frequency weight=4 advanced=true
    //% blockId=spi_frequency block="spi frequency %frequency"
    //% group="spi"
    void spiFrequency(int frequency) {
        auto p = allocSPI();
        p->frequency(frequency);
    }

    /**
    * Set the SPI bits and mode
    * @param bits the number of bits, eg: 8
    * @param mode the mode, eg: 3
    */
    //% help=pins/spi-format weight=3 advanced=true
    //% blockId=spi_format block="spi format|bits %bits|mode %mode"
    //% group="spi"
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
    //% help=pins/spi-pins weight=2 advanced=true
    //% blockId=spi_pins block="spi set pins|MOSI %mosi|MISO %miso|SCK %sck"
    //% mosi.fieldEditor="gridpicker" mosi.fieldOptions.columns=4
    //% mosi.fieldOptions.tooltips="false" mosi.fieldOptions.width="250"
    //% miso.fieldEditor="gridpicker" miso.fieldOptions.columns=4
    //% miso.fieldOptions.tooltips="false" miso.fieldOptions.width="250"
    //% sck.fieldEditor="gridpicker" sck.fieldOptions.columns=4
    //% sck.fieldOptions.tooltips="false" sck.fieldOptions.width="250"
    //% group="spi"
    void spiPins(DigitalPin mosi, DigitalPin miso, DigitalPin sck) {
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
    //% group="Digital"
    void pushButton(DigitalPin pin) {
        new MicroBitButton((PinName)getPin((int)(pin))->name, (int)pin, MICROBIT_BUTTON_ALL_EVENTS, PinMode::PullUp);
    }

    /**
    * Set the pin used when producing sounds and melodies. Default is P0.
    * @param name pin to modulate pitch from
    */
    //% blockId=pin_set_audio_pin block="set audio pin $name"
    //% help=pins/set-audio-pin weight=3
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% weight=1
    //% group="Pitch"
    void setAudioPin(AnalogPin name) {
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
    //% weight=0
    void setAudioPinEnabled(bool enabled) {
        edgeConnectorSoundDisabled = !enabled;
#if MICROBIT_CODAL
        uBit.audio.setPinEnabled(enabled);
#endif
    }
}