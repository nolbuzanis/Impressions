import axios from 'axios';
import {
  FETCH_USER,
  FETCH_LIBRARY,
  FETCH_IMPRESSIONS,
  PLAY_SONG
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUserLibrary = token => async dispatch => {
  const res = await axios.get('/api/current_user_library', {
    params: {
      token
    }
  });

  dispatch({ type: FETCH_LIBRARY, payload: res.data.library });
};

export const fetchUserImpressions = (ids, token) => async dispatch => {
  const res = await axios.get('/api/audio_features', {
    params: {
      ids,
      token
    }
  });

  dispatch({ type: FETCH_IMPRESSIONS, payload: res.data });
};

export const playSong = (token, uri) => async dispatch => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const data = {
    uris: [uri]
  };

  const res = await axios.put(
    'https://api.spotify.com/v1/me/player/play',
    data,
    config
  );

  dispatch({ type: PLAY_SONG, payload: res.data });
};
