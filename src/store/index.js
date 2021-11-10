import { createStore, createLogger } from 'vuex'
import api from '@/api/index';
const env = process.env.NODE_ENV
export default createStore({
//  公共的状态
  state: {
      isLogin: null,
      isfo: null
  },
  mutations: {
    changeIsLogin(state,bool){
         state.isLogin = bool;
    },
    changeInfo(state,payload){
          state.info = payload;
    }
  },
  actions: {
      async changeIsLoginAsyn({commit}){
        let {code} = await api.checkLogin();
          
        if(+code===0){
          bool = true;
        }
        commit('changeLogin',bool);
       
    },
       async changeInfoAsync({commit}){
         let {code,data} = await api.userInfo();
         if(+code === 0){
           commit('changeInfo',data);
         } 
       }
  },
  modules: {
  },
  plugins: env === 'production' ? [] : [createLogger]

})
