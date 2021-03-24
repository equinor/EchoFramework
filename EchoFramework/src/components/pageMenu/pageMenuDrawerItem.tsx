import { Icon } from '@equinor/eds-core-react';
import React from 'react';
import { ReactComponent as EELogo } from '../../icons/logo_ee.svg';
import { themeConst } from '../../theme/themeConst';
import style from './pageMenuDrawerItem.module.css';

interface ExternalLinkProps {
    link: string;
    linkText: string;
    trackEvent: string;
}

interface PageMenuDrawerItemProps {
    iconName: string;
    trackEventOpenExternalLink: (linkTo: string) => void;
    children?: React.ReactNode;
    externalLink?: ExternalLinkProps;
}

const PageMenuDrawerItem: React.FC<PageMenuDrawerItemProps> = ({
    iconName,
    children,
    externalLink,
    trackEventOpenExternalLink
}: PageMenuDrawerItemProps) => {
    const getIconForItem = (): JSX.Element => {
        if (iconName === 'EELogo') {
            return <EELogo className={style.accordionLogo} />;
        } else {
            return <Icon className={style.accordionLogo} color={themeConst.asBuilt} name={iconName} />;
        }
    };

    return (
        <div
            className={
                style.accordionLogoHeader +
                ' ' +
                (iconName === 'EELogo' ? style.accordionExtraHeight : style.borderBottom)
            }
        >
            {getIconForItem()}
            <div className={style.accordionLogoText}>
                {children}
                {externalLink && (
                    <a
                        target="_blank"
                        className={style.appMenuHeaderLink}
                        rel="noopener noreferrer"
                        href={externalLink.link}
                        onClick={(): void => trackEventOpenExternalLink(externalLink.trackEvent)}
                    >
                        {externalLink.linkText}
                    </a>
                )}
            </div>
            {externalLink && (
                <a
                    target="_blank"
                    className={style.accordionExternalLink}
                    rel="noopener noreferrer"
                    href={externalLink.link}
                    onClick={(): void => trackEventOpenExternalLink(externalLink.trackEvent)}
                >
                    <Icon size={16} color={themeConst.asBuilt} name={'external_link'} />
                </a>
            )}
        </div>
    );
};

export default PageMenuDrawerItem;
