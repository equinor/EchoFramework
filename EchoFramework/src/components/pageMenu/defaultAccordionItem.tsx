import { Icon } from '@equinor/echo-components';
import { Accordion } from '@equinor/eds-core-react';
import React from 'react';
import { themeConst } from '../../theme/themeConst';
import style from './accordionItem.module.css';

type DefaultAccordionItemProps = {
    isExpanded: boolean;
    handleClick: () => void;
    title: string;
    subtitle?: string;
    iconName: string;
    iconTitle: string;
    children: React.ReactChild | React.ReactChild[];
};

const { Item, Header, HeaderTitle, Panel } = Accordion;

const DefaultAccordionItem: React.FC<DefaultAccordionItemProps> = ({
    isExpanded,
    handleClick,
    title,
    subtitle,
    iconName,
    iconTitle,
    children
}: DefaultAccordionItemProps) => {
    return (
        <Item
            className={style.appMenuAccordionItem}
            isExpanded={isExpanded}
            onClick={(): void => {
                handleClick();
            }}
        >
            <Header className={style.appMenuAccordionItemHeader}>
                <Icon
                    color={themeConst.asBuilt}
                    title={iconTitle}
                    name={iconName}
                    className={style.accordionIconLeft}
                />
                <HeaderTitle>
                    {title}
                    <div className={style.accordionSubHeader}>{subtitle}</div>
                </HeaderTitle>
            </Header>
            <Panel>{isExpanded && children}</Panel>
        </Item>
    );
};

export default DefaultAccordionItem;
