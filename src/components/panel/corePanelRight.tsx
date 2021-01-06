import echoCore, { Panel, usePanels } from '@equinor/echo-core';
import React, { memo, useEffect, useState } from 'react';
import PanelButton, { Variants } from '../panelButton/panelButton';
import style from './corePanelRight.module.css';

const CorePanelRight: React.FC = () => {
    const { modulePanels, setActivePanel, activePanel, isPanelActive } = usePanels('right');
    const [panels, setPanels] = useState<Panel[]>([]);

    useEffect(() => {
        setPanels(modulePanels);
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
                                label={panel.label}
                                variant={
                                    panel.key === echoCore.ECHO_CORE_MAIN
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
                                <Icon />
                            </PanelButton>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default memo(CorePanelRight);
