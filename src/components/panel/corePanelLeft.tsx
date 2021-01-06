import { Panel, usePanels } from '@equinor/echo-core';
import React, { useEffect, useState } from 'react';
import PanelButton, { Variants } from '../panelButton/panelButton';
import style from './corePanelLeft.module.css';

const CorePanelLeft: React.FC = () => {
    const { modulePanels, setActivePanel, activePanel, isPanelActive } = usePanels();
    const [panels, setPanels] = useState<Panel[]>([]);

    useEffect(() => {
        setPanels(modulePanels);
        console.log(modulePanels);
    }, [modulePanels]);

    const PanelContent = panels.find((panel) => panel.key === activePanel)?.component;

    return (
        <>
            <div className={`${style.wrapper} ${isPanelActive ? style.active : ''}`}>
                <div className={style.drawer}>{activePanel && PanelContent ? <PanelContent /> : <div></div>}</div>

                <div className={style.buttonContainer}>
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
                                <Icon />
                            </PanelButton>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default CorePanelLeft;
