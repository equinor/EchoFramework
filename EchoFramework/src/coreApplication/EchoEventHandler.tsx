import { EchoEvents, eventHub, Plant } from '@equinor/echo-core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { handlePlantChanged } from '../../services/eventCallbacks/plantChanged';
import { RootState } from '../../store';

interface EchoEventHandlerProps {
    children: React.ReactNode;
}

const EchoContent: React.FC<EchoEventHandlerProps> = ({ children }: EchoEventHandlerProps) => {
    const settingsItems = useSelector((state: RootState) => state.userSettings.settingsItems);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = eventHub.subscribe(EchoEvents.PlantChanged, (newSelectedPlant: Plant) =>
            handlePlantChanged(newSelectedPlant, dispatch, history, settingsItems)
        );
        return (): void => {
            unsubscribe();
        };
    });

    return <>{children}</>;
};

export default EchoContent;
