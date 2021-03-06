import axios from 'axios';

export default function request(config) {
  const instance = axios.create({
    baseURL: 'http://47.107.99.40:8889',
  });
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );
  return instance(config);
}
