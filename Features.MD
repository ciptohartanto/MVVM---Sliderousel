# Features - Mixins

## Mixin - Flexbox

`+flexbox($arg)` allows adding preset flexbox into the styling. Please refer to __Arguments__ to see learn what Flexbox mixin can do.

Params:
- `$arg` => string

Arguments:
- 'v-center-h-center' => puts content to the center horizontally and vertically,
- 'v-center-h-top'    => puts content vertically to the center and to the top horizontally,
- 'v-center-h-left'   => puts content to the center vertically and to the left horizontally,
- 'v-center-h-right'  => puts content to the center vertically and to the right horizontally,
- 'v-center-h-spaceB' => puts content in the center vertically and distribute content with space between horizontally,
- 'v-top-h-center'    => puts content vertically to the top and  to the center horizontally. This doesn't put your content in the center of and top of your canvas, you could consider  v-center-h-center,
- 'v-top-h-left'      => puts content to the top vertically and to the left horizontally

How to use:
```sass
.example
  +flexbox('v-center-h-center)
```

## Mixin - breakpoint

`+breakpoint($bp)` allows including any of the mediaqueries into Sass. Please check __How to Use__ to learn how to use it and add related styling to this mixin.

Params:
- `$bp` => string

Arguments:
- 'mobile'  => by default it's max-width: 767px,
- 'tablet'  => by default it's between 768px and 1359px,
- 'desktop' => by default it's min-width: 1360px,

How to use:
```sass
.example
  +breakpoint('mobile)
    margin-top: 0
```

## Mixin - lastChildMargin

`+lastChildMargin($type, $direction, $amount)` shortens Sass code by automatically set the `:last-child` to have zero padding / margin.

Params:
- `$type` => string
- `$direction` => string
- `$amount` => string

Arguments:
- `$type` = ['padding', 'margin'],
- `$direction` = ['top', 'right', 'bottom', 'left'],
- `$amount` = 0px (or any number with any unit),


How to use:
```sass
.example
  &-list
  &-item
    +lastChildMargin(padding,bottom,10px)
```