import { Chip } from '@equinor/eds-core-react';
import React from 'react';
import { LegendStatus } from '../../types/legendType';
import style from './statusLegend.module.css';

export interface StatusLegendItemProps {
    statusLabel: string;
    status: LegendStatus | string;
    getColorForTagStatus: (status: LegendStatus | string) => string;
}

const StatusLegendItem: React.FC<StatusLegendItemProps> = ({
    statusLabel,
    status,
    getColorForTagStatus
}: StatusLegendItemProps) => {
    return (
        <Chip className={style.statusLegendItem} style={{ background: getColorForTagStatus(status) }}>
            {statusLabel}
        </Chip>
    );
};

export default StatusLegendItem;
