import { Button, Icon } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import React from 'react';
import { themeConst } from '../../theme/themeConst';
import style from './error.module.css';

Icon.add({ error_filled });

const Error: React.FC = () => {
    return (
        <div className={style.container}>
            <Icon color={themeConst.darkEquiRed} name="error_filled" size={48} />
            <h1>Hmm, something went wrong..</h1>
            <p>An unexpected error has occurred, please try again.</p>
            <Button variant="outlined">Read more</Button>
        </div>
    );
};

export default Error;
