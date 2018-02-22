import getState from '../redux/get-state';
import getSharedConfig from '../shared-config/shared-config';

export const getAccessToken = () => getState().user.accessToken;

const generateParams = (data) => Object.entries(data).map((pair) => pair.map(encodeURIComponent).join('=')).join('&');

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const getWithToken = (url, params, cancel, token) => {
  const headers = {};

  if (token) {
    headers.Authorization = getSharedConfig().AUTH_HEADER_PREFIX + token;
  }

  const options = {
    method: 'GET',
    headers,
    cache: true
  };

  const fullUrl = `${url}${params ? `?${generateParams(params)}` : ''}`;

  return fetch(fullUrl, options)
    .then((response) => handleErrors(response))
    .then((response) => response.json());
};

export const getByUrl = async (url, params, cancel) => {
  const token = getAccessToken();
  return Promise.resolve(getWithToken(url, params, cancel, token));
};
