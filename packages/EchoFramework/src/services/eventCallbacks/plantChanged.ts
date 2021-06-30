import { Plant, setSelectedPlant } from '@equinor/echo-core';
import { History } from 'history';

/**
 * Callback function to be used with the event listener for changing plants.
 * Sets the selected plant in our local storage.
 * @param {Plant} newSelectedPlant
 * @return {*}  {Promise<void>}
 */
export const handlePlantChanged = async (newSelectedPlant: Plant, history: History<unknown>): Promise<void> => {
    setSelectedPlant({
        ...newSelectedPlant,
        plantName: newSelectedPlant.description
    });
    history.push('');
};
