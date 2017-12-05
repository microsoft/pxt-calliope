# Connect

## ~avatar avatar

Remote control your monster with another @boardname@

## ~

## Duration: ~30 minutes

In order for the light monster to move, the @boardname@ needs to command the servo to move between ``0`` and ``180`` degrees at a certain pace. The code below starts the inchworm moving when the **A** button is pressed.

```blocks
radio.onDataPacketReceived(({receivedNumber}) => {
    pins.servoWritePin(AnalogPin.P0, 30)
    basic.pause(500)
    pins.servoWritePin(AnalogPin.P0, 150)
    basic.pause(500)
})
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
})
```

```package
radio
```