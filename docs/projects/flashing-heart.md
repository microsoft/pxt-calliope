# Flashing Heart

## Step 1 @fullscreen

Place the ``||basic:show leds||`` block in the ``||basic:on start||`` block and draw a heart.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`
    );
```

## Step 2 @fullscreen

Place another ``||basic:show leds||`` block under the heart to make it blink. Check in the simulator to see the heart blink.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
basic.showLeds(`
    . # . # .
    # . # . #
    # . . . #
    . # . # .
    . . # . .`);
```

## Step 3 @fullscreen

Move the blocks inside the ``||basic:forever||`` to repeat the animation.

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.showLeds(`
        . # . # .
        # . # . #
        # . . . #
        . # . # .
        . . # . .`);
})
```

## Step 4 @fullscreen

Place more ``||basic:show leds||`` blocks to create your own animation.

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.showLeds(`
        . # . # .
        # . # . #
        # . . . #
        . # . # .
        . . # . .`);
    basic.showLeds(`
        . . . . .
        . # . # .
        . # # # .
        . . # . .
        . . . . .`);
})
```

## Step 5 @fullscreen

If you have a @boardname@ connected, click ``|Download|`` to transfer your code and watch the hearts flash!
