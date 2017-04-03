import rgbw = basic.rgbw;
serial.writeLine("I2C");
// send to 0x44, register 0x00, value 0x46 (RESET ISL29125)
pins.i2cWriteNumber(0x44, 0x0046, NumberFormat.UInt16BE);
// send to 0x44, register 0x01, value 0x05 (GRB SAMPLING)
pins.i2cWriteNumber(0x44, 0x0105, NumberFormat.UInt16BE);
basic.forever(() => {
    serial.writeString("[");
    pins.i2cWriteNumber(0x44, 0x0A, NumberFormat.Int8BE);
    let g = pins.i2cReadNumber(0x44, NumberFormat.UInt8BE);
    serial.writeNumber(r);
    serial.writeString(",");
    pins.i2cWriteNumber(0x44, 0x0C, NumberFormat.UInt8BE);
    let r = pins.i2cReadNumber(0x44, NumberFormat.UInt8BE);
    serial.writeNumber(g);
    serial.writeString(",");
    pins.i2cWriteNumber(0x44, 0x0E, NumberFormat.UInt8BE);
    let b = pins.i2cReadNumber(0x44, NumberFormat.UInt8LE);
    serial.writeNumber(b);
    serial.writeLine("]");
    basic.setLedColor(basic.rgbw(r,g,b, 0));
    basic.pause(1000);
});