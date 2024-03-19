/**
* Blocks to control the onboard motors
*/
namespace motors {

    /**
    * Turns on the motor at a certain percent of power. Switches to single motor mode!
    * @param power %percent of power sent to the motor. Negative power goes backward. eg: 50
    */
    //% blockId=motor_on block="motor on at %percent \\%"
    //% parts=dcmotor weight=90 blockGap=8
    //% percent.shadow="speedPicker"
    //% power.defl=100
    //% hidden=1 deprecated=1
    export function motorPower(power: number) {
        dualMotorPower(Motor.M0, power)
    }

    /**
    * Send break, coast or sleep commands to the motor. Has no effect in dual-motor mode.
    */
    //% blockId=motor_command block="motor %command"
    //% parts=dcmotor weight=85
    //% hidden=1 deprecated=1
    export function motorCommand(command: MotorCommand) {
        if(command == MotorCommand.Break) {
            dualMotorPower(Motor.M0_M1, 0)
        }
    }

    /**
    * Controls two motors attached to the board.
    */
    //% blockId=block_dual_motor block="motor %motor|at %percent \\%"
    //% percent.shadow="speedPicker"
    //% weight=80
    //% duty_percent.defl=100
    export function dualMotorPower(motor: Motor, duty_percent: number) {

        pins.digitalWritePin(DigitalPin.M_MODE, 1);

        const power = Math.clamp(-1023, 1023, Math.map(duty_percent, -100, 100, -1023, 1023));
        
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



