import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Input, Row, Col, Card, Avatar, Form, Button } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { LoginForm } from '../LoginForm';
import { UserProfile } from '../UserProfile';


const AppLayout = ({ children }) => {
  const { user, isLoggedIn } = useSelector(state => state.user);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item><Link href="/"><a>노드버드</a></Link></Menu.Item>
        <Menu.Item><Link href="/profile"><a>Profile</a></Link></Menu.Item>
        <Menu.Item>
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      <Link href="/signup"><button>회원가입</button></Link>
      <Row gutter={10}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile user={user} /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>세번째</Col>
      </Row>
    </div>
  )
};

AppLayout.propTypes = {
  children: PropTypes.node
}

export default AppLayout;