import { ToasterMessage } from './toasterMessage';

export interface Toaster {
    toastNumber: number;
    toast: ToasterMessage;
    numberOfToasts: number;
    onClose?: () => void;
}
