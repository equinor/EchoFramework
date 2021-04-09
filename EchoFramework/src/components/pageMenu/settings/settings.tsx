import { Divider } from '@equinor/eds-core-react';
import React from 'react';
import Asset from './asset';
import Profile from './profile';
import styles from './settings.module.css';

interface SettingsProps {
    trackEventOpenExternalLink: (linkTo: string) => void;
    isDisabled: boolean;
}

const Settings: React.FC<SettingsProps> = ({ trackEventOpenExternalLink, isDisabled }: SettingsProps) => {
    return (
        <div className={styles.container}>
            <Profile trackEventOpenExternalLink={trackEventOpenExternalLink} />
            <Divider variant="medium" />
            <Asset isDisabled={isDisabled} />
        </div>
    );
};

export default Settings;
