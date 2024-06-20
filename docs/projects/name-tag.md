# Name Tag

## Turn your micro:bit into a digital name tag @unplugged

See your name in 💡 lights! 💡  Code the micro:bit to scroll your name across the screen.

![Name scrolling on the LEDs](/static/calliope/tutorials/02_nametag_animation.gif)

## {Step 1}

Click on the ``||basic:Basic||`` category in the Toolbox. 
Drag a ``||basic:show string||`` block into the ``||basic:forever||`` block. 
Then in the ``||basic:show string||`` block, change the text from "Hello!" to your name.

```blocks
basic.forever(function() {
    basic.showString("Emma");
})
```

## {Step 2}

Look at the @boardname@ simulator on the screen. Do you see your name scrolling across? ⭐ Great job! ⭐ You've turned the @boardname@ into a digital name tag!

![Name scrolling on the LEDs](/static/calliope/tutorials/02_nametag_animation.gif)

## {Step 3}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@ and watch your name appear in lights! 

## {Step 4}

Go further - try adding more ``||basic:show string||`` blocks to create a story! Learn more about how the @boardname@ lights work by watching [this video](https://youtu.be/qqBmvHD5bCw).

```blocks
basic.forever(() => {
    basic.showString("Emma");
    basic.showString("<3<3<3");
})
```

```template
basic.forever(function() {})
```