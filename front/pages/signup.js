import React, { useState, useCallback, memo, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import { SIGN_UP_REQUEST } from '../reducers/user';

// custom hook
export const useInput = (initValue) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const TextInput = memo(({ name, labelValue, value, onChange }) => {
  return (
    <Form.Item>
      <label htmlFor={name}>{labelValue}</label>
      <br />
      <Input name={name} value={value} required onChange={onChange} />
    </Form.Item>
  )
});

const SignUp = () => {
  const dispatch = useDispatch();
  const { me, isSigningUp } = useSelector((state) => state.user);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  useEffect(() => {
    if (me) {
      alert('로그인되어 루트창으로 이동합니데이');
      Router.push('/');
    }
  }, [me && me.id]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(password !== e.target.value);
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setTermError(!term);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        userId: id,
        password,
        nickname
      }
    });
  }, [id, nickname, password, passwordCheck, term]);

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <TextInput name="user_id" labelValue="아이디" value={id} onChange={onChangeId} />
        {/* <Input name="user-id" value={id} required onChange={onChangeId} /> */}
        <Form.Item>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </Form.Item>
        <Form.Item>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </Form.Item>

        <Form.Item>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError ? <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다</div> : null}
        </Form.Item>
        <Form.Item>
          <Checkbox name="user-term" onChange={onChangeTerm}>제로초님의 말에 동의합니까?</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
          {termError ? <div style={{ color: 'red' }}>약관에 동의하셔야 합니다</div> : null}
        </Form.Item>
      </Form>
    </>
  )
};

SignUp.proptypes = {

}



export default SignUp;