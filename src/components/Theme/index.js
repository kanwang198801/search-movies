
import * as React from 'react';
import { Layout } from 'antd';
import styles from './styles.module.css';

const { Footer, Content } = Layout;
function Theme({ children }) {
    return (
        <Layout className="layout" style={{ backgroundColor: '#fff' }} >
            <Content style={{ padding: '50px' }}>
                <div className={styles.Container}>
                    <div className="site-layout-content">{children}</div>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Created By Kan Wang</Footer>
        </Layout>
    );
}
export default Theme;