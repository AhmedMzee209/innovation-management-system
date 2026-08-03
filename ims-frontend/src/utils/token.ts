export const TOKEN_KEY = 'ims_token';
export const REFRESH_TOKEN_KEY = 'ims_refresh_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_TOKEN_KEY, token);
export const removeRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_KEY);
