led.plot(0, 0)
basic.pause(1000);
basic.forever(() => {
    const a = input.acceleration(Dimension.X);
    led.plotBarGraph(a, 1023)
})
