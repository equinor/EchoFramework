import { Dropdown } from '@equinor/echo-components';
import { EchoEvents, eventHub, Plant, usePlants, usePlantSettings } from '@equinor/echo-core';
import { StarProgress } from '@equinor/eds-core-react';
import React, { useState } from 'react';

interface PlantSelectorProps {
    variant?: 'compact' | 'default';
    isDisabled?: boolean;
}

/**
 * Dropdown component for displaying a searchable plant selector.
 * @param {PlantSelectorProps} {
 * variant: The style type for the dropdown component. Either default or compact.
 * isDisabled: Flag which decides whether the dropdown should be disabled or not.
 * }
 * @return {*}
 */
export const PlantSelector: React.FC<PlantSelectorProps> = ({ variant, isDisabled }: PlantSelectorProps) => {
    const plants = usePlants();
    const { instCode: selectedPlantCode, plantName: selectedPlant } = usePlantSettings();
    const dropdownData = plants.map((plant: Plant) => plant.description);
    const [acquiredPlantName, setAcquiredPlantName] = useState('');

    const isPlantsLoading = plants.length === 0;

    if (!selectedPlant && selectedPlantCode && plants && !acquiredPlantName) {
        const newName = plants.find((plant: Plant) => plant.instCode === selectedPlantCode)?.description;
        if (newName) {
            setAcquiredPlantName(newName);
        }
    }

    const selectedPlantName = selectedPlant ? selectedPlant : acquiredPlantName;

    const handlePlantSelected = async (text: string): Promise<void> => {
        const newSelectedPlant = plants.find((plant: Plant) => plant.description === text);
        if (newSelectedPlant) {
            eventHub.emit(EchoEvents.PlantChanged, newSelectedPlant);
        }
    };

    const filterPlants = (data: string[], filter: string): string[] => {
        const filteredPlants = plants.filter(
            (item) =>
                item.description.toLowerCase().indexOf(filter.trim().toLowerCase()) > -1 ||
                item.instCode.toLowerCase().indexOf(filter.trim().toLowerCase()) > -1
        );

        return filteredPlants.map((plant: Plant) => plant.description);
    };

    if (isPlantsLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <span style={{ textAlign: 'center', fontSize: '24px', marginRight: '0.5rem' }}>Loading plants</span>
                <StarProgress size={32} />
            </div>
        );
    }

    return (
        <Dropdown
            showSearch={true}
            selected={selectedPlantName}
            data={dropdownData}
            filterFunc={filterPlants}
            openDownWards={true}
            placeholder="Select plant"
            setSelected={handlePlantSelected}
            isDisabled={isDisabled || !navigator.onLine}
            disabledText="Disabled while syncing or loading data"
            variant={variant ? variant : 'default'}
        />
    );
};
