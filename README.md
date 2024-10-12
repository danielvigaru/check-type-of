# CheckType.of()

Work in Progress

## Why did I make this?

Because in JavaScript (almost) everything is an object:

```javascript
typeof {}; // 'object' - totally agree
typeof []; // 'object' - are you sure?
typeof new Date(); // 'object' - ok, kind of makes sense because class instances are objects in JS, but it's useless
typeof null; // 'object' - what?
typeof undefined; // 'undefined' - finally something normal
typeof NaN; // 'number' - how? it's in the name
```

And to add more complex type checking:

```javascript
// ES6 class
typeof class A {}; // 'function'
CheckType.of(A).type; // 'class'

// ES5 class
function B() {}
B.prototype.someMethod = function () {};
typeof B; // 'function'
CheckType.of(B).type; // 'class'

// Don't worry, these still work as expected:
CheckType.of(() => {}).type; // 'function'
CheckType.of(function () {}).type; // 'function'
```

## Usage / Examples

Import the `CheckType` class, but do not instantiate it, just use `CheckType.of(item)` to access all the methods.

```javascript
import { CheckType, TItemType } from 'check-type-of';
```

### Using the `type` property

Get the type of an item by accessing the `type: TItemType` property:

```javascript
CheckType.of(new Date()).type; // -> 'date'
```

See how it says `'date'` and not `'object'`? Yeah.

```javascript
typeof new Date(); // -> 'object'
```

### Using the `is...` and `isNot...` methods

These receive a callback as a parameter and execute it if the item you're checking evaluates to that type. You can chain multiple `is...` methods.

1. Use the `is...` and `isNot...` counterpart of a method like you would use an if/else statement:

```javascript
CheckType.of(new Date())
    .isDate(() => console.log("Looks like we've got ourselves a date!"))
    .isNotDate(() => console.log('This is anything but a date'));

// Output: "Looks like we've got ourselves a date!"
```

Note: You can't chain multiple `isNot...` methods, because you shouldn't. It would just fire most of them every time.

2. Use multiple methods like you would use a switch statement:

```javascript
CheckType.of(someUnknownVariable)
    .isNumber(() => console.log("'It's a number"))
    .isDate(() => console.log("Looks like we've got ourselves a date!"))
    .isArray(() => console.log("['A', 'r', 'r', 'a', 'y']"));
```

## Method Reference

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

All of these methods have an `isNot...` counterpart which will execute if the item you check doesn't evaluate to the `is...` method with the same name.

\* Comodity method that doesn't write a value on the `.type` property.
