# 23 4_Fitness


## Task @showdialog
Create a fitness program! Define 5 colors and assign a fitness exercise to each color - for example, squats, stretch jumps, jumping jacks, etc.
Observe the following guidelines for your fitness program:
- 10 exercises
- 3x jumping jacks in a row
- 2x squats
- Finish with a stretch jump

## Define exercises
Insert a ``||basic.set LED to||`` and ``||basic.pause||`` block for each of the 10 exercises.

## Repetitions
Optimize your program by recognizing repetitions and using repetition loops instead of mapping the same command several times in a row.
Use the ``||loops.repeat x times|||`` block and set the desired repetition.

## Optimize repetitions
If a color is repeated, you need a visible pause between the phases.
Use the ``||basic.turn built-in LED off||`` block to switch off the RGB LED.
You can find it under ``||basic.basics||`` ``||basic....more||``.
Add a ``||basic.pause||`` block to define the duration of the pause.
Complete your program.

## Use variables @showdialog
Use a variable to define the speed of your animation and adjust it easily.

## Create variable Tempo
Create a ``||variables.variable||`` and name it "Tempo".

```
```
![](https://calliope.cc/tutorials/variable_neu.png)

## Set tempo value
Use the block ``||variables.set tempo to||`` to set the variable ``||variables.tempo||`` to the value `1000`.

## Use variable Tempo
Replace the values in the pause blocks with the variable ``||variables.tempo||``.

## Done! 🎉
Click on ``|Download|`` to transfer your program to your Calliope mini.



















