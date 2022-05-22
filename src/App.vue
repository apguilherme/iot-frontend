<template>
  <div id="app">
    <loading
      :active="loading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>
    <router-view />
  </div>
</template>
<script>
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import mqttClient from "./mixin/mqttClient.js";

export default {
  name: "App",
  components: {
    Loading: Loading,
  },
  mixins: [mqttClient],
  computed: {
    loading: function () {
      return this.$store.getters["dashboard/getLoading"];
    },
  },
  mounted() {
    this.beginMqtt();
  },
};
</script>
