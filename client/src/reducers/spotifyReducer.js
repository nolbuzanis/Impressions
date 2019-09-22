import { FETCH_LIBRARY, FETCH_IMPRESSIONS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LIBRARY: {
      return { ...state, library: action.payload };
    }
    case FETCH_IMPRESSIONS: {
      return { ...state, impressions: action.payload };
    }
    default:
      return state;
  }
};
