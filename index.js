/* global define, window */

'use strict';

const exclude = [
	'render',
	'componentWillReceiveProps',
	'componentDidMount',
	'componentDidUpdate',
	'componentDidCatch',
	'shouldComponentUpdate',
	'componentWillUnmount',
	'componentWillUpdate',
	'forceUpdate',
	'componentWillMount'
];

const reactAutoBind = (self, ...bindOnly) => {
	((bindOnly.length && bindOnly) || Object.getOwnPropertyNames(self.constructor.prototype))
	.forEach(key => {
		const val = self[key];

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
	define('react-auto-bind', [], () => reactAutoBind);
} else {
	window.reactAutoBind = reactAutoBind;
}
