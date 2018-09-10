# Stop watch

Press ``A`` to start the counter. Press ``A`` again to stop and display the duration. 

```blocks
let sec = 0
let start = 0
input.onButtonPressed(Button.A, function () {
    if (!(start)) {
        start = input.runningTime()
        basic.showIcon(IconNames.Butterfly)
    } else {
        sec = input.runningTime() - start / 1000
        start = 0
        basic.clearScreen()
        basic.showNumber(sec)
    }
})
start = 0
```
