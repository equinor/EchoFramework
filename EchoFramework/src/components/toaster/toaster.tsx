import { Button, Chip, Snackbar } from '@equinor/eds-core-react';
import React from 'react';
import style from './toaster.module.css';

interface ToastMessage {
    id: number;
    msg: string;
}

interface Toaster {
    toastNr: number;
    toast: ToastMessage;
    numberOfToasts: number;
    onClose: () => void;
}

const Toaster: React.FC<Toaster> = ({ toast, numberOfToasts, toastNr, onClose }: Toaster) => {
    const { SnackbarAction } = Snackbar;

    return (
        <Snackbar leftAlignFrom={'0'} open={true} onClose={onClose} autoHideDuration={10000} className={style.toaster}>
            {toastNr === numberOfToasts - 1 && numberOfToasts !== 1 && (
                <Chip variant="error" className={style.chip}>
                    {numberOfToasts}
                </Chip>
            )}
            {toast.msg}
            <SnackbarAction>
                <Button variant="ghost" onClick={onClose}>
                    close
                </Button>
            </SnackbarAction>
        </Snackbar>
    );
};

export default Toaster;
