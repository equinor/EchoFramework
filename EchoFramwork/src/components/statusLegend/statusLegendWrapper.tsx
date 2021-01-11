import echoCore, { usePanels } from '@equinor/echo-core';
import { Dictionary } from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsLegendDataSyncing } from '../../hooks/useIsLegendDataSyncing';
import { setUserDataLegend } from '../../services/dexie/userProfile';
import { SettingsKey } from '../../services/userSettings/settingsTypes';
import useSettingsKeys from '../../services/userSettings/useSettingsKeys';
import { hasKey } from '../../services/userSettings/util';
import { RootState } from '../../store';
import { actions as userProfileActions } from '../../store/userSettings';
import { getLegendTypeAsString, LegendType } from '../../types/legendType';
import { SelectedLegend } from '../../types/selectedLegend';
import { getColorStatusFromString, getLegendStatusColor } from '../../utils/status/status';
import Dropdown from '../common/dropdown/dropdown';
import StatusLegend from './statusLegend';
import style from './statusLegendWrapper.module.css';
import { useLegend } from './useLegend';

const StatusLegendWrapper: React.FC = () => {
    const { isActive } = echoCore.useLegendOptions();
    const { isPanelActive } = usePanels();
    const selectedLegend = useSelector((store: RootState) => store.userSettings.selectedLegend);
    const selectedStatusType = selectedLegend.legendType;
    const isSyncing = useIsLegendDataSyncing();
    const dispatch = useDispatch();
    const settingsKeys = useSettingsKeys();

    const [showAllStatuses, setShowAllStatuses] = useState(false);
    const legendTypeAsStringMapping = Object.keys(LegendType).reduce((r: Dictionary<LegendType>, key: string) => {
        r[getLegendTypeAsString(LegendType[key as keyof typeof LegendType])] =
            LegendType[key as keyof typeof LegendType];
        return r;
    }, {});

    const listOfLegendStatuses = useLegend(selectedStatusType, isSyncing);

    const handleSetSelected = (selectedValue: string): void => {
        const legendType = legendTypeAsStringMapping[selectedValue];

        const legend = {
            isEnabled: true,
            legendType: legendType
        } as SelectedLegend;
        setUserDataLegend(legend);
        dispatch(userProfileActions.setSelectedLegend(legend));
    };

    if (!selectedLegend.isEnabled || listOfLegendStatuses.length === 0 || (!isPanelActive && !isActive)) {
        return null;
    }

    const showActionMessage = (): string | undefined => {
        if (
            (selectedStatusType === LegendType.CommPk || selectedStatusType === LegendType.CommPkStatus) &&
            !hasKey(settingsKeys, SettingsKey.CommPk)
        ) {
            return 'Enable CommPks to display statuses';
        } else if (
            selectedStatusType === LegendType.Notifications &&
            !hasKey(settingsKeys, SettingsKey.Notifications)
        ) {
            return 'Enable notifications to display statuses';
        } else if (
            (selectedStatusType === LegendType.MCCRStatus ||
                selectedStatusType === LegendType.CPCLStatus ||
                selectedStatusType === LegendType.CommPk) &&
            !hasKey(settingsKeys, SettingsKey.Checklist)
        ) {
            return 'Enable checklists to display statuses';
        } else {
            return;
        }
    };

    const getStatusFunction = (): ((status?: string) => string) => {
        if (selectedStatusType === LegendType.CommPk || selectedStatusType === LegendType.Notifications) {
            return getColorStatusFromString;
        } else {
            return getLegendStatusColor;
        }
    };

    return (
        <div className={`${isPanelActive ? style.wrapper : style.wrapperFaded}`} id="legend">
            <div className={style.dropdownContainer} id="legendStatusSelection">
                <Dropdown
                    showSearch={false}
                    openDownWards={false}
                    selected={getLegendTypeAsString(selectedStatusType)}
                    setSelected={handleSetSelected}
                    placeholder="Select status type"
                    data={Object.keys(legendTypeAsStringMapping)}
                ></Dropdown>
            </div>
            {showActionMessage() ? (
                <div className={style.textContainer}>{showActionMessage()}</div>
            ) : (
                <>
                    <StatusLegend
                        listOfLegendStatuses={[...new Set(listOfLegendStatuses)]}
                        getColorForTagStatus={getStatusFunction()}
                        showAllStatuses={showAllStatuses}
                        setShowAllStatuses={setShowAllStatuses}
                    />
                </>
            )}
        </div>
    );
};

export default StatusLegendWrapper;
