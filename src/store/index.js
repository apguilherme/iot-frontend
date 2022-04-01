import { createApp } from "vue";
import App from "../../src/App.vue";
const app = createApp(App);
import Vuex from "vuex";

app.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: require("./user/module.js"),
  },
});
