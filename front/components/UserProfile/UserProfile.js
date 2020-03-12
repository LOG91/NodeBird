import React, {useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: 'LOG_OUT'
    })
  }, []);

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
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile;