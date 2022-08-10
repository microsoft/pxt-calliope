/**
 * Events and data from sensors
 */
//% color=#C90072 weight=99 icon="\uf192"
//% groups=['Events', 'States', 'Sensors', 'Configuration', 'System', 'others']
namespace input {

    /**
     * Returns the ID of an Button Event
     */
    //% help=input/button-event
    //% weight=19 blockId="control_button_event_value" block="%id"
    //% shim=TD_ID advanced=true
    //% group="Events"
    export function buttonEventValue(id: ButtonEvent): number {
        return id;
    }

    /**
     * Returns the ID of an Click Event
     */
    //% blockId="control_button_event_click" block="clicked"
    //% advanced=true
    //% blockHidden=true
    export function buttonEventClick(): number {
        return ButtonEvent.Click;
    }

    /**
     * Returns the ID of an Down Event
     */
    //% blockId="control_button_event_down" block="pressed down"
    //% advanced=true
    //% blockHidden=true
    export function buttonEventDown(): number {
        return ButtonEvent.Down;
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
