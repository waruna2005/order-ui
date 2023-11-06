import React from 'react';
import { Button, Dropdown, Layout, Menu, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './css/HeaderNav.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../pages/auth/authSlice';

const { Header } = Layout;

export const HeaderNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = localStorage.getItem('firstname');

  const handleSignOut = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const menu = (
      <Menu>
        <Menu.Item key="1" onClick={handleSignOut}>
          Logout
        </Menu.Item>
      </Menu>
  );

  return (
      <Header className="site-layout-sub-header-background" style={{ padding: '0px' }}>
        <h3 className="app-logo">To Do List App</h3>
        <Space className="user-actions">
          <Dropdown menu={menu} placement="bottomRight" style={{ height: '30px' }}>
            <Button icon={<UserOutlined />}>Hi, {name}</Button>
          </Dropdown>
        </Space>
      </Header>
  );
};

export default HeaderNav;
