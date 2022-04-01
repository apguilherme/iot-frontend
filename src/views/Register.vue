<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign up with credentials</small>
          </div>
          <form role="form">
            <base-input
              formClasses="input-group-alternative"
              placeholder="Name"
              addon-left-icon="ni ni-hat-3"
              v-model="name"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="email"
              focused
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="password"
            >
            </base-input>

            <div class="text-center">
              <base-button type="primary" class="my-4" @click="register()">
                Create account
              </base-button>
            </div>
            <p v-if="registerMessages.success" style="color: green">
              {{ registerMessages.success }}
            </p>
            <p v-if="registerMessages.failure" style="color: red">
              {{ registerMessages.failure }}
            </p>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import toastMixin from "../mixin/toastMixin.js";
export default {
  name: "register",
  mixins: [toastMixin],
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register: async function () {
      await this.$store.dispatch("user/register", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {
    registerMessages: function () {
      return this.$store.getters["user/getRegisterMessages"];
    },
  },
  mounted() {
    this.$store.commit("user/setRegisterMessages", {
      failure: "",
      success: "",
    });
  },
};
</script>
<style></style>
