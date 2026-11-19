enum Motor {
    //% block="M0"
    M0,
    //% block="M1"
    M1,
    //% block="M0 & M1"
    M0_M1
}

/**
* Blocks to control the onboard motors
*/
//% color=#008272 weight=30 icon="\uf1b9"
//% groups=['Calliope mini V3', 'Calliope mini V1/V2']
namespace motors {

    /**
    * Controls two motors attached to the board.
    * @param percent power from -100 to 100; negative runs the motor backward, eg: 100
    */
    //% blockId=block_dual_motor block="motor %motor|at %percent \\%"
    //% percent.shadow="speedPicker"
    //% weight=80
    //% percent.defl=100
    //% parts="motor" trackArgs=0
    //% group="Calliope mini V3"
    export function dualMotorPower(motor: Motor, percent: number) {
        const driverType = hardware._motorDriverType()
        if (driverType === 0) return

        pins.digitalWritePin(DigitalPin.M_MODE, 1)

        if (driverType === 1) {
            // v1/v2: one bidirectional motor on the single DRV8837 (see driveSingleMotorDal).
            driveSingleMotorDal(percent)
        } else {
            // Calliope v3 codal: dual H-bridge
            const power = Math.clamp(-1023, 1023, Math.map(percent, -100, 100, -1023, 1023))
            if (motor === Motor.M0 || motor === Motor.M0_M1) {
                pins.digitalWritePin(DigitalPin.M0_DIR, ((power < 0) ? 1 : 0))
                pins.analogWritePin(AnalogPin.M0_SPEED, Math.abs(power))
            }
            if (motor === Motor.M1 || motor === Motor.M0_M1) {
                pins.digitalWritePin(DigitalPin.M1_DIR, ((power < 0) ? 1 : 0))
                pins.analogWritePin(AnalogPin.M1_SPEED, Math.abs(power))
            }
        }
    }

    /**
    * Controls the single onboard motor on Calliope mini v1/v2.
    * @param percent power from -100 to 100; negative runs the motor backward, eg: 100
    */
    //% blockId=block_single_motor block="motor on at %percent \\%"
    //% percent.shadow="speedPicker"
    //% percent.defl=100
    //% weight=75
    //% group="Calliope mini V1/V2"
    //% trackArgs=0
    export function motorPower(percent: number) {
        // V1/V2 single-motor block. It deliberately does NOT carry parts="motor" and does NOT
        // call dualMotorPower, so the simulator (which models v3) shows no motor for this
        // block. On any non-v1/v2 driver (including the simulator) it is a no-op.
        if (hardware._motorDriverType() !== 1) return
        driveSingleMotorDal(percent)
    }

    // Calliope v1/v2: a single DRV8837 H-bridge drives ONE bidirectional motor across
    // OUT1/OUT2. Direction is the sign of duty_percent (the M0/M1 selector is a v3 concept),
    // matching the original CalliopeSoundMotor single-motor mode:
    //   forward (power > 0): IN1 (M0_DIR) = PWM, IN2 (M1_DIR) = 0
    //   reverse (power < 0): IN1 (M0_DIR) = 0,   IN2 (M1_DIR) = PWM
    //   stop    (power = 0): IN1 = 0,            IN2 = 0   (coast)
    // The inactive input is forced LOW with digitalWritePin (NOT analogWritePin 0): that
    // releases its PWM channel and gives a clean digital LOW, so a forward<->reverse switch
    // fully applies in ONE call. Leaving both pins in analog/PWM mode (one at 0%) left a
    // transient both-inputs-high brake on a direction change, so the first press only stopped
    // the motor and a second press was needed to reverse. Both inputs high = DRV8837 brake.
    function driveSingleMotorDal(duty_percent: number) {
        pins.digitalWritePin(DigitalPin.M_MODE, 1)
        const power = Math.clamp(-1023, 1023, Math.map(duty_percent, -100, 100, -1023, 1023))
        if (power > 0) {
            pins.digitalWritePin(DigitalPin.M1_DIR, 0)
            pins.analogWritePin(AnalogPin.M0_DIR, power)
        } else if (power < 0) {
            pins.digitalWritePin(DigitalPin.M0_DIR, 0)
            pins.analogWritePin(AnalogPin.M1_DIR, -power)
        } else {
            pins.digitalWritePin(DigitalPin.M0_DIR, 0)
            pins.digitalWritePin(DigitalPin.M1_DIR, 0)
        }
    }

}

// Calliope v1/v2 DAL note: the speaker and motors share one DRV8837. The audio config
// (nSLEEP HIGH, IN2/M1_DIR static HIGH, IN1/M0_DIR = PWM) must NOT be applied eagerly at
// boot: with IN2 driven HIGH while the driver is awake, the H-bridge output is energized,
// which is identical to "M1 at full power" — so M1 would spin even in a program with no
// blocks. Instead the C++ audio path sets this config lazily on the first tone and
// re-asserts it before every tone (see analogPitch in pins.cpp). Until audio or a motor
// block runs, the driver stays asleep (nSLEEP LOW → outputs Hi-Z) and no motor spins.

