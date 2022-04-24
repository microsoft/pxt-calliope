# Smiley Buttons

## Introduction @unplugged

Code the buttons on the @boardname@ to show that it's happy or sad.
(Want to learn how the buttons works? [Watch this video](https://youtu.be/t_Qujjd_38o)).

![Pressing the A and B buttons](/calliope/tutorials/03_smiley_button_animation.gif)

## Step 1 @fullscreen

Place a ``||input:on button pressed||`` block to run code when button **A** is pressed.

```blocks
input.onButtonEvent(Button.A, ButtonEvent.Click, () => { 
});
```

## Step 2 @fullscreen

Place a ``||basic:show leds||`` block inside ``||input:on button pressed||`` to display a smiley on the screen. Press the **A** button in the simulator to see the smiley.

```blocks
input.onButtonEvent(Button.A, ButtonEvent.Click, () => { 
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .`
        );
});
```

## Step 3 @fullscreen

Add ``||input:on button pressed||`` and ``||basic:show leds||`` blocks to display a frowny when button **B** is pressed.

```blocks
input.onButtonEvent(Button.B, ButtonEvent.Click, () => { 
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #`
        );
});
```

## Step 4 @fullscreen

Add a secret mode that happens when **A** and **B** are pressed together. For this case, add multiple ``||basic:show leds||`` blocks to create an animation.

```blocks
input.onButtonEvent(Button.AB, ButtonEvent.Click, () => {
    basic.showLeds(`
        . . . . .
        # . # . .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . # . #
        . . . . .
        # . . . #
        . # # # .
        `)    
})
```

## Step 5

If you have a @boardname@, connect it to USB and click ``|Download|`` to transfer your code. Press button **A** on your @boardname@. Try button **B** and then **A** and **B** together.

## Step 6

Nice! Now go and show it off to your friends!

