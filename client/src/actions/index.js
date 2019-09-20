import axios from 'axios';
import { FETCH_USER, FETCH_LIBRARY } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUserLibrary = token => async dispatch => {
  const res = await axios.get('https://api.spotify.com/v1/me/tracks', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  dispatch({ type: FETCH_LIBRARY, payload: res.data.items });
};
