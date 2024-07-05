# 38 1b Thermometer

```ghost
basic.forever(function () {
  if (input.temperature() > 30) {
      basic.showLeds(`
          # # # # #
          # # # # #
          # # # # #
          # # # # #
          # # # # #
          `)
      basic.setLedColor(0xff0000)
  } else if (input.temperature() < 20) {
      basic.showLeds(`
          . . . . .
          . . . . .
          . . . . .
          . . . . .
          . . . . .
          `)
      basic.setLedColor(0x007fff)
  } else {
      basic.showLeds(`
          # . # . #
          . # . # .
          # . # . #
          . # . # .
          # . # . #
          `)
      basic.setLedColor(0x00ff00)
  }
})
```

## Task @showdialog
Write a program for a thermometer that outputs a heat-free signal when a temperature of 30°C is exceeded.🍦 


- If the measured **temperature > 30°C**, display an ice symbol on the LED matrix and switch the RGB LED to 'red'.
- If the measured **temperature is < 20°C**, switch the LED matrix off and the RGB LED to `blue`.
- In **all other cases**, switch half of the LED matrix on and the RGB LED to `green`.


## Create query
Select a ``||logic.if then else||`` query from the logic blocks and insert it into the ``||basic.forever||`` loop.
Click on the **+** of the query to add another condition.


## Create conditions (warm)
Replace the first "true" block in the query with a ``||logic.compare (=)||`` block to compare the measured ``||input.temperature|`` with the highest threshold value.
Change the operator to **>**.


## Create conditions (cold)
Replace the second "true" block in the query with a ``||logic.compare (=)||`` block to compare the measured ``||input.temperature|`` with the lowest threshold value.
Change the operator to **<**.

## Define output
Complete your program by adding the output via the LED matrix and the RGB LED for the different cases.
Use the blocks ``||basic.show leds||`` and ``||basic.set LED to||``.

## Done! 👍
Click on ``|Download|`` to transfer your program to your Calliope mini.





































