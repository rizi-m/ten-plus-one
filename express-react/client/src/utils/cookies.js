export const setCookie = (name, value, expiryDays) => {
  const date = new Date();
  date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
  const expiration = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expiration};path=/`;
}

export const getCookie = (cname) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const splitCookie = decodedCookie.split(';');
  for (let i = 0; i < splitCookie.length; i++) {
    let c = splitCookie[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export const deleteCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}