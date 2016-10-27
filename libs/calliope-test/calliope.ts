function note(n: Note, l: BeatFraction) {
    return [music.noteFrequency(n), music.beat(l)];
}

var notes = [
    note(Note.E, BeatFraction.Quarter), note(Note.E, BeatFraction.Quarter), note(Note.F, BeatFraction.Quarter),
    note(Note.G, BeatFraction.Quarter), note(Note.G, BeatFraction.Quarter), note(Note.F, BeatFraction.Quarter),
    note(Note.E, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter), note(Note.C, BeatFraction.Quarter),
    note(Note.C, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter), note(Note.E, BeatFraction.Quarter),
    note(Note.E, BeatFraction.Quarter + BeatFraction.Eighth),
    note(Note.D, BeatFraction.Eighth), note(Note.D, BeatFraction.Half),
    note(Note.E, BeatFraction.Quarter), note(Note.E, BeatFraction.Quarter), note(Note.F, BeatFraction.Quarter),
    note(Note.G, BeatFraction.Quarter), note(Note.G, BeatFraction.Quarter), note(Note.F, BeatFraction.Quarter),
    note(Note.E, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter), note(Note.C, BeatFraction.Quarter),
    note(Note.C, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter), note(Note.E, BeatFraction.Quarter),
    note(Note.D, BeatFraction.Quarter + BeatFraction.Eighth),
    note(Note.C, BeatFraction.Eighth), note(Note.C, BeatFraction.Half),
    note(Note.D, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter), note(Note.E, BeatFraction.Quarter),
    note(Note.C, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter),
    note(Note.E, BeatFraction.Eighth), note(Note.F, BeatFraction.Eighth),
    note(Note.E, BeatFraction.Quarter), note(Note.C, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter),
    note(Note.E, BeatFraction.Eighth), note(Note.F, BeatFraction.Eighth),
    note(Note.E, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter), note(Note.C, BeatFraction.Quarter),
    note(Note.D, BeatFraction.Quarter), note(Note.G3, BeatFraction.Quarter), note(Note.E, BeatFraction.Half),
    note(Note.E, BeatFraction.Quarter), note(Note.F, BeatFraction.Quarter), note(Note.G, BeatFraction.Quarter),
    note(Note.G, BeatFraction.Quarter), note(Note.F, BeatFraction.Quarter), note(Note.E, BeatFraction.Quarter),
    note(Note.E, BeatFraction.Eighth), note(Note.F, BeatFraction.Eighth),
    note(Note.C, BeatFraction.Quarter), note(Note.C, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter),
    note(Note.E, BeatFraction.Quarter), note(Note.D, BeatFraction.Quarter + BeatFraction.Eighth),
    note(Note.C, BeatFraction.Eighth), note(Note.C, BeatFraction.Half)
];

let whole = music.beat(BeatFraction.Whole);
for (var t = 0; t < notes.length; t++) {
    serial.writeNumber(notes[t][0]);
    serial.writeNumber(notes[t][1]);
    serial.writeLine("\r\n");
    music.playTone(notes[t][0], notes[t][1]);
    basic.pause(whole - notes[t][1]);
}

/*music.playTone(Note.A, 2000);
music.playTone(Note.C, 2000);
music.playTone(Note.F, 2000);

music.playTone(Note.A, 100);
music.playTone(1000, 100);
music.playTone(3000, 100);

basic.setLedColor(Colors.Blue);
basic.pause(500);
basic.setLedColor(Colors.Red);
basic.pause(500);
basic.setLedColor(Colors.Green);
basic.pause(500);
basic.setLedColor(Colors.Violet);
basic.pause(500);
basic.setLedColor(0);

input.onGesture(Gesture.Shake, () => {
    basic.showString("S");
});
input.onGesture(Gesture.LogoUp, () => {
    basic.showString("U");
});
input.onGesture(Gesture.LogoDown, () => {
    basic.showString("D");
});
input.onGesture(Gesture.ScreenUp, () => {
    basic.showString("+");
});
input.onGesture(Gesture.TiltRight, () => {
    basic.showString("R");
});
input.onGesture(Gesture.FreeFall, () => {
    basic.showString("F");
});
input.onGesture(Gesture.ScreenDown, () => {
    basic.showString("-");
});
input.onGesture(Gesture.TiltLeft, () => {
    basic.showString("L");
});
input.onGesture(Gesture.ThreeG, () => {
    basic.showString("3");
});
input.onGesture(Gesture.SixG, () => {
    basic.showString("6");
});
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(0);
});
input.onPinPressed(TouchPin.P1, () => {
    basic.showNumber(1);
});
input.onPinPressed(TouchPin.P2, () => {
    basic.showNumber(2);
});
input.onPinPressed(TouchPin.P3, () => {
    basic.showNumber(3);
});
*/