/**
 * Events and data from sensors
 */
//% color=#C90072 weight=99 icon="\uf192"
//% groups=['Events', 'States', 'Sensors', 'Configuration', 'System', 'others']
namespace input {
    /**
     * Returns the value of a C++ runtime constant
     */
    //% weight=1 weight=19 blockId="control_button_event_value_id" block="%id"
    //% shim=TD_ID advanced=true
    //% blockHidden=true
    export function buttonEventValueId(id: ButtonEvent): number {
        return id;
    }

    /**
     * Gets the number of milliseconds elapsed since power on.
     */
    //% help=input/running-time weight=50 blockGap=8
    //% blockId=device_get_running_time block="running time (ms)"
    //% advanced=true
    //% group="System"
    export function runningTime() {
        return control.millis();
    }

    /**
     * Gets the number of microseconds elapsed since power on.
     */
    //% help=input/running-time-micros weight=49 blockGap=8
    //% blockId=device_get_running_time_micros block="running time (micros)"
    //% advanced=true
    //% group="System"
    export function runningTimeMicros() {
        return control.micros();
    }
    
}
