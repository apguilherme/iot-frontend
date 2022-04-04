<template>
  <div>
    <!-- TEMPLATE FORM -->

    <div v-if="!hasDevices">
      <h3>Please, create some devices before adding widgets to a Dashboard.</h3>
    </div>

    <div class="add-margin" v-if="hasDevices">
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
          <div class="col-md-3">
            <label class="form-control-label">Select a widget</label><br />
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
                v-for="widget in widgets"
                :key="widget"
                class="dropdown-item"
                :value="widget"
                @click="updateWidgetSelected(widget)"
                >{{ widget }}
              </a>
            </base-dropdown>
          </div>
          <div class="col-md-3">
            <label class="form-control-label">Select a device</label><br />
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle space-select"
                >
                  {{ deviceSelected ? deviceSelected : devicesList[0].name }}
                </base-button>
              </template>
              <a
                v-for="device in devicesList"
                :key="device._id"
                class="dropdown-item"
                :value="device._id"
                @click="updateDeviceSelected(device.name, device)"
                >{{ device.name }}
              </a>
            </base-dropdown>
          </div>
          <div class="col-md-3">
            <label class="form-control-label">Select an icon</label><br />
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle space-select"
                >
                  {{ iconSelected }}
                  <i class="icon-size fa" :class="[widget.icon]"></i>
                </base-button>
              </template>
              <a
                v-for="icon in icons"
                :key="icon"
                class="dropdown-item"
                :value="widget"
                @click="updateIconSelected(icon)"
              >
                {{ icon }}
                <i :class="iconDisplay(icon)"></i>
              </a>
            </base-dropdown>
          </div>
          <div class="col-md-3">
            <label class="form-control-label">Widget size</label><br />
            <base-dropdown>
              <template v-slot:title>
                <base-button type="secondary" class="dropdown-toggle">
                  {{ colSizesSelected }}
                </base-button>
              </template>
              <a
                v-for="size in colSizes"
                :key="size.value"
                class="dropdown-item"
                :value="size.value"
                @click="updateSize(size)"
                >{{ size.name }}
              </a>
            </base-dropdown>
          </div>
        </div>

        <div>
          <div class="column">
            <div class="col-md-6">
              <base-input
                label="Name"
                placeholder="Your widget name"
                input-classes="form-control-alternative"
                v-model="widget.name"
              />
            </div>
            <div class="col-md-6">
              <base-input
                label="Description"
                placeholder="Your widget description"
                input-classes="form-control-alternative"
                v-model="widget.description"
              />
            </div>
            <div class="col-md-6">
              <base-input
                label="Time interval (in minutes)"
                placeholder="60"
                input-classes="form-control-alternative"
                v-model="widget.timeInterval"
              />
            </div>
            <div class="col-md-6" v-if="widgetSelected === 'Indicator'">
              <base-input
                label="Unit"
                placeholder="L, km, lb, kg"
                input-classes="form-control-alternative"
                v-model="widget.unit"
              />
            </div>
          </div>

          <!-- PREVIEW WIDGET -->
          <div class="row">
            <div :class="widget.size">
              <widget-boolean-input-output
                v-if="widgetSelected === 'Boolean Input/Output'"
                :config="widget"
              ></widget-boolean-input-output>
              <widget-indicator
                v-if="widgetSelected === 'Indicator'"
                :config="widget"
              ></widget-indicator>
            </div>
          </div>
        </div>

        <!-- ADD -->

        <base-button type="default" @click="addWidgetToPreview">
          Add to preview
        </base-button>
      </card>
    </div>

    <!-- PREVIEW DASHBOARD -->

    <div class="container" v-if="hasDevices">
      <div class="row">
        <div class="col-md-4">
          <base-input
            label="Name"
            placeholder="Your dashboard name"
            input-classes="form-control-alternative"
            v-model="dashboard.name"
          />
        </div>
        <div class="col-md-4">
          <base-input
            label="Description"
            placeholder="Your dashboard description"
            input-classes="form-control-alternative"
            v-model="dashboard.description"
          />
        </div>
      </div>
      <base-button type="default" @click="saveDashboard">
        Save dashboard
      </base-button>
      <div class="row">
        <div v-for="(widget, index) of widgetsArray" :key="index">
          <i
            aria-hidden="true"
            class="fa fa-trash text-warning pull-right"
            @click="removeWidget(index)"
            style="margin-bottom: 10px"
          ></i>

          <widget-boolean-input-output
            v-if="widgetSelected == 'Boolean Input/Output'"
            :config="widget"
          ></widget-boolean-input-output>

          <widget-indicator
            v-if="widgetSelected == 'Indicator'"
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
import toastMixin from "../mixin/toastMixin.js";

export default {
  name: "AddWidgetForm",
  mixins: [toastMixin],
  components: { WidgetBooleanInputOutput, WidgetIndicator },
  data() {
    return {
      colSizes: values.colSizes,
      widgets: values.widgets,
      widgetSelected: values.widgets[0], // default
      icons: values.icons,
      iconSelected: values.icons[0], // default
      widgetsArray: [],
      deviceSelected: "", // default
      colSizesSelected: values.colSizes[5].name, // default
      widget: {
        type: "",
        name: "",
        description: "",
        icon: "fa-home",
        unit: "",
        timeInterval: 1,
        size: "col-6",
        device: "",
      },
      widgetDefault: {
        type: "",
        name: "",
        description: "",
        icon: "fa-home",
        unit: "",
        timeInterval: 1,
        size: "col-6",
        device: "",
      },
      dashboard: {
        name: "",
        description: "",
        widgets: [],
      },
    };
  },
  created: function () {
    this.getAllUserDevices();
  },
  computed: {
    devicesList: function () {
      return this.$store.getters["device/getDevices"];
    },
    hasDevices: function () {
      return this.$store.getters["device/getDevices"] !== null;
    },
  },
  methods: {
    iconDisplay: function (value) {
      return `icon-size fa ${value}`;
    },
    getAllUserDevices: async function () {
      await this.$store.dispatch("device/getAllUserDevices");
    },
    updateDeviceSelected: function (name, device) {
      this.deviceSelected = name;
      this.widget.deviceID = device._id;
    },
    updateIconSelected: function (value) {
      this.iconSelected = value;
      this.widget.icon = value;
    },
    updateWidgetSelected: function (value) {
      this.widgetSelected = value;
      this.widget = this.widgetDefault; // "clean".
      this.widget.type = value;
    },
    updateSize: function (value) {
      this.colSizesSelected = value.name;
      this.widget.size = value.value;
    },
    addWidgetToPreview: function () {
      let clone = JSON.parse(JSON.stringify(this.widget));
      this.widgetsArray.push(clone);
    },
    clearConfig(configObj) {
      Object.keys(configObj).forEach((key) => {
        configObj[key] = "";
      });
    },
    removeWidget(index) {
      this.widgetsArray.splice(index, 1);
      // call api.
    },
    saveDashboard: async function () {
      if (
        this.dashboard.name === "" ||
        this.dashboard.description === "" ||
        this.widgetsArray.length === 0
      ) {
        this.toast("Missing fields.", "error");
        return;
      }
      await this.$store.dispatch("dashboard/createDashboard", {
        name: this.dashboard.name,
        description: this.dashboard.description,
        widgets: this.widgetsArray,
      });
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
.icon-size {
  font-size: 20px;
}
</style>
