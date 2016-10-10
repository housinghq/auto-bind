# react-auto-bind [![Build Status](https://travis-ci.org/housinghq/react-auto-bind.svg?branch=master)](https://travis-ci.org/housinghq/react-auto-bind)

> Automatically bind methods to their class instance. This is optimized for react. It doesn't bind render and other lifecycle methods.


## Install

```
$ npm install --save react-auto-bind
```

## Usage

```js
const autoBind = require('react-auto-bind');

class Unicorn {
	constructor(name) {
		this.name = name;
		autoBind(this);
	}
	message() {
		return `${this.name} is awesome!`;
	}
}

const unicorn = new Unicorn('Rainbow');

// grab the method off the class instance
const message = unicorn.message;

// still bound to the class instance
message();
//=> 'Rainbow is awesome!'

// without `autoBind(this)`, the above would have resulted in
message();
//=> Error: Cannot read property 'name' of undefined
```


## Related

- [bind-methods](https://github.com/sindresorhus/bind-methods) - Bind all methods in an object to itself or a specified context
- [auto-bind](https://github.com/sindresorhus/auto-bind) - Automatically bind methods to their class instance.
