import { EchoContent } from '@equinor/echo-framework';
import Info from 'components/info';
import React from 'react';

const App: React.FC = () => {
    return (
        <EchoContent>
            <Info />
        </EchoContent>
    );
};

export default App;
