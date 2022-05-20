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
      widgetObj: { value: false },
    };
  },
  mounted() {
    this.widgetObj = JSON.parse(JSON.stringify(this.$props.widget));
    // set component to watch for the topic userid/deviceid/variable/sdata and call method to process data
    let topic = `${this.$store.getters["user/getUserInfo"].id}/${this.widgetObj.device._id}/${this.widgetObj.variableFromDevice}/sdata`;
    this.emitter.on(topic, this.processData);
  },
  methods: {
    sendToTopic: function () {
      let value = !this.widgetObj.value; // toggle
      this.widgetObj.value = value;
      let user = this.$store.getters["user/getUserInfo"];
      const data = {
        topic: `${user.id}/${this.widgetObj.device._id}/${this.widgetObj.variableFromDevice}/sdata`,
        payload: {
          value: this.widgetObj.value,
        },
      };
      this.emitter.emit("publish-mqtt", data);
    },
    processData: function (data) {
      this.widgetObj.value = data.value;
    },
  },
  computed: {
    getStateColor: function () {
      return this.widgetObj.value ? "on" : "off";
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
