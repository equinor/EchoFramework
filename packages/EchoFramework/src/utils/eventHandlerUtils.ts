export const getKeyFromPath = (path: string): string => {
    return path.split('/')[1].split('?')[0];
}