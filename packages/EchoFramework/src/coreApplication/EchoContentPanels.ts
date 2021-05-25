import { ECHO_CORE_MAIN, ECHO_CORE_SEARCH, Panel, PanelType } from '@equinor/echo-core';
import PageMenu from '../components/pageMenu/pageMenu';
import SearchMenu from '../components/searchMenu/searchMenu';
import EELogo from '../icons/logo_ee';
import Search from '../icons/search';

/**
 * Core Main menu panel registered at client startup
 */
export const mainMenu: Panel = {
    component: PageMenu,
    panelType: 'right' as PanelType,
    key: ECHO_CORE_MAIN,
    icon: EELogo,
    label: 'Echo'
};

/**
 * Core Application search panel registered at client startup
 */
export const searchPanel: Panel = {
    component: SearchMenu,
    panelType: 'left' as PanelType,
    key: ECHO_CORE_SEARCH,
    icon: Search,
    label: 'Echo Search'
};
