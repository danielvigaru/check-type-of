# CheckType.of()

[![CI](https://github.com/danielvigaru/check-type-of/actions/workflows/node.js.yml/badge.svg)](https://github.com/danielvigaru/check-type-of/actions/workflows/node.js.yml)
[![npm](https://img.shields.io/badge/npm-FFF?style=flat&logo=npm&logoColor=fff&color=CB3837)](https://www.npmjs.com/package/@danielvigaru/check-type-of)
[![bundlephobia](https://img.shields.io/bundlephobia/min/%40danielvigaru%2Fcheck-type-of%40latest)](https://bundlephobia.com/package/@danielvigaru/check-type-of@latest)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=flat&logo=ko-fi&logoColor=white&color=D34F4C)](https://ko-fi.com/Y8Y1DZBZU)

## Why did I create this?

Because in JavaScript, (almost) everything is an object:

```javascript
typeof {}; // -> 'object' - totally agree
typeof []; // -> 'object' - are you sure?
typeof new Date(); // -> 'object' - ok, kind of makes sense because class instances are objects in JS, but it's useless
typeof null; // -> 'object' - what?
typeof undefined; // -> 'undefined' - finally something normal
typeof NaN; // -> 'number' - how? it's in the name
```

And to add more complex type checking:

```javascript
// ES6 class
class A {}
typeof A; // -> 'function'
CheckType.of(A).type; // -> 'class'

// ES5 class
function B() {}
B.prototype.someMethod = function () {};
typeof B; // -> 'function'
CheckType.of(B).type; // -> 'class'

// Don't worry, these still work as expected:
CheckType.of(() => {}).type; // -> 'function'
CheckType.of(function () {}).type; // -> 'function'
```

## Usage / Examples

Import the `CheckType` class without instantiating it; just use `CheckType.of(item)` to access all the methods.

```javascript
import { CheckType, TItemType } from '@danielvigaru/check-type-of';
```

### Using the `type` property

Get the type of an item by accessing the `type: TItemType` property:

```javascript
typeof []; // -> 'object'
CheckType.of([]).type; // -> 'array'
```

See how it says `'array'` and not `'object'`? Yeah.

### Using the `is...` and `isNot...` methods

These methods take a callback as a parameter and execute it if the item being checked matches the specified type. You can chain multiple `is...` methods.

1. Use `is...` and `isNot...` methods like you would use if/else statements:

```javascript
CheckType.of(new Date())
    .isDate(() => console.log("Looks like we've got ourselves a date!"))
    .isNotDate(() => console.log('This is anything but a date'));

// Output: "Looks like we've got ourselves a date!"
```

Note: You can't chain multiple `isNot...` methods because it wouldn't make sense; it would execute all/most of them each time.

2. Chain multiple methods like you would in a switch statement:

```javascript
CheckType.of(someUnknownVariable)
    .isNumber(() => console.log("'It's a number"))
    .isDate(() => console.log("Looks like we've got ourselves a date!"))
    .isArray(() => console.log("['A', 'r', 'r', 'a', 'y']"));
```

## Method Reference

All of these methods have an `isNot...` counterpart.

| **Method**    | **Executes the callback if the item is:**    | `.type` property |
| ------------- | -------------------------------------------- | ---------------- |
| `isArray`     | `[]`, instanceof `Array`                     | `'array'`        |
| `isBoolean`   | `true`, `false`                              | `'boolean'`      |
| `isClass`     | ES5 class, ES6 class                         | `'class'`        |
| `isDate`      | instanceof `Date`                            | `'date'`         |
| `isFunction`  | a function that isn't an ES5 class           | `'function'`     |
| `isMap`       | instanceof `Map`                             | `'map'`          |
| `isNull`      | `null`                                       | `'null'`         |
| `isNullish`\* | `null`, `undefined`                          | -                |
| `isNumber`    | a number: decimal, octal, hex, binary, float | `'number'`       |
| `isObject`    | `{}`, instanceof `Object`                    | `'object'`       |
| `isString`    | a string                                     | `'string'`       |
| `isUndefined` | `undefined`                                  | `'undefined'`    |

\* Utility method that does not assign a value to the `.type` property.
