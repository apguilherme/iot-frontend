<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="IoT Platform"
      title="IoT Platform"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-chart-pie-35 text-default',
            path: '/dashboard',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Devices',
            icon: 'ni ni-spaceship text-black',
            path: '/devices',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Widgets',
            icon: 'ni ni-app text-primary',
            path: '/widgets',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Alerts',
            icon: 'ni ni-time-alarm text-info',
            path: '/alerts',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Notifications',
            icon: 'ni ni-bell-55',
            path: '/notifications',
          }"
        />
        <sidebar-item
          :link="{
            name: 'User Profile',
            icon: 'ni ni-single-02 text-orange',
            path: '/profile',
          }"
        />
        <sidebar-item
          @click="logout"
          :link="{
            name: 'Logout',
            icon: 'ni ni-user-run',
            path: '/login',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout: async function () {
      this.emitter.emit("close-broker-conn");
      await this.$store.dispatch("user/logout");
    },
  },
};
</script>
<style lang="scss"></style>
