# send String

Sends a string to other @boardname@s in the area connected by radio. The
maximum string length is 19 characters.

```sig
radio.sendString("hi!")
```

## Parameters

* **msg**: a [string](/types/string) to send by radio.

## ~ hint

Watch this video to see how the radio hardware works on the @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

## Example: Two-way radio

If you load this program onto two or more @boardname@s, you can send a
code word from one of them to the others by pressing button `A`.  The
other @boardname@s will receive the code word and then show it.

```blocks
input.onButtonEvent(Button.A, ButtonEvent.Click, () => {
    radio.sendString("Codeword: TRIMARAN")
    basic.showString("SENT");
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString);
})
```

## ~hint

A radio that can both transmit and receive is called a _transceiver_.

## ~

## See also

[on received string](/reference/radio/on-received-string)

```package
radio
```