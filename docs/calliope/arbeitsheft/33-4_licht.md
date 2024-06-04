# 33 4 Light


## Task @showdialog
Write a program that saves the measured light value in a variable when the LED matrix is switched off and then display the saved value on the LED matrix.

## Create variable
Create a ``||variables.variable||`` and name it "Light".

```
```
![](https://calliope.cc/tutorials/variable_licht.png)

## Save light intensity @showdialog
If button A is clicked, save the measured light intensity in the variable "Light".

## Define input
Select the block ``||input.on button A is clicked|||`` as input.

## Processing: Measure and save light intensity
The ``||input.light level||`` block outputs the measured luminous intensity value.
Use the ``||variables.set light to||`` block to set the value of the variable to the measured light intensity.


## Show light intensity @showdialog
When button B is clicked, show the value of the variable "Light".

## Define input
Place another block ``|| input.on button A ||`` clicked and change it to ``|| input.on button B ||`` clicked.

![Button B](https://calliope.cc/tutorials/kopf_a_b.png)

## Define output
Use the ``|| basic.show number||`` block and display the value of the variable``||variables.light||``.


## Done! 👏
Click on ``|Download|`` to transfer your program to your Calliope mini.

```template
//
```

























































