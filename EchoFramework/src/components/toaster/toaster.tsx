import { Button, Chip, Snackbar } from '@equinor/eds-core-react';
import React from 'react';
import { ToasterMessage } from '../../types/toasterMessage';
import style from './toaster.module.css';


export interface Toaster {
    toastNumber: number;
    toast: ToasterMessage;
    numberOfToasts: number;
    onClose?: () => void;
}

const Toaster: React.FC<Toaster> = ({ toast, numberOfToasts, toastNumber, onClose }: Toaster) => {
    const { Action } = Snackbar;

    return (
        <Snackbar leftAlignFrom={'0'} open={true} onClose={onClose} className={style.toaster}>
            {toastNumber === numberOfToasts - 1 && numberOfToasts !== 1 && (
                <Chip variant="error" className={style.chip}>
                    {numberOfToasts}
                </Chip>
            )}
            {toast.message}
            {onClose && (
                <Action>
                    <Button variant="ghost" onClick={onClose}>
                        close
                    </Button>
                </Action>
            )}
        </Snackbar>
    );
};

export default Toaster;
