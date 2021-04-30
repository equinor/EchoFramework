import echoCore, { Panel, PanelType } from '@equinor/echo-core';
import PageMenu from '../components/pageMenu/pageMenu';
import SearchMenu from '../components/searchMenu/searchMenu';
import EELogo from '../icons/logo_ee';
import Search from '../icons/search';

/** 
* Core Main menu panel registered at client startup
*/
const mainMenu: Panel = {
    component: PageMenu,
    panelType: 'right' as PanelType,
    key: echoCore.ECHO_CORE_MAIN,
    icon: EELogo,
    label: 'Echo'
};

/** 
* Core Application search panel registered at client startup
*/
export const searchPanel: Panel = {
    component: SearchMenu,
    panelType: 'left' as PanelType,
    key: echoCore.ECHO_CORE_SEARCH,
    icon: Search,
    label: 'Echo Search'
};
