import { useState } from 'react';
import {MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Navbar } from './Navbar';
import { MainContainer } from './MainContainer';

export const TelaInicial = () => {
    const tabs = ['Produtos', 'Histórico'];
    const [tabsAtivas, settabsAtivas] = useState<string[]>([]);
    const [tabAtual, settabAtual] = useState<string | null>(null);

    const handleNavbarItemClick = (item: string) => {
        if (tabsAtivas.includes(item)) {
            settabAtual(item);
            return;
        }

        const newtabsAtivas = [...tabsAtivas, item];
        settabsAtivas(newtabsAtivas);
        settabAtual(item);
    };

    const removeTab = (e: React.MouseEvent, tab: string) => {
        e.stopPropagation();

        const tabIndex = tabsAtivas.indexOf(tab);
        const newtabsAtivas = tabsAtivas.filter(t => t !== tab);
        settabsAtivas(newtabsAtivas);

        if (tab === tabAtual) {
            if (newtabsAtivas.length === 0) {
                settabAtual(null);
            } else {
                const newTab = newtabsAtivas[Math.max(0, tabIndex - 1)] || newtabsAtivas[0];
                settabAtual(newTab);
            }
        }
    };

    return (
        <MantineProvider>
            <div style={{display: 'flex', height: '100vh'}}>
                <Navbar
                    tabs={tabs}
                    onItemClick={handleNavbarItemClick}
                />
                <MainContainer
                    tabs={tabs}
                    tabsAtivas={tabsAtivas}
                    tabAtual={tabAtual}
                    onTabChange={settabAtual}
                    onRemoveTab={removeTab}
                />
            </div>
        </MantineProvider>
    );
};
