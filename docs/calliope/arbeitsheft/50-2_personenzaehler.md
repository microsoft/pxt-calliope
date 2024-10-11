# 50 2 people counter

```ghost
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    basic.showNumber(Personenzähler)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    Personenzähler = 0
})
let Personenzähler = 0
Personenzähler = 0
let komplett = 20
basic.forever(function () {
    if (grove.measureInCentimeters(DigitalPin.C16) < 10) {
        Personenzähler += 1
    }
    if (Personenzähler < komplett) {
        basic.setLedColor(0xff0000)
    } else {
        basic.setLedColor(0x00ff00)
    }
})
```

```package
grove=github:calliope-edu/pxt-grove
```


## Task @showdialog
Is the class complete?
Use the ultrasonic sensor to check whether all the children are back in the classroom. Program a people counter to count the number of people entering the classroom.

## Define variables
Create two variables at the beginning. One variable ``||variables.peoplecounter||`` for the number of people counted and one variable ``||variables.complete||``. 

```
```
![image/variable](image/variable)

## Define variables
Set the variable ``||variables.personcounter||`` to 0 at the start and the variable ``||variables.complete||`` to the number of classmates, e.g. 20. 


## Step 3
Permanently measure the distance. As soon as a person walks past the ultrasonic sensor and the distance falls below the value 10, increase the person counter by 1. Insert a ``||logic.if/then||`` branch into the ``||basic.forever||`` loop. 



## Compare value
Use a ``||logic.logical comparison||`` block in which the value of the ``||grove.ultrasonic sensor||`` is compared with the limit value, e.g. ``10`` cm. 
**Note:** In this tutorial, the ultrasonic sensor is already added and you can find it under the ``||grove.grove||`` blocks.


## Increase variable
Increase the variable ``||variables.personcounter||`` by 1 if the value of the ultrasonic sensor is below 10, for example.


## Evaluate values
If the people counter is smaller than the maximum number of students in the class, the LED lights up red, otherwise green. This time, insert another ``||logic.if/then/else||`` branch into the ``||basic.forever loop||``. Test if the variable ``||variables.personcounter||`` is smaller than the variable ``||variables.complete||``.

## Define output
If the person counter is smaller than the variable complete, then ``||basic.set the LED color||`` to **red**. Otherwise to **green**. 

## Extension: Reset
Add the option to reset the people counter via ``||input.A+B clicked||`` so that the ``||variables.peoplecounter||`` can be restarted and restarted from ``0``.

## Display variable
Finally, when ``||input.button A||`` is pressed, the LED matrix displays how many people have already been counted. 
Tip: Use the variable ``||variables.peoplecounter|||`` 

## That's it! ✨
Click on ``|Download|`` to transfer your program to your Calliope mini and test the people counter.
