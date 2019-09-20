import axios from 'axios';
import { FETCH_USER, FETCH_LIBRARY, FETCH_IMPRESSIONS } from './types';

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

export const fetchUserImpressions = library => async dispatch => {
  const res = await axios.get('/api/audio_features', {
    params: library
  });

  dispatch({ type: FETCH_IMPRESSIONS, payload: res.data });
};