import React from 'react';
import { Card, Avatar } from 'antd';

const UserProfile = ({ user }) => {
  return (
    <Card
      actions={[
        <div key="twit">짹짹<br />{user.Post.length}</div>,
        <div key="following">팔로잉<br />{user.Followings.length}</div>,
        <div key="follower">팔로워<br />{user.Followers.length}</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{user.nickname[0]}</Avatar>}
        title={user.nickname}
      />
    </Card>
  )
}

export default UserProfile;