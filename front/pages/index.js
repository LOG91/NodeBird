import React from 'react';
import { PostForm } from '../components/PostForm';
import { PostCard } from '../components/PostCard';

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: 'whale',
    },
    content: '첫 번째 게시글',
    img: 'https://cdn.mos.cms.futurecdn.net/3PPyiDpC8wHbCSB6ZnAWLL.jpg'
  }]
};

const Home = () => {

  return (
    <div>
      {dummy.isLoggedIn &&
        PostForm({ imagePaths: dummy.imagePaths })}
      {dummy.mainPosts.map((c) => {
        return (
          <PostCard key={c.User.id} post={c} />
        )
      })}
    </div>
  );
};

export default Home;