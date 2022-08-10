# Button event

Returns the ID of one of these button event types:
* Pressed Down (1)
* Released Up (2)
* Clicked (3)
* Long clicked (4)
* Hold (5)

This block can be used to define the event type in [on button event](input/on-button-event) and [on pin event](input/on-pin-event).

Note, that by pressing a Button multiple events can raise at the same moment:

| # | User input               | Event raised |
|---|--------------------------|--------------|
| 1 | Press A down             | A.Down       |
| 2 | Hold A for > 1.5 seconds | A.Hold       |
| 3 | release A                | A.Up         |
|   |                          | A.LongClick  |

| # | User input   | Event raised |
|---|--------------|--------------|
| 1 | Press A down | A.Down       |
| 2 | Press B down | B.Down       |
| 3 |              | A+B.Down     |
|   | Release A up | A.Up         |
|   |              | A+B.Up       |
|   |              | A+B.Click    |
|   | Release B up | B.Up         |

* Every Up-Event will always be followed by either a Click- OR Long-Click-Event, depending on how long the Down-Event has been ago.

## Pressed Down

* For button `A` or `B`: This handler works when the button is pushed down.
* For `A` and `B` together: This handler works when `A` and `B` are both pushed down, at the moment the second button is pressed.

## Released Up

* For button `A` or `B`: This handler works when the button is released up.
* For `A` and `B` together: This handler works at the moment the first button is released up while `A` and `B` are both pushed down.

## Clicked

* For button `A` or `B`: This handler works when the button is pushed down and released within 1 second.
* For `A` and `B` together: This handler works when `A` and `B` are both pushed down, then one of them is released within 1.5 seconds of pushing down the second button.

## Long clicked

* For button `A` or `B`: This handler works when the button is pushed down and released after more than 1 second.
* For `A` and `B` together: This handler works when `A` and `B` are both pushed down, then one of them is released after more than 1.5 seconds after pushing down the second button.
  
## Hold

* For button `A` or `B`: This handler works when the button is pushed down and hold for 1 second.
* For `A` and `B` together: This handler works when `A` and `B` are both pushed down and hold for 1.5 seconds after pushing down the second button.

**This is an advanced API.**  For more information, see the
[@boardname@ runtime messageBus documentation](https://lancaster-university.github.io/microbit-docs/ubit/messageBus/).

## See also
[on button event](input/on-button-event), [on pin event](input/on-pin-event)