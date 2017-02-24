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

module.exports = self => {
	for (const key of Object.getOwnPropertyNames(self.constructor.prototype)) {
		const val = self[key];

		if (key !== 'constructor' && typeof val === 'function') {
			if (exclude.indexOf(key) === -1) {
				self[key] = val.bind(self);
			}
		}
	}

	return self;
};
