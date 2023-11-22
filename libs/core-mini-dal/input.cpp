#include "pxt.h"

//% color=#c90072 weight=99 icon="\uf192"
namespace input {

      /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_clear_calibration" block="clear calibration compass"
    //% weight=17
    //% group="Configuration"
    //% blockHidden=true deprecated=true
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
    //% blockHidden=true deprecated=true
    void assumeCalibrationCompass() {
        uBit.compass.assumeCalibration();
    }


}
