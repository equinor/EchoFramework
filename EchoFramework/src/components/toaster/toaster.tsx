import { Button, Chip, Snackbar } from '@equinor/eds-core-react';
import React from 'react';
import style from './toaster.module.css';

interface ToastMessage {
    id: number;
    message: string;
}

interface Toaster {
    toastNumber: number;
    toast: ToastMessage;
    numberOfToasts: number;
    onClose?: () => void;
}

const Toaster: React.FC<Toaster> = ({ toast, numberOfToasts, toastNumber, onClose }: Toaster) => {
    const { SnackbarAction } = Snackbar;

    return (
        <Snackbar leftAlignFrom={'0'} open={true} onClose={onClose} autoHideDuration={10000} className={style.toaster}>
            {toastNumber === numberOfToasts - 1 && numberOfToasts !== 1 && (
                <Chip variant="error" className={style.chip}>
                    {numberOfToasts}
                </Chip>
            )}
            {toast.message}
            {onclose && (
                <SnackbarAction>
                    <Button variant="ghost" onClick={onClose}>
                        close
                    </Button>
                </SnackbarAction>
            )}
        </Snackbar>
    );
};

export default Toaster;
