namespace pxsim.hardware {

    // Number of built-in WS2812 RGB LEDs: 3 on Calliope mini v3, 1 on v1/v2.
    export function _rgbLedCount(): number {
        return board().hardwareVersion >= 3 ? 3 : 1;
    }

    // Onboard motor driver type, mirrors libs/core/hardware.ts:
    //   0 = none, 1 = DRV8837 (v1/v2 single), 2 = dual H-bridge (v3 codal).
    // Must be non-zero for motors.dualMotorPower() to drive the motor pins in the sim.
    export function _motorDriverType(): number {
        return board().hardwareVersion >= 3 ? 2 : 1;
    }

}
