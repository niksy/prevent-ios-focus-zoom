;(function ( $, window, document, undefined ) {

	var plugin = {
		name: 'preventFocusZoom',
		ns: {
			event: '.preventFocusZoom'
		},
		error: function ( message ) {
			throw new Error(plugin.name + ': ' + message);
		}
	};
	plugin.publicMethods = ['destroy'];

	var dom = {
		setup: function () {
			this.dom    = this.dom || {};
			this.dom.el = $(this.element);
		}
	};

	var events = {
		setup: function () {

			this.dom.el.on('focus' + this.instance.ens, changeViewport);
			this.dom.el.on('blur' + this.instance.ens, changeViewport);

		},
		destroy: function () {
			this.dom.el.off(this.instance.ens);
		}
	};

	var instance = {
		id: 0,
		setup: function () {
			this.instance     = this.instance || {};
			this.instance.id  = instance.id++;
			this.instance.ens = plugin.ns.event + '.' + this.instance.id;
		},
		destroy: function () {
			this.dom.el.each(function ( index, element ) {
				delete $.data(element)[plugin.name];
			});
		}
	};

	var viewport      = $('meta[name="viewport"]')[0];
	var content       = viewport.content;
	var maxScale      = ',maximum-scale=';
	var maxScaleRegex = /,*maximum\-scale\=\d*\.*\d*/;

	/**
	 * http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
	 *
	 * @param  {Object} e
	 *
	 * @return {}
	 */
	function changeViewport ( e ) {
		viewport.content = content + (e.type == 'blur' ? (content.match(maxScaleRegex, '') ? '' : maxScale + 10) : maxScale + 1);
	}

	/**
	 * @class
	 *
	 * @param {jQuery} element
	 */
	function PreventFocusZoom ( element ) {

		this.element = element;

		instance.setup.call(this);
		dom.setup.call(this);
		events.setup.call(this);

	}

	$.extend(PreventFocusZoom.prototype, {

		destroy: function () {
			events.destroy.call(this);
			instance.destroy.call(this);
		}

	});

	$.fn[plugin.name] = function ( options ) {

		/**
		 * We’re dealing with iOS only so exit early if we are on
		 * some different platform
		 */
		if ( !(/iphone|ipad|ipod/i.test(navigator.userAgent)) ) {
			return this;
		}

		if ( typeof(options) === 'string' && $.inArray(options, plugin.publicMethods) !== -1 ) {
			return this.each(function () {
				var pluginInstance = $.data(this, plugin.name);
				if ( pluginInstance ) {
					pluginInstance[options]();
				}
			});
		}

		this
			.filter(function ( index, element ) {
				return !$.data(element, plugin.name) && $(element).is('input,select,textarea');
			})
			.data(plugin.name, new PreventFocusZoom(this));

		return this;

	};

})( jQuery, window, document );
