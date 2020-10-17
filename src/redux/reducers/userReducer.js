import {SAVE_USER_PROFILE, GET_USER_PROFILE, SIGN_OUT} from '../actionTypes';

const initialState = {
  id: '',
  phone: '',
  name: '',
  street: '',
  house: '',
  entrance: '',
  floor: '',
  apartment: ''
};

export function userReducer (state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE: {
      return {
        ...state,
        ...action.user
      };
    }
    case SAVE_USER_PROFILE: {
      return {
        ...state
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        ...initialState
      };
    }
    default: return state;
  }
}
