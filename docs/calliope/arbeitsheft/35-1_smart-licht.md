# 35 1 Smart-Light

```ghost
basic.forever(function () {
if (input.soundLevel() > 20) {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(5000)
} else {
  basic.clearScreen()
}
})
```

## Task @showdialog
Write a program for a lamp that is switched on by clapping your hands and switched off again automatically after 5 seconds 👏.

## Create if/else statement
Select a ``||logic.if then else||`` query from the logic blocks and insert it into the ``||basic.forever||`` loop.
<br>
The clapping is recognized via a permanent query of the measured volume values.


## Create condition
Define a threshold value, e.g. `20` for the volume of your clap!
Replace the "true" block in the query with a ``||logic.compare (=)||`` block to compare the measured ``||input.sound level||`` with the threshold value.



## Switch on light
Use the ``||basic.show leds||`` block and fill in the entire matrix to switch on the light.
Then add a ``||basic.pause||`` block and set this to ``5000` ms so that the light stays on for 5 seconds.

## Switch off light
Switch the light off again if the condition does not apply. Use the ``||basic.clear screen||`` block under ``||basic.... more||``.<p>
You can also use the ``||basic.show LEDs||`` block and clear the matrix.

## Done! 👍
Click on ``|Download|`` to transfer your program to your Calliope mini.
