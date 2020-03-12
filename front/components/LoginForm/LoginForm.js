import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../reducers/user';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useInput } from '../../pages/signup';

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();

  const onSubmit = useCallback((e) => {
    dispatch(loginAction);
    e.preventDefault();
  }, [id, password]);

  return (
    <Form onSubmit={onSubmit} style={{ padding: "10px" }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" required value={id} onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" type="password" required value={password} onChange={onChangePassword} />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button loading={false}>회원가입</Button></a></Link>
      </div>
    </Form>
  )
}

export default LoginForm;