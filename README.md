![Deprecated project](https://img.shields.io/badge/status-deprecated-red.svg)

**This project is deprecated.**

[Apple removed ability to prevent zoom in recent iOS versions](https://mobile.twitter.com/thomasfuchs/status/742531231007559680/photo/1), so changes applied with this module no longer work.

There are several approaches to adjust to this behavior:

* Increase form element font size. This is self-explanatory—your users will definitely have benefits from that. If your design doesn’t allow that, talk to your designers. iOS default font size is there for a reason.
* If you can’t increase font size, you can set it to normal value only on iOS 9+ Safari with this CSS code:

```css
@supports (font:-apple-system-body) and (-webkit-touch-callout:none) and (-webkit-tap-highlight-color:hotpink) {
	input, textarea {
		font-size: initial;
	}
}
```

This "hack" is not guaranteed to work in the future so beware.

---

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
