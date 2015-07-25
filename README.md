# Quick Intro

## W(hy)TF?

_SCSS-Palette_ is part of an exercise to learn SCSS (SASS) and Jade.  I wanted to dynamically define my project's palette (and see the results), and ended up utilizing the internal scripting of both languages.

## What's SCSS-Palette good for?

Maybe nothing but my own edification.  For you it might...

* Provide a dynamic palette for a website (if you're using SCSS)
* Be an example of SCSS and Jade scripting of medium complexity
* Serve as a simple example of using NPM for you build system ([inspired by this post](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/))

# Quick Start

__Skipping all the hoohaw, here are the steps to see this in action:__

After you 'git' this repo...

`$ npm install`

`$ npm run build`

`$ open html/palette.html`

__To customize and use__

Customize the colors in the `$colors` SCSS map at the top of `scss/_palette.scss`.
```sass
$colors: (
  primary: #9ea12b,
  secondary: #1d731d
);
```

Import `scss/_palette.scss` into your scss: `@import '_palette.scss';`.  Then build your app.

There are two ways you can use the results:

_Call the `color()` function directly, passing in one of your color keys plus none or more alterations:_

```sass
.button { background: color(primary); }
.button-disabled { background: color(primary-dk30); }
```

_And/or Use the generated classes_

...in you SASS/SCSS

```sass
.button { @extend .clr-primary; }
.button-disabled { @extend .clr-primary-dk30; }
```

...or, directly in your HTML

```html
<div class="clr-primary">Color me primary!</div>
<div class="clr-primary-dk30">A dark, dark shade of primary.</div>
```

__And a quick rundown of the moving parts:__

`package.json` - Node.js packages - _but also build scripts!_

`scss/_palette.scss` - The magic partial.  Where the `color()` SCSS function is defined, plus some SCSS scritping to generate a bunch of handy (optional use) classes.

`scss/palette.scss` - Stylings for the HTML show-off page utilizing the `_palette.scss` partial.

`jade/palette.jade` - Source for the page that shows off the resulting palette (and a lot of its alterations).  Uses Jade scripting.

`npm/sass.js` and `npm/jade.js` - Node scripts called by NPM for building the SCSS and Jade files respectively.  Look at the `scripts` section of `package.json` to see the calls.

__And what you get after you build:__

`css/palette.css` - The results of crunching `_palette.scss` and `palette.scss` together (using node-sass).

`html/palette.html` - Where it all comes together. The resultant page from transpiling `palette.jade`

# Miscellania

In quasi-particular order...

* The alterations include a set of three lightening and three for darkening a target color in 10% increments: `lt10`, `lt20`,`lt30`,`dk10`,`dk20`, and `dk30`.
* The `-comp` alteration (the complement of the target color) is treated like another color for purposes of generating color classes and by `jade/palette.jade`.
* The generated color classes include a set that end in `-con` (for example: `clr-primary-lt20-con`).  In addition to the background color, these define a foreground color that is either black or white depending on which one provides more contrast with the background color.  Look at text inside the color boxes of `html/palette.html` to see it in action.
* Don't use hypens in your color keys.  It'll screw up the alterations detection logic.
* `_palette.scss` partial has a `$pre` var that defines the string prepended to the generated color classes.  Change it or set it to empty (`$pre: ""`) as you see fit.
* The `$alters` only work with SCSS color functions with a signature of two parameters: the first being the color key and the second being whatever second parameter the function requires.  IOW, color function needing three or more params won't work.  Yet.
* `jade/palette.jade` has Jade variables that correspond to the `$color` and `$alters` at the top of `scss/_palette.scss`.  They must be kept in sync manually with their `_palette.scss` counterparts for `palette.jade` to work properly.  (I haven't figured out a way to do this programitically).
