basic.showString("RGB");
basic.setLedColor(Colors.Blue);
basic.pause(500);
basic.setLedColor(Colors.Red);
basic.pause(500);
basic.setLedColor(Colors.Green);
basic.pause(500);
basic.setLedColor(Colors.Violet);
basic.pause(500);
basic.setLedColor(0);
basic.showString("Gesten");
input.onGesture(Gesture.Shake, () => {
    basic.showString("S")
});
input.onGesture(Gesture.LogoUp, () => {
    basic.showString("U")
});
input.onGesture(Gesture.LogoDown, () => {
    basic.showString("D")
});
input.onGesture(Gesture.ScreenUp, () => {
    basic.showString("+")
});
input.onGesture(Gesture.TiltRight, () => {
    basic.showString("R")
});
input.onGesture(Gesture.FreeFall, () => {
    basic.showString("F")
});
input.onGesture(Gesture.ScreenDown, () => {
    basic.showString("-")
});
input.onGesture(Gesture.TiltLeft, () => {
    basic.showString("L")
});
input.onGesture(Gesture.ThreeG, () => {
    basic.showString("3")
});
input.onGesture(Gesture.SixG, () => {
    basic.showString("6")
});
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(0)
});
input.onPinPressed(TouchPin.P1, () => {
    basic.showNumber(1)
});
input.onPinPressed(TouchPin.P2, () => {
    basic.showNumber(2)
});
input.onPinPressed(TouchPin.P3, () => {
    basic.showNumber(3)
});

basic.showString("Sound");
music.setTempo(150);
let whole = music.beat(BeatFraction.Whole);
function note(n: Note, l: BeatFraction): number[] {
    return [music.noteFrequency(n), music.beat(l)];
}

function getNoteName(frequency: number): string {
    switch (frequency) {
        case 262:
            return "C";
        case 277:
            return "CSharp";
        case 294:
            return "D";
        case 311:
            return "Eb";
        case 330:
            return "E";
        case 349:
            return "F";
        case 370:
            return "FSharp";
        case 392:
            return "G";
        case 415:
            return "GSharp";
        case 440:
            return "A";
        case 466:
            return "Bb";
        case 494:
            return "B";
        case 131:
            return "C3";
        case 139:
            return "CSharp3";
        case 147:
            return "D3";
        case 156:
            return "Eb3";
        case 165:
            return "E3";
        case 175:
            return "F3";
        case 185:
            return "FSharp3";
        case 196:
            return "G3";
        case 208:
            return "GSharp3";
        case 220:
            return "A3";
        case 233:
            return "Bb3";
        case 247:
            return "B3";
        case 523:
            return "C5";
        case 555:
            return "CSharp5";
        case 587:
            return "D5";
        case 622:
            return "Eb5";
        case 659:
            return "E5";
        case 698:
            return "F5";
        case 740:
            return "FSharp5";
        case 784:
            return "G5";
        case 831:
            return "GSharp5";
        case 880:
            return "A5";
        case 932:
            return "Bb5";
        case 989:
            return "B5";
        default:
            return "?";
    }
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

for (var t = 0; t < notes.length; t++) {
    music.playTone(notes[t][0], notes[t][1]);
    basic.showString(getNoteName(notes[t][0]));
    music.rest(whole - notes[t][1]);
}