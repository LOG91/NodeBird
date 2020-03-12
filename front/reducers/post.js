const initialState = {
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

const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

const addPost = () => ({
  type: ADD_POST
});

const addDummy = () => ({
  type: ADD_DUMMY,
  data: {
    content: 'Hello',
    UserId: 1,
    User: {
      nickname: 'seokki'
    }
  }
});


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state
      }
    case ADD_DUMMY:
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts]
      }
    default:
      return state;
  }
}

export default reducer;