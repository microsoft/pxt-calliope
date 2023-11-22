// Auto-generated. Do not edit.


    /**
     * Creation, manipulation and display of LED images.
     */
    //% color=#7600A8 weight=31 icon="\uf03e"
    //% advanced=true
declare namespace images {

    /**
     * Creates an image that fits on the LED screen.
     */
    //% weight=75 help=images/create-image
    //% blockId=device_build_image block="create image"
    //% parts="ledmatrix" imageLiteral=1 shim=images::createImage
    function createImage(leds: string): Image;

    /**
     * Creates an image with 2 frames.
     */
    //% weight=74 help=images/create-big-image
    //% blockId=device_build_big_image block="create big image" imageLiteral=2
    //% parts="ledmatrix" shim=images::createBigImage
    function createBigImage(leds: string): Image;
}


declare interface Image {
    /**
     * Plots the image at a given column to the screen
     */
    //% help=images/plot-image
    //% parts="ledmatrix" xOffset.defl=0 shim=ImageMethods::plotImage
    plotImage(xOffset?: int32): void;

    /**
     * Shows an frame from the image at offset ``x offset``.
     * @param xOffset column index to start displaying the image
     * @param interval time in milliseconds to pause after drawing
     */
    //% help=images/show-image weight=80 blockNamespace=images
    //% blockId=device_show_image_offset block="show image %sprite(myImage)|at offset %offset ||and interval (ms) %interval"
    //%
    //% blockGap=8 parts="ledmatrix" async interval.defl=400 shim=ImageMethods::showImage
    showImage(xOffset: int32, interval?: int32): void;

    /**
     * Draws the ``index``-th frame of the image on the screen.
     * @param xOffset column index to start displaying the image
     */
    //% help=images/plot-frame weight=80
    //% parts="ledmatrix" shim=ImageMethods::plotFrame
    plotFrame(xOffset: int32): void;

    /**
     * Scrolls an image .
     * @param frameOffset x offset moved on each animation step, eg: 1, 2, 5
     * @param interval time between each animation step in milli seconds, eg: 200
     */
    //% help=images/scroll-image weight=79 async blockNamespace=images
    //% blockId=device_scroll_image
    //% block="scroll image %sprite(myImage)|with offset %frameoffset|and interval (ms) %delay"
    //% blockGap=8 parts="ledmatrix" shim=ImageMethods::scrollImage
    scrollImage(frameOffset: int32, interval: int32): void;

    /**
     * Sets all pixels off.
     */
    //% help=images/clear
    //% parts="ledmatrix" shim=ImageMethods::clear
    clear(): void;

    /**
     * Sets a specific pixel brightness at a given position
     */
    //%
    //% parts="ledmatrix" shim=ImageMethods::setPixelBrightness
    setPixelBrightness(x: int32, y: int32, value: int32): void;

    /**
     * Gets the pixel brightness ([0..255]) at a given position
     */
    //%
    //% parts="ledmatrix" shim=ImageMethods::pixelBrightness
    pixelBrightness(x: int32, y: int32): int32;

    /**
     * Gets the width in columns
     */
    //% help=functions/width shim=ImageMethods::width
    width(): int32;

    /**
     * Gets the height in rows (always 5)
     */
    //% shim=ImageMethods::height
    height(): int32;

    /**
     * Set a pixel state at position ``(x,y)``
     * @param x pixel column
     * @param y pixel row
     * @param value pixel state
     */
    //% help=images/set-pixel
    //% parts="ledmatrix" shim=ImageMethods::setPixel
    setPixel(x: int32, y: int32, value: boolean): void;

    /**
     * Get the pixel state at position ``(x,y)``
     * @param x pixel column
     * @param y pixel row
     */
    //% help=images/pixel
    //% parts="ledmatrix" shim=ImageMethods::pixel
    pixel(x: int32, y: int32): boolean;

    /**
     * Show a particular frame of the image strip.
     * @param frame image frame to show
     */
    //% weight=70 help=images/show-frame
    //% parts="ledmatrix" interval.defl=400 shim=ImageMethods::showFrame
    showFrame(frame: int32, interval?: int32): void;
}


    /**
     * Provides access to basic Calliope mini functionality.
     */

declare namespace basic {

    /**
     * Draws an image on the LED screen.
     * @param leds the pattern of LED to turn on/off.
     * @param interval time in milliseconds to pause after drawing.
     */
    //% help=basic/show-leds
    //% weight=85 blockGap=8
    //% imageLiteral=1 async
    //% blockId=device_show_leds
    //% block="show leds" icon="\uf00a"
    //% parts="ledmatrix"
    //% group="LED matrix" interval.defl=400 shim=basic::showLeds
    function showLeds(leds: string, interval?: int32): void;

    /**
     * Display text on the display, one character at a time. If the string fits on the screen (i.e. is one letter), does not scroll.
     * @param text the text to scroll on the screen, eg: "hi!"
     * @param interval how fast to shift characters; eg: 50, 100, 150, 200
     */
    //% help=basic/show-string
    //% weight=100 blockGap=16
    //% block="show|string %text || in an interval of %interval ms"
    //% async
    //% blockId=device_print_message
    //% parts="ledmatrix"
    //% text.shadowOptions.toString=true
    //% expandableArgumentMode="toggle"
    //%
    //% group="LED matrix" interval.defl=150 shim=basic::showString
    function showString(text: string, interval?: int32): void;

    /**
     * Turn off all LEDs
     */
    //% help=basic/clear-screen weight=75
    //% blockId=device_clear_display block="clear screen"
    //% parts="ledmatrix"
    //% group="LED matrix"
    //% advanced=true shim=basic::clearScreen
    function clearScreen(): void;

    /**
     * Shows a sequence of LED screens as an animation.
     * @param leds pattern of LEDs to turn on/off
     * @param interval time in milliseconds between each redraw.
     */
    //% help=basic/show-animation weight=83 imageLiteral=1 async
    //% parts="ledmatrix"
    //% group="LED matrix" interval.defl=400 shim=basic::showAnimation
    function showAnimation(leds: string, interval?: int32): void;

    /**
     * Draws an image on the LED screen.
     * @param leds pattern of LEDs to turn on/off
     */
    //% help=basic/plot-leds weight=80
    //% parts="ledmatrix"
    //% group="LED matrix" imageLiteral=1 shim=basic::plotLeds
    function plotLeds(leds: string): void;

    /**
     * Repeats the code forever in the background. On each iteration, allows other codes to run.
     * @param body code to execute
     */
    //% help=basic/forever weight=55 blockGap=16 blockAllowMultiple=1 afterOnStart=true
    //% blockId=device_forever block="forever" icon="\uf01e"
    //% group="Control" shim=basic::forever
    function forever(a: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=basic/pause weight=50
    //% async block="pause (ms) %pause" blockGap=16
    //% blockId=device_pause icon="\uf110"
    //% pause.shadow=timePicker
    //% group="Control" shim=basic::pause
    function pause(ms: int32): void;
}



    //% color=#c90072 weight=99 icon="\uf192"
declare namespace input {

    /**
     * Do something when a button (A, B or both A+B) receives an event.
     * @param button the button
     * @param body code to run when event is raised
     * @param eventType event Type
     */
    //% help=input/on-button-event weight=100 blockGap=16
    //% blockId=device_button_selected_event block="on button %NAME| %eventType"
    //% eventType.shadow="control_button_event_click"
    //% parts="buttonpair"
    //% group="Events" shim=input::onButtonEvent
    function onButtonEvent(button: Button, eventType: int32, body: () => void): void;

    /**
     * Do something when when a gesture is done (like shaking the Calliope mini).
     * @param gesture the type of gesture to track, eg: Gesture.Shake
     * @param body code to run when gesture is raised
     */
    //% help=input/on-gesture weight=98 blockGap=16
    //% blockId=device_gesture_event block="on |%NAME"
    //% parts="accelerometer"
    //% NAME.fieldEditor="gestures" NAME.fieldOptions.columns=4
    //% group="Events" shim=input::onGesture
    function onGesture(gesture: Gesture, body: () => void): void;

    /**
     * Tests if a gesture is currently detected.
     * @param gesture the type of gesture to detect, eg: Gesture.Shake
     */
    //% help=input/is-gesture weight=86 blockGap=8
    //% blockId=deviceisgesture block="is %gesture gesture"
    //% parts="accelerometer"
    //% gesture.fieldEditor="gestures" gesture.fieldOptions.columns=4
    //% group="States" shim=input::isGesture
    function isGesture(gesture: Gesture): boolean;

    /**
     * Do something when a pin receives an touch event (while also touching the GND pin).
     * @param name the pin, eg: TouchPin.P0
     * @param body the code to run when event is fired on pin
     */
    //% help=input/on-pin-event weight=99 blockGap=16
    //% blockId=device_pin_custom_event block="on pin %name| %eventType"
    //% eventType.shadow="control_button_event_down"
    //% group="Events" shim=input::onPinTouchEvent
    function onPinTouchEvent(name: TouchPin, eventType: int32, body: () => void): void;

    /**
     * Get the button state (pressed or not) for ``A`` and ``B``.
     * @param button the button to query the request, eg: Button.A
     */
    //% help=input/button-is-pressed weight=89
    //% block="button|%NAME|is pressed"
    //% blockId=device_get_button2
    //% icon="\uf192" blockGap=8
    //% parts="buttonpair"
    //% group="States" shim=input::buttonIsPressed
    function buttonIsPressed(button: Button): boolean;

    /**
     * Do something when a button (A, B or both A+B) is pushed down and released again.
     * @param button the button that needs to be pressed
     * @param body code to run when event is raised
     */
    //% help=input/on-button-pressed weight=85 blockGap=16
    //% blockId=device_button_event block="on button|%NAME|pressed"
    //% parts="buttonpair"
    //% deprecated=true
    //% group="Events" shim=input::onButtonPressed
    function onButtonPressed(button: Button, body: () => void): void;

    /**
     * Do something when a pin is touched and released again (while also touching the GND pin).
     * @param name the pin that needs to be pressed, eg: TouchPin.P0
     * @param body the code to run when the pin is pressed
     */
    //% help=input/on-pin-pressed weight=83 blockGap=16
    //% blockId=device_pin_event block="on pin %name|pressed"
    //% group="Events"
    //% deprecated=true shim=input::onPinPressed
    function onPinPressed(name: TouchPin, body: () => void): void;

    /**
     * Do something when a pin is released.
     * @param name the pin that needs to be released, eg: TouchPin.P0
     * @param body the code to run when the pin is released
     */
    //% help=input/on-pin-released weight=6 blockGap=16
    //% blockId=device_pin_released block="on pin %NAME|released"
    //% advanced=true
    //% group="Events"
    //% deprecated=true shim=input::onPinReleased
    function onPinReleased(name: TouchPin, body: () => void): void;

    /**
     * Get the pin state (pressed or not). Requires to hold the ground to close the circuit.
     * @param name pin used to detect the touch, eg: TouchPin.P0
     */
    //% help=input/pin-is-pressed weight=87
    //% blockId="device_pin_is_pressed" block="pin %NAME|is pressed"
    //% blockGap=8
    //% group="States" shim=input::pinIsPressed
    function pinIsPressed(name: TouchPin): boolean;

    /**
     * Get the acceleration value in milli-gravitys (when the board is laying flat with the screen up, x=0, y=0 and z=-1024)
     * @param dimension x, y, or z dimension, eg: Dimension.X
     */
    //% help=input/acceleration weight=58
    //% blockId=device_acceleration block="acceleration (mg)|%NAME" blockGap=8
    //% parts="accelerometer"
    //% group="Sensors" shim=input::acceleration
    function acceleration(dimension: Dimension): int32;

    /**
     * Reads the light level applied to the LED screen in a range from ``0`` (dark) to ``255`` bright.
     */
    //% help=input/light-level weight=59
    //% blockId=device_get_light_level block="light level" blockGap=8
    //% parts="ledmatrix"
    //% group="Sensors" shim=input::lightLevel
    function lightLevel(): int32;

    /**
     * Get the current compass heading in degrees.
     */
    //% help=input/compass-heading
    //% weight=56
    //% blockId=device_heading block="compass heading (°)" blockGap=8
    //% parts="compass"
    //% group="Sensors" shim=input::compassHeading
    function compassHeading(): int32;

    /**
     * Gets the temperature in Celsius degrees (°C).
     */
    //% weight=57
    //% help=input/temperature
    //% blockId=device_temperature block="temperature (°C)" blockGap=8
    //% parts="thermometer"
    //% group="Sensors" shim=input::temperature
    function temperature(): int32;

    /**
     * The pitch or roll of the device, rotation along the ``x-axis`` or ``y-axis``, in degrees.
     * @param kind pitch or roll
     */
    //% help=input/rotation weight=52
    //% blockId=device_get_rotation block="rotation (°)|%NAME" blockGap=8
    //% parts="accelerometer" advanced=true
    //% group="Sensors" shim=input::rotation
    function rotation(kind: Rotation): int32;

    /**
     * Get the magnetic force value in ``micro-Teslas`` (``µT``). This function is not supported in the simulator.
     * @param dimension the x, y, or z dimension, eg: Dimension.X
     */
    //% help=input/magnetic-force weight=49
    //% blockId=device_get_magnetic_force block="magnetic force (µT)|%NAME" blockGap=8
    //% parts="compass"
    //% advanced=true
    //% group="Sensors" shim=input::magneticForce
    function magneticForce(dimension: Dimension): number;

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_calibrate" block="calibrate compass"
    //% weight=20 gap=8
    //% group="Configuration" shim=input::calibrateCompass
    function calibrateCompass(): void;

    /**
     * Sets the accelerometer sample range in gravities.
     * @param range a value describe the maximum strengh of acceleration measured
     */
    //% help=input/set-accelerometer-range
    //% blockId=device_set_accelerometer_range block="set accelerometer|range %range"
    //% weight=22 gap=8
    //% parts="accelerometer"
    //% advanced=true
    //% group="Configuration" shim=input::setAccelerometerRange
    function setAccelerometerRange(range: AcceleratorRange): void;

    /**
     * Returns 'true' when the compass is calibrated. Otherwise returns 'false'.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_is_calibrated" block="is compass calibrated"
    //% weight=19
    //% group="System"
    //% deprecated=true shim=input::isCalibratedCompass
    function isCalibratedCompass(): boolean;
}



    //% weight=1 color="#333333"
    //% advanced=true
declare namespace control {

    /**
     * Gets the number of milliseconds elapsed since power on.
     */
    //% help=control/millis weight=50
    //% blockId=control_running_time block="millis (ms)" shim=control::millis
    function millis(): int32;

    /**
     * Gets current time in microseconds. Overflows every ~18 minutes.
     */
    //% shim=control::micros
    function micros(): int32;

    /**
     * Schedules code that run in the background.
     */
    //% help=control/in-background blockAllowMultiple=1 afterOnStart=true
    //% blockId="control_in_background" block="run in background" blockGap=8 shim=control::inBackground
    function inBackground(a: () => void): void;

    /**
     * Blocks the calling thread until the specified event is raised.
     */
    //% help=control/wait-for-event async
    //% blockId=control_wait_for_event block="wait for event|from %src|with value %value" shim=control::waitForEvent
    function waitForEvent(src: int32, value: int32): void;

    /**
     * Resets the Calliope mini.
     */
    //% weight=30 async help=control/reset blockGap=8
    //% blockId="control_reset" block="reset" shim=control::reset
    function reset(): void;

    /**
     * Blocks the current fiber for the given microseconds
     * @param micros number of micro-seconds to wait. eg: 4
     */
    //% help=control/wait-micros weight=29 async
    //% blockId="control_wait_us" block="wait (µs)%micros"
    //% micros.min=0 micros.max=6000 shim=control::waitMicros
    function waitMicros(micros: int32): void;

    /**
     * Raises an event in the event bus.
     * @param src ID of the MicroBit Component that generated the event e.g. MICROBIT_ID_BUTTON_A.
     * @param value Component specific code indicating the cause of the event.
     * @param mode optional definition of how the event should be processed after construction (default is CREATE_AND_FIRE).
     */
    //% weight=21 blockGap=12 blockId="control_raise_event" block="raise event|from source %src=control_event_source_id|with value %value=control_event_value_id" blockExternalInputs=1
    //% help=control/raise-event
    //% mode.defl=1 shim=control::raiseEvent
    function raiseEvent(src: int32, value: int32, mode?: EventCreationMode): void;

    /**
     * Registers an event handler.
     */
    //% weight=20 blockGap=8 blockId="control_on_event" block="on event|from %src=control_event_source_id|with value %value=control_event_value_id"
    //% help=control/on-event
    //% blockExternalInputs=1 flags.defl=0 shim=control::onEvent
    function onEvent(src: int32, value: int32, handler: () => void, flags?: int32): void;

    /**
     * Gets the value of the last event executed on the bus
     */
    //% blockId=control_event_value" block="event value"
    //% help=control/event-value
    //% weight=18 shim=control::eventValue
    function eventValue(): int32;

    /**
     * Gets the timestamp of the last event executed on the bus
     */
    //% blockId=control_event_timestamp" block="event timestamp"
    //% help=control/event-timestamp
    //% weight=19 blockGap=8 shim=control::eventTimestamp
    function eventTimestamp(): int32;

    /**
     * Make a friendly name for the device based on its serial number
     */
    //% blockId="control_device_name" block="device name" weight=10 blockGap=8
    //% help=control/device-name
    //% advanced=true shim=control::deviceName
    function deviceName(): string;

    /**
     * Returns the major version of the microbit
     */
    //% help=control/hardware-version shim=control::_hardwareVersion
    function _hardwareVersion(): string;

    /**
     * Derive a unique, consistent serial number of this device from internal data.
     */
    //% blockId="control_device_serial_number" block="device serial number" weight=9
    //% help=control/device-serial-number
    //% advanced=true shim=control::deviceSerialNumber
    function deviceSerialNumber(): int32;

    /**
     * Derive a unique, consistent 64-bit serial number of this device from internal data.
     */
    //% help=control/device-long-serial-number
    //% advanced=true shim=control::deviceLongSerialNumber
    function deviceLongSerialNumber(): Buffer;

    /**
     * Informs simulator/runtime of a MIDI message
     * Internal function to support the simulator.
     */
    //% part=midioutput blockHidden=1 shim=control::__midiSend
    function __midiSend(buffer: Buffer): void;

    /**
     *
     */
    //% shim=control::__log
    function __log(priority: int32, text: string): void;

    /**
     * Allocates the next user notification event
     */
    //% help=control/allocate-notify-event shim=control::allocateNotifyEvent
    function allocateNotifyEvent(): int32;

    /** Write a message to DMESG debugging buffer. */
    //% shim=control::dmesg
    function dmesg(s: string): void;

    /** Write a message and value (pointer) to DMESG debugging buffer. */
    //% shim=control::dmesgPtr
    function dmesgPtr(str: string, ptr: Object): void;
}
declare namespace control {

    /**
     * Force GC and dump basic information about heap.
     */
    //% shim=control::gc
    function gc(): void;

    /**
     * Force GC and halt waiting for debugger to do a full heap dump.
     */
    //% shim=control::heapDump
    function heapDump(): void;

    /**
     * Set flags used when connecting an external debugger.
     */
    //% shim=control::setDebugFlags
    function setDebugFlags(flags: int32): void;

    /**
     * Record a heap snapshot to debug memory leaks.
     */
    //% shim=control::heapSnapshot
    function heapSnapshot(): void;

    /**
     * Return true if profiling is enabled in the current build.
     */
    //% shim=control::profilingEnabled
    function profilingEnabled(): boolean;
}



    //% color=#8169E6 weight=35 icon="\uf205"
declare namespace led {

    /**
     * Turn on the specified LED using x, y coordinates (x is horizontal, y is vertical). (0,0) is upper left.
     * @param x the horizontal coordinate of the LED starting at 0
     * @param y the vertical coordinate of the LED starting at 0
     */
    //% help=led/plot weight=78
    //% blockId=device_plot block="plot|x %x|y %y" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1 shim=led::plot
    function plot(x: int32, y: int32): void;

    /**
     * Turn on the specified LED with specific brightness using x, y coordinates (x is horizontal, y is vertical). (0,0) is upper left.
     * @param x the horizontal coordinate of the LED starting at 0
     * @param y the vertical coordinate of the LED starting at 0
     * @param brightness the brightness from 0 (off) to 255 (bright), eg:255
     */
    //% help=led/plot-brightness weight=78
    //% blockId=device_plot_brightness block="plot|x %x|y %y|brightness %brightness" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4 brightness.min=0 brightness.max=255
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    //% advanced=true shim=led::plotBrightness
    function plotBrightness(x: int32, y: int32, brightness: int32): void;

    /**
     * Turn off the specified LED using x, y coordinates (x is horizontal, y is vertical). (0,0) is upper left.
     * @param x the horizontal coordinate of the LED
     * @param y the vertical coordinate of the LED
     */
    //% help=led/unplot weight=77
    //% blockId=device_unplot block="unplot|x %x|y %y" blockGap=8
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1 shim=led::unplot
    function unplot(x: int32, y: int32): void;

    /**
     * Get the brightness state of the specified LED using x, y coordinates. (0,0) is upper left.
     * @param x the horizontal coordinate of the LED
     * @param y the vertical coordinate of the LED
     */
    //% help=led/point-brightness weight=76
    //% blockId=device_point_brightness block="point|x %x|y %y brightness"
    //% parts="ledmatrix"
    //% x.min=0 x.max=4 y.min=0 y.max=4
    //% x.fieldOptions.precision=1 y.fieldOptions.precision=1
    //% advanced=true shim=led::pointBrightness
    function pointBrightness(x: int32, y: int32): int32;

    /**
     * Get the screen brightness from 0 (off) to 255 (full bright).
     */
    //% help=led/brightness weight=60
    //% blockId=device_get_brightness block="brightness" blockGap=8
    //% parts="ledmatrix"
    //% advanced=true shim=led::brightness
    function brightness(): int32;

    /**
     * Set the screen brightness from 0 (off) to 255 (full bright).
     * @param value the brightness value, eg:255, 127, 0
     */
    //% help=led/set-brightness weight=59
    //% blockId=device_set_brightness block="set brightness %value"
    //% parts="ledmatrix"
    //% advanced=true
    //% value.min=0 value.max=255 shim=led::setBrightness
    function setBrightness(value: int32): void;

    /**
     * Cancels the current animation and clears other pending animations.
     */
    //% weight=50 help=led/stop-animation
    //% blockId=device_stop_animation block="stop animation"
    //% parts="ledmatrix"
    //% advanced=true shim=led::stopAnimation
    function stopAnimation(): void;

    /**
     * Sets the display mode between black and white and greyscale for rendering LEDs.
     * @param mode mode the display mode in which the screen operates
     */
    //% weight=1 help=led/set-display-mode
    //% parts="ledmatrix" advanced=true weight=1
    //% blockId="led_set_display_mode" block="set display mode $mode" shim=led::setDisplayMode
    function setDisplayMode(mode: DisplayMode): void;

    /**
     * Gets the current display mode
     */
    //% weight=1 parts="ledmatrix" advanced=true shim=led::displayMode
    function displayMode(): DisplayMode;

    /**
     * Turns on or off the display
     */
    //% help=led/enable blockId=device_led_enable block="led enable %on"
    //% advanced=true parts="ledmatrix" shim=led::enable
    function enable(on: boolean): void;

    /**
     * Takes a screenshot of the LED screen and returns an image.
     */
    //% help=led/screenshot
    //% parts="ledmatrix" shim=led::screenshot
    function screenshot(): Image;
}



    //% color=#B4009E weight=99 icon="\uf192"
declare namespace input {

    /**
     * Reads the loudness through the microphone from 0 (silent) to 255 (loud)
     */
    //% help=input/sound-level
    //% blockId=soundLevel block="sound level"
    //% parts="microphone"
    //% weight=34 blockGap=8
    //% group="Sound" shim=input::soundLevel
    function soundLevel(): int32;
}
declare namespace music {

    /**
     * Plays a tone through ``speaker`` for the given duration.
     * @param frequency pitch of the tone to play in Hertz (Hz)
     * @param ms tone duration in milliseconds (ms)
     */
    //%
    //% parts="speaker" async useEnumVal=1 shim=music::speakerPlayTone
    function speakerPlayTone(frequency: int32, ms: int32): void;
}
declare namespace pins {

    /**
     * Read the specified pin or connector as either 0 or 1
     * @param name pin to read from, eg: DigitalPin.P0
     */
    //% help=pins/digital-read-pin weight=30
    //% blockId=device_get_digital_pin block="digital read|pin %name" blockGap=8
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Digital" shim=pins::digitalReadPin
    function digitalReadPin(name: DigitalPin): int32;

    /**
     * Set a pin or connector value to either 0 or 1.
     * @param name pin to write to, eg: DigitalPin.P0
     * @param value value to set on the pin, 1 eg,0
     */
    //% help=pins/digital-write-pin weight=29
    //% blockId=device_set_digital_pin block="digital write|pin %name|to %value"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Digital" shim=pins::digitalWritePin
    function digitalWritePin(name: DigitalPin, value: int32): void;

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     * @param name pin to write to, eg: AnalogPin.P0
     */
    //% help=pins/analog-read-pin weight=25
    //% blockId=device_get_analog_pin block="analog read|pin %name" blockGap="8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Analog" shim=pins::analogReadPin
    function analogReadPin(name: AnalogPin): int32;

    /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param name pin name to write to, eg: AnalogPin.P0
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
    //% help=pins/analog-write-pin weight=24
    //% blockId=device_set_analog_pin block="analog write|pin %name|to %value" blockGap=8
    //% value.min=0 value.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Analog" shim=pins::analogWritePin
    function analogWritePin(name: AnalogPin, value: int32): void;

    /**
     * Configure the pulse-width modulation (PWM) period of the analog output in microseconds.
     * If this pin is not configured as an analog output (using `analog write pin`), the operation has no effect.
     * @param name analog pin to set period to, eg: AnalogPin.P0
     * @param micros period in micro seconds. eg:20000
     */
    //% help=pins/analog-set-period weight=23 blockGap=8
    //% blockId=device_set_analog_period block="analog set period|pin %pin|to (µs)%micros"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% group="Analog" shim=pins::analogSetPeriod
    function analogSetPeriod(name: AnalogPin, micros: int32): void;

    /**
     * Configure the pin as a digital input and generate an event when the pin is pulsed either high or low.
     * @param name digital pin to register to, eg: DigitalPin.P0
     * @param pulse the value of the pulse, eg: PulseValue.High
     */
    //% help=pins/on-pulsed weight=22 blockGap=16 advanced=true
    //% blockId=pins_on_pulsed block="on|pin %pin|pulsed %pulse"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% group="Pulse" shim=pins::onPulsed
    function onPulsed(name: DigitalPin, pulse: PulseValue, body: () => void): void;

    /**
     * Get the duration of the last pulse in microseconds. This function should be called from a ``onPulsed`` handler.
     */
    //% help=pins/pulse-duration advanced=true
    //% blockId=pins_pulse_duration block="pulse duration (µs)"
    //% weight=21 blockGap=8
    //% group="Pulse" shim=pins::pulseDuration
    function pulseDuration(): int32;

    /**
     * Return the duration of a pulse at a pin in microseconds.
     * @param name the pin which measures the pulse, eg: DigitalPin.P0
     * @param value the value of the pulse, eg: PulseValue.High
     * @param maximum duration in microseconds
     */
    //% blockId="pins_pulse_in" block="pulse in (µs)|pin %name|pulsed %value"
    //% weight=20 advanced=true
    //% help=pins/pulse-in
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Pulse" maxDuration.defl=2000000 shim=pins::pulseIn
    function pulseIn(name: DigitalPin, value: PulseValue, maxDuration?: int32): int32;

    /**
     * Write a value to the servo, controlling the shaft accordingly. On a standard servo, this will set the angle of the shaft (in degrees), moving the shaft to that orientation. On a continuous rotation servo, this will set the speed of the servo (with ``0`` being full-speed in one direction, ``180`` being full speed in the other, and a value near ``90`` being no movement).
     * @param name pin to write to, eg: AnalogPin.P0
     * @param value angle or rotation speed, eg:180,90,0
     */
    //% help=pins/servo-write-pin weight=20
    //% blockId=device_set_servo_pin block="servo write|pin %name|to %value" blockGap=8
    //% parts=microservo trackArgs=0
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% group="Servo" shim=pins::servoWritePin
    function servoWritePin(name: AnalogPin, value: int32): void;

    /**
     * Specifies that a continuous servo is connected.
     */
    //%
    //% group="Servo" shim=pins::servoSetContinuous
    function servoSetContinuous(name: AnalogPin, value: boolean): void;

    /**
     * Configure the IO pin as an analog/pwm output and set a pulse width. The period is 20 ms period and the pulse width is set based on the value given in **microseconds** or `1/1000` milliseconds.
     * @param name pin name
     * @param micros pulse duration in micro seconds, eg:1500
     */
    //% help=pins/servo-set-pulse weight=19
    //% blockId=device_set_servo_pulse block="servo set pulse|pin %value|to (µs) %micros"
    //% value.fieldEditor="gridpicker" value.fieldOptions.columns=4
    //% value.fieldOptions.tooltips="false" value.fieldOptions.width="250"
    //% group="Servo" shim=pins::servoSetPulse
    function servoSetPulse(name: AnalogPin, micros: int32): void;

    /**
     * Set the pin used when using analog pitch or music.
     * @param name pin to modulate pitch from
     */
    //% blockId=device_analog_set_pitch_pin block="analog set pitch pin %name"
    //% help=pins/analog-set-pitch-pin weight=3 advanced=true
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% blockHidden=true
    //% group="Pitch" shim=pins::analogSetPitchPin
    function analogSetPitchPin(name: AnalogPin): void;

    /**
     * Sets the volume on the pitch pin
     * @param volume the intensity of the sound from 0..255
     */
    //% blockId=device_analog_set_pitch_volume block="analog set pitch volume $volume"
    //% help=pins/analog-set-pitch-volume weight=3 advanced=true
    //% volume.min=0 volume.max=255
    //% blockHidden=true
    //% group="Pitch" shim=pins::analogSetPitchVolume
    function analogSetPitchVolume(volume: int32): void;

    /**
     * Gets the volume the pitch pin from 0..255
     */
    //% blockId=device_analog_pitch_volume block="analog pitch volume"
    //% help=pins/analog-pitch-volume weight=3 advanced=true
    //% blockHidden=true
    //% group="Pitch" shim=pins::analogPitchVolume
    function analogPitchVolume(): int32;

    /**
     * Emit a plse-width modulation (PWM) signal to the current pitch pin. Use `analog set pitch pin` to define the pitch pin.
     * @param frequency frequency to modulate in Hz.
     * @param ms duration of the pitch in milli seconds.
     */
    //% blockId=device_analog_pitch block="analog pitch %frequency|for (ms) %ms"
    //% help=pins/analog-pitch async advanced=true
    //% group="Pitch"
    //% blockHidden=true
    //% weight=14
    //% blockGap=8 shim=pins::analogPitch
    function analogPitch(frequency: int32, ms: int32): void;

    /**
     * Configure the pull directiion of of a pin.
     * @param name pin to set the pull mode on, eg: DigitalPin.P0
     * @param pull one of the mbed pull configurations, eg: PinPullMode.PullUp
     */
    //% help=pins/set-pull weight=3 advanced=true
    //% blockId=device_set_pull block="set pull|pin %pin|to %pull"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% group="Digital" shim=pins::setPull
    function setPull(name: DigitalPin, pull: PinPullMode): void;

    /**
     * Configure the events emitted by this pin. Events can be subscribed to
     * using ``control.onEvent()``.
     * @param name pin to set the event mode on, eg: DigitalPin.P0
     * @param type the type of events for this pin to emit, eg: PinEventType.Edge
     */
    //% help=pins/set-events weight=4 advanced=true
    //% blockId=device_set_pin_events block="set pin %pin|to emit %type|events"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% group="Digital" shim=pins::setEvents
    function setEvents(name: DigitalPin, type: PinEventType): void;

    /**
     * Create a new zero-initialized buffer.
     * @param size number of bytes in the buffer
     */
    //% shim=pins::createBuffer
    function createBuffer(size: int32): Buffer;

    /**
     * Set the matrix width for Neopixel strip (already assigned to a pin).
     * Should be used in conjunction with `set matrix width` from Neopixel package.
     * @param name pin of Neopixel strip, eg: DigitalPin.P0
     * @param value width of matrix (at least ``2``)
     */
    //% help=pins/neopixel-matrix-width weight=3 advanced=true
    //% blockId=pin_neopixel_matrix_width block="neopixel matrix width|pin %pin %width" blockGap=8
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% width.min=2
    //% blockHidden=true width.defl=5 shim=pins::setMatrixWidth
    function setMatrixWidth(pin: DigitalPin, width?: int32): void;

    /**
     * Read `size` bytes from a 7-bit I2C `address`.
     */
    //%
    //% group="i2c" repeat.defl=0 shim=pins::i2cReadBuffer
    function i2cReadBuffer(address: int32, size: int32, repeat?: boolean): Buffer;

    /**
     * Write bytes to a 7-bit I2C `address`.
     */
    //%
    //% group="i2c" repeat.defl=0 shim=pins::i2cWriteBuffer
    function i2cWriteBuffer(address: int32, buf: Buffer, repeat?: boolean): int32;

    /**
     * Write to the SPI slave and return the response
     * @param value Data to be sent to the SPI slave
     */
    //% help=pins/spi-write weight=5 advanced=true
    //% blockId=spi_write block="spi write %value"
    //% group="spi" shim=pins::spiWrite
    function spiWrite(value: int32): int32;

    /**
     * Write to and read from the SPI slave at the same time
     * @param command Data to be sent to the SPI slave (can be null)
     * @param response Data received from the SPI slave (can be null)
     */
    //% help=pins/spi-transfer argsNullable
    //% group="spi" shim=pins::spiTransfer
    function spiTransfer(command: Buffer, response: Buffer): void;

    /**
     * Set the SPI frequency
     * @param frequency the clock frequency, eg: 1000000
     */
    //% help=pins/spi-frequency weight=4 advanced=true
    //% blockId=spi_frequency block="spi frequency %frequency"
    //% group="spi" shim=pins::spiFrequency
    function spiFrequency(frequency: int32): void;

    /**
     * Set the SPI bits and mode
     * @param bits the number of bits, eg: 8
     * @param mode the mode, eg: 3
     */
    //% help=pins/spi-format weight=3 advanced=true
    //% blockId=spi_format block="spi format|bits %bits|mode %mode"
    //% group="spi" shim=pins::spiFormat
    function spiFormat(bits: int32, mode: int32): void;

    /**
     * Set the MOSI, MISO, SCK pins used by the SPI connection
     *
     */
    //% help=pins/spi-pins weight=2 advanced=true
    //% blockId=spi_pins block="spi set pins|MOSI %mosi|MISO %miso|SCK %sck"
    //% mosi.fieldEditor="gridpicker" mosi.fieldOptions.columns=4
    //% mosi.fieldOptions.tooltips="false" mosi.fieldOptions.width="250"
    //% miso.fieldEditor="gridpicker" miso.fieldOptions.columns=4
    //% miso.fieldOptions.tooltips="false" miso.fieldOptions.width="250"
    //% sck.fieldEditor="gridpicker" sck.fieldOptions.columns=4
    //% sck.fieldOptions.tooltips="false" sck.fieldOptions.width="250"
    //% group="spi" shim=pins::spiPins
    function spiPins(mosi: DigitalPin, miso: DigitalPin, sck: DigitalPin): void;

    /**
     * Mounts a push button on the given pin
     */
    //% help=pins/push-button advanced=true
    //% group="Digital" shim=pins::pushButton
    function pushButton(pin: DigitalPin): void;

    /**
     * Set the pin used when producing sounds and melodies. Default is P0.
     * @param name pin to modulate pitch from
     */
    //% blockId=pin_set_audio_pin block="set audio pin $name"
    //% help=pins/set-audio-pin weight=3
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
    //% weight=1
    //% group="Pitch" shim=pins::setAudioPin
    function setAudioPin(name: AnalogPin): void;

    /**
     * Sets whether or not audio will be output using a pin on the edge
     * connector.
     */
    //% blockId=pin_set_audio_pin_enabled
    //% block="set audio pin enabled $enabled"
    //% weight=0 shim=pins::setAudioPinEnabled
    function setAudioPinEnabled(enabled: boolean): void;
}



    //% weight=2 color=#002050 icon="\uf287"
    //% advanced=true
declare namespace serial {

    /**
     * Read a line of text from the serial port and return the buffer when the delimiter is met.
     * @param delimiter text delimiter that separates each text chunk
     */
    //% help=serial/read-until
    //% blockId=serial_read_until block="serial|read until %delimiter=serial_delimiter_conv"
    //% weight=19 shim=serial::readUntil
    function readUntil(delimiter: string): string;

    /**
     * Read the buffered received data as a string
     */
    //% help=serial/read-string
    //% blockId=serial_read_buffer block="serial|read string"
    //% weight=18 shim=serial::readString
    function readString(): string;

    /**
     * Register an event to be fired when one of the delimiter is matched.
     * @param delimiters the characters to match received characters against.
     */
    //% help=serial/on-data-received
    //% weight=18 blockId=serial_on_data_received block="serial|on data received %delimiters=serial_delimiter_conv" shim=serial::onDataReceived
    function onDataReceived(delimiters: string, body: () => void): void;

    /**
     * Send a piece of text through the serial connection.
     */
    //% help=serial/write-string
    //% weight=87 blockGap=8
    //% blockId=serial_writestring block="serial|write string %text"
    //% text.shadowOptions.toString=true shim=serial::writeString
    function writeString(text: string): void;

    /**
     * Send a buffer through serial connection
     */
    //% blockId=serial_writebuffer block="serial|write buffer %buffer=serial_readbuffer"
    //% help=serial/write-buffer advanced=true weight=6 shim=serial::writeBuffer
    function writeBuffer(buffer: Buffer): void;

    /**
     * Read multiple characters from the receive buffer. 
     * If length is positive, pauses until enough characters are present.
     * @param length default buffer length
     */
    //% blockId=serial_readbuffer block="serial|read buffer %length"
    //% help=serial/read-buffer advanced=true weight=5 shim=serial::readBuffer
    function readBuffer(length: int32): Buffer;

    /**
     * Set the serial input and output to use pins instead of the USB connection.
     * @param tx the new transmission pin, eg: SerialPin.P0
     * @param rx the new reception pin, eg: SerialPin.P1
     * @param rate the new baud rate. eg: 115200
     */
    //% weight=10
    //% help=serial/redirect
    //% blockId=serial_redirect block="serial|redirect to|TX %tx|RX %rx|at baud rate %rate"
    //% blockExternalInputs=1
    //% tx.fieldEditor="gridpicker" tx.fieldOptions.columns=3
    //% tx.fieldOptions.tooltips="false"
    //% rx.fieldEditor="gridpicker" rx.fieldOptions.columns=3
    //% rx.fieldOptions.tooltips="false"
    //% blockGap=8 shim=serial::redirect
    function redirect(tx: SerialPin, rx: SerialPin, rate: BaudRate): void;

    /**
    Set the baud rate of the serial port
     */
    //% weight=10
    //% blockId=serial_setbaudrate block="serial|set baud rate %rate"
    //% blockGap=8 inlineInputMode=inline
    //% help=serial/set-baud-rate
    //% group="Configuration" advanced=true shim=serial::setBaudRate
    function setBaudRate(rate: BaudRate): void;

    /**
     * Direct the serial input and output to use the USB connection.
     */
    //% weight=9 help=serial/redirect-to-usb
    //% blockId=serial_redirect_to_usb block="serial|redirect to USB" shim=serial::redirectToUSB
    function redirectToUSB(): void;

    /**
     * Sets the size of the RX buffer in bytes
     * @param size length of the rx buffer in bytes, eg: 32
     */
    //% help=serial/set-rx-buffer-size
    //% blockId=serialSetRxBufferSize block="serial set rx buffer size to $size"
    //% advanced=true shim=serial::setRxBufferSize
    function setRxBufferSize(size: uint8): void;

    /**
     * Sets the size of the TX buffer in bytes
     * @param size length of the tx buffer in bytes, eg: 32
     */
    //% help=serial/set-tx-buffer-size
    //% blockId=serialSetTxBufferSize block="serial set tx buffer size to $size"
    //% advanced=true shim=serial::setTxBufferSize
    function setTxBufferSize(size: uint8): void;

    /** Send DMESG debug buffer over serial. */
    //% shim=serial::writeDmesg
    function writeDmesg(): void;
}



    //% indexerGet=BufferMethods::getByte indexerSet=BufferMethods::setByte
declare interface Buffer {
    /**
     * Reads an unsigned byte at a particular location
     */
    //% shim=BufferMethods::getUint8
    getUint8(off: int32): int32;

    /**
     * Returns false when the buffer can be written to.
     */
    //% shim=BufferMethods::isReadOnly
    isReadOnly(): boolean;

    /**
     * Writes an unsigned byte at a particular location
     */
    //% shim=BufferMethods::setUint8
    setUint8(off: int32, v: int32): void;

    /**
     * Write a number in specified format in the buffer.
     */
    //% shim=BufferMethods::setNumber
    setNumber(format: NumberFormat, offset: int32, value: number): void;

    /**
     * Read a number in specified format from the buffer.
     */
    //% shim=BufferMethods::getNumber
    getNumber(format: NumberFormat, offset: int32): number;

    /** Returns the length of a Buffer object. */
    //% property shim=BufferMethods::length
    length: int32;

    /**
     * Fill (a fragment) of the buffer with given value.
     */
    //% offset.defl=0 length.defl=-1 shim=BufferMethods::fill
    fill(value: int32, offset?: int32, length?: int32): void;

    /**
     * Return a copy of a fragment of a buffer.
     */
    //% offset.defl=0 length.defl=-1 shim=BufferMethods::slice
    slice(offset?: int32, length?: int32): Buffer;

    /**
     * Shift buffer left in place, with zero padding.
     * @param offset number of bytes to shift; use negative value to shift right
     * @param start start offset in buffer. Default is 0.
     * @param length number of elements in buffer. If negative, length is set as the buffer length minus
     * start. eg: -1
     */
    //% start.defl=0 length.defl=-1 shim=BufferMethods::shift
    shift(offset: int32, start?: int32, length?: int32): void;

    /**
     * Convert a buffer to string assuming UTF8 encoding
     */
    //% shim=BufferMethods::toString
    toString(): string;

    /**
     * Convert a buffer to its hexadecimal representation.
     */
    //% shim=BufferMethods::toHex
    toHex(): string;

    /**
     * Rotate buffer left in place.
     * @param offset number of bytes to shift; use negative value to shift right
     * @param start start offset in buffer. Default is 0.
     * @param length number of elements in buffer. If negative, length is set as the buffer length minus
     * start. eg: -1
     */
    //% start.defl=0 length.defl=-1 shim=BufferMethods::rotate
    rotate(offset: int32, start?: int32, length?: int32): void;

    /**
     * Write contents of `src` at `dstOffset` in current buffer.
     */
    //% shim=BufferMethods::write
    write(dstOffset: int32, src: Buffer): void;

    /**
     * Compute k-bit FNV-1 non-cryptographic hash of the buffer.
     */
    //% shim=BufferMethods::hash
    hash(bits: int32): uint32;
}
declare namespace control {

    /**
     * Create a new zero-initialized buffer.
     * @param size number of bytes in the buffer
     */
    //% deprecated=1 shim=control::createBuffer
    function createBuffer(size: int32): Buffer;

    /**
     * Create a new buffer with UTF8-encoded string
     * @param str the string to put in the buffer
     */
    //% deprecated=1 shim=control::createBufferFromUTF8
    function createBufferFromUTF8(str: string): Buffer;
}
declare namespace light {

    /**
     * Sends a color buffer to a light strip
     **/
    //% advanced=true shim=light::sendWS2812Buffer
    function sendWS2812Buffer(buf: Buffer, pin: int32): void;

    /**
     * Sends a color buffer to a light strip
     **/
    //% advanced=true shim=light::sendWS2812BufferWithBrightness
    function sendWS2812BufferWithBrightness(buf: Buffer, pin: int32, brightness: int32): void;

    /**
     * Sets the light mode of a pin
     **/
    //% advanced=true
    //% shim=light::setMode
    function setMode(pin: int32, mode: int32): void;
}



    //% color=#008272 weight=30 icon="\uf1b9"
declare namespace motors {

    /**
     * Turns on the motor at a certain percent of power. Switches to single motor mode!
     * @param power %percent of power sent to the motor. Negative power goes backward. eg: 50
     */
    //% blockId=motor_power_dal shim=motors::motorPowerDal
    function motorPowerDal(power: int32): void;

    /**
     * Send break, coast or sleep commands to the motor. Has no effect in dual-motor mode.
     */
    //% blockId=motor_command_dal
    //% hidden=1 shim=motors::motorCommandDal
    function motorCommandDal(command: MotorCommand): void;

    /**
     * Controls two motors attached to the board. Switches to dual-motor mode!
     */
    //% blockId=dual_motor_power_dal
    //% hidden=1 shim=motors::dualMotorPowerDal
    function dualMotorPowerDal(motor: Motor, duty_percent: int32): void;
}


    /**
     * Provides access to basic calliope mini functionality.
     */

declare namespace basic {

    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     */
    //% blockId=device_turn_rgb_led_off block="turn built-in LED off"
    //% help=basic/turn-rgb-led-off
    //% weight=10
    //% group="RGB LED"
    //% advanced=true shim=basic::turnRgbLedOff
    function turnRgbLedOff(): void;

    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color1 The color of the first LED in RGB format (e.g., 0xFF0000 for red).
     */
    //% blockId=device_set_led_colors-dal
    //% hidden=1 shim=basic::setLedColorDal
    function setLedColorDal(color: int32): void;

    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color1 The color of the first LED in RGB format (e.g., 0xFF0000 for red).
     * @param color2 The second LED color.
     * @param color3 The third LED color.
     * @param brightness The LED brightness in percent.
     */
    //% blockId=device_set_led_colors-codal
    //% hidden=1 brightness.defl=20 shim=basic::setLedColorsCodal
    function setLedColorsCodal(color1: int32, color2: int32, color3: int32, brightness?: int32): void;

    /**
     * Sets the color on the built-in RGB LED. Set to 0 to turn off.
     * @param color The color of the LED in RGB format (e.g., 0xFF0000 for red).
     */
    //% help=basic/set-led-color
    //% blockId=device_set_led_color
    //% block="set LED to %color=colorNumberPicker"
    //% expandableArgumentMode="toggle"
    //%
    //%
    //%
    //%
    //% weight=10
    //% group="RGB LED" color.defl=0xff0000 shim=basic::setLedColor
    function setLedColor(color?: int32): void;
}
declare namespace music {

    /**
     * Internal use only
     **/
    //% async shim=music::__playSoundExpression
    function __playSoundExpression(nodes: string, waitTillDone: boolean): void;

    /**
     * Internal use only
     */
    //% shim=music::__stopSoundExpressions
    function __stopSoundExpressions(): void;
}

// Auto-generated. Do not edit. Really.
