<template>
  <div class="card" :class="[config.size]">
    <div class="box">
      <h2>{{ config.name }}</h2>
      <i class="icon-size fa" :class="[config.icon]"></i>
    </div>
    <p>{{ config.description }} {{ config.unit }}</p>
  </div>
</template>

<script>
export default {
  props: ["config"],
  name: "Indicator",
  data() {
    return {
      payload: null,
    };
  },
  mounted() {
    // userid/deviceid/uniquestr
    this.payload = this.$props.config.payload;
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
