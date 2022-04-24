# Simulator

The JavaScript simulator allows you to test and execute most BBC micro:bit programs in the browser.
It allows you to emulate sensor data or user interactions.

```sim
input.onButtonEvent(Button.A, ButtonEvent.Click, () => {
   basic.showString("A");
});
input.onButtonEvent(Button.B, ButtonEvent.Click, () => {
   basic.showString("B");
});
input.onPinTouchEvent(TouchPin.P0, ButtonEvent.Click, () => {
   basic.showString("0");
});
input.onPinTouchEvent(TouchPin.P1, ButtonEvent.Click, () => {
   basic.showString("1");
});
input.onPinTouchEvent(TouchPin.P2, ButtonEvent.Click, () => {
   basic.showString("2");
});
input.temperature()
input.compassHeading()
input.lightLevel()
```
