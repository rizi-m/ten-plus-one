import { getCookie } from './cookies';

const token = getCookie('token');

export const suggestionCheck = (data) => {
  if (token) {
    return fetch('/api/movies/suggestion-check', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : '',
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('Movie suggestion check failed');
    });
  }
  return Promise.reject(new Error('Movie suggestion check failed'));
};

export const suggestMovie = (data) => {
  if (token) {
    return fetch('/api/movies/suggest-movie', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : '',
    });
  }
};
