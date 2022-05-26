<template>
  <div class="container" v-if="widgetsArray.length">
    <h1>{{ dashboard.name }}</h1>
    <h4>{{ dashboard.description }}</h4>
    <div class="col-md-12">
      <div class="row">
        <div
          v-for="(widget, index) of widgetsArray"
          :key="index"
          :class="widget.size"
        >
          <!-- TRASH ICON -->
          <i
            aria-hidden="true"
            class="fa fa-trash text-warning pull-right"
            @click="removeWidgetFromPreview(index)"
            style="margin-bottom: 10px"
            v-if="isEdit"
          ></i>

          <!-- WIDGETS -->

          <widget-boolean-input-output
            v-if="widget.type == 'Boolean Input/Output'"
            :widget="widget"
          ></widget-boolean-input-output>

          <widget-indicator
            v-if="widget.type == 'Indicator'"
            :widget="widget"
          ></widget-indicator>
        </div>
      </div>
    </div>

    <!-- JSON ARRAY -->
    <!-- <div class="add-margin" v-if="isEdit">
      <pre>{{ widgetsArray }}</pre>
    </div> -->
  </div>
</template>

<script>
import WidgetBooleanInputOutput from "./WidgetBooleanInputOutput.vue";
import WidgetIndicator from "./WidgetIndicator.vue";
export default {
  props: ["dashboard", "widgets", "isEdit"],
  name: "DashboardGenerator",
  components: { WidgetBooleanInputOutput, WidgetIndicator },
  methods: {
    removeWidgetFromPreview(index) {
      this.widgetsArray.splice(index, 1);
    },
  },
  computed: {
    widgetsArray: function () {
      return this.widgets;
    },
  },
};
</script>
<style scoped></style>
