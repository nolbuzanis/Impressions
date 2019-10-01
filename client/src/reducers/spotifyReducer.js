import {
  FETCH_LIBRARY,
  FETCH_IMPRESSIONS,
  FETCH_DEVICE,
  FETCH_TOP_SONGS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LIBRARY: {
      return { ...state, library: action.payload };
    }
    case FETCH_IMPRESSIONS: {
      return { ...state, audioFeatures: action.payload };
    }
    case FETCH_DEVICE: {
      return { ...state, activeDevice: action.payload };
    }
    case FETCH_TOP_SONGS: {
      return { ...state, users_top: action.payload };
    }
    default:
      return state;
  }
};
