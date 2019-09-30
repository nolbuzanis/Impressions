import {
  FETCH_LIBRARY,
  FETCH_IMPRESSIONS,
  FETCH_DEVICE
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
    default:
      return state;
  }
};
