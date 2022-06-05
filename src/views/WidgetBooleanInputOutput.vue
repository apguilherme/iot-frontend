<template>
  <div class="card">
    <div class="box">
      <h2>{{ widget.name }}</h2>
      <i
        class="icon-size fa"
        :class="[widget.icon, getStateColor]"
        @click="sendToTopic()"
      ></i>
    </div>
    <p>{{ widget.description }}</p>
    <p>{{ widget.variableFromDevice }}</p>
  </div>
</template>

<script>
export default {
  props: ["widget"],
  name: "WidgetBooleanInputOutput",
  data() {
    return {
      topic: `${this.$store.getters["user/getUserInfo"].id}/${this.widget.device._id}/${this.widget.variableFromDevice}/sdata`,
    };
  },
  watch: {
    widget: {
      immediate: true,
      deep: true,
      handler() {
        if (!this.isEdit) {
          // set component to watch for the topic userid/deviceid/variable/sdata and call method to process data
          this.emitter.off(this.topic, this.processData);
          this.topic = `${this.$store.getters["user/getUserInfo"].id}/${this.widget.device._id}/${this.widget.variableFromDevice}/sdata`;
          this.emitter.on(this.topic, this.processData);
        }
      },
    },
  },
  methods: {
    processData: function (data) {
      this.$props.widget.value = data.value;
    },
    sendToTopic: function () {
      let value = !(this.widget.value === "true"); // toggle
      this.$props.widget.value = value;
      let user = this.$store.getters["user/getUserInfo"];
      const data = {
        topic: `${user.id}/${this.widget.device._id}/${this.widget.variableFromDevice}/sdata`,
        payload: {
          value: this.widget.value.toString(),
          save: 1,
        },
      };
      if (!this.isEdit) {
        this.emitter.emit("publish-mqtt", data);
      }
    },
  },
  computed: {
    isEdit: function () {
      let url = window.location.href.toString();
      return url.includes("widgets");
    },
    getStateColor: function () {
      return this.widget.value === "true" ? "on" : "off";
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
  min-height: 200px;
  min-width: 200px;
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
