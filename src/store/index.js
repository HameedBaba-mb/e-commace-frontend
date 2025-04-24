import { createStore } from "vuex";
import apiClient from "../services/apiClient";

export default createStore({
  //   namespaced: true,
  state: {
    token: "",
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    SET_TOKEN(state, newToken) {
      state.token = newToken;
    },
  },
  actions: {
    saveToken({ commit }, newToken) {
      commit("SET_TOKEN", newToken);
      if (newToken) {
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
      } else {
        apiClient.defaults.headers.common["Authorization"] = "";
      }
    },
  },
});
