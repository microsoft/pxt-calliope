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
    //% block="M0"
    M0,
    //% block="M1"
    M1,
    //% block="M0 & M1"
    M0_M1
};

//% color=#008272 weight=30 icon="\uf1b9"
namespace motors {

    /**
    * Turns on the motor at a certain percent of power. Switches to single motor mode!
    * @param power %percent of power sent to the motor. Negative power goes backward. eg: 50
    */
   //% blockId=motor_power_dal
    void motorPowerDal(int power) {
#if MICROBIT_CODAL
#else
        uBit.soundmotor.motorOn(power);
#endif
    }

    /**
    * Send break, coast or sleep commands to the motor. Has no effect in dual-motor mode.
    */
   //% blockId=motor_command_dal
   //% hidden=1
    void motorCommandDal(MotorCommand command) {
#if MICROBIT_CODAL
#else
        switch(command) {
            case MotorCommand::Coast: uBit.soundmotor.motorCoast();break;
            case MotorCommand::Break: uBit.soundmotor.motorBreak();break;
            case MotorCommand::Sleep: uBit.soundmotor.motorSleep();break;
        }
#endif
    }

    /**
    * Controls two motors attached to the board. Switches to dual-motor mode!
    */
   //% blockId=dual_motor_power_dal
   //% hidden=1
    void dualMotorPowerDal(Motor motor, int duty_percent) {
#if MICROBIT_CODAL
#else
        switch(motor) {
            case Motor::M0: 
                if (duty_percent <= 0) uBit.soundmotor.motorAOff();
                else uBit.soundmotor.motorAOn(duty_percent);
                break;
            case Motor::M1: 
                if (duty_percent <= 0) uBit.soundmotor.motorBOff();
                else uBit.soundmotor.motorBOn(duty_percent);
                break;
            case Motor::M0_M1: 
                if (duty_percent <= 0) {
                    uBit.soundmotor.motorAOff();
                    uBit.soundmotor.motorBOff();
                } else {
                    uBit.soundmotor.motorAOn(duty_percent);
                    uBit.soundmotor.motorBOn(duty_percent);
                }
                break;
        }
#endif
    }
}