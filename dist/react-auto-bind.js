/* global define, window */

'use strict';

var exclude = ['render', 'componentWillReceiveProps', 'componentDidMount', 'componentDidUpdate', 'componentDidCatch', 'shouldComponentUpdate', 'componentWillUnmount', 'componentWillUpdate', 'forceUpdate', 'componentWillMount'];

var reactAutoBind = function reactAutoBind(self) {
	for (var _len = arguments.length, bindOnly = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		bindOnly[_key - 1] = arguments[_key];
	}

	(bindOnly.length && bindOnly || Object.getOwnPropertyNames(self.constructor.prototype)).forEach(function (key) {
		var val = self[key];

		if (key !== 'constructor' && typeof val === 'function') {
			if (exclude.indexOf(key) === -1) {
				self[key] = val.bind(self);
			}
		}
	});

	return self;
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = reactAutoBind;
} else if (typeof define === 'function' && define.amd) {
	// Register as 'react-auto-bind', consistent with npm package name
	define('react-auto-bind', [], function () {
		return reactAutoBind;
	});
} else {
	window.reactAutoBind = reactAutoBind;
}
