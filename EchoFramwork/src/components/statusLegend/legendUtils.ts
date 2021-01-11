import { LegendStatus, LegendType } from '../../types/legendType';

function listToLowerCase(values: string[]): string[] {
    return values.map((v) => v.toLowerCase());
}

export function listValuesToEnum(values: string[], enumType: typeof LegendStatus): LegendStatus[] {
    values = listToLowerCase(values);
    const valuesAsEnums = [];
    for (const value of values) {
        const enumValue = valueToEnum(value, enumType);
        valuesAsEnums.push(enumValue);
    }

    return valuesAsEnums;
}

export function valueToEnum(value: string | undefined | null, enumType: typeof LegendStatus): LegendStatus {
    if (!value) return Object.keys(enumType)[0] as LegendStatus;
    const enumTypeIndexForValue = listToLowerCase(Object.values(enumType)).indexOf(value.toLowerCase());
    if (enumTypeIndexForValue === -1) {
        return Object.keys(enumType)[0] as LegendStatus;
    } else {
        return Object.keys(enumType)[enumTypeIndexForValue] as LegendStatus;
    }
}

export const getNumberOfStatusesToShow = (listOfLegendStatuses: string[]): number => {
    const legendElement = document.getElementById('legend');
    const dropdownElement = document.getElementById('legendStatusSelection');
    if (!legendElement || !dropdownElement) return listOfLegendStatuses.length;
    const legendWidth = legendElement.clientWidth - 14;
    const dropdownWidth = dropdownElement.clientWidth + 8;
    const showMoreButton = 101;
    let lengthToGo = legendWidth * 2 - dropdownWidth - showMoreButton;
    let chipsToShow = 0;
    for (const status of listOfLegendStatuses) {
        const chipWidth = status.length * 10 + 8 + 5;
        if (lengthToGo - chipWidth < 0) {
            return chipsToShow;
        } else {
            lengthToGo -= chipWidth;
            chipsToShow += 1;
        }
    }

    return chipsToShow;
};

export function getStatusGivenLegend(legendType: LegendType, status: string): string | LegendStatus {
    if (!status) return LegendStatus.Unknown;

    if (legendType === LegendType.CommPk || legendType === LegendType.Notifications) {
        return status;
    } else {
        return valueToEnum(status, LegendStatus);
    }
}
