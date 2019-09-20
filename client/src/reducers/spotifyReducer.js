import { FETCH_LIBRARY } from '../actions/types';

export default (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_LIBRARY: {
      return { ...state, library: action.payload };
    }
    default:
      return state;
  }
};
