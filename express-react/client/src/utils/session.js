import { deleteCookie, getCookie } from './cookies';

export const logIn = () => {
  const token = getCookie('token');
  const errorMessage = 'User not authenticated';
  if (token) {
    return fetch('/api/check', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(errorMessage);
    });
  }
  return Promise.reject(new Error(errorMessage));
};

export const logOut = () => {
  return fetch('/api/logout').then((res) => {
    if (res.status === 200) {
      deleteCookie('token');
    } else {
      throw new Error(`Unexpected error - status: ${res.status}`);
    }
  });
};
