# 49 1 Estimation game

```ghost
let Entfernung = 0
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), function () {
    Entfernung = Math.round(grove.measureInCentimeters(DigitalPin.C16))
})
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Click), function () {
    basic.showNumber(Entfernung)
})
basic.forever(function () {
    basic.showLeds(`
        . # # . .
        . . . # .
        . . # . .
        . . . . .
        . . # . .
        `)
})
```

## Estimation  game @showdialog
Programme an estimation game that measures the distance between two objects. The
Calliope mini measures the distance - in secret. You estimate the distance and the Calliope mini solves and displays the measured distance. 


## Task @showdialogue
Press button A to measure the distance and save it in a variable. Press button B to show the saved value of the variable on the display.


## Buttons Add events
Insert the block ``||input.on button A is clicked||`` twice and change the button to ``B`` for one block. Tip: You can duplicate the block by right-clicking.

## Define variable
To save the distance when the button is pressed and retrieve it later, create a ``||variable.variable||`` and name it *Distance*. 


```
```
![image/variable](image/variable)

## Save distance
Use the ``||grove.ultrasonic|||`` block to determine the distance.
**Note:** In the tutorial, the ``||grove.Grove extension||`` is already integrated. You must first add it in the editor.

When the ``||input.A||`` button is clicked, save the measured value to the ``||variable.set distance to||`` block in the ``distance`` variable.

## Save value
Now retrieve the saved value from the variable ``||variables.distance||`` and show it on the display when button B is pressed. To do this, use the block ``||basic.show number||`` and insert it together with the variable into the block ``||input.on button B is clicked||``.

## Testing
Test your program! You will notice that the values of the ultrasonic sensor are quite long. The values are very precise and are not yet rounded. 
``||Math.round||`` the value of the ultrasonic sensor, which you save in the variable ``||variables.set distance to||``.

## Show question mark
Finally, let a ‘?’ appear permanently on the LED matrix. Draw a ? with the block ``||basic.show leds||``.

## Done! 👏
Click on ``|Download|``, test your programme on the Calliope mini and try to estimate the distance correctly!

```package
grove=github:calliope-edu/pxt-grove
```













