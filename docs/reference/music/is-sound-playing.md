# is Sound Playing

Check if sound is playing at any sound output.

```sig
music.isSoundPlaying()
```

### ~ reminder

This function requires the Calliope mini 3 hardware. If you use this function with a Calliope mini 1 or 2 board, you will see the **927** error code on the screen.

### ~

Sound is played at the built-in speaker or at the selected audio output pin. You can check if any sound is currently being played at any of these outputs.

## Returns

* a [boolean](/types/boolean) value that is `true` if sound is being played at the built-in speaker or at the audio pin. The value is `false` otherwise.

## Example #example

Stop all sounds if any are currently playing.

```blocks
if (music.isSoundPlaying()) {
    music.stopAllSounds()
}
```

## See also

[set built-in speaker enabled](/reference/music/set-built-in-speaker-enabled),
[set audio pin](/reference/pins/set-audio-pin)

```package
music
```
