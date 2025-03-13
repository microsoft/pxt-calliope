![](/static/mb/device/calliope_website.jpg)

# About

## @description A Blocks / Javascript code editor for the Calliope mini, a pocket-size computer with 5x5 display, sensors and Bluetooth.

The [Calliope mini](https://calliope.cc) is a [pocket-size computer]([/device](https://calliope.cc/en/calliope-mini/tech-facts)) with a 5x5 display of 25 LEDs, Bluetooth and sensors that can be programmed by anyone.

The Calliope mini provides an easy and fun introduction to programming and making ??? switch on, program it to do something fun ??? wear it, customize it.
Just like Arduino, the Calliope mini can additionally be connected to and interact with sensors, displays, and other devices. 

* [Read the docs](/docs)

## [Hardware: The Device](/device)

The Calliope mini is packaged with sensors, radio and other goodies. Learn about the [hardware components]([/device](https://calliope.cc/en/calliope-mini/tech-facts)) of the Calliope mini to make the most of it!

## ~ hint

**Looking to buy a Calliope mini?** See the [list of resellers](https://calliope.cc/en/shops).

## ~

## Programming: [Blocks](/blocks) or [JavaScript](/javascript)

You can program the Calliope mini using [Blocks](/blocks) or [JavaScript](/javascript) in your web browser via the [Calliope mini APIs](/reference):

```block
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("Hi!");
})
```
```typescript
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    basic.showString("Hi!");
})
```

The editor work in [most modern browsers](/browsers), work [offline](/offline) once loaded and do not require any installation. 

## [Compile and Flash: Your Program!](/device/usb)

When you have your code ready, you connect your Calliope mini to a computer via a USB cable, so it appears as a mounted drive (named MINI). If you are using the Calliope mini REV2 you also see another drive (FLASH).

Compilation to ARM thumb machine code from [Blocks](/blocks) or [JavaScript](/javascript) happens in the browser. You save the ARM binary 
program to a file, which you then copy to the Calliope mini drive, which flashes the Calliope mini device with the new program.

## Simulator: Test Your Code

You can run your code using the Calliope mini simulator, all within the confines of a web browser. 
The simulator has support for the LED screen, buttons, as well as compass, accelerometer, and digital I/O pins.

```sim
basic.forever(() => {
  basic.showString("Hi!");
})
input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Down), () => {
    led.stopAnimation();
    basic.showLeds(`
. . . . .
. # . # .
. . . . .
# . . . #
. # # # .`);
});
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Down), () => {
    led.stopAnimation();
    basic.showLeds(`
. # . # .
# . # . #
# . . . #
. # . # .
. . # . .`);
});
```

## Learn!

We have tons of [projects](/projects) and [examples](/examples) to get your started!

## C++ Runtime

The [C++ Calliope mini runtime](http://lancaster-university.github.io/microbit-docs/), created at [Lancaster University](http://www.lancaster.ac.uk/), provides access to the hardware functions of the Calliope mini, 
as well as a set of helper functions (such as displaying a number/image/string on the LED screen). 

The [Calliope mini library](/reference) mirrors the functions of the C++ library. 
When code is compiled to ARM machine code, the calls to JavaScript Calliope mini functions are replaced with calls to the corresponding C++ functions.

## [Command Line Tools](/cli)

Looking to use @homeurl@ in your favorite editor? Install the [command line tools](/cli) and get rolling!

## [Extensions](/extensions)

Create, edit and distribute your own blocks and JavaScript using [extensions](/extensions). Extensions are hosted on GitHub and may be written using C++, JavaScript and/or ARM thumb.

## [Open Source](/open-source)

The code for the Calliope mini is [open source](/open-source) on GitHub. Contributors are welcome!

```package
funk
```