import { Group } from '@mantine/core';
import styles from '../css/modules/Navbar.module.css';

interface NavbarProps {
    tabs: string[];
    onItemClick: (item: string) => void;
}

export const Navbar = ({
    tabs,
    onItemClick
}: NavbarProps) => {


    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarMain}>
                <Group className={styles.header} justify="space-between">
                    <span>StockControl</span>
                </Group>
                {tabs.map((item) => (
                    <span
                        className={styles.link}
                        key={item}
                        onClick={(e) => {
                            e.preventDefault();
                            onItemClick(item);
                        }}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </nav>
    );
};