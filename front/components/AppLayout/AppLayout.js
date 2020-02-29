import React from 'react';
import { Menu, Input, Row, Col, Card, Avatar, Form, Button } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { LoginForm } from '../LoginForm';
import { UserProfile } from '../UserProfile';

const dummy = {
  name: 'Seokki Oh',
  nickname: 'seokki',
  age: 30,
  Post: [1, 2, 3],
  Followings: [1, 2, 3, 12, 3, 12, 412, 4, 1, 2, 41],
  Followers: [1, 2, 3, 123, 12, 312, 3, 12, 4, 2, 2, 2, 2, 1, 12, 1, 12, 12],
  isLoggedIn: true
}
const AppLayout = ({ children }) => {
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
          {dummy.isLoggedIn ? <UserProfile user={dummy} /> : <LoginForm />}
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