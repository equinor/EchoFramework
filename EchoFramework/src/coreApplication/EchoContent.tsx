import React from "react";
// import StatusLegendWrapper from '../../components/statusLegend/statusLegendWrapper';
import CorePanelLeft from '../components/panel/corePanelLeft';
import CorePanelRight from '../components/panel/corePanelRight';

interface CorePanelsProps {
    children: React.ReactNode;
}

const EchoContent: React.FC<CorePanelsProps> = ({ children }: CorePanelsProps): JSX.Element => {
    return (
        <>
            <CorePanelLeft />
            <CorePanelRight />
            {children}

            {/* <StatusLegendWrapper /> */}
        </>
    );
};

export default EchoContent;
