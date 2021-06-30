export interface ToasterEvent {
    lifetime?: number;
    message: string;
    onClose?: () => void;
}
