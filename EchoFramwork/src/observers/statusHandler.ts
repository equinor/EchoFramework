import { ObserverClass, ObserverIdentifier } from '@equinor/echo-core';
import { Dictionary } from 'lodash';
import { LegendType } from '../../types/legendType';
import { formGroupDescriptionCPCL, formGroupDescriptionMCCR } from '../../types/proCoSysChecklist';
import { VisibleDataType } from '../../types/visibleDataTypes';
import {
    getAllCommPksHandoverStatuses,
    getAllCommPksHandoverStatusesForAppKey,
    getAllCommPkStatuses,
    getAllCommPkStatusesForAppKey,
    getAllNotificationStatuses,
    getAllNotificationStatusesForAppKey,
    getAllProcosysStatuses,
    getAllProcosysStatusesForAppKey,
    getAllStidStatuses,
    getAllStidStatusesForAppKey
} from './statusHandlerUtils';
import visibleData from './visibleData';

class StatusHandler extends ObserverClass {
    private tagObserverId: ObserverIdentifier;
    private commPkObserverId: ObserverIdentifier;
    private notificationObserverId: ObserverIdentifier;

    constructor() {
        super();
        const handleVisibleTagsUpdated = <T>(data: T): void => {
            this.notify<T>(data, VisibleDataType.TAGS.toString());
        };

        const handleVisibleCommPksUpdated = <T>(data: T): void => {
            this.notify<T>(data, VisibleDataType.COMMPK.toString());
        };

        const handleVisibleNotificationsUpdated = <T>(data: T): void => {
            this.notify<T>(data, VisibleDataType.NOTIFICATIONS.toString());
        };

        this.tagObserverId = visibleData.addSubscriber(handleVisibleTagsUpdated, VisibleDataType.TAGS.toString());
        this.commPkObserverId = visibleData.addSubscriber(
            handleVisibleCommPksUpdated,
            VisibleDataType.COMMPK.toString()
        );
        this.notificationObserverId = visibleData.addSubscriber(
            handleVisibleNotificationsUpdated,
            VisibleDataType.NOTIFICATIONS.toString()
        );
    }

    removeVisibleDataObserver(): void {
        visibleData.removeSubscriber(this.tagObserverId);
        visibleData.removeSubscriber(this.commPkObserverId);
        visibleData.removeSubscriber(this.notificationObserverId);
    }

    async getAllStatusesForLegendType(legendType: LegendType, key?: string): Promise<string[] | Dictionary<string>> {
        switch (legendType) {
            case LegendType.Stid:
                return key ? getAllStidStatusesForAppKey(key) : getAllStidStatuses();
            case LegendType.MCCRStatus:
                return key
                    ? getAllProcosysStatusesForAppKey(key, formGroupDescriptionMCCR)
                    : getAllProcosysStatuses(formGroupDescriptionMCCR);
            case LegendType.CPCLStatus:
                return key
                    ? getAllProcosysStatusesForAppKey(key, formGroupDescriptionCPCL)
                    : getAllProcosysStatuses(formGroupDescriptionCPCL);
            case LegendType.CommPk:
                return key ? getAllCommPkStatusesForAppKey(key) : getAllCommPkStatuses();
            case LegendType.CommPkStatus:
                return key ? getAllCommPksHandoverStatusesForAppKey(key) : getAllCommPksHandoverStatuses();
            case LegendType.Notifications:
                return key ? getAllNotificationStatusesForAppKey(key) : getAllNotificationStatuses();
            default:
                return [];
        }
    }
}

export default new StatusHandler();
