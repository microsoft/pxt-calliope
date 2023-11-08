basic.showString("A");
motors.dualMotorPower(Motor.M0, 100);
basic.pause(2000);
basic.showString("B");
motors.dualMotorPower(Motor.M1, 100);
basic.pause(2000);
basic.showString("X");
motors.dualMotorPower(Motor.M0_M1, 0);
basic.pause(2000);
basic.showString("A");
for (var power = 0; power <= 100; power += 10) {
    basic.showNumber(power/10);
    motors.dualMotorPower(Motor.M0, power);
    basic.pause(1000);
}
motors.dualMotorPower(Motor.M0_M1, 0);
basic.pause(2000);
basic.showString("B");
for (power = 0; power <= 100; power += 10) {
    basic.showNumber(power/10);
    motors.dualMotorPower(Motor.M1, power);
    basic.pause(1000);
}
motors.dualMotorPower(Motor.M0_M1, 0);
basic.pause(2000);
basic.showString("+");
motors.dualMotorPower(Motor.M0_M1, 100);
basic.pause(2000);
basic.showString("#");
motors.dualMotorPower(Motor.M0_M1, 0);
for (power = 0; power <= 100; power += 10) {
    basic.showNumber(power/10);
    motors.dualMotorPower(Motor.M0_M1, power);
    basic.pause(1000);
}
motors.dualMotorPower(Motor.M0_M1, 0);
