export enum LegendType {
    Stid = 'Stid',
    CommPk = 'CommPk',
    CommPkStatus = 'CommPkStatus',
    MCCRStatus = 'MCCRStatus',
    CPCLStatus = 'CPCLStatus',
    Notifications = 'Notifications'
}

export const getLegendTypeAsString = (legendType: LegendType): string => {
    if (legendType === LegendType.CommPkStatus) {
        return 'CommPk Status';
    } else if (legendType === LegendType.MCCRStatus) {
        return 'MCCR Status';
    } else if (legendType === LegendType.CPCLStatus) {
        return 'CPCL Status';
    } else {
        return legendType.toString();
    }
};

export enum LegendStatus {
    Unknown = 'Unknown',
    //Stid statuses
    AsBuilt = 'AsBuilt',
    Planned = 'Planned',
    Reserved = 'Reserved',
    Future = 'Future',
    Historic = 'Historic',
    OutOfService = 'OutOfService',
    Voided = 'Voided',
    //Procosys statuses
    OK = 'OK',
    OS = 'OS',
    PA = 'PA',
    PB = 'PB',
    // CommPk statuses
    RFCCSent = 'RFCCSent',
    RFCCPartly = 'RFCCPartly',
    RFCC = 'RFCC',
    RFOCSent = 'RFOCSent',
    RFOCPartly = 'RFOCPartly',
    RFOC = 'RFOC',
    RFCCRejected = 'RFCCRejected',
    RFOCRejected = 'RFOCRejected',
    Error = 'Error'
}
