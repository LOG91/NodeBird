import React, { useEffect } from 'react';
import { PostForm } from '../components/PostForm';
import { PostCard } from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../reducers/user';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';


const Home = () => {
  const dispatch = useDispatch();
  const { user, me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    })
  }, []);

  return (
    <div>
      {user ? (<div>로그인 했습니다 id: {user.nickname}</div>) : <div>로그아웃 했습니다</div>}
      {me &&
        <PostForm />}
      {mainPosts.map((c) => {
        return (
          <PostCard key={c.id} post={c} />
        )
      })}
    </div>
  );
};

export default Home;