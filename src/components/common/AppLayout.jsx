import React from 'react';
import { Layout, Menu, Switch } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Footer } from 'antd/lib/layout/layout';
import HeaderNav from './HeaderNav';
import { Route } from 'react-router';
import Home from '../pages/home/Home';

const { Sider, Content } = Layout;

const AppLayout = () => {
  return (
      <>
        <HeaderNav />

        <Layout>
          <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                To Do List
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '24px 16px 0' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}></div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>To Do List App ©2021</Footer>
          </Layout>
        </Layout>
      </>
  );
};

export default AppLayout;
