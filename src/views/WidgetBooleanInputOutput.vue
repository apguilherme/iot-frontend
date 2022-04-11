<template>
  <div class="card">
    <div class="box">
      <h2>{{ widget.name }}</h2>
      <i
        class="icon-size fa"
        :class="[widget.icon, getStateColor]"
        @click="sendToTopic(widget)"
      ></i>
    </div>
    <p>{{ widget.description }}</p>
  </div>
</template>

<script>
export default {
  props: ["widget"],
  name: "WidgetBooleanInputOutput",
  data() {
    return {
      payload: null,
    };
  },
  mounted() {
    // userid/deviceid/uniquestr
    this.payload = this.$props.widget.payload;
  },
  methods: {
    sendToTopic: function (widget) {
      // toggle
      this.payload = !this.$props.widget.payload;
      this.$props.widget.payload = this.payload;
      let user = this.$store.getters["user/getUserInfo"];
      const data = {
        topic: `${user.id}/${widget.device}`,
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
      return this.widget.payload ? "on" : "off";
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
