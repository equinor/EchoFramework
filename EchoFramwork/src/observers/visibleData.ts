/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObserverClass } from '@equinor/echo-core';
import { Dictionary } from 'lodash';

class VisibleData extends ObserverClass {
    private visibleData: Dictionary<Dictionary<any>>;

    constructor() {
        super();
        this.visibleData = {};
    }

    getVisibleData(): Dictionary<Dictionary<string[]>> {
        return this.visibleData;
    }

    getVisibleDataForAppKey(appKey: string): Dictionary<string[]> {
        return this.visibleData[appKey];
    }

    getVisibleDataForDataType(dataType: string): any[] {
        const dataByType: any[] = [];
        Object.keys(this.visibleData).forEach((appKey) => {
            if (this.visibleData[appKey][dataType]) {
                dataByType.push(this.visibleData[appKey][dataType]);
            }
        });

        return dataByType;
    }

    getVisibleDataForAppKeyAndDataType(appKey: string, dataType: string): string[] {
        return this.visibleData[appKey] ? this.visibleData[appKey][dataType] : [];
    }

    removeByAppKeyAndDataType(appKey: string, dataType: string): void {
        if (this.visibleData[appKey] && this.visibleData[appKey][dataType]) {
            delete this.visibleData[appKey];
            this.notify(undefined, dataType);
        }
    }

    removeByAppKey(appKey: string): void {
        if (this.visibleData[appKey]) {
            const dataTypes = Object.keys(this.visibleData[appKey]);
            delete this.visibleData[appKey];
            for (const dataType of dataTypes) {
                this.notify(undefined, dataType);
            }
        }
    }

    addData<T>(appKey: string, dataType: string, data: T): void {
        if (this.visibleData[appKey]) {
            this.visibleData[appKey][dataType] = data;
        } else {
            this.visibleData[appKey] = {};
            this.visibleData[appKey][dataType] = data;
        }

        this.notify<T>(data, dataType);
    }
}

export default new VisibleData();
