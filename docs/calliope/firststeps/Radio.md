# FIRST STEPS: RADIO

## Introduction @unplugged

There is a Radio module built into the Calliope Mini. This allows for several Calliope mini to communicate with each other and transmit information. To try this out yourself, you will need at least two Calliope mini.


## Step 1 @fullscreen

### Allocating a channel
Firstly you must decide on a channel to use. Only those Calliope mini that are using the same channel will be able to exchange messages with each other. A Calliope mini will not be able to transmit or receive over several channels at the same time. To be able to send information, you must open the radio block and use the radio set group block.
Please ensure that the channel number you select is between 0 and 255.

## Step 2 @fullscreen

### Sending a message
To send a message you should select the "radio send string“ block. Now you can enter the string that will be sent on the channel.

## Step 3 @fullscreen

###Receive a message
Set the same channel as on the sending Calliope mini one.
Use the "on radio received receivedString“ block to look for data.
Include the "show string receivedString“ inside.
Let’s try with two (or more) Calliope mini!