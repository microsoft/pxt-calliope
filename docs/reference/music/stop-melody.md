# Stop Melody

Stops playing a musical melody.

## Simulator

```sig
music.stopMelody(MelodyStopOptions.All)
```

## Parameters

* ``options`` specifies which melodies (foreground, background or both) need to be stopped

## Example

This example plays the ``Entertainer`` built-in melody.

```blocks
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Forever)
basic.pause(5000)
music.stopMelody(MelodyStopOptions.All)
```

## See also

[start melody](/reference/music/begin-melody)
