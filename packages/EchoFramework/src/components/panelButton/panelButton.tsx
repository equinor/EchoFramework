import { eventHub } from '@equinor/echo-base';
import { Icon } from '@equinor/eds-core-react';
import React, { EventHandler, ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { themeConst } from '../../theme/themeConst';
import style from './panelButton.module.css';

export enum Variants {
    OpenCloseButton = 'openCloseButton',
    SimpleButton = 'simpleButton',
    NotificationButton = 'notificationButton',
    MobileButton = 'mobileButton',
    NotificationMobileButton = 'notificationMobileButton'
}

export interface PanelButtonProps {
    label: string;
    title?: string;
    active: boolean;
    variant: Variants;
    children?: ReactElement;
    onClick?: EventHandler<SyntheticEvent>;
    className?: string;
}

const PanelButton: React.FC<PanelButtonProps> = ({
    onClick,
    label,
    children,
    variant,
    active,
    className
}: PanelButtonProps) => {
    const isChild = variant === Variants.SimpleButton;
    const isMobile = variant === Variants.MobileButton || variant === Variants.NotificationMobileButton;

    const [isSyncing, setIsSyncing] = useState<boolean>(false);

    useEffect(() => {
        if (variant !== Variants.NotificationButton) return;
        let isMounted = true;
        const unSubscribeSyncing = eventHub.subscribe('isSyncing', (active: boolean) => {
            if (isMounted) {
                setIsSyncing(active);
            }
        });

        return (): void => {
            isMounted = false;
            unSubscribeSyncing();
        };
    });

    const mutateIcon = (buttonVariant: Variants): React.ReactNode => {
        switch (buttonVariant) {
            case Variants.NotificationButton:
                return isSyncing && !active ? (
                    <Icon className={style.spinningIcon} color={themeConst.asBuilt} name={'sync'} />
                ) : isSyncing && active ? (
                    <Icon className={style.spinningIcon} color={themeConst.white} name={'sync'} />
                ) : active ? (
                    <Icon color={themeConst.white} name={'close'} />
                ) : (
                    children
                );
            case Variants.NotificationMobileButton:
                return isSyncing && !active ? (
                    <Icon className={style.spinningIcon} color={themeConst.asBuilt} name={'sync'} />
                ) : (
                    children
                );
            case Variants.OpenCloseButton:
                return active ? <Icon color={themeConst.white} name={'close'} /> : children;
            case Variants.MobileButton:
                return children;

            default:
                return children;
        }
    };

    return (
        <div className={`${style.buttonContainer} `}>
            <button
                className={`${className ? className : ''} ${style.pageMenuButton} ${
                    isChild ? style.toggleButton : ''
                } ${active && !isMobile ? style.activeButton : ''}`}
                onClick={onClick}
                title={label}
            >
                {mutateIcon(variant)}
            </button>
        </div>
    );
};

export default PanelButton;
