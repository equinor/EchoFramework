import { Button } from '@equinor/eds-core-react';
import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { LegendStatus } from '../../types/legendType';
import { getNumberOfStatusesToShow } from './legendUtils';
import style from './statusLegend.module.css';
import StatusLegendList from './statusLegendList';

export interface StatusLegendProps {
    listOfLegendStatuses: (LegendStatus | string)[];
    getColorForTagStatus: (status?: string) => string;
    showAllStatuses: boolean;
    setShowAllStatuses: (showAllStatuses: boolean) => void;
}

const StatusLegend: React.FC<StatusLegendProps> = ({
    listOfLegendStatuses,
    getColorForTagStatus,
    showAllStatuses,
    setShowAllStatuses
}: StatusLegendProps) => {
    useWindowSize();

    return (
        <>
            <>
                {listOfLegendStatuses.length === getNumberOfStatusesToShow(listOfLegendStatuses) ? (
                    <StatusLegendList
                        listOfStatuses={listOfLegendStatuses}
                        getColorForTagStatus={getColorForTagStatus}
                    />
                ) : (
                    <>
                        {showAllStatuses ? (
                            <>
                                <StatusLegendList
                                    listOfStatuses={listOfLegendStatuses}
                                    getColorForTagStatus={getColorForTagStatus}
                                />
                                <Button
                                    id="showLess"
                                    variant="ghost"
                                    className={style.showLess}
                                    onClick={(): void => setShowAllStatuses(false)}
                                >
                                    Show less
                                </Button>
                            </>
                        ) : (
                            <>
                                <StatusLegendList
                                    listOfStatuses={listOfLegendStatuses.slice(
                                        0,
                                        getNumberOfStatusesToShow(listOfLegendStatuses)
                                    )}
                                    getColorForTagStatus={getColorForTagStatus}
                                />
                                <Button
                                    id="showMore"
                                    variant="ghost"
                                    className={style.showMoreButton}
                                    onClick={(): void => setShowAllStatuses(true)}
                                >
                                    Show more
                                </Button>
                            </>
                        )}
                    </>
                )}
            </>
        </>
    );
};

export default StatusLegend;
