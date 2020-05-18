import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { PostCard } from '../components/PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';

const Hashtag = ({ tag }) => {
  console.log(tag);
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
    });
  }, []);
  return (
    <div>
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired
}

Hashtag.getInitialProps = async (context) => {
  console.log('hashtag', context.query.tag);
  return { tag: context.query.tag }
}

// 가장 먼저 실행되는 라이프사이클이다 Next에서 제공해준다
// 가장 먼저 실행되기 때문에 이곳을 이용하여 SSR을 사용할 수 있다


export default Hashtag;