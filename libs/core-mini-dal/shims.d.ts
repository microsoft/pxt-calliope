// Auto-generated. Do not edit.



    //% color=#B4009E weight=99 icon="\uf192"
declare namespace input {

    /**
     * Returns 'true' when the compass is calibrated. Otherwise returns 'false'.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_is_calibrated" block="is compass calibrated"
    //% weight=19
    //% group="System" shim=input::isCalibratedCompass
    function isCalibratedCompass(): boolean;

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_clear_calibration" block="clear calibration compass"
    //% weight=17
    //% group="Configuration"
    //% blockHidden=true shim=input::clearCalibrationCompass
    function clearCalibrationCompass(): void;

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_assume_calibration" block="assume calibration compass"
    //% weight=16
    //% group="Configuration"
    //% blockHidden=true shim=input::assumeCalibrationCompass
    function assumeCalibrationCompass(): void;
}

// Auto-generated. Do not edit. Really.
