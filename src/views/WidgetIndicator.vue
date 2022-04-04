<template>
  <div class="card">
    <div class="box">
      <h2>{{ widget.name }}</h2>
      <i class="icon-size fa" :class="[widget.icon]"></i>
    </div>
    <p>{{ widget.description }} {{ widget.unit }}</p>
  </div>
</template>

<script>
export default {
  props: ["widget"],
  name: "WidgetIndicator",
  data() {
    return {
      payload: null,
    };
  },
  mounted() {
    // userid/deviceid/uniquestr
    this.payload = this.$props.widget.payload;
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
.icon-size {
  font-size: 50px;
}
.box {
  display: flex;
  justify-content: space-between;
}
</style>
