import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    dispatch({
      type: 'LOG_OUT_REQUEST',
    });
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">짹짹<br />{me.Post.length}</div>,
        <div key="following">팔로잉<br />{me.Followings.length}</div>,
        <div key="follower">팔로워<br />{me.Followers.length}</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile;