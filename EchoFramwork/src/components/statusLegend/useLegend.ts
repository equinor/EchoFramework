import { useEffect, useRef, useState } from 'react';
import { LegendStatus, LegendType } from '../../types/legendType';
import { VisibleDataType } from '../../types/visibleDataTypes';
import statusHandler from '../observers/statusHandler';
import { listValuesToEnum } from './legendUtils';

export function useLegend(selectedLegendType: LegendType, isSyncingData: boolean): (LegendStatus | string)[] {
    const [statuses, setStatuses] = useState<(LegendStatus | string)[]>([]);
    const subscriberTags = useRef<number>();
    const subscriberCommPks = useRef<number>();
    const subscriberNotification = useRef<number>();

    useEffect(() => {
        let isMounted = true;
        getStatuses();

        async function getStatuses(): Promise<void> {
            if (isSyncingData && isMounted) {
                setStatuses([]);
                return;
            }

            const allStatuses = (await statusHandler.getAllStatusesForLegendType(selectedLegendType)) as string[];
            if (
                (selectedLegendType === LegendType.CommPk || selectedLegendType === LegendType.Notifications) &&
                isMounted
            ) {
                setStatuses(allStatuses);
            } else if (isMounted) {
                const allStatusesAsEnums = listValuesToEnum(allStatuses, LegendStatus);
                setStatuses(allStatusesAsEnums);
            }
        }

        subscriberTags.current = statusHandler.addSubscriber(getStatuses, VisibleDataType.TAGS.toString());
        subscriberCommPks.current = statusHandler.addSubscriber(getStatuses, VisibleDataType.COMMPK.toString());
        subscriberNotification.current = statusHandler.addSubscriber(
            getStatuses,
            VisibleDataType.NOTIFICATIONS.toString()
        );
        return (): void => {
            isMounted = false;
            subscriberTags.current && statusHandler.removeSubscriber(subscriberTags.current);
            subscriberCommPks.current && statusHandler.removeSubscriber(subscriberCommPks.current);
            subscriberNotification.current && statusHandler.removeSubscriber(subscriberNotification.current);
        };
    }, [selectedLegendType, isSyncingData]);

    return statuses;
}
