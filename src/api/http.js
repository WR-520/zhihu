import axios from 'axios'
// qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库
import qs from 'qs'
import md5 from 'blueimp-md5'
import { isPlainObject} from '../assets/utils'
import {Notify} from 'vant'
axios.defaults.baseURL = ''
axios.defaults.timeout = 60000
axios.defaults.transformRequest = data => {
  if(isPlainObject(data)) return qs.stringify(data)
  return data
}
// 请求拦截
axios.interceptors.request.use(config => {
  let apiList = ['/check_login','/user_info','/user_update','/store','/store_remove','/store_list']
  token = localStorage.getItem('token');
  if(apiList.includes(config.url.replace('/api','')) && token){
     let time = +new Date();
    //  签名
     sign = md5(`${token}@${time}@wr`);
     config.headers['authorzation'] = token;
     config.headers['time'] = time;
     config.headers['sign'] = sign;
  }
  return config
})
// 返回拦截
axios.interceptors.response.use(response => {
  return response.data;
},reason => {
  Notify({
    type:'danger',
    message:'当前网络繁忙，请稍后再试！'
  });
  return Promise.reject(reason)
})
export default axios;