import React from 'react';
import { Menu, Input } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';

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
      {children}
    </div>
  )
};

AppLayout.propTypes = {
  children: PropTypes.node
}

export default AppLayout;