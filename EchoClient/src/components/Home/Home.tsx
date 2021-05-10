import { AppLinks } from '@equinor/echo-framework';
import React from 'react';

export const Home: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', paddingTop: 150 }}>
            <h1>Echo Demo Home</h1>
            <AppLinks isHome={true} />
        </div>
    );
};
