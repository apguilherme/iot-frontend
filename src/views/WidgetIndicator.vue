<template>
  <div class="card">
    <div class="box">
      <h2>{{ widget.name }}</h2>
    </div>
    <p>{{ widget.description }}</p>
    <span class="value-style">{{ widget.value }} {{ widget.unit }} </span>
  </div>
</template>

<script>
export default {
  props: ["widget"],
  name: "WidgetIndicator",
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
  },
  computed: {
    isEdit: function () {
      let url = window.location.href.toString();
      return url.includes("widgets");
    },
  },
};
</script>
<style scoped>
.card {
  border-radius: 5px;
  box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);
  padding: 30px;
  margin: 10px;
  transition: all 0.3s ease-out;
  min-height: 200px;
  min-width: 200px;
}
.card p {
  color: #777777;
  font-size: 16px;
  font-weight: bold;
}
.box {
  display: flex;
  justify-content: space-between;
}
.value-style {
  font-size: 40px;
  font-weight: bold;
}
</style>
