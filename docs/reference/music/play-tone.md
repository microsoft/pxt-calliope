# Play Tone

Play a musical tone on the speaker or at a sound pin of the @boardname@ for as long as you say.

## ~ hint

This function only works on the @boardname@ and in some browsers.

## ~

```sig
music.playTone(440, 120)
```
The frequency of the tone is set as a number of cycle per second, or Hertz. The [note frequency](/reference/music/note-frequency) block will allow you to use a musical note for the tone instead of a number of Hertz.

## Parameters

* ``frequency`` is the [number](/types/number) of Hertz (how high or low the tone is).
* ``ms`` is the [number](/types/number) of milliseconds that the tone lasts

#### Simulator

The ``||music:play tone||`` block works on the @boardname@ board. It might not work in the simulator on every browser.

### ~

## Parameters

* **frequency** is the [number](/types/number) of Hertz (how high or low the tone is). You can set this value with a note instead by using the [note frequency](/reference/music/note-frequency) block.
* **ms** is the [number](/types/number) of milliseconds for the duration of the tone. A [beat](/reference/music/beat) value is used instead as the block's default tone duration. The number of beats is converted to milliseconds for you.


## Example

### Tone and beat

Play a `Middle C` for `1 beat`.

```blocks
music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Whole))
```


## Using other pins

Use [analogSetPitchPin](/reference/pins/analog-set-pitch-pin) to change that pin used to generate music.

```blocks
pins.analogSetPitchPin(AnalogPin.P1);
```

## See also

[rest](/reference/music/rest), [ring tone](/reference/music/ring-tone) , [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), 
[change tempo by](/reference/music/change-tempo-by)

