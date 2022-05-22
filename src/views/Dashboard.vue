<template>
  <div>
    <!-- USER DASHBOARD -->
    <!-- todo: add dash selection and use selectedDashboard bellow instead of [0] -->
    <div v-if="userDashboards && userDashboards[0]">
      <dashboard-generator
        :dashboard="userDashboards[0]"
        :widgets="userDashboards[0].widgets"
        :isEdit="false"
      ></dashboard-generator>
    </div>
    <br />
  </div>
</template>
<script>
import DashboardGenerator from "../views/DashboardGenerator.vue";

export default {
  components: {
    DashboardGenerator,
  },
  data() {
    return {};
  },
  created: function () {
    this.getAllUserDashboards();
  },
  computed: {
    userDashboards() {
      return this.$store.getters["dashboard/getDashboards"];
    },
  },
  methods: {
    getAllUserDashboards: async function () {
      await this.$store.dispatch("dashboard/getAllUserDashboards");
    },
  },
};
</script>
<style></style>
