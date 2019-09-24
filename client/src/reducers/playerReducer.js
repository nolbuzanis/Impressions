import { PLAY_SONG } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case PLAY_SONG: {
      return { ...state, songPlaying: action.payload };
    }
    default:
      return state;
  }
};
