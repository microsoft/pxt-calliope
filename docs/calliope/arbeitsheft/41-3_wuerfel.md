# 41 3 Dice

```ghost
input.onGesture(Gesture.Shake, function () {
basic.showNumber(randint(1, 6))
})
```

## Task @showdialog
Turn the Calliope mini into a dice.
When the Calliope mini is shaken, a random number appears on the LED matrix.
![](https://calliope.cc/tutorials/dice_animation.gif)


## Define input
Select the block ``||input.on shake|||`` as input.

## Define output
Use the ``||basic.show number||`` block to output any number in the first step.

## Add randomness
Replace the number with the ``||math.pick random number||`` block and set the number range ``1 to 6``.


## Done! 😍
Click on ``|Download|`` to transfer your program to your Calliope mini.

```template
//
```