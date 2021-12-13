# Tailwind CSS Breakpoints Inspector
A Tailwind CSS plugin that shows the currently 'active' responsive breakpoint.

<img src="https://github.com/Hounddd/tailwindcss-breakpoints-inspector/raw/master/screenshot.gif" width="100%">

## Install

Requires **Tailwind v2.0** or higher but it should work for **Tailwind v1.0** too (not tested).

1. Install the plugin:

```bash
npm install tailwindcss-breakpoints-inspector --save-dev
```

2. Add it to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  //...
  plugins: [
    require('tailwindcss-breakpoints-inspector'),
  ]
}
```

## Usage

Just run build tools and voila!
No extra markup, no external ressources.

**Indicator is only visible during development.**

Uner the hood we use svg for Tailwind logo and inspector render. 🤩

## Customization

You can customize this plugin in the `theme.breakpointsInspector` section of your `tailwind.config.js` file.


#### Position

The first item of the position configuration array can be `top` or `bottom`, the second item can be `left` or `right`.

```js
// tailwind.config.js
module.exports = {
  theme: {
    breakpointsInspector: {
      position: ['bottom', 'left'],
    },
  },
  plugins: [
    require('tailwindcss-breakpoints-inspector'),
  ],
}
```

#### Styles

Take a look at the [index.js](index.js) file to see all the default styles.

```js
// tailwind.config.js
module.exports = {
  theme: {
    breakpointsInspector: {
      style: {
        backgroundColor: '#323232;',
        color: '#9e9e9e',
        // ...
      },
    },
  },
  plugins: [
    require('tailwindcss-breakpoints-inspector'),
  ],
}
```

#### Prefix

Modify the debug label prefix with the `prefix` configuration option.

```js
// tailwind.config.js
module.exports = {
  theme: {
    breakpointsInspector: {
      prefix: 'My breakpoint is ',
    },
  },
  plugins: [
    require('tailwindcss-breakpoints-inspector'),
  ],
}
```
In this case we recommand to adjust the svg width with `theme.breakpointsInspector.width` setting.

#### Ignore screens

To ignore a specific screen (for instance [dark mode](https://v1.tailwindcss.com/docs/breakpoints#dark-mode) in v1), add the screen name to the `ignore` configuration array.
The Tailwind v1 `dark` screen is ignored by default.

```js
// tailwind.config.js
module.exports = {
  theme: {
    breakpointsInspector: {
      ignore: ['dark'],
    },
  },
  plugins: [
    require('tailwindcss-breakpoints-inspector'),
  ],
}
```
---
### Ideas
This plugin is inspired by
[Jon Sugar gist](https://gist.github.com/jonsugar/6bce22bd7d3673294caad36046c2b7cb) and [Joren Van Hee plugin](https://github.com/jorenvanhee/tailwindcss-debug-screens)
