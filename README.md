# prevent-ios-focus-zoom

iOS zooms on form element focus. This script prevents that behavior.

Original script by [@zachleat](https://github.com/zachleat) ([Gistfile](https://gist.github.com/zachleat/2008932)).

## Installation

```sh
bower install niksy/prevent-ios-focus-zoom
```

## API

### `Element.preventFocusZoom([destroy])`

Returns: `jQuery`

#### destroy

Destroy plugin instance.

## Examples

Run on default form elements.

```javascript
$('input:text, select, textarea').preventFocusZoom();
```

Destroy plugin instance.

```javascript
$('input:text, select, textarea').preventFocusZoom('destroy');
```

## Browsers

Tested in IE8+ and all modern browsers.

## License

[Zach Leatherman](http://www.zachleat.com/web/)

Transfered to proper repo by [Ivan Nikolić](http://ivannikolic.com).
