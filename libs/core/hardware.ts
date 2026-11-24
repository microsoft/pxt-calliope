namespace hardware {
    /**
     * Returns the motor driver type.
     * 2 = Calliope v3 codal dual H-bridge, 1 = Calliope v1/v2 DAL single DRV8837, 0 = none.
     */
    // On device the C++ shim (pins.cpp) returns the real per-board value. The TS body below is
    // the SIMULATOR implementation (a `//% shim=` function with a TS body uses that body in the
    // sim, never the pxsim.hardware._motorDriverType stub). It must NOT be a constant: the
    // simulator runs both a v1/v2 and a v3 board, so the driver type has to track the selected
    // revision. control._hardwareVersion() is the body-less shim that IS version-aware in the
    // sim (pxsim.control._hardwareVersion -> "2"/"3"), so derive the driver type from it:
    // v3 -> dual H-bridge (2), v1/v2 -> single DRV8837 (1). On v2 this lets motors.motorPower()
    // pass its `!== 1` guard, drive the motor pins, and animate the single-motor visualization.
    //% shim=hardware::_motorDriverType
    export function _motorDriverType(): int32 {
        return parseInt(control._hardwareVersion()) >= 3 ? 2 : 1
    }
}
