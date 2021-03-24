/* eslint-disable @typescript-eslint/camelcase */
import EchoCore from '@equinor/echo-core';
import { Divider, Icon } from '@equinor/eds-core-react';
import { account_circle } from '@equinor/eds-icons';
import React from 'react';
import { themeConst } from '../../../theme/themeConst';
import PlantSelector from '../../plantSelector/plantSelector';
import styles from './settings.module.css';

Icon.add({ account_circle });

interface SettingsProps {
    trackEventOpenExternalLink: (linkTo: string) => void;
    isDisabled: boolean;
}

const Settings: React.FC<SettingsProps> = ({ trackEventOpenExternalLink, isDisabled }: SettingsProps) => {
    const userInfo = EchoCore.useUserProfile();
    const userImage = EchoCore.useUserPhoto();

    return (
        <div className={styles.container}>
            <div className={styles.accountContainer}>
                {userImage && userImage.length > 0 ? (
                    <img src={userImage} alt={'profile'} className={styles.accountImage} />
                ) : (
                    <Icon color={themeConst.asBuilt} name="account_circle" size={48} className={styles.accountIcon} />
                )}
                <div className={styles.accountText}>
                    <div className={styles.accountName}>{userInfo?.displayName}</div>
                    <div className={styles.accountJobTitle}>{userInfo?.jobTitle}</div>
                    <a
                        onClick={(): void => trackEventOpenExternalLink('mailto')}
                        href={`mailto:${userInfo?.mail}`}
                        className={styles.accountEmail}
                    >
                        {userInfo?.mail}
                    </a>
                </div>
            </div>
            <Divider variant="medium" />
            <div className={styles.subMenu}>
                <h3 className={styles.subHeader}>Asset</h3>
                <div className={styles.subContainer}>
                    <label className={styles.assetLabel}>Asset</label>
                    <PlantSelector isDisabled={isDisabled} />
                </div>
            </div>
        </div>
    );
};

export default Settings;
