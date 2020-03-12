const dummyUser = {
  name: 'Seokki Oh',
  nickname: 'seokki',
  age: 30,
  Post: [1, 2, 3],
  Followings: [1, 2, 3, 12, 3, 12, 412, 4, 1, 2, 41],
  Followers: [1, 2, 3, 123, 12, 312, 3, 12, 4, 2, 2, 2, 2, 1, 12, 1, 12, 12],
}

export const initialState = {
  isLoggedIn: false,
  user: null,
  signupData: {
    id: '',
    nickname: '',
    password: ''
  }
};


export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';

export const loginAction = {
  type: LOG_IN,
  data: {
    nickname: 'seokki'
  }
}

export const logoutAction = {
  type: LOG_OUT,
  data: {
    nickname: 'seokki'
  }
}

export const signupAction = (data) => ({
  type: SIGN_UP,
  data
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser,
      }
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
      case SIGN_UP:
        return {
          ...state,
          signupData: action.data
        }
    default:
      return state;
  }
};

export default reducer;