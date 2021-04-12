import echoCore, { Panel, PanelType } from '@equinor/echo-core';
import PageMenu from '../components/pageMenu/pageMenu';
import SearchMenu from '../components/searchMenu/searchMenu';
import EELogo from '../icons/logo_ee.svg';
import Search from '../icons/search.svg';


export const mainMenu: Panel = {
    component: PageMenu,
    panelType: 'right' as PanelType,
    key: echoCore.ECHO_CORE_MAIN,
    icon: EELogo,
    label: 'Echo'
};

export const searchPanel: Panel = {
    component: SearchMenu,
    panelType: 'left' as PanelType,
    key: echoCore.ECHO_CORE_SEARCH,
    icon: Search,
    label: 'Echo Search'
};
