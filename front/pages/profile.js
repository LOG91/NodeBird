import React from 'react';
import { Form, Input, Button, List, Icon, Card } from 'antd';
import { NicknameEditForm } from '../components/NicknameEditForm';

const Profile = () => {

  return (
    <div>
      <NicknameEditForm />
      <List
        style={{ margin: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        bordered
        dataSource={["제로초", "오석기", "Whale"]}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key={item} type="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ margin: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        bordered
        dataSource={["제로초", "오석기", "Whale"]}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key={item} type="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
};

export default Profile;