import axios from 'axios';
import { requests } from './requests';
import { getCookie, setCookie } from 'typescript-cookie';

const BASE_URL = requests.base_url;

const baseAPI = (url: string, options?: any) => {
  return axios.create({ baseURL: url, ...options });
};

const authAPI = (url: string, options?: any) => {
  return axios.create(
    { 
      baseURL: url,
      ...options 
    }
  );
};

// axios 요청의 헤더에 토큰 넣기
// config의 any 타입은 임시
const setTokenHeader = (config: any) => {
  // 쿠키에 담긴 토큰 가져오기
  const token = getCookie('access-token');
  console.log(token);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

export const baseInstance = baseAPI(BASE_URL);
export const authInstance = authAPI(BASE_URL);

authInstance.interceptors.request.use(setTokenHeader);

// 토큰 재발급
// authInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     if (status === 401) {
//       const refreshToken = getCookie('refresh-token');

//       try {
//         const { data } = await axios({
//           method: 'get',
//           url: BASE_URL + `/api/auth/refresh`,
//           headers: {
//             Authorization: `Bearer ${refreshToken}`,
//           }
//         });
//         if (data) {
//           setCookie('access-token', data);
//           config.headers["Authorization"] = `Bearer ${getCookie('access-token')}`;
//           return authInstance.request(config);
//         }
//       }
//       catch (error) {
//         console.log(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );