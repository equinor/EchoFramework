import { Plant, setSelectedPlant } from "@equinor/echo-core";

/**
 * Callback function to be used with the event listener for changing plants.
 * Sets the selected plant in our local storage.
 * @param {Plant} newSelectedPlant
 * @return {*}  {Promise<void>}
 */
 export const handlePlantChanged = async (newSelectedPlant: Plant): Promise<void> => {
    setSelectedPlant({
        instCode: newSelectedPlant.instCode,
        plantName: newSelectedPlant.description,
        sapPlantId: newSelectedPlant.sapPlantId,
        proCoSysPlantId: newSelectedPlant.proCoSysPlantId
    });
};