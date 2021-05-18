import { Panel, usePanels } from '@equinor/echo-core';
import React, { useEffect, useState } from 'react';
import { edsIcons } from '../../icons/edsIons';
import PanelButton, { Variants } from '../panelButton/panelButton';
import { CoreIcon } from './corePanelIcon';
import style from './corePanelLeft.module.css';

edsIcons();

const CorePanelLeft: React.FC = () => {
    const { modulePanels, setActivePanel, activePanel, isPanelActive, panelUI } = usePanels();
    const [panels, setPanels] = useState<Panel[]>([]);

    useEffect(() => {
        setPanels(modulePanels);
    }, [modulePanels]);

    const PanelContent = panels.find((panel) => panel.key === activePanel)?.component;

    return (
        <>
            <div className={`${style.wrapper} ${isPanelActive ? style.active : ''}`} style={panelUI.panelWrapper}>
                <div className={style.drawer} style={panelUI.panel}>
                    {activePanel && PanelContent ? <PanelContent /> : <div></div>}
                </div>

                <div className={style.buttonContainer} style={panelUI.panelButton}>
                    {panels.map((panel: Panel, i) => {
                        const Icon = panel.icon;
                        return (
                            <PanelButton
                                key={i}
                                onClick={(e: React.SyntheticEvent<Element>): void => {
                                    e.stopPropagation();
                                    setActivePanel(panel.key === activePanel ? '' : panel.key);
                                }}
                                label={panel.label}
                                variant={Variants.OpenCloseButton}
                                active={activePanel !== '' && activePanel === panel.key}
                                className={`${style.button}`}
                            >
                                {typeof panel.icon === 'string' ? <CoreIcon name={panel.icon} /> : <Icon />}
                            </PanelButton>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default CorePanelLeft;
