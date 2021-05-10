export interface ToasterMessage {
    id: number;
    message: string;
    onClose?: () => void;
}
