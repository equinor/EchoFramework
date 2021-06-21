import { Plant } from '@equinor/echo-core';
import { arraysIsEqual } from '@equinor/echo-utils';

/**
 * Function for comparing our local plant list with the API plant list.
 * Returns true if they are not equal, returns false otherwise.
 * @param {Plant[]} apiPlants
 * @param {Plant[]} localStoragePlants
 * @return {*}  {boolean}
 */
export const checkIsPlantsListUpdated = (
    apiPlants: ReadonlyArray<Plant>,
    localStoragePlants: ReadonlyArray<Plant>
): boolean => {
    if (!localStoragePlants || localStoragePlants.length === 0 || !arraysIsEqual(localStoragePlants, apiPlants)) {
        return true;
    } else {
        return false;
    }
};
