import React from 'react';
import { LegendStatus } from '../../types/legendType';
import StatusLegendItem from './statusLegendItem';

export interface StatusLegendListProps {
    listOfStatuses: (LegendStatus | string)[];
    getColorForTagStatus: () => string;
}

const StatusLegendList: React.FC<StatusLegendListProps> = ({
    listOfStatuses,
    getColorForTagStatus
}: StatusLegendListProps) => {
    return (
        <>
            {listOfStatuses.map((status: LegendStatus | string, index: number) => (
                <StatusLegendItem
                    key={index}
                    statusLabel={status}
                    status={status}
                    getColorForTagStatus={getColorForTagStatus}
                />
            ))}
        </>
    );
};

export default StatusLegendList;
