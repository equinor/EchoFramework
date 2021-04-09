import React from 'react';
import PlantSelector from '../../plantSelector/plantSelector';
import styles from './settings.module.css';

interface AssetProps {
    isDisabled: boolean;
}

const Asset: React.FC<AssetProps> = ({ isDisabled }: AssetProps) => {
    return (
        <div className={styles.container}>
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

export default Asset;
