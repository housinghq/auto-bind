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

module.exports = function (self) {
	Object.getOwnPropertyNames(self.constructor.prototype).forEach(function (key) {
		var val = self[key];

		if (key !== 'constructor' && typeof val === 'function') {
			if (exclude.indexOf(key) === -1) {
				self[key] = val.bind(self);
			}
		}
	});
};
