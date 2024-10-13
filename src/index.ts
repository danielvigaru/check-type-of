import is_number from 'is-number';

function isNumber(value: unknown): boolean {
    // is_number returns true for numbers and strings that can be converted to numbers
    return typeof value !== 'string' && is_number(value);
}

function isClassDefinition(item: unknown): boolean {
    const definitionString = item?.toString() ?? '';
    return /^class\s/.test(definitionString);
}

export type TItemType =
    | 'array'
    | 'boolean'
    | 'class'
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
        let type: TItemType = undefined;

        this.isArray(() => (type = 'array'))
            .isBoolean(() => (type = 'boolean'))
            .isClass(() => (type = 'class'))
            .isDate(() => (type = 'date'))
            .isFunction(() => (type = 'function'))
            .isMap(() => (type = 'map'))
            .isNull(() => (type = 'null'))
            .isNumber(() => (type = 'number'))
            .isObject(() => (type = 'object'))
            .isString(() => (type = 'string'))
            .isUndefined(() => (type = 'undefined'));

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
    public isNotObject(callback: () => void): void {
        if (
            typeof this.itemToCheck !== 'object' ||
            Array.isArray(this.itemToCheck) ||
            this.itemToCheck === null
        ) {
            callback();
        }
    }

    public isArray(callback: () => void): CheckType {
        if (Array.isArray(this.itemToCheck)) {
            callback();
        }
        return this;
    }
    public isNotArray(callback: () => void): void {
        if (!Array.isArray(this.itemToCheck)) {
            callback();
        }
    }

    public isDate(callback: () => void): CheckType {
        if (this.itemToCheck instanceof Date) {
            callback();
        }
        return this;
    }
    public isNotDate(callback: () => void): void {
        if (!(this.itemToCheck instanceof Date)) {
            callback();
        }
    }

    public isMap(callback: () => void): CheckType {
        if (this.itemToCheck instanceof Map) {
            callback();
        }
        return this;
    }
    public isNotMap(callback: () => void): void {
        if (!(this.itemToCheck instanceof Map)) {
            callback();
        }
    }

    public isString(callback: () => void): CheckType {
        if (typeof this.itemToCheck === 'string') {
            callback();
        }
        return this;
    }
    public isNotString(callback: () => void): void {
        if (typeof this.itemToCheck !== 'string') {
            callback();
        }
    }

    public isNumber(callback: () => void): CheckType {
        if (isNumber(this.itemToCheck)) {
            callback();
        }
        return this;
    }
    public isNotNumber(callback: () => void): void {
        if (!isNumber(this.itemToCheck)) {
            callback();
        }
    }

    public isFunction(callback: () => void): CheckType {
        if (
            typeof this.itemToCheck === 'function' &&
            !isClassDefinition(this.itemToCheck) &&
            (this.itemToCheck.prototype === undefined ||
                Object.entries(this.itemToCheck.prototype).length === 0)
        ) {
            callback();
        }
        return this;
    }
    public isNotFunction(callback: () => void): void {
        if (
            typeof this.itemToCheck !== 'function' ||
            isClassDefinition(this.itemToCheck) ||
            (this.itemToCheck.prototype !== undefined &&
                Object.entries(this.itemToCheck.prototype).length > 0)
        ) {
            callback();
        }
    }

    public isClass(callback: () => void): CheckType {
        if (
            typeof this.itemToCheck === 'function' &&
            this.itemToCheck.prototype !== undefined &&
            (isClassDefinition(this.itemToCheck) ||
                Object.entries(this.itemToCheck.prototype).length > 0)
        ) {
            callback();
        }
        return this;
    }
    public isNotClass(callback: () => void): void {
        if (
            typeof this.itemToCheck !== 'function' ||
            this.itemToCheck.prototype === undefined ||
            Object.entries(this.itemToCheck.prototype).length === 0
        ) {
            callback();
        }
    }

    public isBoolean(callback: () => void): CheckType {
        if (typeof this.itemToCheck === 'boolean') {
            callback();
        }
        return this;
    }
    public isNotBoolean(callback: () => void): void {
        if (typeof this.itemToCheck !== 'boolean') {
            callback();
        }
    }

    public isNull(callback: () => void): CheckType {
        if (this.itemToCheck === null) {
            callback();
        }
        return this;
    }
    public isNotNull(callback: () => void): void {
        if (this.itemToCheck !== null) {
            callback();
        }
    }

    public isUndefined(callback: () => void): CheckType {
        if (this.itemToCheck === undefined) {
            callback();
        }
        return this;
    }
    public isNotUndefined(callback: () => void): void {
        if (this.itemToCheck !== undefined) {
            callback();
        }
    }

    public isNullish(callback: () => void): CheckType {
        if (this.itemToCheck === null || this.itemToCheck === undefined) {
            callback();
        }
        return this;
    }
    public isNotNullish(callback: () => void): void {
        if (this.itemToCheck !== null && this.itemToCheck !== undefined) {
            callback();
        }
    }
}
