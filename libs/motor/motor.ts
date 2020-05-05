basic.showString("A");
motors.dualMotorPower(Motor.A, 100);
basic.pause(2000);
basic.showString("B");
motors.dualMotorPower(Motor.B, 100);
basic.pause(2000);
basic.showString("X");
motors.dualMotorPower(Motor.AB, 0);
basic.pause(2000);
basic.showString("A");
for (var power = 0; power <= 100; power += 10) {
    basic.showNumber(power/10);
    motors.dualMotorPower(Motor.A, power);
    basic.pause(1000);
}
motors.dualMotorPower(Motor.AB, 0);
basic.pause(2000);
basic.showString("B");
for (power = 0; power <= 100; power += 10) {
    basic.showNumber(power/10);
    motors.dualMotorPower(Motor.B, power);
    basic.pause(1000);
}
motors.dualMotorPower(Motor.AB, 0);
basic.pause(2000);
basic.showString("+");
motors.dualMotorPower(Motor.AB, 100);
basic.pause(2000);
basic.showString("#");
motors.dualMotorPower(Motor.AB, 0);
for (power = 0; power <= 100; power += 10) {
    basic.showNumber(power/10);
    motors.dualMotorPower(Motor.AB, power);
    basic.pause(1000);
}
motors.dualMotorPower(Motor.AB, 0);
