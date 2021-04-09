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

const { AccordionItem, AccordionHeader, AccordionHeaderTitle, AccordionPanel } = Accordion;

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
        <AccordionItem
            className={style.appMenuAccordionItem}
            isExpanded={isExpanded}
            onClick={(): void => {
                handleClick();
            }}
        >
            <AccordionHeader className={style.appMenuAccordionItemHeader}>
                <Icon
                    color={themeConst.asBuilt}
                    title={iconTitle}
                    name={iconName}
                    className={style.accordionIconLeft}
                />
                <AccordionHeaderTitle>
                    {title}
                    <div className={style.accordionSubHeader}>{subtitle}</div>
                </AccordionHeaderTitle>
            </AccordionHeader>
            <AccordionPanel>{isExpanded && children}</AccordionPanel>
        </AccordionItem>
    );
};

export default DefaultAccordionItem;
