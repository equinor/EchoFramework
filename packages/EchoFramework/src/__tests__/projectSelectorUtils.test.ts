import { filterProjectsStartsWithFirst } from '../utils/projectSelectorUtils';

describe('filterProjectsStartsWithFirst', () => {
    it('should filter a list of strings', () => {
        const strings = ['onefilter', 'twofilter', 'three', 'four'];
        const filteredStrings = filterProjectsStartsWithFirst(strings, 'filter');

        expect(filteredStrings).toEqual(['onefilter', 'twofilter']);
    });

    it('should show elements that start with the filter first', () => {
        const strings = ['onefilter', 'filtertwo', 'threefilter', 'four'];
        const filteredStrings = filterProjectsStartsWithFirst(strings, 'filter');

        expect(filteredStrings).toEqual(['filtertwo', 'onefilter', 'threefilter']);
    });

    it('should be case insensitive', () => {
        const strings = ['oneFilter', 'twoFILTER', 'three', 'four'];
        const filteredStrings = filterProjectsStartsWithFirst(strings, 'FiLtEr');

        expect(filteredStrings).toEqual(['oneFilter', 'twoFILTER']);
    });
});
