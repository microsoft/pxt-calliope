#include "pxt.h"

enum MotorCommand {
    //% block=coast
    Coast,
    //% block=break
    Break,
    //% block=sleep
    Sleep
};

enum Motor {
    A,
    B,
    //% block="A and B"
    AB
};

/**
* Blocks to control the onboard motors
*/
//% color=#008272 weight=30 icon="\uf1b9"
namespace motors {
    /**
    * Turns on the motor at a certain percent of power. Switches to single motor mode!
    * @param power %percent of power sent to the motor. Negative power goes backward. eg: 50
    */
    //% blockId=motor_on block="motor on at %percent \\%"
    //% parts=dcmotor weight=90 blockGap=8
    //% percent.shadow="speedPicker"
    //% power.defl=100
    void motorPower(int power) {
        uBit.soundmotor.motorOn(power);
    }

    /**
    * Send break, coast or sleep commands to the motor. Has no effect in dual-motor mode.
    */
    //% blockId=motor_command block="motor %command"
    //% parts=dcmotor weight=85
    void motorCommand(MotorCommand command) {
        switch(command) {
            case MotorCommand::Coast: uBit.soundmotor.motorCoast();break;
            case MotorCommand::Break: uBit.soundmotor.motorBreak();break;
            case MotorCommand::Sleep: uBit.soundmotor.motorSleep();break;
        }
    }

    /**
    * Controls two motors attached to the board. Switches to dual-motor mode!
    */
    //% blockId=block_dual_motor block="motor %motor|at %percent \\%"
     //% percent.shadow="speedPicker"
    //% weight=80
    //% duty_percent.defl=100
    void dualMotorPower(Motor motor, int duty_percent) {
        switch(motor) {
            case Motor::A: if (duty_percent <= 0) uBit.soundmotor.motorAOff();
            else uBit.soundmotor.motorAOn(duty_percent); break;
            case Motor::B: if (duty_percent <= 0) uBit.soundmotor.motorBOff();
            else uBit.soundmotor.motorBOn(duty_percent); break;
            case Motor::AB: if (duty_percent <= 0) {
                uBit.soundmotor.motorAOff();
                uBit.soundmotor.motorBOff();
            } else {
                uBit.soundmotor.motorAOn(duty_percent);
                uBit.soundmotor.motorBOn(duty_percent);
            }
            break;
        }
    }
}