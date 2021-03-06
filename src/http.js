/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import router from './router'
import Vue from 'vue'

// axios 配置
axios.defaults.timeout = 5000;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么486d88c9c827406d9a31c9ca22c2cd89
    // console.log(config) c6bea31a058c4fceb7fa3e41ab8d0df3
    // console.log(GLOBALS.accessToken)
    // GLOBALS.accessToken = '17a586ffec6f49c286e99b328ca8997c';
    if(GLOBALS.accessToken) {
        config.headers.Authorization = GLOBALS.accessToken;
    }
    // config.headers.Authorization = '83a65a0f38b1433081db1cc896538f19';
    config.headers['App-Channel'] = GLOBALS.channel;
    config.headers['App-Version'] = '3.0.0.0';
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
    // return '';
  });

// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     console.log('相应成功');
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     console.log('响应失败');
//     return Promise.reject(error);
//   });

axios.interceptors.response.use(
    response => {
        var res = JSON.parse(response.request.response);
        if(res && res.code && res.code != 200) {
            switch (res.code) {
                case 400:
                    Vue.$toast({
                        message: '请求处理失败',
                        duration: 1500
                    });
                    break;
                case 401:
                    // Vue.$toast({
                    //     message: '未授权，请登录！',
                    //     duration: 1500
                    // });
                    GLOBALS.accessToken = '';
                    break;
                case 404:
                    Vue.$toast({
                        message: '请求地址出错！',
                        duration: 1500
                    });
                    break;
                 case 408:
                    Vue.$toast({
                        message: '请求超时',
                        duration: 1500
                    });
                    break;
                case 500:
                    Vue.$toast({
                        message: '服务器内部错误',
                        duration: 1500
                    });
                    break;

                case 501:
                    Vue.$toast({
                        message: '服务未实现',
                        duration: 1500
                    });
                    break;

                case 502:
                    Vue.$toast({
                        message: '网关错误',
                        duration: 1500
                    });
                    break;

                case 503:
                    Vue.$toast({
                        message: '服务不可用',
                        duration: 1500
                    });
                    break;

                case 504:
                    Vue.$toast({
                        message: '网关超时',
                        duration: 1500
                    });
                    break;
                case 122,101:
                    break;
                default:
                    var  result = response.config && response.config.data;
                     if(result) {
                        result = JSON.parse(result);
                        if(result && result.isShowTotast == 'false') {
                            break;
                        }
                     }
                     Vue.$toast({
                        message: res.message,
                        duration: 1500
                    });
            }

        }
        return response;
    },
    error => {
        // let aa = `timeout of ${axios.defaults.timeout}ms exceeded`;
        // error = JSON.stringify(error);

        // console.log(error.response.status)
        if(error && error.response) {

        }else {
            error = JSON.stringify(error);
            if(error.indexOf('timeout') != -1) {
                Vue.$toast({
                    message: '请求超时',
                    duration: 1500
                });
                return;
            }
        }
        return Promise.reject(error);
        // return '';
    }
)
export default axios;
