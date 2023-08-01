import { CONNECTION_TIMED_OUT, BAD_REQUEST } from './error-codes';

export const getQueryString = (params) => {
  let search = '';

  Object.keys(params).map((v, i) => {
    i ? (search += '&') : (search += '?');

    const value = params[v];

    Array.isArray(value)
      ? (search += value.reduce(
          (t, c, i) => `${i ? t + '&' : ''}${v}=${c}`,
          ''
        ))
      : (search += `${v}=${value}`);

    return v;
  });

  return search;
};

export const blobToDataURL = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

export const getError = (code) => {
  let error = new Error();

  return { ...error, code };
};

export const fetchData = async (url, init) => {
  const res = await fetch(url, init).catch(() => {
    throw getError(CONNECTION_TIMED_OUT);
  });

  if (!res.ok) {
    throw getError(`${BAD_REQUEST} (http ${res.status})`);
  }

  return res;
};
