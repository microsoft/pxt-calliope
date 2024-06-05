 # 54_Air quality

## Task @showdialog
The air that surrounds you plays a major role in your well-being.
Program a display that informs you when it gets too hot, the humidity is too high or too low
is too high or too low and when it needs to be aired again.

## Measure temperature @showdialog
Start measuring the temperature and use the loudspeaker for the temperature warning.
Sound a warning tone if the temperature is too cold or too warm.

## Measure temperature
A ``||logic.if/then/else||`` branch from the ``||logic.logic||`` blocks is required so that a sound can be played if the temperature rises above 30 °C, for example. To be able to measure and compare the temperature permanently, insert the branch into the ``||basic.forever||`` loop. 

## Compare measured value
Insert a ``||logic.logical comparison||``, with which you compare the measured ``||SCD40.temperature ||`` of the CO2 sensor with a limit value. If the temperature is > 30, for example, a ``||music.warning tone||`` is played.

## Add branch
Click on the ``||logic.+|||`` in the ``||logic.conditional statement||`` to add another condition so that a warning tone is also played if it is too cold and the ``||SCD40.temperature||`` falls below 18 degrees, for example. 

## Define output
Add a ``||logic.else||`` section to ``||music.Pause||`` so that no warning sound is played if the temperature is neither too warm nor too cold. 


## Measure CO2 content @showdialog
Great, you've done the temperature measurement! 👍 The CO2 traffic light works in a very similar way. Instead of the temperature, the CO2 content is now measured and instead of playing sounds, the RGB LED lights up.

## Measuring the CO2 concentration
The CO2 content in the air is displayed in ppm (parts per million). Anything below 1000 ppm is harmless.

## Compare measured value
Create a second ``||logic.logical branch||`` and compare the measured ``||SCD40. CO2||`` concentration with the limit values. If the value is above 2000, let the ``||basic.RGB-LED||`` light up red. If it is below 1000, it lights up green. If the value is in between, it lights up yellow.


## Measure humidity @showdialog
The next step is to measure the humidity. Use the LED matrix to display the humidity. It feels comfortable between 30% and 70%
Fill the bars of the LED matrix with the percentage humidity.

## Add conditions @showdialog
Insert a third ``||logic.if/then||`` branch into the ``||basic.forever||`` loop.
Click on the ``||logic.+|||`` to insert the five conditions and create a multi-branch. 

*In a multi-branch, the conditions are checked from top to bottom. As soon as one is true, the code block of the corresponding condition is executed and the ones below are ignored. The order of the conditions is therefore important.

## Compare measured value
Read out the ``||SCD40.humidity|||`` and compare it in the conditions. 

< 30 %, LED matrix must be empty
< 40 %, one bar filled in
< 50 %, two bars filled, etc.
> 70 %, switch on the entire LED matrix

## Define output
Use the ``||basic.show LEDs||`` block to fill the bars in the LED matrix.

## Define time interval
Great! You've almost done it. Add a ``||basic.pause|||`` to the continuous loop so that the sensor values are updated at a specific time interval.
Click on ``|Download|`` to transfer your program to your Calliope mini.

## Create functions @showdialog
To make the program clearer, create three ``||function.functions||`` for the measurement: temperature, CO2 content and humidity.

![functions](https://calliope.cc/tutorials/funktion_erstellen.png)

## Create variables
Also save the sensor value once in a ``||variables.variable||`` so that it is not read out several times. Create a variable for the respective sensor value: temperature, humidity and CO2 content and implement it in the functions.

## Call functions 
Last but not least, the ``||function.functions||`` must be called in the ``||basic.forever||`` loop so that the sensor measurement takes place.


## Done! 👏
Click on ``|Download|`` to transfer your program to your Calliope mini.

```package
co2sensor=github:calliope-edu/co2-sensor-scd40
```


