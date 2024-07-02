# 20 2_Rocket launch

```ghost
basic.showNumber(3)
basic.pause(100)
basic.showNumber(2)
basic.pause(100)
basic.showNumber(1)
basic.pause(100)
basic.showNumber(0)
basic.pause(100)
basic.showLeds(`
 . . # . .
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 `)
basic.showLeds(`
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 `)
basic.showLeds(`
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
```

## Task @showdialog
Use a variable to determine the speed of your animation and adjust it conveniently instead of changing the speed again and again in every pause block.

## Create variable
Create a ``||variables.variable||`` and name it "Tempo".

```
```
![](https://calliope.cc/tutorials/variable_tempo.png)

## Insert variable
Use the block ``||variables.set tempo to||`` to set the variable Tempo to the value `100`. Attention: Place the block before your countdown!


## Replace
Replace the values in the pause blocks with the variable ``||variables.tempo|||``.


## Slow down the countdown
Slow down your countdown by setting the value of the variable ``||variables.tempo||`` to `500`.

## Done! 🎉
Click on ``|Download|`` to transfer your program to your Calliope mini.

```template
basic.showNumber(3)
basic.pause(100)
basic.showNumber(2)
basic.pause(100)
basic.showNumber(1)
basic.pause(100)
basic.showNumber(0)
basic.pause(100)
basic.showLeds(`
 . . # . .
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 `)
basic.showLeds(`
 . # # # .
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 `)
basic.showLeds(`
 . # # # .
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . # . .
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . # . # .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
basic.showLeds(`
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 . . . . .
 `)
```

```blocks
let x = 0
```
