# on Logo Event

Run some code in your program when the @boardname@ logo is pressed, touched, or released.

```sig
input.onLogoEvent(TouchButtonEvent.Pressed, function () {})
```

### ~ reminder

![works with Calliope mini V3 only image](/static/v2/v2-only.png)

This block requires the [Calliope mini V3](/device/v2) hardware. If you use this block with a previous Calliope mini board, you will see the **927** error code on the screen.

### ~

The logo on the @boardname@ works just like a touch pin. The logo will detect your touch. You can have code inside an event that will run when the logo is pressed.

## Parameters

* **action**: the logo event to run your code for. The events are ``released``, ``pressed``, ``touched`` or ``long pressed``.

## Example

Show a message on the LEDs when the @boardname@ logo is pressed.

```blocks
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showString("I was pressed!")
})
```

## See also

[Calliope mini V2](/device/v2),
[logo is pressed](/reference/input/logo-is-pressed),
[on pin pressed](/reference/input/on-logo-released),
[touch set mode](/referene/inpu/touch-set-mode)
