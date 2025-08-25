# Show LEDs

Shows a picture on the [LED screen](/device/screen).

```sig
basic.showLeds(`
    . . . . .
    . # . # .
    . . # . .
    # . . . #
    . # # # .
    `
)
```

## Parameters

* `leds` is a [string](/types/string) that controls which LEDs are on and off.
* `interval` is an optional [number](/types/number) that means how many milliseconds to wait after showing a picture.
If you are programming with blocks, `interval` is set at 400 milliseconds.

### ~ hint

#### LED display

Watch this video to see how the @boardname@ shows numbers, text, and displays images with [LEDs](/reference/led).

https://www.youtube.com/watch?v=qqBmvHD5bCw

### ~

## Example

This program shows a picture with the ``show leds`` function.

```blocks
basic.showLeds(`
    # # . # #
    # # . # #
    . # # # .
    . # . # .
    . # . # .
    `
)
```

## ~hint

If you are programming in JavaScript, `#` means an LED that is turned
on and `.` means an LED that is turned off.

## ~

## See also

[show icon](/reference/basic/show-icon)
