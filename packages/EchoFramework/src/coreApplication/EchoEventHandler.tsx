import { eventHub } from '@equinor/echo-base';
import { EchoEvents, Plant } from '@equinor/echo-core';
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
const EchoEventHandler: React.FC<EchoEventHandlerProps> = ({ children }: EchoEventHandlerProps): JSX.Element => {
    // const history = useHistory();
    // console.info(history);

    useEffect(() => {
        const unsubscribe = eventHub.subscribe(EchoEvents.PlantChanged, (newSelectedPlant: Plant) =>
            handlePlantChanged(newSelectedPlant)
        );
        return (): void => {
            unsubscribe();
        };
    });

    // useEffect(() => {
    //     const unListen = history.listen((location) => {
    //         const { pathname } = location;
    //         const pathKey = getKeyFromPath(pathname);
    //         // const { instCode, tagNo, search } = getLinkParams();
    //         setActiveModulePanels(pathKey);
    //     });
    //     return (): void => {
    //         unListen();
    //     };
    // }, [history]);

    return <>{children}</>;
};

export default EchoEventHandler;
