import { EchoEvents, eventHub, Plant } from '@equinor/echo-core';
import React, { useEffect } from 'react';
import { handlePlantChanged } from '../services/eventCallbacks/plantChanged';

interface EchoEventHandlerProps {
    children: React.ReactNode;
}

/**
 * Wrapper component for listening to events.
 * @param {EchoEventHandlerProps} { children }
 * @return {*}
 */
const EchoEventHandler: React.FC<EchoEventHandlerProps> = ({ children }: EchoEventHandlerProps) => {
    useEffect(() => {
        const unsubscribe = eventHub.subscribe(EchoEvents.PlantChanged, (newSelectedPlant: Plant) =>
            handlePlantChanged(newSelectedPlant)
        );
        return (): void => {
            unsubscribe();
        };
    });

    return <>{children}</>;
};

export default EchoEventHandler;
