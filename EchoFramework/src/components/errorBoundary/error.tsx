import { Button, Icon } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import React, { ErrorInfo } from 'react';
import { themeConst } from '../../theme/themeConst';
import style from './error.module.css';

Icon.add({ error_filled });

type Props = {
    error: Error;
    errorInfo: ErrorInfo;
};

const Error: React.FC<Props> = ({error, errorInfo}: Props) => (
    <div className={style.container}>
        <Icon color={themeConst.darkEquiRed} name="error_filled" size={48} />
        <h1>Hmm, something went wrong..</h1>
        <p>An unexpected {error.name} has occurred, please try again.</p>
        <Button variant="outlined">Read more</Button>
        {errorInfo.componentStack}
    </div>
);

export default Error;
