# Images

Create, show, and scroll images on the LED display.

```cards
images.createImage(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
`);
images.createBigImage(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
`);
images.createImage(``).showImage(0);
images.createImage(``).scrollImage(0,0);
images.iconImage(IconNames.Heart)
```

## See Also

[createImage](/reference/images/create-image), [createBigImage](/reference/images/create-big-image),
[showImage](/reference/images/show-image), [scrollImage](/reference/images/scroll-image),
[iconImage](/reference/images/icon-image), 
[pixel](/reference/images/pixel), [set-pixel](/reference/images/set-pixel)
