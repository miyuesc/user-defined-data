import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      username: "admin",
      name: "管理员",
      userIcon: "http://ww1.sinaimg.cn/large/0067sbCSly1gai9gqw22cj306y05q74n.jpg"
    },
    projects: []
  },
  mutations: {},
  actions: {},
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    getProjects(state) {
      return state.projects;
    }
  }
});
