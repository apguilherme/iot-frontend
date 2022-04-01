<template>
  <div class="card" :class="[config.columnSize]">
    <div class="box">
      <h2>{{ config.title }}</h2>
      <i
        class="icon-size fa"
        :class="[config.icon, getStateColor]"
        @click="sendToTopic"
      ></i>
    </div>
    <p>{{ config.text }}</p>
  </div>
</template>

<script>
export default {
  props: ["config"],
  name: "BooleanInputOutput",
  data() {
    return {
      payload: null,
    };
  },
  mounted() {
    // userid/deviceid/uniquestr
    this.payload = this.$props.config.payload;
  },
  methods: {
    sendToTopic: function () {
      // toggle
      this.payload = !this.$props.config.payload;
      this.$props.config.payload = this.payload;
      const data = {
        topic: `${this.$props.config.userID}/${this.$props.config.deviceID}/${this.$props.config.uniqueStr}`,
        payload: {
          value: this.payload,
        },
      };
      // todo: call api.
      console.log(data);
    },
  },
  computed: {
    getStateColor: function () {
      return this.config.payload ? "on" : "off";
    },
  },
};
</script>
<style scoped>
.card {
  border-radius: 5px;
  box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);
  padding: 30px;
  margin: 20px;
  transition: all 0.3s ease-out;
}
i {
  cursor: pointer;
}

.card p {
  color: #777777;
  font-size: 16px;
  font-weight: bold;
}
.icon-size {
  font-size: 50px;
}
.on {
  color: green;
}
.off {
  color: grey;
}
.box {
  display: flex;
  justify-content: space-between;
}
</style>
