# 27 1 Piano

```ghost
input.onPinTouchEvent(TouchPin.P1, input.buttonEventDown(), function () {
  basic.setLedColor(0xff0080)
  music.playTone(294, music.beat(BeatFraction.Whole))
  basic.showString("D")
})
input.onPinTouchEvent(TouchPin.P0, input.buttonEventDown(), function () {
  basic.setLedColor(0x00ff00)
  music.playTone(262, music.beat(BeatFraction.Whole))
  basic.showString("C")
})
input.onPinTouchEvent(TouchPin.P2, input.buttonEventDown(), function () {
  basic.setLedColor(0xffff00)
  music.playTone(330, music.beat(BeatFraction.Whole))
  basic.showString("E")
})
input.onPinTouchEvent(TouchPin.P3, input.buttonEventDown(), function () {
  basic.setLedColor(0x00ffff)
  music.playTone(349, music.beat(BeatFraction.Whole))
  basic.showString("F")
})
basic.showIcon(IconNames.EigthNote)
```

## Task @showdialog
Develop a Calliope mini piano that plays a different note when touching the touch pins 0-3, lights up the RGB LED in different colors and displays the note name on the LED matrix.


## Start screen
Start your program with a note that is displayed as an``||basic.icon||`` on the LED matrix.

## Define input
Select the block ``||input.on pin P0 is pressed down|||`` as input.

## Define output
Use the ``||basic.show text||`` block for the letter of the note and the ``||basic.set LED to||`` block for the color.
Add a ``||music.play tone||`` block for the sound output. Place the three output blocks inside the ``||input.on pin P0||`` input block.

## Duplicate @showdialog
Duplicate the program blocks and also control the other touch pins (1-3).

```
```
![](https://calliope.cc/tutorials/duplizieren.png)


## Customize output
Change the transparent ``||input.on pin P0||`` blocks one after the other to: ``||input.on pin P1||``, ``||input.on pin P2||`` and ``||input.on pin P3||``.
Adjust the note names, the colors and the sound output.

## Done! ✨
Click on ``|Download|`` to transfer your program to your Calliope mini.

```
It is important to touch the minus (-) pin at the same time to trigger a pin input. Hold the Calliope mini with one hand on the minus (-) pin and touch one of the other pins with a finger of the other hand.
```

```template
//
```



