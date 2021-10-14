import { message, Modal } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ResponseData<T> {
  returnCode: number;

  result: T;

  returnMsg: string;

  // 后端数据返回没有抹平做的兼容
  success?: boolean;

  value?: T;
}

// 指定 axios 请求类型

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

// 指定请求地址

// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? AdminConfig.API_URL : '';

// 添加请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const token = getToken();

    // 获取用户token，用于校验
    /* eslint-disable  no-param-reassign */
    // if (token) {
    //   config.headers.token = token;
    // }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 添加响应拦截器，拦截登录过期或者没有权限

axios.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    if (!response.data) {
      return Promise.resolve(response);
    }

    // 登录已过期或者未登录
    if (response.data.returnCode === 401) {
      Modal.confirm({
        title: '系统提示',
        content: response.data.returnMsg,
        okText: '重新登录',
        onOk () {
          // store.dispatch(clearSideBarRoutes());
          // store.dispatch(logout());
          // window.location.href = `${
          //   window.location.origin
          // }/react-ant-admin/system/login?redirectURL=${encodeURIComponent(window.location.href)}`;
        },
      });

      return Promise.reject(new Error(response.data.returnMsg));
    }

    // 请求成功
    if (response.data.returnCode === 200) {
      return response.data.result as any;
    }

    // 请求成功，状态不为成功时
    // response?.data?.returnMsg && message.error(response.data.returnMsg);

    // window.location.href =
    //   'https://ss-test.zhonganonline.com/admin/user/loginOut';

    return Promise.reject({});
  },
  (error: AxiosError) => {
    message.error(error.message);

    return Promise.reject(error);
  },
);

// 统一发起请求的函数
export function request<T> (options: AxiosRequestConfig) {
  return axios.request<T>(options);
}
