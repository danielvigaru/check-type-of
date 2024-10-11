# CheckType.of()

Because in JavaScript (almost) everything is an object.

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

| **Method**    | **Executes the callback if the item is:**    | **Will not execute if the checked item is:**     |
| ------------- | -------------------------------------------- | ------------------------------------------------ |
| `isObject`    | `{}`, instance of `Object`                   | `[]`, `new Date()`, anything but a simple object |
| `isArray`     | `[]`, instance of `Array`                    |                                                  |
| `isDate`      | instance of `Date`                           |                                                  |
| `isMap`       | instance of `Map`                            |                                                  |
| `isString`    | a string                                     |                                                  |
| `isNumber`    | a number: decimal, octal, hex, binary, float | `NaN`, `Infinity`                                |
| `isFunction`  | a function                                   |                                                  |
| `isBoolean`   | `true`, `false`                              | any value that could be coerced to a boolean     |
| `isNull`      | `null`                                       | `undefined`                                      |
| `isUndefined` | `undefined`                                  | `null`                                           |
| `isNullish`   | `null`, `undefined`                          | anything else                                    |

All of these methods have an `isNot...` counterpart which will execute if the item you check doesn't evaluate to the`is...` method with the same name.