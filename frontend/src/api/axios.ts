import axios from 'axios';
import { requests } from './requests';
import { getCookie } from 'typescript-cookie';

const BASE_URL = requests.base_url;

const baseAPI = (url: string, options?: any) => {
  return axios.create({ baseURL: url, ...options });
};

const authAPI = (url: string, options?: any) => {
  return axios.create({ baseURL: url, ...options });
};

// axios 요청의 헤더에 토큰 넣기
// config의 any 타입은 임시
const setTokenHeader = (config: any) => {
  // 쿠키에 담긴 토큰 가져오기
  const token = getCookie('access-token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
};

export const baseInstance = baseAPI(BASE_URL);
export const authInstance = authAPI(BASE_URL);

authInstance.interceptors.request.use(setTokenHeader);
