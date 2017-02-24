'use strict';

var exclude = [
	'render',
	'componentWillReceiveProps',
	'componentDidMount',
	'componentDidUpdate',
	'shouldComponentUpdate',
	'componentWillUnmount',
	'componentWillUpdate',
	'forceUpdate',
	'componentWillMount'
];

function reactAutoBind (self, ...bindOnly) {
	((bindOnly.length && bindOnly) || Object.getOwnPropertyNames(self.constructor.prototype))
	.forEach(function (key) {
		const val = self[key]

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
	// register as 'react-auto-bind', consistent with npm package name
	define('react-auto-bind', [], function () {
		return reactAutoBind;
	});
} else {
	window.reactAutoBind = reactAutoBind;
}
