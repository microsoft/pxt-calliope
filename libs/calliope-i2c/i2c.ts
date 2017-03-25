serial.writeLine("I2C");
// send to 0x44, register 0x00, value 0x46 (RESET ISL29125)
pins.i2cWriteNumber(0x44, 0x0046, NumberFormat.UInt16BE);
// send to 0x44, register 0x01, value 0x05 (GRB SAMPLING)
pins.i2cWriteNumber(0x44, 0x0105, NumberFormat.UInt16BE);
basic.forever(() => {
    serial.writeString("[");
    pins.i2cWriteNumber(0x44, 0x0A, NumberFormat.Int8BE);
    serial.writeNumber(pins.i2cReadNumber(0x44, NumberFormat.UInt8BE));
    serial.writeString(",");
    pins.i2cWriteNumber(0x44, 0x0C, NumberFormat.UInt8BE);
    serial.writeNumber(pins.i2cReadNumber(0x44, NumberFormat.UInt8BE));
    serial.writeString(",");
    pins.i2cWriteNumber(0x44, 0x0E, NumberFormat.UInt8BE);
    serial.writeNumber(pins.i2cReadNumber(0x44, NumberFormat.UInt8LE));
    serial.writeLine("]");
    basic.pause(1000);
});