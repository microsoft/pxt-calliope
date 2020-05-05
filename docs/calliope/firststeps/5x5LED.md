# ERSTE SCHRITTE: The 5X5 LED MATRIX

## Introduction @unplugged

Amongst other things, the Calliope mini comes with 25 red LEDs that can be turned on and off individually. If, for example, you wanted to display your name, you could program individual LEDs to light up in sequence so as to display the letters of your name one after the other. As this would be rather complex, you can also enter the character string into a text field and the Calliope Mini will light up the necessary LEDs in the correct order for you.

## Step 1 @fullscreen


### DISPLAYING A CHARACTER STRING
To show your chosen sting of characters on the LED matrix, select the show string block from the Basic menu. Next, drag and attach this block to the Start block in the main screen. The text contained within the inverted commas will now be displayed on the Calliope mini when the program is started.

```blocks
basic.showString("hi!")
```

## Step 2 @fullscreen

### DISPLAYING NUMBERS
If you’d prefer to show a number instead of text, replace the text block in the main screen with the show number block from the Basic menu.

```blocks
basic.showNumber(0)
```

## Step 3 @fullscreen

### DISPLAYING IMAGES
To display a heart, a smiley or even a duck on your Calliope mini, Choose the show iconn block from the Basic menu and select any number of different images by simply clicking on the picture in the block.

```blocks
basic.showIcon(IconNames.Heart)
```

## Step 4 @fullscreen

You can also create your very own images:
Just select this block from the Basic menu and click in the boxes to create your very own image.

```blocks
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
```

## Step 4 @fullscreen

Wenn du keine Pause zwischen 2 Bildern festlegst, zeigt der Calliope mini das erste Bild null Sekunden lang, also gar nicht. Den Warte ms Block findest du im Menü Kontrolle.

```blocks
basic.showIcon(IconNames.Heart)
basic.pause(100)
basic.showIcon(IconNames.Yes)
```