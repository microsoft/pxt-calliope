# 21 4 RGB-LED

```ghost
let Tempo = 100
basic.setLedColor(0xff0000)
basic.pause(Tempo)
basic.setLedColor(0xff8000)
basic.pause(Tempo)
basic.setLedColor(0xffff00)
basic.pause(Tempo)
basic.setLedColor(0x00ff00)
basic.pause(Tempo)
basic.setLedColor(0x00ffff)
basic.pause(Tempo)
basic.setLedColor(0x007fff)
basic.pause(Tempo)
basic.setLedColor(0xb09eff)
```

## Task @showdialog
Program a rainbow. Use the following colors:
red, orange, yellow, green, turquoise, blue, purple.

## Create variable
Create a ``||variables.variable||`` and name it "Tempo".

```
```
![](https://calliope.cc/tutorials/variable_tempo.png)

## Set tempo
Use the block ``||variables.set tempo to||`` from the category ``||variables.variables||`` to set the variable Tempo to the value `100`. Place the block at the very beginning in the ``||basic.Start function||``.

## RGB LED
Use the ``||basic.set color to||`` block and drag it into the ``||basic.on start||``-function. Set the block so that the RGB LED lights up red.

## Replace pause value
Add a ``||basic.pause||`` block and replace the pause value with the ``||variables.tempo||`` block.

## Rainbow
For each additional color, add a ``||basic.set LED to||`` block and a ``||basic.pause||`` block.

## Done! ✨
Click on ``|Download|`` to transfer your program to your Calliope mini.


```template
//
```



















