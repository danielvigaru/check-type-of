import { isNumber } from './helpers';

export type TItemType =
    | 'array'
    | 'boolean'
    | 'date'
    | 'function'
    | 'map'
    | 'null'
    | 'number'
    | 'object'
    | 'string'
    | 'undefined'
    | undefined;

export class CheckType {
    private itemToCheck: unknown;

    static of(item: unknown): CheckType {
        return new CheckType(item);
    }

    constructor(item: unknown) {
        this.itemToCheck = item;
    }

    get type(): TItemType {
        let type;

        this.isObject(() => (type = 'object'))
            .isArray(() => (type = 'array'))
            .isString(() => (type = 'string'))
            .isNumber(() => (type = 'number'))
            .isFunction(() => (type = 'function'))
            .isBoolean(() => (type = 'boolean'))
            .isDate(() => (type = 'date'))
            .isNull(() => (type = 'null'))
            .isUndefined(() => (type = 'undefined'))
            .isMap(() => (type = 'map'));

        return type;
    }

    public isObject(callback: () => void): CheckType {
        if (
            typeof this.itemToCheck === 'object' &&
            this.itemToCheck?.constructor.name === 'Object'
        ) {
            callback();
        }
        return this;
    }
    public isNotObject(callback: () => void): CheckType {
        if (
            typeof this.itemToCheck !== 'object' ||
            Array.isArray(this.itemToCheck) ||
            this.itemToCheck === null
        ) {
            callback();
        }
        return this;
    }

    public isArray(callback: () => void): CheckType {
        if (Array.isArray(this.itemToCheck)) {
            callback();
        }
        return this;
    }
    public isNotArray(callback: () => void): CheckType {
        if (!Array.isArray(this.itemToCheck)) {
            callback();
        }
        return this;
    }

    public isDate(callback: () => void): CheckType {
        if (this.itemToCheck instanceof Date) {
            callback();
        }
        return this;
    }
    public isNotDate(callback: () => void): CheckType {
        if (!(this.itemToCheck instanceof Date)) {
            callback();
        }
        return this;
    }

    public isMap(callback: () => void): CheckType {
        if (this.itemToCheck instanceof Map) {
            callback();
        }
        return this;
    }
    public isNotMap(callback: () => void): CheckType {
        if (!(this.itemToCheck instanceof Map)) {
            callback();
        }
        return this;
    }

    public isString(callback: () => void): CheckType {
        if (typeof this.itemToCheck === 'string') {
            callback();
        }
        return this;
    }
    public isNotString(callback: () => void): CheckType {
        if (typeof this.itemToCheck !== 'string') {
            callback();
        }
        return this;
    }

    public isNumber(callback: () => void): CheckType {
        if (isNumber(this.itemToCheck)) {
            callback();
        }
        return this;
    }
    public isNotNumber(callback: () => void): CheckType {
        if (!isNumber(this.itemToCheck)) {
            callback();
        }
        return this;
    }

    public isFunction(callback: () => void): CheckType {
        if (typeof this.itemToCheck === 'function') {
            callback();
        }
        return this;
    }
    public isNotFunction(callback: () => void): CheckType {
        if (typeof this.itemToCheck !== 'function') {
            callback();
        }
        return this;
    }

    public isBoolean(callback: () => void): CheckType {
        if (typeof this.itemToCheck === 'boolean') {
            callback();
        }
        return this;
    }
    public isNotBoolean(callback: () => void): CheckType {
        if (typeof this.itemToCheck !== 'boolean') {
            callback();
        }
        return this;
    }

    public isNull(callback: () => void): CheckType {
        if (this.itemToCheck === null) {
            callback();
        }
        return this;
    }
    public isNotNull(callback: () => void): CheckType {
        if (this.itemToCheck !== null) {
            callback();
        }
        return this;
    }

    public isUndefined(callback: () => void): CheckType {
        if (this.itemToCheck === undefined) {
            callback();
        }
        return this;
    }
    public isNotUndefined(callback: () => void): CheckType {
        if (this.itemToCheck !== undefined) {
            callback();
        }
        return this;
    }

    public isNullish(callback: () => void): CheckType {
        if (this.itemToCheck === null || this.itemToCheck === undefined) {
            callback();
        }
        return this;
    }
    public isNotNullish(callback: () => void): CheckType {
        if (this.itemToCheck !== null && this.itemToCheck !== undefined) {
            callback();
        }
        return this;
    }
}
