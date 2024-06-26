# 24 3_4 Buttons

```ghost
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
 basic.showIcon(IconNames.Happy)
 basic.setLedColor(0x00ff00)
})
```

## Tasks @showdialog
Make a **smiley** appear when **button A** is pressed and a **sad smiley** when **button B** is pressed. Add a matching color to both symbols.


## Control button A
Select the block ``||input.on button A||`` is clicked as input.

## Display symbol and color
Use the ``||basic.show symbol||`` block and make a smiley appear on the LED matrix. Add the ``||basic.set LED to||`` block to your program and let the RGB LED light up `green`.

## Control button B
Place another block ``|| input.on button A ||`` clicked and change it to ``|| input.on button B ||`` clicked.

```
```
![Button B](https://calliope.cc/tutorials/kopf_a_b.png)


## Show symbol and color
Add the block ``||basic.show icon||`` and select a sad smiley.
To change the color of the RGB LED, use the ``||basic.set LED to||`` block. Set the block so that the RGB LED lights up 'red'.


## Done! 😍
Click on ``|Download|`` to transfer your program to your Calliope mini.


```template
//
```






