# on Received Message

Run part of a program when the @boardname@ receives a
message over ``radio``.

```sig
radio.onReceivedMessage(0, function() {})
```

## Parameters

* **msg**: The message to listen for. See [send message](/reference/radio/send-message)

## Examples

## Example: Broadcasting heart or skull

Sends a ``heart`` message when ``A`` is pressed, ``skull`` when ``B`` is pressed. On the side, display heart or skull for the message.

```blocks
enum RadioMessage {
    heart,
    skull
}
input.onButtonEvent(Button.A, ButtonEvent.Click, function () {
    radio.sendMessage(RadioMessage.heart)
})
input.onButtonEvent(Button.B, ButtonEvent.Click, function () {
    radio.sendMessage(RadioMessage.skull)
})
radio.onReceivedMessage(RadioMessage.heart, function () {
    basic.showIcon(IconNames.Heart)
})
radio.onReceivedMessage(RadioMessage.skull, function () {
    basic.showIcon(IconNames.Skull)
})
```

## See also

[send message](/reference/radio/send-message),

```package
radio-broadcast
```
