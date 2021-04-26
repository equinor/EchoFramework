import React from 'react';
import CorePanelLeft from '../components/panel/corePanelLeft';
import CorePanelRight from '../components/panel/corePanelRight';

interface CorePanelsProps {
    children: React.ReactNode;
    Legend: React.FC;
}

export const EchoContent: React.FC<CorePanelsProps> = ({ children, Legend }: CorePanelsProps): JSX.Element => {
    return (
        <>
            <CorePanelLeft />
            <CorePanelRight />
            {children}
            {Legend && <Legend />}
        </>
    );
};

export default EchoContent;
