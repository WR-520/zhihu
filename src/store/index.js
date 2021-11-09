import { createStore, createLogger } from 'vuex'
const env = process.env.NODE_ENV
export default createStore({
//  公共的状态
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: env === 'production' ? [] : [createLogger]

})
