# On Button Event

Start an [event handler](/reference/event-handler) (part of the program that will run when something happens, like when a button is pressed).
This handler works when button `A` or `B` is clicked, or `A` and `B` together. You can choose another event type by using 
the [button event block](/reference/input/button-event). Possible event types are `pressed down` (1), `released up` (2), `clicked` (3), `long clicked` (4) or `hold` (5).

When you are using this function in a web browser, click the buttons on the screen instead of the ones
on the @boardname@.

* For button `A` or `B`: This handler works when the button is pushed down and released within 1 second.
* For `A` and `B` together: This handler works when `A` and `B` are both pushed down, then one of them is released within 1.5 seconds of pushing down the second button.

```sig
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {})
```

Find out how buttons provide input to the @boardname@ in this video:

https://www.youtube.com/watch?v=t_Qujjd_38o

## Example: count button clicks

This example counts how many times you press the `A` button.
Each time you press the button, the [LED screen](/device/screen) shows the `count` variable getting bigger.

```blocks
let count = 0
basic.showNumber(count)
input.onButtonEvent(Button.A, input.buttonEventClick(), () => {
    count++;
    basic.showNumber(count);
})
```

## Example: roll dice

This example shows a number from 1 to 6 when you press the `B` button.

```blocks
input.onButtonEvent(Button.B, input.buttonEventClick(), () => {
    let dice = randint(0, 5) + 1
    basic.showNumber(dice)
})
```

## ~hint

This program adds a `1` to `random(5)` so the numbers on the dice will come out right.
Otherwise, sometimes they would show a `0`.

## ~

## See also

[button is pressed](/reference/input/button-is-pressed), [forever](/reference/basic/forever), [random](/blocks/math), [button event block](/reference/input/button-event)

