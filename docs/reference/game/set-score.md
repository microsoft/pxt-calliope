# Set Score

Sets the current score.

```sig
game.setScore(1)
```
## Parameters

* a [number](/types/number) that represents the new score.

## Examples

This program is a simple game.
Press button ``A`` as much as possible to increase the score. 
Press ``B`` to display the score and reset the score.

```blocks
input.input.onButtonEvent(Button.B, DAL.MICROBIT_BUTTON_EVT_CLICK, () => {
    basic.showNumber(game.score())
    game.setScore(0)
})
input.input.onButtonEvent(Button.A, DAL.MICROBIT_BUTTON_EVT_CLICK, () => {
    game.addScore(1)
})
```

## See Also

[score](/reference/game/score), [add score](/reference/game/add-score), [start countdown](/reference/game/start-countdown)
