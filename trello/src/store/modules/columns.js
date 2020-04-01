import http from "@/services/http";

export const namespaced = true;

export const state = () => ({
  data: []
});

export const mutations = {
  SET(state, data) {
    state.data = data;
  }
};

export const actions = {
  async getList({ commit }) {
    const { data: columns } = await http.get("columns");
    commit("SET", columns);
  },
  async moveTasks({ commit, dispatch }, payload) {
    await http.patch("/move-tasks", payload).then(response => {
      console.log(response.data);
      dispatch("getList", { commit });
    });
  }
};
