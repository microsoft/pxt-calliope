basic.setLedColor(Colors.Blue)
basic.pause(500)
basic.setLedColor(Colors.Red)
basic.pause(500)
basic.setLedColor(Colors.Green)
basic.pause(500)
basic.setLedColor(0);
basic.setLedColor(Colors.Violet)
basic.pause(100)
led.plot(0, 0)
basic.pause(1000);
basic.forever(() => {
    const a = input.acceleration(Dimension.X);
    led.plotBarGraph(a, 1023)
})
