import axios from 'axios';
import {
  FETCH_USER,
  FETCH_LIBRARY,
  FETCH_IMPRESSIONS,
  PLAY_SONG,
  FETCH_DEVICE,
  FETCH_TOP_SONGS
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

export const playSong = (token, deviceId, uri) => async dispatch => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      device_id: deviceId
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

export const fetchDevice = token => async dispatch => {
  const res = await axios.get('https://api.spotify.com/v1/me/player/devices', {
    headers: {
      Authorizations: `${this.props.auth.accessToken}`
    }
  });

  dispatch({ type: FETCH_DEVICE, payload: res._options.id });
};

export const fetchTopSongs = token => async dispatch => {
  const res = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      limit: 3
    }
  });

  dispatch({ type: FETCH_TOP_SONGS, payload: res.data.items });
};
