/**
 * Provides access to basic Calliope mini functionality.
 */
//% color=#54C9C9 weight=100 icon="\uf00a"
//% groups=['LED matrix', 'Control', 'RGB LED', 'others']
namespace basic {

    // Separate buffers to avoid cross-contamination between single- and multi-LED sends
    let _rgbBuf1: Buffer = null  // 3 bytes — for single-LED ops (v1/v2/v3 LED0)
    let _rgbBuf3: Buffer = null  // 9 bytes — for 3-LED ops (v3 only)

    // Hardware brightness prescale for the onboard RGB LED (full WS2812 drive is
    // blinding). The simulator reverses exactly this factor to recover the original
    // color — keep in sync with updateRgbLedState in sim/state/misc.ts.
    const _rgbBrightnessPercent = 20

    function _latch(): void {
        control.waitMicros(1000)
        pins.digitalWritePin(DigitalPin.RGB, 0)
    }

    function _setSingleLed(color: number): void {
        const br = _rgbBrightnessPercent
        const g = ((color >> 8) & 0xFF) * br / 100
        const r = ((color >> 16) & 0xFF) * br / 100
        const b = (color & 0xFF) * br / 100
        if (hardware._rgbLedCount() >= 3) {
            // v3: replicate across all 3 LEDs so the block behaves uniformly
            if (!_rgbBuf3) _rgbBuf3 = pins.createBuffer(9)
            for (let i = 0; i < 3; i++) {
                _rgbBuf3[i * 3 + 0] = g
                _rgbBuf3[i * 3 + 1] = r
                _rgbBuf3[i * 3 + 2] = b
            }
            light.sendWS2812Buffer(_rgbBuf3, DigitalPin.RGB)
        } else {
            if (!_rgbBuf1) _rgbBuf1 = pins.createBuffer(3)
            _rgbBuf1[0] = g
            _rgbBuf1[1] = r
            _rgbBuf1[2] = b
            light.sendWS2812Buffer(_rgbBuf1, DigitalPin.RGB)
        }
        _latch()
    }

    /**
     * Turns off the built-in RGB LED.
     */
    //% blockId=device_turn_rgb_led_off block="turn built-in LED off"
    //% help=basic/turn-rgb-led-off
    //% weight=10 group="RGB LED" advanced=true
    export function turnRgbLedOff(): void {
        _setSingleLed(0)
    }

    /**
     * Sets all built-in RGB LEDs to a single color.
     * @param color The LED color in RGB format, eg: 0xFF0000
     */
    //% help=basic/set-led-color
    //% blockId=device_set_led_color
    //% block="set LED to %color=colorNumberPicker"
    //% color.defl=0xff0000
    //% weight=10 group="RGB LED"
    export function setLedColor(color: number): void {
        _setSingleLed(color)
    }

    /**
     * Sets individual colors on the three built-in RGB LEDs (Calliope mini v3 only).
     * Has no effect on Calliope mini v1/v2 which have a single RGB LED.
     * @param brightness brightness of the LEDs in percent, eg: 20
     */
    //% help=basic/set-led-colors
    //% blockId=device_set_led_colors
    //% block="set LED to %color1=colorNumberPicker %color2=colorNumberPicker %color3=colorNumberPicker || brightness %brightness"
    //% color1.defl=0xff0000 color2.defl=0xff0080 color3.defl=0xff00ff
    //% brightness.defl=20
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% weight=11 group="Calliope mini V3"
    export function setLedColors(color1: number, color2: number, color3: number, brightness: number = 20): void {
        if (hardware._rgbLedCount() < 3) return
        if (!_rgbBuf3) _rgbBuf3 = pins.createBuffer(9)
        // Block string/signature matches pxt-calliope (crowdin translation key).
        // The simulator decode (sim/state/misc.ts) assumes the default 20%
        // prescale, so a custom brightness renders approximately in the sim.
        const br = Math.clamp(0, 100, brightness)
        _rgbBuf3[0] = ((color1 >> 8) & 0xFF) * br / 100
        _rgbBuf3[1] = ((color1 >> 16) & 0xFF) * br / 100
        _rgbBuf3[2] = (color1 & 0xFF) * br / 100
        _rgbBuf3[3] = ((color2 >> 8) & 0xFF) * br / 100
        _rgbBuf3[4] = ((color2 >> 16) & 0xFF) * br / 100
        _rgbBuf3[5] = (color2 & 0xFF) * br / 100
        _rgbBuf3[6] = ((color3 >> 8) & 0xFF) * br / 100
        _rgbBuf3[7] = ((color3 >> 16) & 0xFF) * br / 100
        _rgbBuf3[8] = (color3 & 0xFF) * br / 100
        light.sendWS2812Buffer(_rgbBuf3, DigitalPin.RGB)
        _latch()
    }

    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% weight=3
    //% help=basic/rgb
    //% blockId="core_rgb" block="red %red|green %green|blue %blue"
    //% group="RGB LED"
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF)
    }

}
