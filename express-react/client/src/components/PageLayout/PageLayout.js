import React from 'react';
import PropTypes from 'prop-types';
import './PageLayout.css';
import { useHistory, useLocation } from 'react-router';
import { Layout, Menu } from 'antd';

const { Header, Content, Sider } = Layout;

const PageLayout = ({ children, menuItems }) => {
  const history = useHistory();
  const location = useLocation();
  const defaultSelectedItem = menuItems.find((item) =>
    location.pathname.startsWith(item.url)
  );
  return (
    <>
      {defaultSelectedItem && (
        <Layout className='page-layout'>
          <Sider breakpoint='lg' collapsedWidth='0'>
            <div className='page-layout-logo-placeholder' />
            <Menu mode='inline' defaultSelectedKeys={[defaultSelectedItem.key]}>
              {menuItems.map(({ key, label, url }) => (
                <Menu.Item key={key} onClick={() => history.push(url)}>
                  {label}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  menuItems: PropTypes.array,
};

export default PageLayout;
