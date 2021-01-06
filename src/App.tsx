import Info from 'components/Info';
import React from 'react';
import { EchoContent } from './coreApplication';

const App: React.FC = () => {
    return (
        <EchoContent>
            <Info />
        </EchoContent>
    );
};

export default App;
