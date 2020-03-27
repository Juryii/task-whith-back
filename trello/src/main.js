import Vue from "vue";
import { ValidationProvider, extend } from "vee-validate";
import { BootstrapVue } from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "@/store";
import { required } from "vee-validate/dist/rules";
import SvgIcon from "./components/SvgIcon";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("SvgIcon", SvgIcon);

extend("required", {
  ...required,
  message: "This field is required"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
