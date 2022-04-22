# UART Write Line

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

The [Bluetooth UART service](/reference/bluetooth/start-uart-service) allows another device such as a smartphone to exchange any data it wants to with the @boardname@, in small chunks. 

With the Bluetooth UART service running, this block allows a @boardname@ to send a line of text to a Bluetooth connected device.

```sig
bluetooth.uartWriteLine("");
```

## Example: Starting the Bluetooth UART service and then sending "HELLO" whenever button A is pressed and another device has connected over Bluetooth

```blocks
let connected = 0;
bluetooth.onBluetoothConnected(() => {
    basic.showString("C");
    connected = 1;
});
bluetooth.onBluetoothDisconnected(() => {
    basic.showString("D");
    connected = 0;
});
input.onButtonEvent(Button.A, ButtonEvent.Down, () => {
    if (connected == 1) {
        bluetooth.uartWriteLine("HELLO");
    }
});
```

## Video - UART service guessing game

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Advanced
 
For more advanced information on the @boardname@ Bluetooth UART service including information on using a smartphone, see the [Lancaster University @boardname@ runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
