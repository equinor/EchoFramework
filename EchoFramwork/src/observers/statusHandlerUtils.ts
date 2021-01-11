import { Dictionary } from 'lodash';
import {
    getCommPackNoForChecklists,
    getCommPackStatus,
    getNotificationStatus,
    getWorstChecklistStatusForGroup
} from '../../utils/status/status';
import { getLocalProCoSysChecklistsForTags, getLocalProCoSysCommPacksForCommPkNos } from '../dexie/proCoSysDb';
import { getLocalNotificationsForTags } from '../dexie/sapDb';
import { getLocalTagStatuses } from '../dexie/tags';
import { Checklist } from '../types';
import { VisibleDataType } from '../types/visibleDataTypes';
import visibleData from './visibleData';

export const getTagsForTagNos = async (tagNos: string[]): Promise<Dictionary<string>> => {
    const tagsWithInfo = await getLocalTagStatuses(tagNos);
    return tagsWithInfo;
};

const splitIntoListAndDict = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visibleTags: any[]
): {
    list: string[];
    dict: Dictionary<string>;
} => {
    const list = [];
    let dict: Dictionary<string> = {};
    for (const visibleTagItem of visibleTags) {
        if (Array.isArray(visibleTagItem)) {
            list.push(...visibleTagItem);
        } else {
            dict = Object.assign({}, dict, visibleTagItem);
        }
    }
    return { list, dict };
};

export const getChecklistStatusForTagNos = async (
    tagNos: string[],
    formGroupDescription: string
): Promise<Dictionary<string>> => {
    const checklistsForTags = await getLocalProCoSysChecklistsForTags(tagNos);
    if (Object.keys(checklistsForTags).length !== tagNos.length) {
        for (const tagNo of tagNos) {
            const tagWithChecklist = checklistsForTags[tagNo];
            if (!tagWithChecklist) {
                checklistsForTags[tagNo] = [({ formStatus: 'Unknown' } as unknown) as Checklist] as Checklist[];
            }
        }
    }

    return Object.keys(checklistsForTags).reduce((r: Dictionary<string>, key) => {
        r[key] = getWorstChecklistStatusForGroup(
            checklistsForTags[key].map((c) => {
                return { formStatus: c.formStatus, formGroupDescription: c.formGroupDescription };
            }),
            formGroupDescription
        );
        return r;
    }, {});
};

export const getAllStidStatuses = async (): Promise<string[]> => {
    const visibleTags = visibleData.getVisibleDataForDataType(VisibleDataType.TAGS.toString());
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict(visibleTags);

    const tagsWithInfo = await getTagsForTagNos(tagsAsList);
    const tagStatuses = Object.values(tagsWithInfo);
    tagStatuses.push(...Object.values(tagsAsDict));

    return [...new Set(tagStatuses)];
};

export const getAllStidStatusesForAppKey = async (appKey: string): Promise<Dictionary<string>> => {
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict([
        visibleData.getVisibleDataForAppKeyAndDataType(appKey, VisibleDataType.TAGS.toString())
    ]);
    const tagsWithInfo = await getTagsForTagNos(tagsAsList);
    const tagStatuses = Object.assign({}, tagsWithInfo, tagsAsDict);

    return tagStatuses;
};

export const getAllProcosysStatuses = async (formGroupDescription: string): Promise<string[]> => {
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict(
        visibleData.getVisibleDataForDataType(VisibleDataType.TAGS.toString())
    );
    const tagNos = tagsAsList;
    tagNos.push(...Object.keys(tagsAsDict));

    const checklistsForTags = await getChecklistStatusForTagNos(tagNos, formGroupDescription);
    const procosysStatuses = Object.values(checklistsForTags);
    return [...new Set(procosysStatuses)];
};

export const getAllProcosysStatusesForAppKey = async (
    appKey: string,
    formGroupDescription: string
): Promise<Dictionary<string>> => {
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict([
        visibleData.getVisibleDataForAppKeyAndDataType(appKey, VisibleDataType.TAGS.toString())
    ]);

    const tagNos = tagsAsList;
    tagNos.push(...Object.keys(tagsAsDict));
    const checklistsForTags = await getChecklistStatusForTagNos(tagNos, formGroupDescription);

    return checklistsForTags;
};

export const getCommPksNoForChecklistsForTagNos = async (tagNos: string[]): Promise<Dictionary<string>> => {
    const checklistsForTags = await getLocalProCoSysChecklistsForTags(tagNos);

    return Object.keys(checklistsForTags).reduce((r: Dictionary<string>, key) => {
        r[key] = getCommPackNoForChecklists(checklistsForTags[key].map((c) => c.commPackNo));
        return r;
    }, {});
};

export const getAllCommPkStatusesForAppKey = async (appKey: string): Promise<Dictionary<string>> => {
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict([
        visibleData.getVisibleDataForAppKeyAndDataType(appKey, VisibleDataType.TAGS.toString())
    ]);

    const tagNos = tagsAsList;
    tagNos.push(...Object.keys(tagsAsDict));
    const commPksForTags = await getCommPksNoForChecklistsForTagNos(tagNos);

    const { list: commPksAsList, dict: commPkAsDict } = splitIntoListAndDict(
        visibleData.getVisibleDataForDataType(VisibleDataType.COMMPK.toString())
    );

    const commPkVisible = [...commPksAsList, ...Object.keys(commPkAsDict)];
    const uniqueCommPksVisible = [...new Set(commPkVisible)];

    const commPksAsListToObject = uniqueCommPksVisible.reduce(
        (commPkDict: Dictionary<string>, commPkCurrent: string) => {
            commPkDict[commPkCurrent] = commPkCurrent;
            return commPkDict;
        },
        {}
    );

    const finalStatuses = { ...commPksForTags, ...commPksAsListToObject };

    return finalStatuses;
};

export const getAllCommPkStatuses = async (): Promise<string[]> => {
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict(
        visibleData.getVisibleDataForDataType(VisibleDataType.TAGS.toString())
    );
    const tagNos = tagsAsList;
    tagNos.push(...Object.keys(tagsAsDict));

    const commPksForTags = await getCommPksNoForChecklistsForTagNos(tagNos);
    const commPksStatuses = Object.values(commPksForTags);
    if (tagNos.length !== Object.keys(commPksForTags).length) {
        commPksStatuses.push('Unknown');
    }

    const { list: commPksAsList, dict: commPkAsDict } = splitIntoListAndDict(
        visibleData.getVisibleDataForDataType(VisibleDataType.COMMPK.toString())
    );

    const finalStatuses = [...commPksStatuses, ...commPksAsList, ...Object.keys(commPkAsDict)];

    return [...new Set(finalStatuses)];
};

export const getAllCommPksHandoverStatusesForAppKey = async (appKey: string): Promise<Dictionary<string>> => {
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict([
        visibleData.getVisibleDataForAppKeyAndDataType(appKey, VisibleDataType.TAGS.toString())
    ]);

    const { list: commPkAsList, dict: commPkAsDict } = splitIntoListAndDict([
        visibleData.getVisibleDataForAppKeyAndDataType(appKey, VisibleDataType.COMMPK.toString())
    ]);

    const tagNos = tagsAsList;
    tagNos.push(...Object.keys(tagsAsDict));
    const commPksForTags = await getCommPksNoForChecklistsForTagNos(tagNos);

    const allVisibleCommPkNos = [...commPkAsList, ...Object.values(commPksForTags)];
    const commPkNos = [...new Set(allVisibleCommPkNos)];
    const commPksWithInfo = await getLocalProCoSysCommPacksForCommPkNos(commPkNos);
    const commPksHandoverStatusForCommPkNos = Object.keys(commPksWithInfo).reduce((r: Dictionary<string>, key) => {
        r[key] = getCommPackStatus(commPksWithInfo[key]);
        return r;
    }, {});

    const commPksHandoverStatusForTags = Object.keys(commPksForTags).reduce((r: Dictionary<string>, tag) => {
        if (commPksHandoverStatusForCommPkNos[commPksForTags[tag]]) {
            r[tag] = commPksHandoverStatusForCommPkNos[commPksForTags[tag]];
        } else {
            r[tag] = getCommPackStatus([]);
        }
        return r;
    }, {});

    return Object.assign({}, commPksHandoverStatusForTags, commPkAsDict);
};

export const getAllCommPksHandoverStatuses = async (): Promise<string[]> => {
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict(
        visibleData.getVisibleDataForDataType(VisibleDataType.TAGS.toString())
    );

    const { list: commPkAsList, dict: commPkAsDict } = splitIntoListAndDict(
        visibleData.getVisibleDataForDataType(VisibleDataType.COMMPK.toString())
    );

    const tagNos = tagsAsList;
    tagNos.push(...Object.keys(tagsAsDict));

    const commPksForTags = await getCommPksNoForChecklistsForTagNos(tagNos);
    const allVisibleCommPkNos = [...commPkAsList, ...Object.values(commPksForTags)];
    const commPkNos = [...new Set(allVisibleCommPkNos)];
    const commPksWithInfo = await getLocalProCoSysCommPacksForCommPkNos(commPkNos);
    const commPksHandoverStatusForTags = Object.keys(commPksWithInfo).reduce((r: Dictionary<string>, key) => {
        r[key] = getCommPackStatus(commPksWithInfo[key]);
        return r;
    }, {});

    if (
        commPkNos.length !== Object.keys(commPksWithInfo).length ||
        tagNos.length !== Object.keys(commPksForTags).length
    ) {
        const allStatuses = Object.assign({}, commPksHandoverStatusForTags, commPkAsDict);
        const statuses = Object.values(allStatuses);
        statuses.push(getCommPackStatus([]));
        return [...new Set(statuses)];
    }

    const allStatuses = Object.assign({}, commPksHandoverStatusForTags, commPkAsDict);
    return [...new Set(Object.values(allStatuses))];
};

export const getAllNotificationStatuses = async (): Promise<string[]> => {
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict(
        visibleData.getVisibleDataForDataType(VisibleDataType.TAGS.toString())
    );
    const tagNos = tagsAsList;
    tagNos.push(...Object.keys(tagsAsDict));
    const notificationsForTagNos = await getNotificationsForTagNos(tagNos);

    const { dict: notificationAsDict } = splitIntoListAndDict(
        visibleData.getVisibleDataForDataType(VisibleDataType.NOTIFICATIONS.toString())
    );

    const allStatuses = Object.assign({}, notificationsForTagNos, notificationAsDict);

    return [...new Set(Object.values(allStatuses))];
};

export const getAllNotificationStatusesForAppKey = async (appKey: string): Promise<Dictionary<string>> => {
    const { list: tagsAsList, dict: tagsAsDict } = splitIntoListAndDict([
        visibleData.getVisibleDataForAppKeyAndDataType(appKey, VisibleDataType.TAGS.toString())
    ]);
    const tagNos = tagsAsList;
    tagNos.push(...Object.keys(tagsAsDict));
    const notificationsForTagNos = await getNotificationsForTagNos(tagNos);

    const { dict: notificationAsDict } = splitIntoListAndDict([
        visibleData.getVisibleDataForDataType(VisibleDataType.NOTIFICATIONS.toString())
    ]);

    const allStatuses = Object.assign({}, notificationsForTagNos, notificationAsDict);

    return allStatuses;
};

export const getNotificationsForTagNos = async (tagNos: string[]): Promise<Dictionary<string>> => {
    const notificationsForTagNos = await getLocalNotificationsForTags(tagNos);

    const resultDict = {} as Dictionary<string>;
    for (const tagNo of tagNos) {
        const tagWithNotification = notificationsForTagNos[tagNo];
        if (!tagWithNotification) {
            resultDict[tagNo] = 'Unknown';
        } else {
            resultDict[tagNo] = getNotificationStatus(tagWithNotification);
        }
    }
    return resultDict;
};
