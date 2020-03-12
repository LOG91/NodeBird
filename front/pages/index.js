import React, { useEffect } from 'react';
import { PostForm } from '../components/PostForm';
import { PostCard } from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../reducers/user';


const Home = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(state => state.user);
  const { imagePaths, mainPosts } = useSelector(state => state.post);
  useEffect(() => {
    // dispatch({
    //   type: "LOG_IN",
    //   data: {
    //     nickname: '제로초'
    //   }
    // })
    // dispatch(loginAction);
  }, []);

  return (
    <div>
      {user ? (<div>로그인 했습니다 id: {user.nickname}</div>) : <div>로그아웃 했습니다</div>}
      {isLoggedIn &&
        PostForm({ imagePaths })}
      {mainPosts.map((c) => {
        return (
          <PostCard key={c.User.id} post={c} />
        )
      })}
    </div>
  );
};

export default Home;