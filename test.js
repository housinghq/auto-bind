import test from 'ava';
import m from './';

test(t => {
	let bounded;

	class Unicorn {
		constructor(name) {
			this.name = name;
			bounded = m(this);
		}
		message() {
			return `${this.name} is awesome!`;
		}
	}

	const unicorn = new Unicorn('Rainbow');
	t.is(bounded, unicorn);

	const message = unicorn.message;
	t.is(message(), 'Rainbow is awesome!');
});

test('Ignore React Lifecycle Components', t => {
	class ReactComponent {
		constructor() {
			m(this);
		}
		forceUpdate() {
			// This should never be bound.
			// Its bad practice to pass forceUpdate as a callback.
		}
	}

	const component = new ReactComponent();
	const forceUpdate = component.forceUpdate;

	t.is(forceUpdate, ReactComponent.prototype.forceUpdate);
});

test('bindOnly', t => {
	class Griffin {
		constructor(name) {
			this.name = name;
			m(this, 'amaze', 'forceUpdate');
		}
		amaze() {
			return `${this.name} is amazing!`;
		}
		message() {
			return `${this.name} is undefined!`;
		}
		forceUpdate() {

		}
	}

	const buckbeak = new Griffin('Buckbeak');

	const amaze = buckbeak.amaze;
	t.is(amaze(), 'Buckbeak is amazing!');

	const message = buckbeak.message;
	t.is(message, Griffin.prototype.message);

	// Should not bind forceUpdate even if passed.
	const forceUpdate = buckbeak.forceUpdate;
	t.is(forceUpdate, Griffin.prototype.forceUpdate);
});
