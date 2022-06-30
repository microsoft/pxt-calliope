#include "pxt.h"

enum class Button {
    A = MICROBIT_ID_BUTTON_A,
    B = MICROBIT_ID_BUTTON_B,
    //% block="A+B"
    AB = MICROBIT_ID_BUTTON_AB,
};

enum class ButtonEvent {
    //% blockIdentity="input.buttonEventValueId"
    //% block="clicked"
    Click = MICROBIT_BUTTON_EVT_CLICK,
    //% blockIdentity="input.buttonEventValueId"
    //% block="long clicked"
    LongClick = MICROBIT_BUTTON_EVT_LONG_CLICK,
    //% blockIdentity="input.buttonEventValueId"
    //% block="pressed down"
    Down = MICROBIT_BUTTON_EVT_DOWN,
    //% blockIdentity="input.buttonEventValueId"
    //% block="released up"
    Up = MICROBIT_BUTTON_EVT_UP,
};

enum class Dimension {
    //% block=x
    X = 0,
    //% block=y
    Y = 1,
    //% block=z
    Z = 2,
    //% block=strength
    Strength = 3,
};

enum class Rotation {
    //% block=pitch
    Pitch = 0,
    //% block=roll
    Roll = 1,
};

enum class TouchPin {
    P0 = MICROBIT_ID_IO_P12,
    P1 = MICROBIT_ID_IO_P0,
    P2 = MICROBIT_ID_IO_P1,
    P3 = MICROBIT_ID_IO_P16
};

enum class AcceleratorRange {
    /**
     * The accelerator measures forces up to 1 gravity
     */
    //%  block="1g"
    OneG = 1,
    /**
     * The accelerator measures forces up to 2 gravity
     */
    //%  block="2g"
    TwoG = 2,
    /**
     * The accelerator measures forces up to 4 gravity
     */
    //% block="4g"
    FourG = 4,
    /**
     * The accelerator measures forces up to 8 gravity
     */
    //% block="8g"
    EightG = 8
};

enum class Gesture {
    /**
     * Raised when shaken
     */
    //% block=shake
    //% jres=gestures.shake
    Shake = MICROBIT_ACCELEROMETER_EVT_SHAKE,
    /**
     * Raised when the logo is upward and the screen is vertical
     */
    //% block="logo up"
    //% jres=gestures.tiltforward
    LogoUp = MICROBIT_ACCELEROMETER_EVT_TILT_UP,
    /**
     * Raised when the logo is downward and the screen is vertical
     */
    //% block="logo down"
    //% jres=gestures.tiltbackwards
    LogoDown = MICROBIT_ACCELEROMETER_EVT_TILT_DOWN,
    /**
     * Raised when the screen is pointing up and the board is horizontal
     */
    //% block="screen up"
    //% jres=gestures.frontsideup
    ScreenUp = MICROBIT_ACCELEROMETER_EVT_FACE_UP,
    /**
     * Raised when the screen is pointing down and the board is horizontal
     */
    //% block="screen down"
    //% jres=gestures.backsideup
    ScreenDown = MICROBIT_ACCELEROMETER_EVT_FACE_DOWN,
    /**
     * Raised when the screen is pointing left
     */
    //% block="tilt left"
    //% jres=gestures.tiltleft
    TiltLeft = MICROBIT_ACCELEROMETER_EVT_TILT_LEFT,
    /**
     * Raised when the screen is pointing right
     */
    //% block="tilt right"
    //% jres=gestures.tiltright
    TiltRight = MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT,
    /**
     * Raised when the board is falling!
     */
    //% block="free fall"
    //% jres=gestures.freefall
    FreeFall = MICROBIT_ACCELEROMETER_EVT_FREEFALL,
    /**
    * Raised when a 3G shock is detected
    */
    //% block="3g"
    //% jres=gestures.impact3g
    ThreeG = MICROBIT_ACCELEROMETER_EVT_3G,
    /**
    * Raised when a 6G shock is detected
    */
    //% block="6g"
    //% jres=gestures.impact6g
    SixG = MICROBIT_ACCELEROMETER_EVT_6G,
    /**
    * Raised when a 8G shock is detected
    */
    //% block="8g"
    //% jres=gestures.impact8g
    EightG = MICROBIT_ACCELEROMETER_EVT_8G
};

enum class MesDpadButtonInfo {
    //% block="A down"
    ADown = MES_DPAD_BUTTON_A_DOWN,
    //% block="A up"
    AUp = MES_DPAD_BUTTON_A_UP,
    //% block="B down"
    BDown = MES_DPAD_BUTTON_B_DOWN,
    //% block="B up"
    BUp = MES_DPAD_BUTTON_B_UP,
    //% block="C down"
    CDown = MES_DPAD_BUTTON_C_DOWN,
    //% block="C up"
    CUp = MES_DPAD_BUTTON_C_UP,
    //% block="D down"
    DDown = MES_DPAD_BUTTON_D_DOWN,
    //% block="D up"
    DUp = MES_DPAD_BUTTON_D_UP,
    //% block="1 down"
    _1Down = MES_DPAD_BUTTON_1_DOWN,
    //% block="1 up"
    _1Up = MES_DPAD_BUTTON_1_UP,
    //% block="2 down"
    _2Down = MES_DPAD_BUTTON_2_DOWN,
    //% block="2 up"
    _2Up = MES_DPAD_BUTTON_2_UP,
    //% block="3 down"
    _3Down = MES_DPAD_BUTTON_3_DOWN,
    //% block="3 up"
    _3Up = MES_DPAD_BUTTON_3_UP,
    //% block="4 down"
    _4Down = MES_DPAD_BUTTON_4_DOWN,
    //% block="4 up"
    _4Up = MES_DPAD_BUTTON_4_UP,
};

//% color=#B4009E weight=99 icon="\uf192"
namespace input {
    /**
     * Do something when a button (A, B or both A+B) receives an event.
     * @param button the button
     * @param body code to run when event is raised
     * @param eventType event Type
     */
    //% help=input/on-button-event weight=100 blockGap=16
    //% blockId=device_button_selected_event block="on button %NAME| %eventType=control_button_event_value_id"
    //% parts="buttonpair"
    //% group="Events"
    void onButtonEvent(Button button, int eventType, Action body) {
        registerWithDal((int)button, (int)eventType, body);
    }

    /**
     * Do something when when a gesture is done (like shaking the micro:bit).
     * @param gesture the type of gesture to track, eg: Gesture.Shake
     * @param body code to run when gesture is raised
     */
    //% help=input/on-gesture weight=98 blockGap=16
    //% blockId=device_gesture_event block="on |%NAME"
    //% parts="accelerometer"
    //% NAME.fieldEditor="gestures" NAME.fieldOptions.columns=4
    //% group="Events"
    void onGesture(Gesture gesture, Action body) {
        int gi = (int)gesture;
        if (gi == MICROBIT_ACCELEROMETER_EVT_3G && uBit.accelerometer.getRange() < 3)
            uBit.accelerometer.setRange(4);
        else if ((gi == MICROBIT_ACCELEROMETER_EVT_6G || gi == MICROBIT_ACCELEROMETER_EVT_8G) && uBit.accelerometer.getRange() < 6)
            uBit.accelerometer.setRange(8);
        registerWithDal(MICROBIT_ID_GESTURE, gi, body);
    }

    /**
    * Tests if a gesture is currently detected.
     * @param gesture the type of gesture to detect, eg: Gesture.Shake
    */
    //% help=input/is-gesture weight=86 blockGap=8
    //% blockId=deviceisgesture block="is %gesture gesture"
    //% parts="accelerometer"
    //% gesture.fieldEditor="gestures" gesture.fieldOptions.columns=4
    //% group="States"
    bool isGesture(Gesture gesture) {
        // turn on acceleration
        uBit.accelerometer.getX();
        int gi = (int)gesture;
        return uBit.accelerometer.getGesture() == gi;
    }

    /**
     * Do something when a pin receives an touch event (while also touching the GND pin).
     * @param name the pin, eg: TouchPin.P0
     * @param body the code to run when event is fired on pin
     */
    //% help=input/on-pin-event weight=99 blockGap=16
    //% blockId=device_pin_custom_event block="on pin %name| %eventType=control_button_event_value_id"
    //% group="Events"
    void onPinTouchEvent(TouchPin name, int eventType, Action body) {
        auto pin = getPin((int)name);
        if (!pin) return;

        // Forces the PIN to switch to makey-makey style detection.
        pin->isTouched();
        registerWithDal((int)name, (int)eventType, body);
    }

    /**
     * Get the button state (pressed or not) for ``A`` and ``B``.
     * @param button the button to query the request, eg: Button.A
     */
    //% help=input/button-is-pressed weight=89
    //% block="button|%NAME|is pressed"
    //% blockId=device_get_button2
    //% icon="\uf192" blockGap=8
    //% parts="buttonpair"
    //% group="States"
    bool buttonIsPressed(Button button) {
      if (button == Button::A)
        return uBit.buttonA.isPressed();
      else if (button == Button::B)
        return uBit.buttonB.isPressed();
      else if (button == Button::AB)
        return uBit.buttonAB.isPressed();
      return false;
    }

    /**
     * Do something when a button (A, B or both A+B) is pushed down and released again.
     * @param button the button that needs to be pressed
     * @param body code to run when event is raised
     */
    //% help=input/on-button-pressed weight=85 blockGap=16
    //% blockId=device_button_event block="on button|%NAME|pressed"
    //% parts="buttonpair"
    //% deprecated=true
    //% group="Events"
    void onButtonPressed(Button button, Action body) {
        registerWithDal((int)button, MICROBIT_BUTTON_EVT_CLICK, body);
    }

    /**
     * Do something when a pin is touched and released again (while also touching the GND pin).
     * @param name the pin that needs to be pressed, eg: TouchPin.P0
     * @param body the code to run when the pin is pressed
     */
    //% help=input/on-pin-pressed weight=83 blockGap=16
    //% blockId=device_pin_event block="on pin %name|pressed"
    //% group="Events"
    //% deprecated=true
    void onPinPressed(TouchPin name, Action body) {
        auto pin = getPin((int)name);
        if (!pin) return;

        // Forces the PIN to switch to makey-makey style detection.
        pin->isTouched();
        registerWithDal((int)name, MICROBIT_BUTTON_EVT_CLICK, body);
    }

    /**
     * Do something when a pin is released.
     * @param name the pin that needs to be released, eg: TouchPin.P0
     * @param body the code to run when the pin is released
     */
    //% help=input/on-pin-released weight=6 blockGap=16
    //% blockId=device_pin_released block="on pin %NAME|released"
    //% advanced=true
    //% group="Events"
    //% deprecated=true
    void onPinReleased(TouchPin name, Action body) {
        auto pin = getPin((int)name);
        if (!pin) return;

        // Forces the PIN to switch to makey-makey style detection.
        pin->isTouched();
        registerWithDal((int)name, MICROBIT_BUTTON_EVT_UP, body);
    }

    /**
     * Get the pin state (pressed or not). Requires to hold the ground to close the circuit.
     * @param name pin used to detect the touch, eg: TouchPin.P0
     */
    //% help=input/pin-is-pressed weight=87
    //% blockId="device_pin_is_pressed" block="pin %NAME|is pressed"
    //% blockGap=8
    //% group="States"
    bool pinIsPressed(TouchPin name) {
        auto pin = getPin((int)name);
        return pin && pin->isTouched();
    }

    int getAccelerationStrength() {
        double x = uBit.accelerometer.getX();
        double y = uBit.accelerometer.getY();
        double z = uBit.accelerometer.getZ();
        return (int)sqrt(x*x+y*y+z*z);
    }

    /**
     * Get the acceleration value in milli-gravitys (when the board is laying flat with the screen up, x=0, y=0 and z=-1024)
     * @param dimension x, y, or z dimension, eg: Dimension.X
     */
    //% help=input/acceleration weight=58
    //% blockId=device_acceleration block="acceleration (mg)|%NAME" blockGap=8
    //% parts="accelerometer"
    //% group="Sensors"
    int acceleration(Dimension dimension) {
      switch (dimension) {
      case Dimension::X: return uBit.accelerometer.getX();
      case Dimension::Y: return uBit.accelerometer.getY();
      case Dimension::Z: return uBit.accelerometer.getZ();
      case Dimension::Strength: return getAccelerationStrength();
      }
      return 0;
    }

    /**
     * Reads the light level applied to the LED screen in a range from ``0`` (dark) to ``255`` bright.
     */
    //% help=input/light-level weight=59
    //% blockId=device_get_light_level block="light level" blockGap=8
    //% parts="ledmatrix"
    //% group="Sensors"
    int lightLevel() {
        return uBit.display.readLightLevel();
    }


    /**
     * gets the level of loudness from 0 (silent) to 255 (loud)
     */
    //% blockId="soundLevel" weight=58
    //% block="soundLevel" blockGap=8
    //% group="Sensors"
    int soundLevel() {
        int level = uBit.io.P21.getAnalogValue();
        int min = level;
        int max = level;
        for (int i = 0; i < 32; i++) {
            level =  uBit.io.P21.getAnalogValue();
            if (level > max) {
                max = level;
            } else if (level < min) {
                min = level;
            }
        }
        level = floor((max - min + 0.5) / 4); //max can be up to 1023; + 0,5 to prevent division by 0, floor to get rid of decimals, divide by 4 to get a value between 0 and 255
        return level;
    }

    /**
     * Get the current compass heading in degrees.
     */
    //% help=input/compass-heading
    //% weight=56
    //% blockId=device_heading block="compass heading (°)" blockGap=8
    //% parts="compass"
    //% group="Sensors"
    int compassHeading() {
        return uBit.compass.heading();
    }


    /**
     * Gets the temperature in Celsius degrees (°C).
     */
    //% weight=57
    //% help=input/temperature
    //% blockId=device_temperature block="temperature (°C)" blockGap=8
    //% parts="thermometer"
    //% group="Sensors"
    int temperature() {
        return uBit.thermometer.getTemperature();
    }

    /**
     * The pitch or roll of the device, rotation along the ``x-axis`` or ``y-axis``, in degrees.
     * @param kind pitch or roll
     */
    //% help=input/rotation weight=52
    //% blockId=device_get_rotation block="rotation (°)|%NAME" blockGap=8
    //% parts="accelerometer" advanced=true
    //% group="Sensors"
    int rotation(Rotation kind) {
      switch (kind) {
      case Rotation::Pitch: return uBit.accelerometer.getPitch();
      case Rotation::Roll: return uBit.accelerometer.getRoll();
      }
      return 0;
    }

    /**
     * Get the magnetic force value in ``micro-Teslas`` (``µT``). This function is not supported in the simulator.
     * @param dimension the x, y, or z dimension, eg: Dimension.X
     */
    //% help=input/magnetic-force weight=49
    //% blockId=device_get_magnetic_force block="magnetic force (µT)|%NAME" blockGap=8
    //% parts="compass"
    //% advanced=true
    //% group="Sensors"
    TNumber magneticForce(Dimension dimension) {
        if (!uBit.compass.isCalibrated())
            uBit.compass.calibrate();
        double d = 0;        
        switch (dimension) {
            case Dimension::X: d = uBit.compass.getX(); break;
            case Dimension::Y: d = uBit.compass.getY(); break;
            case Dimension::Z: d = uBit.compass.getZ(); break;
            case Dimension::Strength: d = uBit.compass.getFieldStrength() ; break;
        }
        return fromDouble(d / 1000.0);
    }

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate-compass advanced=true
    //% blockId="input_compass_calibrate" block="calibrate compass"
    //% weight=20 gap=8
    //% group="Configuration"
    void calibrateCompass() {
        uBit.compass.calibrate();
    }

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


    /**
     * Sets the accelerometer sample range in gravities.
     * @param range a value describe the maximum strengh of acceleration measured
     */
    //% help=input/set-accelerometer-range
    //% blockId=device_set_accelerometer_range block="set accelerometer|range %range"
    //% weight=22 gap=8
    //% parts="accelerometer"
    //% advanced=true
    //% group="Configuration"
    void setAccelerometerRange(AcceleratorRange range) {
        uBit.accelerometer.setRange((int)range);
    }
}
