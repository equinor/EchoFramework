import { useEventSubscriber } from '@equinor/echo-core';
import React, { useState } from 'react';
import { Toast } from '../..';
import { ToasterEvent } from '../../types/toasterEvent';
import { ToasterMessage } from '../../types/toasterMessage';
import style from './toaster.module.css';

let toasterList = [] as Array<ToasterMessage>;

const Toasters: React.FC = () => {
    const [count, setCount] = useState(0);
    const [toastsCount, setToastsCount] = useState(toasterList.length);

    const updateToasterList = (): void => {
        setToastsCount(toasterList.length);
    };

    const cleanupToasters = (lifetime?: number): void => {
        setTimeout(
            () => {
                toasterList = [...toasterList.filter(({ id }) => id !== count)];
                updateToasterList();
            },
            lifetime ? lifetime : 60000
        );
        updateToasterList();
    };

    const handleEvent = (payload: ToasterEvent): void => {
        const toast = {
            id: count,
            message: payload.message,
            onClose: payload.onClose
        } as ToasterMessage;

        toasterList = [...toasterList, toast];

        cleanupToasters(payload.lifetime);
        setCount(count + 1);
    };

    useEventSubscriber<ToasterEvent>('Toaster', handleEvent);

    return (
        <section className={`toasters ${style.toastersSection}`}>
            {toasterList
                .sort((a, b) => b.id - a.id)
                .map((toast: ToasterMessage, key: number) => {
                    return (
                        <Toast
                            toast={toast}
                            key={toast.id}
                            toastNumber={key}
                            numberOfToasts={toastsCount}
                            onClose={toast.onClose}
                        />
                    );
                })}
        </section>
    );
};

export default Toasters;
