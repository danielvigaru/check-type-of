import { isNumber } from './helpers';

export type TItemType =
    | 'number'
    | 'string'
    | 'object'
    | 'array'
    | 'function'
    | 'boolean'
    | 'date'
    | 'null'
    | 'undefined'
    | undefined;

export class CheckType {
    private itemToCheck: unknown;
    public type: TItemType;

    static of(item: unknown): CheckType {
        return new CheckType(item);
    }

    constructor(item: unknown) {
        this.itemToCheck = item;
        this.type = this.getType();
    }

    private getType(): TItemType {
        let type;

        this.isObject(() => (type = 'object'))
            .isArray(() => (type = 'array'))
            .isString(() => (type = 'string'))
            .isNumber(() => (type = 'number'))
            .isFunction(() => (type = 'function'))
            .isBoolean(() => (type = 'boolean'))
            .isDate(() => (type = 'date'))
            .isNull(() => (type = 'null'))
            .isUndefined(() => (type = 'undefined'));

        return type;
    }

    isObject(callback: () => void): CheckType {
        if (
            typeof this.itemToCheck === 'object' &&
            this.itemToCheck?.constructor.name === 'Object'
        ) {
            callback();
        }
        return this;
    }
    isNotObject(callback: () => void): CheckType {
        if (
            typeof this.itemToCheck !== 'object' ||
            Array.isArray(this.itemToCheck) ||
            this.itemToCheck === null
        ) {
            callback();
        }
        return this;
    }

    isArray(callback: () => void): CheckType {
        if (Array.isArray(this.itemToCheck)) {
            callback();
        }
        return this;
    }
    isNotArray(callback: () => void): CheckType {
        if (!Array.isArray(this.itemToCheck)) {
            callback();
        }
        return this;
    }

    isString(callback: () => void): CheckType {
        if (typeof this.itemToCheck === 'string') {
            callback();
        }
        return this;
    }
    isNotString(callback: () => void): CheckType {
        if (typeof this.itemToCheck !== 'string') {
            callback();
        }
        return this;
    }

    isNumber(callback: () => void): CheckType {
        if (isNumber(this.itemToCheck)) {
            callback();
        }
        return this;
    }
    isNotNumber(callback: () => void): CheckType {
        if (!isNumber(this.itemToCheck)) {
            callback();
        }
        return this;
    }

    isFunction(callback: () => void): CheckType {
        if (typeof this.itemToCheck === 'function') {
            callback();
        }
        return this;
    }
    isNotFunction(callback: () => void): CheckType {
        if (typeof this.itemToCheck !== 'function') {
            callback();
        }
        return this;
    }

    isBoolean(callback: () => void): CheckType {
        if (typeof this.itemToCheck === 'boolean') {
            callback();
        }
        return this;
    }
    isNotBoolean(callback: () => void): CheckType {
        if (typeof this.itemToCheck !== 'boolean') {
            callback();
        }
        return this;
    }

    isNull(callback: () => void): CheckType {
        if (this.itemToCheck === null) {
            callback();
        }
        return this;
    }
    isNotNull(callback: () => void): CheckType {
        if (this.itemToCheck !== null) {
            callback();
        }
        return this;
    }

    isUndefined(callback: () => void): CheckType {
        if (this.itemToCheck === undefined) {
            callback();
        }
        return this;
    }
    isNotUndefined(callback: () => void): CheckType {
        if (this.itemToCheck !== undefined) {
            callback();
        }
        return this;
    }

    isDate(callback: () => void): CheckType {
        if (this.itemToCheck instanceof Date) {
            callback();
        }
        return this;
    }
    isNotDate(callback: () => void): CheckType {
        if (!(this.itemToCheck instanceof Date)) {
            callback();
        }
        return this;
    }
}
