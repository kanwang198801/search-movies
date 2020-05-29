
import * as React from 'react';
import styles from './styles.module.css';

function Theme({ children }) {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {children}
            </div>
        </main>
    );
}
export default Theme;