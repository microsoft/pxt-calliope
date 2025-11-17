# 45 1 Plant station

```ghost
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (input.lightLevel() > 50) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    basic.showNumber(input.temperature())
})
basic.forever(function () {
if (grove.measureMoistureAnalog(AnalogPin.C16, MoistureMode.Original, MoistureOutput.Number) < 300) {
      basic.setLedColor(0x00ff00)
  } else {
      basic.setLedColor(0xff0000)
  }
})
```

## Plant station @showdialogue
Programme a plant station that helps you to provide the plants in the classroom with the best possible care. Plants need **water**, **sunlight** and the right
**temperature** also plays an important role. 

## Measure temperature @showdialogue
**Temperature** - If button B is pressed, the temperature is displayed.

## Measure temperature
To display the temperature, use the block ``||input.on button A is clicked||``. Change the button by clicking on the drop-down menu of ``||input.on button A is clicked||`` and select ``button B``.   

## Measure temperature
Display the temperature by inserting the input block ``||input.temperature||`` into the block ``||basic.show number||``.

## Measure brightness @showdialogue
- Brightness** - If button A is pressed, you can display whether there is enough light available.
is available. If it is too dark, let a sun appear on the LED matrix. If it is bright enough, a tick appears.

## Measure brightness
Add another ``||input.on button A clicked||`` block to output the measured brightness values. Select a ``||logic.if/then||`` branch to compare the measured light values with the limit value in the next step.

## Compare measured values
Add the condition ``||input.light level||`` > 50 by selecting a ``||logic.logical comparison||`` and comparing the ``||input.light level||`` with the number ``50``.
## Define output
If it is too dark, let a sun appear on the LED matrix. If it is bright enough, a tick appears. Use the ``||basic.show symbol||`` block to display the symbols on the LED matrix.

## Measure soil moisture @showdialogue
Check permanently: If the soil is too dry, let the RGB LED light up red, otherwise let the RGB LED light up green. Use the moisture sensor and connect it to the right Grove port A1.

## Measure soil moisture
Place a ``||logic.if/then||`` branch in the ``||basic.forever||`` loop.


## Measure soil moisture

Use the ``||grove.moisture||`` block to determine the soil moisture.
**Note:** The ``||grove.Grove extension||`` is already integrated in the tutorial. You must first add it in the editor.

## Compare measured values
Add a ``||logic.logical comparison||`` to the ``||logic.if/then||`` branch, which checks whether the ``||grove.moisture (analogue)||`` > 300. 


## Define output
If the soil is moist, the colour is set to green. If it is dry, the colour is red. Place the block ``||basic.set LED to||`` and select the colour in the corresponding places in the ``||logic.if/then||`` branch.


## Done! 🎉
Click on ``|Download|`` to transfer your programme to your Calliope mini.


```package
grove=github:calliope-edu/pxt-grove
```





