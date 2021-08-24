import Cookie from 'js-cookie';
// import { TOKEN_KEY } from '@/constants';

const tokenKey = 'abc';

const setToken = (token) => {
	return Cookie.set(tokenKey, token);
};

const getToken = () => {
	return Cookie.get(tokenKey);
};

const removeToken = () => {
	return Cookie.remove(tokenKey);
};

const checkTokenExists = () => {
	return Boolean(getToken());
};

export { setToken, getToken, removeToken, checkTokenExists };
