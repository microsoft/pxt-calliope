#include "ksbit.h"

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
//% color=#008272 weight=30
namespace motors {
    /**
    * Turns on the motor at a certain percent of power.
    * @param power %percent of power sent to the motor. Negative power goes backward. eg: 50
    */
    //% blockId=motor_on block="motor on at %percent"
    //% parts=dcmotor weight=90 blockGap=8
    void motorPower(int power) {
        uBit.soundmotor.Motor_On(power);
    }

    /**
    * Send break, coast or sleep commands to the motor
    */
    //% blockId=motor_command block="motor %command"
    //% parts=dcmotor weight=85
    void motorCommand(MotorCommand command) {
        switch(command) {
            case MotorCommand::Coast: uBit.soundmotor.Motor_Coast();break;
            case MotorCommand::Break: uBit.soundmotor.Motor_Break();break;
            case MotorCommand::Sleep: uBit.soundmotor.Motor_Sleep();break;
        }
    }

    /**
    * Controls two motors attached to the board.
    */
    //% blockId=block_dual_motor block="motor %motor|at %percent"
    //% weight=80
    void dualMotorPower(Motor motor, int duty_percent) {
        switch(motor) {
            case Motor::A: if (duty_percent <= 0) uBit.soundmotor.MotorA_Off();
            else uBit.soundmotor.MotorA_On(duty_percent); break;
            case Motor::B: if (duty_percent <= 0) uBit.soundmotor.MotorB_Off();
            else uBit.soundmotor.MotorB_On(duty_percent); break;
            case Motor::AB: if (duty_percent <= 0) {
                uBit.soundmotor.MotorA_Off();
                uBit.soundmotor.MotorB_Off();
            } else {
                uBit.soundmotor.MotorA_On(duty_percent);
                uBit.soundmotor.MotorB_On(duty_percent);
            }
            break;
        }
    }
}