import Vue from "vue";
import Vuex from "vuex";
import * as users from './modules/users'
import * as priorities from './modules/priorities'


Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    users,
    priorities,
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
