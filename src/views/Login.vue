<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign in with credentials</small>
          </div>
          <form role="form">
            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="email"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="password"
            >
            </base-input>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="login()">
                Sign in
              </base-button>
            </div>
            <p v-if="loginMessages.success" style="color: green">
              {{ loginMessages.success }}
            </p>
            <p v-if="loginMessages.failure" style="color: red">
              {{ loginMessages.failure }}
            </p>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Create new account</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: async function () {
      await this.$store.dispatch("user/login", {
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {
    loginMessages: function () {
      return this.$store.getters["user/getLoginMessages"];
    },
  },
  mounted() {
    this.$store.commit("user/setLoginMessages", {
      failure: "",
      success: "",
    });
  },
};
</script>
<style></style>
