# Input

Events and data from sensors

```cards
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {})
input.onGesture(Gesture.Shake, function () {})
input.onPinEvent(TouchPin.P0, input.buttonEventDown(), function() {})
input.buttonIsPressed(Button.A)
input.pinIsPressed(TouchPin.P0)
input.isGesture(Gesture.Shake)
input.compassHeading()
input.temperature()
input.acceleration(Dimension.X)
input.lightLevel()
input.rotation(Rotation.Pitch)
input.magneticForce(Dimension.X)
input.runningTime()
input.runningTimeMicros()
input.setAccelerometerRange(AcceleratorRange.OneG)
```

## See also

[On Button Event](/reference/input/on-button-event), [onGesture](/reference/input/on-gesture),
[On Pin Event](/reference/input/on-pin-event),
[buttonIsPressed](/reference/input/button-is-pressed), [pinIsPressed](/reference/input/pin-is-pressed),
[is gesture](/reference/input/is-gesture),
[compassHeading](/reference/input/compass-heading), [temperature](/reference/input/temperature),
[acceleration](/reference/input/acceleration), [lightLevel](/reference/input/light-level),
[rotation](/reference/input/rotation), [magneticForce](/reference/input/magnetic-force),
[runningTime](/reference/input/running-time), [setAccelerometerRange](/reference/input/set-accelerometer-range),
[calibrate-compass](/reference/input/calibrate-compass)
