#include "pxt.h"

//% color=#C94600 weight=99 icon="\uf192"
namespace input {

  /**
     * Returns 'true' when the compass is calibrated. Otherwise returns 'false'.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_is_calibrated" block="is compass calibrated"
    //% weight=19
    //% group="System"
    bool isCalibratedCompass() {
        return (uBit.compass.isCalibrated() == 1);
    }

      /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_clear_calibration" block="clear calibration compass"
    //% weight=17
    //% group="Configuration"
    //% blockHidden=true
    void clearCalibrationCompass() {
        uBit.compass.clearCalibration();
    }

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_assume_calibration" block="assume calibration compass"
    //% weight=16
    //% group="Configuration"
    //% blockHidden=true
    void assumeCalibrationCompass() {
        uBit.compass.assumeCalibration();
    }


}
