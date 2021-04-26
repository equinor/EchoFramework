export const removeSubsetOfKeys = (obj: Readonly<Record<string, any>>, keys: string[]): Record<string, unknown> => {
    const objCopy = { ...obj };
    keys.forEach((key) => {
        delete objCopy[key];
    })
    return objCopy;
}