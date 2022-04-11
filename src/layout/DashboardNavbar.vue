<template>
  <base-header type="gradient-default" class="pt-md-6">
    <base-nav
      class="navbar-top navbar-dark"
      id="navbar-main"
      :show-toggle-button="false"
      expand
    >
      <span class="mr-3 d-none d-md-flex ml-lg-auto"></span>
      <span class="mb-0 text-sm font-weight-bold">{{ userEmail }}</span>
    </base-nav>
  </base-header>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
    };
  },
  computed: {
    userEmail: function () {
      return this.$store.getters["user/getUserInfo"].email;
    },
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
