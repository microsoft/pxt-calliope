#include "ksbit.h"

/**
* Blocks to control the onboard motors
*/
//% color=#008272 weight=30
namespace motors {
    /**
    * Controls the power sent to a single motor
    * @param power %percent of power sent to the motor. Negative power goes backward. eg: 50
    */
    //% blockId=motor_on block="motor on at %percent|%"
    //% parts=dcmotor
    void motorOn(int power) {
        uBit.soundmotor.Motor_On(power);
    }
}