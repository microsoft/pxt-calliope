# FIRST STEPS: INPUTS

## Introduction @unplugged

So far all the programmed text, numbers and images have been displayed on the LED matrix immediately after being loaded onto the Calliope mini. However, if you would prefer to have an event take place after a specific input, you need to use the one of the main blocks from the Input section. In this case we are using the "on button A pressed“ block. By using this block, the Calliope mini will wait until your chosen condition is met before anything is displaying.

## Step 1 @fullscreen

### Buttons
The Calliope mini has two input buttons: Button A (in red) and Button B (in blue). When one of the buttons is pressed, the circuit is completed.
By using the "on button A pressed“ block from Input, you can display your output as soon as button A has been pressed.

## Step 2 @fullscreen

### Shake
You can request the position and movement of the Calliope mini and run an action once a change of the values has been detected.
Use the "on shake“ block from the Input section. Add an "show string Hi!" block from the Basic section and change the content of the string.Your text will be displayed when you shake the Calliope mini. The gesture can be changed by using the dropdown menu to choose the condition.

## Step 3 @fullscreen

### Pins
The Calliope mini has five rounded corners: -, +, 0 , 1, 2, and 3. If you place one finger on the – corner and another finger on one of the numbered corners, a small electrical current will flow through your body and back to the Calliope mini, thus closing the electrical circuit.

Use the „on pin Pin0 pressed" block from Input. Use the "show string Hi!" block from the basic section.
Your text will be displayed when pin – and pin 0 are both pressed at the same time.

## Step 4 @fullscreen

### Various input
You can program the Calliope mini to respond to more than one input. There are two possible ways of doing this:
You can use indiviual events separated from each other with different actions to run after that condition is met.
Nevertheless, you can also use an "if" or "while" condition (from the Logic and Loops sections) and wait for your inputs to be met.