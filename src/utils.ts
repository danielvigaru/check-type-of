export function isNumber(value: unknown): boolean {
    return (
        typeof value === 'number' &&
        !Number.isNaN(value) &&
        Number.isFinite(value)
    );
}

export function isClassDefinition(item: unknown): boolean {
    const definitionString = item?.toString() ?? '';
    return /^class\s/.test(definitionString);
}
