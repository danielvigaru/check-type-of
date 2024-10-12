import is_number from 'is-number';

export function isNumber(value: unknown): boolean {
    // is_number returns true for numbers and strings that can be converted to numbers
    return typeof value !== 'string' && is_number(value);
}

export function isClassDefinition(item: unknown): boolean {
    const definitionString = item?.toString() ?? '';
    return /^class\s/.test(definitionString);
}
