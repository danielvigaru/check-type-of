import { describe, expect, test } from '@jest/globals';
import { CheckType, TItemType } from './index';

describe('Check type property', () => {
    describe('Check numbers', () => {
        describe('Should be number', () => {
            const numbers: [string, number][] = [
                ['0o777', 0o777],
                ['0xfff', 0xfff],
                ['0b1010', 0b1010],
                ['-10', -10],
                ['0', 0],
                ['0.1', 0.1],
                ['5e3', 5e3],
                ['Number.MAX_SAFE_INTEGER', Number.MAX_SAFE_INTEGER],
                ['Number.MIN_SAFE_INTEGER', Number.MIN_SAFE_INTEGER],
                ['Number.MAX_VALUE', Number.MAX_VALUE],
                ['Number.MIN_VALUE', Number.MIN_VALUE],
                ['Number.EPSILON', Number.EPSILON],
            ];

            test.concurrent.each(numbers)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).toEqual('number');
            });
        });

        describe('Should not be number', () => {
            const notNumbers: [string, any][] = [
                ["'10'", '10'],
                ['null', null],
                ['undefined', undefined],
                ['Number.NaN', Number.NaN],
                ['Number.POSITIVE_INFINITY', Number.POSITIVE_INFINITY],
                ['Number.NEGATIVE_INFINITY', Number.NEGATIVE_INFINITY],
                ['BigInt(123)', BigInt(123)],
            ];

            test.concurrent.each(notNumbers)(
                'Value: %s',
                async (name, value) => {
                    expect(CheckType.of(value).type).not.toEqual('number');
                },
            );
        });
    });

    describe('Check strings', () => {
        describe('Should be string', () => {
            const strings: [string, string][] = [
                ["''", ''],
                ["'string'", 'string'],
                ['`template string`', `template string`],
            ];

            test.concurrent.each(strings)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).toEqual('string');
            });
        });
    });

    describe('Check objects', () => {
        describe('Should be object', () => {
            const objects: [string, object][] = [
                ['{}', {}],
                ['{ a: 1 }', { a: 1 }],
                ['new Object()', new Object()],
                ['new Object(null)', new Object(null)],
                ['new Object(undefined)', new Object(undefined)],
                ['new Object({ b: 1 })', new Object({ b: 1 })],
            ];

            test.concurrent.each(objects)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).toEqual('object');
            });
        });

        describe('Should not be object', () => {
            const notObjects: [string, any][] = [
                ['null', null],
                ['undefined', undefined],
                ['[]', []],
                ['new Array()', new Array()],
                ['new Date()', new Date()],
                ['new Map()', new Map()],
            ];

            test.concurrent.each(notObjects)(
                'Value: %s',
                async (name, value) => {
                    expect(CheckType.of(value).type).not.toEqual('object');
                },
            );
        });
    });

    describe('Check arrays', () => {
        describe('Should be array', () => {
            const arrays: [string, Array<any>][] = [
                ['[]', []],
                ['new Array()', new Array()],
            ];

            test.concurrent.each(arrays)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).toEqual('array');
            });
        });

        describe('Should not be array', () => {
            const notArrays: [string, any][] = [['new Map()', new Map()]];

            test.concurrent.each(notArrays)(
                'Value: %s',
                async (name, value) => {
                    expect(CheckType.of(value).type).not.toEqual('array');
                },
            );
        });
    });

    describe('Check date', () => {
        describe('Should be date', () => {
            const dates: [string, Date][] = [['new Date()', new Date()]];

            test.concurrent.each(dates)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).toEqual('date');
            });
        });

        describe('Should not be date', () => {
            const notDates: [string, any][] = [['Date.now()', Date.now()]];

            test.concurrent.each(notDates)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).not.toEqual('date');
            });
        });
    });

    describe('Check booleans', () => {
        describe('Should be boolean', () => {
            const booleans: [string, boolean][] = [
                ['true', true],
                ['false', false],
                ['Boolean()', Boolean()],
            ];

            test.concurrent.each(booleans)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).toEqual('boolean');
            });
        });

        describe('Should not be boolean', () => {
            const notBooleans: [string, any][] = [
                ['new Boolean()', new Boolean()],
            ];

            test.concurrent.each(notBooleans)(
                'Value: %s',
                async (name, value) => {
                    expect(CheckType.of(value).type).not.toEqual('boolean');
                },
            );
        });
    });

    describe('Check null', () => {
        describe('Should be null', () => {
            const nulls: [string, null][] = [['null', null]];

            test.concurrent.each(nulls)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).toEqual('null');
            });
        });

        describe('Should not be null', () => {
            const notNulls: [string, any][] = [['undefined', undefined]];

            test.concurrent.each(notNulls)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).not.toEqual('null');
            });
        });
    });

    describe('Check undefined', () => {
        describe('Should be undefined', () => {
            const undefineds: [string, undefined][] = [
                ['undefined', undefined],
            ];

            test.concurrent.each(undefineds)(
                'Value: %s',
                async (name, value) => {
                    expect(CheckType.of(value).type).toEqual('undefined');
                },
            );
        });

        describe('Should not be undefined', () => {
            const notUndefineds: [string, any][] = [['null', null]];

            test.concurrent.each(notUndefineds)(
                'Value: %s',
                async (name, value) => {
                    expect(CheckType.of(value).type).not.toEqual('undefined');
                },
            );
        });
    });

    describe('Check map', () => {
        describe('Should be map', () => {
            const maps: [string, Map<any, any>][] = [['new Map()', new Map()]];

            test.concurrent.each(maps)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).toEqual('map');
            });
        });

        describe('Should not be map', () => {
            const notMaps: [string, any][] = [['null', null]];

            test.concurrent.each(notMaps)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).not.toEqual('map');
            });
        });
    });

    describe('Check function', () => {
        describe('Should be function', () => {
            const functions: [string, Function][] = [
                ['() => {}', () => {}],
                ['function () {}', function () {}],
                ['function abc() {}', function abc() {}],
            ];

            test.concurrent.each(functions)(
                'Value: %s',
                async (name, value) => {
                    expect(CheckType.of(value).type).toEqual('function');
                },
            );
        });

        describe('Should not be function', () => {
            // ES5 class
            function A() {}
            A.prototype.someMethod = function () {};

            const notFunctions: [string, any][] = [
                ['ES5 class', A],
                ['ES6 class', class A {}],
            ];

            test.concurrent.each(notFunctions)(
                'Value: %s',
                async (name, value) => {
                    expect(CheckType.of(value).type).not.toEqual('function');
                },
            );
        });
    });

    describe('Check class', () => {
        describe('Should be class', () => {
            // ES5 class
            function A() {}
            A.prototype.someMethod = function () {};

            const classes: [string, any][] = [
                ['ES5 class', A],
                ['ES6 class', class A {}],
            ];

            test.concurrent.each(classes)('Value: %s', async (name, value) => {
                expect(CheckType.of(value).type).toEqual('class');
            });
        });

        describe('Should not be class', () => {
            const notClasses: [string, any][] = [
                ['() => {}', () => {}],
                ['function () {}', function () {}],
                ['function abc() {}', function abc() {}],
            ];

            test.concurrent.each(notClasses)(
                'Value: %s',
                async (name, value) => {
                    expect(CheckType.of(value).type).not.toEqual('class');
                },
            );
        });
    });

    describe('Check nullish', () => {
        describe('Should be nullish', () => {
            const nullish: [string, null | undefined][] = [
                ['null', null],
                ['undefined', undefined],
            ];

            test.concurrent.each(nullish)('Value: %s', async (name, value) => {
                let isNullish = false;
                CheckType.of(value).isNullish(() => {
                    isNullish = true;
                });
                expect(isNullish).toEqual(true);
            });
        });

        describe('Should not be nullish', () => {
            const notNullish: [string, any][] = [
                ['0', 0],
                ['false', false],
                ['{}', {}],
                ['[]', []],
            ];

            test.concurrent.each(notNullish)(
                'Value: %s',
                async (name, value) => {
                    let isNullish = false;
                    CheckType.of(value).isNullish(() => {
                        isNullish = true;
                    });
                    expect(isNullish).toEqual(false);
                },
            );
        });
    });
});

describe('Check for method overlap', () => {
    describe('Instantiable objects', () => {
        describe('new Array() is not caught by object', () => {
            test('Should not be an object', async () => {
                let type: TItemType;

                CheckType.of(new Array())
                    .isObject(() => (type = 'object'))
                    .isArray(() => (type = 'array'));

                expect(type).toEqual('array');
            });
        });

        describe('new Map() is not caught by object', () => {
            test('Should not be an object', async () => {
                let type: TItemType;

                CheckType.of(new Map())
                    .isObject(() => (type = 'object'))
                    .isMap(() => (type = 'map'));

                expect(type).toEqual('map');
            });
        });
    });

    describe('Class is not caught by function', () => {
        test('ES5 class should not be a function', async () => {
            let type: TItemType;

            function A() {}
            A.prototype.someMethod = function () {};

            CheckType.of(A)
                .isFunction(() => (type = 'function'))
                .isClass(() => (type = 'class'));
        });

        test('ES6 class should not be a function', async () => {
            let type: TItemType;

            class A {}

            CheckType.of(A)
                .isFunction(() => (type = 'function'))
                .isClass(() => (type = 'class'));
        });
    });

    describe('Function is not caught by class', () => {
        test('Arrow function should not be a class', async () => {
            let type: TItemType;

            CheckType.of(() => {})
                .isClass(() => (type = 'class'))
                .isFunction(() => (type = 'function'));
        });

        test('Anonymous function should not be a class', async () => {
            let type: TItemType;

            CheckType.of(function () {})
                .isClass(() => (type = 'class'))
                .isFunction(() => (type = 'function'));
        });

        test('Named function should not be a class', async () => {
            let type: TItemType;
            function abc() {}

            CheckType.of(abc)
                .isClass(() => (type = 'class'))
                .isFunction(() => (type = 'function'));
        });
    });
});
