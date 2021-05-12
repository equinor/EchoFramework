import { getKeyFromPath } from '../utils/eventHandlerUtils';

describe('getKeyFromPath', () => {
    it('should return the first key from a path', () => {
        const testPath = "/viewer?instCode=JSV&search=pt0105&tagNo=A-20PT0105&docNo=C151-AS-P-XB-20020-01&fileId=3973202";
        const result = getKeyFromPath(testPath);
        expect(result).toEqual('viewer');
    });
    it('should return empty string if there is no path', () => {
        const testPath = "/";
        const result = getKeyFromPath(testPath);
        expect(result).toEqual('');
    });
    it('should return empty string if there is no path but there is a param', () => {
        const testPath = "/?instCode=JSV";
        const result = getKeyFromPath(testPath);
        expect(result).toEqual('');
    });
});