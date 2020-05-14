export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'whale',
    },
    content: '첫 번째 게시글',
    img: 'https://cdn.mos.cms.futurecdn.net/3PPyiDpC8wHbCSB6ZnAWLL.jpg',
    Comments: [],
  }], // 화면에 보일 포스트
  imagePaths: [], // 미리보기 이미지 경로
  isAddingPost: false, // 포스트 업로드중
  addPostErrorReason: '', // 포스트 업로드 실패 사유
  postAdded: false,
  isAddingComment: false,
  addCommentErrorReason: '',
  commentAdded: false,
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: 'whale',
  },
  content: '나는 더미입니다.',
  Comments: [],
};

const dummyComment = {
  id: 1,
  User: {
    id: 1,
    nickname: 'whale',
  },
  createdAt: new Date(),
  content: '더미 댓글입니다',
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

const REMOVE_IMAGE = 'REMOVE_IMAGE';

const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const ROAD_COMMENTS_REQUEST = 'ROAD_COMMENTS_REQUEST';
const ROAD_COMMENTS_SUCCESS = 'ROAD_COMMENTS_SUCCESS';
const ROAD_COMMENTS_FAILURE = 'ROAD_COMMENTS_FAILURE';

const RETWEET_REQUEST = 'RETWEET_REQUEST';
const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
const RETWEET_FAILURE = 'RETWEET_FAILURE';

const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

// 포스트 수정 기능은 숙제!
//
//

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        isAddingPost: true,
        addPostErrorReason: '',
        postAdded: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isAddingPost: false,
        mainPosts: [action.data, ...state.mainPosts],
        postAdded: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isAddingPost: false,
        addCommentErrorReason: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isAddingComment: true,
        addCommentErrorReason: '',
        commentAdded: false,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
      const post = state.mainPosts[postIndex];
      const Comments = [...post.Comments, dummyComment];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };

      return {
        ...state,
        isAddingComment: false,
        mainPosts,
        commentAdded: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isAddingComment: false,
        addCommentErrorReason: action.error,
      };

    case LOAD_MAIN_POSTS_REQUEST:
      return {
        ...state,
        mainPosts: [],
      };
    case LOAD_MAIN_POSTS_SUCCESS:
      return {
        ...state,
        mainPosts: action.data,
      };
    case LOAD_MAIN_POSTS_FAILURE:
      return {
        ...state,
        isAddingPost: false,
        addCommentErrorReason: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
