import { getPlants, Plant, setPlantsData } from '@equinor/echo-core';
import { fireAndForget } from '@equinor/echo-utils';
import { getPlantsFromApi } from '../services/api/api-plants';
import { checkIsPlantsListUpdated } from './plantsDataUtils';

/**
 * Function for getting the list of plants from the API and
 * updating our list of plants in local storage if there is a difference.
 * @return {*}  {Promise<void>}
 */
async function updatePlants(): Promise<void> {
    const apiPlants: Plant[] = await getPlantsFromApi();
    const localPlants = getPlants();

    if (apiPlants && apiPlants.length > 0 && checkIsPlantsListUpdated(apiPlants, localPlants)) {
        setPlantsData({ plants: apiPlants });
    }
}

/**
 * Function which will run all startup functions.
 * @export
 * @return {*}  {Promise<void>}
 */
export async function startup(): Promise<void> {
    if (navigator.onLine) {
        fireAndForget(updatePlants);
    }
}
