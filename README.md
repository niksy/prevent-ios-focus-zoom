# Prevent iOS focus zoom

iOS zooms on form element focus. This script prevents that behavior.

Original script by [@zachleat](https://github.com/zachleat) ([Gistfile](https://gist.github.com/zachleat/2008932)).

## Usage

### jQuery

```javascript
$('input:text, select, textarea').preventFocusZoom();
```

### Vanilla JS

```javascript
preventFocusZoom.call(document.getElementsByTagName('input')[0]);
```

## Installation

Distribution files are in `dist` folder.

### Using [Bower](http://bower.io)?

```bash
bower install niksy/prevent-ios-focus-zoom
```
