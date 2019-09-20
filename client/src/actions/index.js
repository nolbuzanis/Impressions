import axios from 'axios';
import { FETCH_USER, FETCH_LIBRARY } from './types';

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
  const songs = [];
  // res.data.items.forEach(({ track }) => {
  //   songs.push(track);
  // });
  dispatch({ type: FETCH_LIBRARY, payload: res.data });
};
