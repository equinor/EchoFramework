import EchoCore, { usePanels, usePlantSettings } from '@equinor/echo-core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultAccordionItem from './defaultAccordionItem';
import ApplicationList from './Navigation/applicationList';
import style from './pageMenu.module.css';
import PageMenuDrawerItem from './pageMenuDrawerItem';
import Settings from './settings/settings';
import Version from './version/version';

type AccordionItemId = 'Sync' | 'Notification' | 'Apps' | 'Profile' | 'None';
interface PageMenuProps {
    trackEventOpenExternalLink: (linkTo: string) => void;
    isSyncing: boolean;
}

/**
 * Component for displaying a side menu including Home button, Profile, About Echo link and Terms & Conditions link.
 * @param {PageMenuProps} {
 * trackEventOpenExternalLink: Function for tracking event in appInsight.
 * isSyncing: Flag to determine whether the app is currently syncing data or not.
 * }
 * @return {*}
 */
const PageMenu: React.FC<PageMenuProps> = ({ trackEventOpenExternalLink, isSyncing }: PageMenuProps) => {
    const { setActivePanel } = usePanels();
    const { instCode: selectedInstCode, plantName: selectedPlantName } = usePlantSettings();

    const [expandedAccordion, setExpandedAccordion] = useState<AccordionItemId>(isSyncing ? 'Sync' : 'None');

    return (
        <div className={style.pageMenuDrawer}>
            <div className={style.appMenuContainer}>
                <PageMenuDrawerItem
                    iconName={'EELogo'}
                    iconTitle={'Home'}
                    trackEventOpenExternalLink={trackEventOpenExternalLink}
                >
                    <Link
                        to={`/?instCode=${selectedInstCode}`}
                        onClick={(): void => {
                            setActivePanel('');
                        }}
                        className={style.appMenuHeaderLink}
                    >
                        Home
                    </Link>
                </PageMenuDrawerItem>

                <DefaultAccordionItem
                    isExpanded={expandedAccordion === 'Profile'}
                    handleClick={(): void => setExpandedAccordion('Profile')}
                    title="Profile &amp; Settings"
                    subtitle={selectedPlantName}
                    iconName="account_circle"
                    iconTitle="Profile and settings"
                >
                    <Settings trackEventOpenExternalLink={trackEventOpenExternalLink} isDisabled={isSyncing} />
                </DefaultAccordionItem>

                <DefaultAccordionItem
                    isExpanded={expandedAccordion === 'Apps'}
                    handleClick={(): void => setExpandedAccordion('Apps')}
                    title="Apps"
                    iconName="apps"
                    iconTitle="Applications"
                >
                    <ApplicationList />
                </DefaultAccordionItem>
                <PageMenuDrawerItem
                    externalLink={{
                        link: 'https://statoilsrm.sharepoint.com/sites/Echo/SitePages/How-to-use-Echo.aspx',
                        linkText: 'About Echo',
                        trackEvent: 'aboutEcho'
                    }}
                    iconName={'email_alpha'}
                    iconTitle={'About echo'}
                    trackEventOpenExternalLink={trackEventOpenExternalLink}
                />

                <PageMenuDrawerItem
                    externalLink={{
                        link: 'https://statoilsrm.sharepoint.com/sites/Echo/SitePages/About-Echo.aspx',
                        linkText: 'Terms & Conditions',
                        trackEvent: 'aboutEchoTermsAndConditions'
                    }}
                    iconName={'assignment'}
                    iconTitle={'Terms and conditions'}
                    trackEventOpenExternalLink={trackEventOpenExternalLink}
                />

                <PageMenuDrawerItem
                    iconName={'exit_to_app'}
                    iconTitle={'Sign out'}
                    trackEventOpenExternalLink={trackEventOpenExternalLink}
                >
                    <Link
                        className={style.appMenuHeaderLink}
                        to=""
                        onClick={(): void => EchoCore.EchoAuthProvider.logout()}
                    >
                        Sign out
                    </Link>
                </PageMenuDrawerItem>

                <div className={style.versionInformation}>
                    <Version />
                </div>
            </div>
        </div>
    );
};

export default PageMenu;
