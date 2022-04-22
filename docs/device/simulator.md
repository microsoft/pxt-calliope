# Simulator

The JavaScript simulator allows you to test and execute most BBC micro:bit programs in the browser.
It allows you to emulate sensor data or user interactions.

```sim
input.onButtonEvent(Button.A, ButtonEvent.Down, () => {
   basic.showString("A");
});
input.onButtonEvent(Button.B, ButtonEvent.Down, () => {
   basic.showString("B");
});
input.onPinTouchEvent(TouchPin.P0, ButtonEvent.Down, () => {
   basic.showString("0");
});
input.onPinTouchEvent(TouchPin.P1, ButtonEvent.Down, () => {
   basic.showString("1");
});
input.onPinTouchEvent(TouchPin.P2, ButtonEvent.Down, () => {
   basic.showString("2");
});
input.temperature()
input.compassHeading()
input.lightLevel()
```
