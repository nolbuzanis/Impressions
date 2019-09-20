import { FETCH_LIBRARY } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_LIBRARY: {
      return { ...state, library: actiion.payload };
    }
    default:
      return state;
  }
};
