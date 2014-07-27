;(function ( $, window, document, undefined ) {

	function preventFocusZoom () {

		// We’re dealing with iOS only so exit early if we are on
		// some different platform
		if ( !(/iphone|ipad|ipod/i.test(navigator.userAgent)) ) {
			return;
		}

		var d = document;
		var viewport;
		var content;
		var maxScale = ',maximum-scale=';
		var maxScaleRegex = /,*maximum\-scale\=\d*\.*\d*/;

		// This should be a focusable DOM Element
		if (!this.addEventListener || !d.querySelector) {
			return;
		}

		viewport = d.querySelector('meta[name="viewport"]');
		content = viewport.content;

		function changeViewport (event) {
			// http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
			viewport.content = content + (event.type == 'blur' ? (content.match(maxScaleRegex, '') ? '' : maxScale + 10) : maxScale + 1);
		}

		// We could use DOMFocusIn here, but it's deprecated.
		this.addEventListener('focus', changeViewport, true);
		this.addEventListener('blur', changeViewport, false);

	}

	$.fn.preventFocusZoom = function () {
		return this.each(preventFocusZoom);
	};

})( jQuery, window, document );
