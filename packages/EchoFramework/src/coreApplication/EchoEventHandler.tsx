import { eventHub } from '@equinor/echo-base';
import { EchoEvents, Plant, setActiveModulePanels } from '@equinor/echo-core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { handlePlantChanged } from '../services/eventCallbacks/plantChanged';
import { getKeyFromPath } from '../utils/eventHandlerUtils';

interface EchoEventHandlerProps {
    children: React.ReactNode;
}

/**
 * Wrapper component for listening to events.
 * @param {EchoEventHandlerProps} { children }
 * @return {*}
 */
const EchoEventHandler: React.FC<EchoEventHandlerProps> = ({ children }: EchoEventHandlerProps): JSX.Element => {
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = eventHub.subscribe(EchoEvents.PlantChanged, (newSelectedPlant: Plant) => {
            handlePlantChanged(newSelectedPlant, history);
        });

        return (): void => {
            unsubscribe();
        };
    });

    useEffect(() => {
        if (!history) {
            console.error('No react history found!', history);
            return;
        }
        const unListen = history.listen((location) => {
            const { pathname } = location;
            const pathKey = getKeyFromPath(pathname);
            setActiveModulePanels(pathKey);
        });
        return (): void => {
            unListen();
        };
    }, [history]);

    return <>{children}</>;
};

export default EchoEventHandler;
