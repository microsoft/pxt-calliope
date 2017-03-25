serial.redirect(
    SerialPin.P0,
    SerialPin.P1,
    31250
);

basic.forever(() => {
    for (let note = 0; note <= 90 - 1; note++) {
        // Note on channel 1 (0x90), some note value (note),
        // middle velocity (0x45):
        serial.writeString(String.fromCharCode(144));
        serial.writeString(String.fromCharCode(note));
        serial.writeString(String.fromCharCode(69));
        basic.pause(100);
        // Note on channel 1 (0x90), some note value (note),
        // silent velocity (0x00):
        serial.writeString(String.fromCharCode(144));
        serial.writeString(String.fromCharCode(note));
        serial.writeString("\0");
        basic.pause(100);
        basic.pause(1000);
    }
});
