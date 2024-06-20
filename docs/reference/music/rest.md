# Rest

Play no sound (rest) on the speaker or at a sound pin for the amount of time you say.

```sig
music.rest(400)
```

### ~ hint

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

## Parameters

* ``ms`` is a [number](/types/number) saying how many
  milliseconds the @boardname@ should rest. One second is 1000
  milliseconds.

#### Simulator

The ``||music:rest||`` block works on the @boardname@ board. It might not work in the simulator on every browser.

### ~

## Parameters

* **ms** is the [number](/types/number) of milliseconds for the duration of the rest. A [beat](/reference/music/beat) value is used instead as the block's default rest duration. The number of beats is converted to milliseconds for you.

## Example

### Middle C loop

Continuously play a `Middle C` tone for `1` beat and rest for `2` beats.

```blocks
basic.forever(function () {
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.rest(music.beat(BeatFraction.Double))
})
```

## See also

Continuously play a `Middle C` note followed by a random rest time.

```blocks
basic.forever(function () {
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.rest(randint(500, 2000))
})
```

## See also

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone) , [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)

