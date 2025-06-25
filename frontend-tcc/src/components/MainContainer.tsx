import { Container, Tabs, Center } from '@mantine/core';
import styles from '../css/modules/MainContainer.module.css';
import logo from '../assets/logo.png';
import { ProdutosContent } from './content/ProdutosContent';
import { HistoricoContent } from './content/HistoricoContent';

interface MainContainerProps {
    tabs: string[];
    tabsAtivas: string[];
    tabAtual: string | null;
    onTabChange: (value: string | null) => void;
    onRemoveTab: (e: React.MouseEvent, tab: string) => void;
}

export const MainContainer = (({
    tabs,
    tabsAtivas,
    tabAtual,
    onTabChange,
    onRemoveTab}
: MainContainerProps) => {

    return (
        <Container
            fluid
            h='100vh'
            w='100%'
            bg="var(--mantine-color-gray-1)"
            p={0}
            style={{display: 'flex', flexDirection: 'column'}}
        >
            <Tabs
                mt='20px'
                style={{flex: tabsAtivas.length > 0 ? '0 1 auto' : '1 1 auto'}}
                value={tabAtual}
                onChange={onTabChange}
            >
                {tabsAtivas.length > 0 ? (
                    <>
                        <Tabs.List>
                            {tabs.map(tab => (
                                tabsAtivas.includes(tab) && (
                                    <Tabs.Tab
                                        key={tab}
                                        value={tab}
                                        rightSection={
                                            <span
                                                className={styles.botaoCloseTabs}
                                                onClick={(e) => onRemoveTab(e, tab)}
                                            >
                                                ×
                                            </span>
                                        }
                                    >
                                        {tab}
                                    </Tabs.Tab>
                                )
                            ))}
                        </Tabs.List>

                        {tabsAtivas.includes("Produtos") && (
                            <Tabs.Panel value="Produtos" style={{flex: 1}}>
                                <ProdutosContent />
                            </Tabs.Panel>
                        )}
                        {tabsAtivas.includes("Histórico") && (
                            <Tabs.Panel value="Histórico" style={{flex: 1}}>
                                <HistoricoContent />
                            </Tabs.Panel>
                        )}
                    </>
                ) : (
                    <Center style={{
                        height: '100%',
                        width: '100%',
                        flex: 1,
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <img
                            src={logo}
                            width='300px'
                        />
                    </Center>
                )}
            </Tabs>
        </Container>
    );
});