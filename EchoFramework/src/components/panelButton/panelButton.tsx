import { Icon } from '@equinor/eds-core-react';
import React, { EventHandler, ReactElement, SyntheticEvent, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { SystemKey } from '../../../services/offlineSync/offlineSyncSetup';
// import { RootState } from '../../../store';
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
    // const syncingStatuses = useSelector((state: RootState) => state.syncing);
    const [isSyncing, setIsSyncing] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;
        // const checkIfSyncing = (): boolean => {
        //     return (
        //         Object.keys(syncingStatuses).filter((key) => syncingStatuses[key as SystemKey].syncing === true)
        //             .length > 0
        //     );
        // };
        // const syncing: boolean = checkIfSyncing();
        if (isMounted) {
            setIsSyncing(false);
        }
        return (): void => {
            isMounted = false;
        };
    }, []);

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
