import { themeConst } from '@equinor/echo-components';
import { Icon } from '@equinor/eds-core-react';
import React from 'react';

interface CoreIconProps {
    name: string;
}

export const CoreIcon: React.FC<CoreIconProps> = ({ name }: CoreIconProps) => (
    <Icon color={themeConst.equiGreen1} name={name} />
);
