import { Icon } from '@equinor/echo-components';
import { ECHO_CORE_MAIN, Panel, usePanels } from '@equinor/echo-core';
import React, { memo, useEffect, useState } from 'react';
import { edsIcons } from '../../icons/edsIons';
import { themeConst } from '../../theme/themeConst';
import PanelButton, { Variants } from '../panelButton/panelButton';
import style from './corePanelRight.module.css';

edsIcons();

const CorePanelRight: React.FC = () => {
    const { modulePanels, setActivePanel, activePanel, isPanelActive, panelUI } = usePanels('right');
    const [panels, setPanels] = useState<Panel[]>([]);

    useEffect(() => {
        setPanels(modulePanels);
    }, [modulePanels]);

    const PanelContent = panels.find((panel) => panel.key === activePanel)?.component;
    return (
        <>
            <div className={`${style.wrapper} ${isPanelActive ? style.active : ''}`} style={panelUI.panelWrapper}>
                <div className={style.drawer} style={panelUI.panel}>
                    {activePanel && PanelContent ? <PanelContent /> : <></>}
                </div>

                <div className={style.buttonContainer} style={panelUI.panelButton}>
                    {panels.map((panel: Panel, i) => {
                        const PanelIcon = panel.icon;
                        return (
                            <PanelButton
                                key={i}
                                label={panel.label}
                                variant={
                                    panel.key === ECHO_CORE_MAIN
                                        ? Variants.NotificationButton
                                        : Variants.OpenCloseButton
                                }
                                active={activePanel !== '' && activePanel === panel.key}
                                onClick={(e: React.SyntheticEvent<Element>): void => {
                                    e.stopPropagation();
                                    setActivePanel(panel.key === activePanel ? '' : panel.key);
                                }}
                                className={`${style.button}`}
                            >
                                {typeof panel.icon === 'string' ? (
                                    <Icon color={themeConst.equiGreen1} name={panel.icon} />
                                ) : (
                                    <PanelIcon />
                                )}
                            </PanelButton>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default memo(CorePanelRight);
function useEds() {
    throw new Error('Function not implemented.');
}
