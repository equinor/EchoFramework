import { Icon } from '@equinor/echo-components';
import EchoCore from '@equinor/echo-core';
import React from 'react';
import { themeConst } from '../../../theme/themeConst';
import styles from './settings.module.css';

interface ProfileProps {
    trackEventOpenExternalLink: (linkTo: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ trackEventOpenExternalLink }: ProfileProps) => {
    const userInfo = EchoCore.useUserProfile();
    const userImage = EchoCore.useUserPhoto();

    return (
        <div className={styles.container}>
            <div className={styles.accountContainer}>
                {userImage && userImage.length > 0 ? (
                    <img src={userImage} alt={'profile'} className={styles.accountImage} />
                ) : (
                    <Icon
                        color={themeConst.asBuilt}
                        title={'Profile picture'}
                        name="account_circle"
                        size={48}
                        className={styles.accountIcon}
                    />
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
        </div>
    );
};

export default Profile;
