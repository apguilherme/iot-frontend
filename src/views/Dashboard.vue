<template>
  <div>
    <!-- USER DASHBOARD -->
    <div v-if="userDashboards && userDashboards.length !== 0">
      <div class="col-md-3">
        <label class="form-control-label">Select dashboard</label><br />
        <base-dropdown>
          <template v-slot:title>
            <base-button type="secondary" class="dropdown-toggle">
              {{ selectedDashboard ? selectedDashboard.name : "Select" }}
            </base-button>
          </template>
          <a
            v-for="dashboard in userDashboards"
            :key="dashboard"
            class="dropdown-item"
            :value="dashboard"
            @click="updateDashboardSelected(dashboard)"
            >{{ dashboard.name }}
          </a>
        </base-dropdown>
      </div>
      <dashboard-generator
        v-if="selectedDashboard"
        :dashboard="selectedDashboard"
        :widgets="selectedDashboard.widgets"
        :isEdit="false"
      ></dashboard-generator>
    </div>
    <div class="please" v-else>
      No dashboards found, please create or activate one.
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
      return this.$store.getters["dashboard/getDashboards"]?.filter(
        (dash) => dash.isActive === true
      );
    },
    selectedDashboard() {
      return this.$store.getters["dashboard/getSelectedDashboard"];
    },
  },
  methods: {
    getAllUserDashboards: async function () {
      await this.$store.dispatch("dashboard/getAllUserDashboards");
    },
    updateDashboardSelected: function (dashboard) {
      this.$store.commit("dashboard/setSelectedDashboard", dashboard);
    },
  },
};
</script>
<style>
.please {
  color: red;
  font-weight: bold;
  margin: 5%;
}
</style>
