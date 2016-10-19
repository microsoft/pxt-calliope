/*basic.showString("RGB")
basic.setLedColor(Colors.Blue)
basic.pause(500)
basic.setLedColor(Colors.Red)
basic.pause(500)
basic.setLedColor(Colors.Green)
basic.pause(500)
basic.setLedColor(Colors.Violet)
basic.pause(500)
basic.setLedColor(0);
basic.showString("Gesten")
input.onGesture(Gesture.Shake, () => {
    basic.showString("S")
})
input.onGesture(Gesture.LogoUp, () => {
    basic.showString("U")
})
input.onGesture(Gesture.LogoDown, () => {
    basic.showString("D")
})
input.onGesture(Gesture.ScreenUp, () => {
    basic.showString("+")
})
input.onGesture(Gesture.TiltRight, () => {
    basic.showString("R")
})
input.onGesture(Gesture.FreeFall, () => {
    basic.showString("F")
})
input.onGesture(Gesture.ScreenDown, () => {
    basic.showString("-")
})
input.onGesture(Gesture.TiltLeft, () => {
    basic.showString("L")
})
input.onGesture(Gesture.ThreeG, () => {
    basic.showString("3")
})
input.onGesture(Gesture.SixG, () => {
    basic.showString("6")
})
*/
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(0)
})
input.onPinPressed(TouchPin.P1, () => {
    basic.showNumber(1)
})
input.onPinPressed(TouchPin.P2, () => {
    basic.showNumber(2)
})
input.onPinPressed(TouchPin.P3, () => {
    basic.showNumber(3)
})
