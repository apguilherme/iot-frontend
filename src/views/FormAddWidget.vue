<template>
  <div>
    <!-- TEMPLATE FORM -->

    <div class="add-margin">
      <card shadow type="secondary">
        <template v-slot:header>
          <div class="bg-white border-0">
            <div class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">Add new widget</h3>
              </div>
            </div>
          </div>
        </template>

        <div class="row">
          <div class="col-md-4">
            <label class="form-control-label">Widget type</label><br />
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle space-select"
                >
                  {{ widgetSelected }}
                </base-button>
              </template>
              <a
                v-for="t in widgets"
                :key="t"
                class="dropdown-item"
                :value="t"
                @click="updateWidgetSelected(t)"
                >{{ t }}
              </a>
            </base-dropdown>
          </div>
        </div>

        <!-- BooleanInputOutput FORM -->

        <div v-if="widgetSelected === 'Boolean Input/Output'">
          <div class="row">
            <div class="col-md-4">
              <base-input
                label="Title"
                placeholder="Your widget title"
                input-classes="form-control-alternative"
                v-model="configBooleanInputOutput.title"
              />
            </div>
            <div class="col-md-4">
              <base-input
                label="Text"
                placeholder="Your widget text"
                input-classes="form-control-alternative"
                v-model="configBooleanInputOutput.text"
              />
            </div>
            <div class="col-md-4">
              <base-input
                label="Icon"
                placeholder="Your widget icon"
                input-classes="form-control-alternative"
                v-model="configBooleanInputOutput.icon"
              />
            </div>
            <div class="col-md-4">
              <base-input
                label="Time interval (in minutes)"
                placeholder="60"
                input-classes="form-control-alternative"
                v-model="configBooleanInputOutput.timeInterval"
              />
            </div>
            <div class="col-md-4">
              <label class="form-control-label">Widget size</label><br />
              <base-dropdown>
                <template v-slot:title>
                  <base-button type="secondary" class="dropdown-toggle">
                    {{ colSizesSelected }}
                  </base-button>
                </template>
                <a
                  v-for="s in colSizes"
                  :key="s.value"
                  class="dropdown-item"
                  :value="s.value"
                  @click="updateSize(s)"
                  >{{ s.name }}
                </a>
              </base-dropdown>
            </div>
          </div>
          <div class="row">
            <div :class="configBooleanInputOutput.columnSize">
              <widget-boolean-input-output
                :config="configBooleanInputOutput"
              ></widget-boolean-input-output>
            </div>
          </div>
        </div>

        <!-- Indicator FORM -->

        <div v-if="widgetSelected === 'Indicator'">
          <div class="row">
            <div class="col-md-4">
              <base-input
                label="Title"
                placeholder="Your widget title"
                input-classes="form-control-alternative"
                v-model="configIndicator.title"
              />
            </div>
            <div class="col-md-4">
              <base-input
                label="Text"
                placeholder="Your widget text"
                input-classes="form-control-alternative"
                v-model="configIndicator.text"
              />
            </div>
            <div class="col-md-4">
              <base-input
                label="Icon"
                placeholder="Your widget icon"
                input-classes="form-control-alternative"
                v-model="configIndicator.icon"
              />
            </div>
            <div class="col-md-4">
              <base-input
                label="Unit"
                placeholder="Data unit"
                input-classes="form-control-alternative"
                v-model="configIndicator.unit"
              />
            </div>
            <div class="col-md-4">
              <base-input
                label="Time interval (in minutes)"
                placeholder="60"
                input-classes="form-control-alternative"
                v-model="configIndicator.timeInterval"
              />
            </div>
            <div class="col-md-4">
              <label class="form-control-label">Widget size</label><br />
              <base-dropdown>
                <template v-slot:title>
                  <base-button type="secondary" class="dropdown-toggle">
                    {{ colSizesSelected }}
                  </base-button>
                </template>
                <a
                  v-for="s in colSizes"
                  :key="s.value"
                  class="dropdown-item"
                  :value="s.value"
                  @click="updateSize(s)"
                  >{{ s.name }}
                </a>
              </base-dropdown>
            </div>
          </div>
          <div class="row">
            <div :class="configIndicator.columnSize">
              <widget-indicator :config="configIndicator"></widget-indicator>
            </div>
          </div>
        </div>

        <!-- ADD -->

        <base-button type="default" @click="addWidget">Add</base-button>
      </card>
    </div>

    <!-- PREVIEW -->

    <div class="container">
      <div class="row">
        <div v-for="(widget, index) of widgetsArray" :key="index">
          <i
            aria-hidden="true"
            class="fa fa-trash text-warning pull-right"
            @click="removeWidget(index)"
            style="margin-bottom: 10px"
          ></i>

          <widget-boolean-input-output
            v-if="widget.widget == 'booleaninputoutput'"
            :config="widget"
          ></widget-boolean-input-output>

          <widget-indicator
            v-if="widget.widget == 'indicator'"
            :config="widget"
          ></widget-indicator>
        </div>
      </div>

      <div class="add-margin">
        <pre>{{ widgetsArray }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetBooleanInputOutput from "./WidgetBooleanInputOutput.vue";
import WidgetIndicator from "./WidgetIndicator.vue";
import values from "../data/values.json";
export default {
  name: "AddWidgetForm",
  components: { WidgetBooleanInputOutput, WidgetIndicator },
  data() {
    return {
      values: values,
      widgets: values.widgets, // todo: make this dynamic.
      widgetSelected: values.widgets[0], // default
      widgetsArray: [],
      colSizes: values.colSizes,
      colSizesSelected: values.colSizes[5].name, // default
      configBooleanInputOutput: {
        userID: "user123",
        deviceID: "device123",
        templateID: "booleaninputoutput-123",
        dashboardID: "dash123",
        widget: "booleaninputoutput",
        uniqueStr: "123",
        payload: true,
        title: "",
        text: "",
        icon: "",
        timeInterval: "",
        columnSize: "col-6",
      },
      configIndicator: {
        userID: "user123",
        deviceID: "device123",
        templateID: "indicator-123",
        dashboardID: "dash123",
        widget: "indicator",
        uniqueStr: "123",
        title: "",
        text: "",
        icon: "",
        unit: "",
        timeInterval: "",
        columnSize: "col-6",
      },
    };
  },
  methods: {
    updateWidgetSelected: function (value) {
      this.widgetSelected = value;
    },
    updateSize: function (value) {
      this.colSizesSelected = value.name;
      this.configBooleanInputOutput.columnSize = value.value;
      this.configIndicator.columnSize = value.value;
    },
    addWidget: function () {
      // todo: avoid adding widget with same id, avoid empty fields.
      // todo: call api.
      let clone = null;
      switch (this.widgetSelected) {
        case "Indicator":
          clone = JSON.parse(JSON.stringify(this.configIndicator));
          break;
        case "Boolean Input/Output":
          clone = JSON.parse(JSON.stringify(this.configBooleanInputOutput));
          break;
        default:
          break;
      }
      this.widgetsArray.push(clone);
    },
    clearConfig(configObj) {
      Object.keys(configObj).forEach((key) => {
        configObj[key] = "";
      });
    },
    removeWidget(index) {
      this.widgetsArray.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.add-margin {
  margin: 5%;
}
.space-select {
  margin-bottom: 18px;
}
</style>
