<template>
  <div>
    <div v-if="!hasDevices">
      <h3>Please, create some devices before adding widgets to a Dashboard.</h3>
    </div>

    <!-- WIDGETS FORM -->
    <div class="add-margin" v-if="hasDevices">
      <card shadow type="secondary">
        <template v-slot:header>
          <div class="bg-white border-0">
            <div class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">Add new widget to dashboard</h3>
              </div>
            </div>
          </div>
        </template>

        <div class="row">
          <div class="col-md-3">
            <label class="form-control-label">Type</label><br />
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle space-select"
                >
                  {{ widgetSelected ? widgetSelected : "Select" }}
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
          <div class="col-md-2">
            <label class="form-control-label">Size</label><br />
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
          <div class="col-md-3">
            <label class="form-control-label">Device</label><br />
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle space-select"
                >
                  {{ deviceSelected ? deviceSelected : "Select" }}
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
            <label class="form-control-label">Variable</label>
            <br />
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle space-select"
                >
                  {{ variableSelected ? variableSelected : "Select" }}
                </base-button>
              </template>
              <a
                v-for="variable in variablesList"
                :key="variable"
                class="dropdown-item"
                :value="variable"
                @click="updateVariableSelected(variable)"
                >{{ variable }}
              </a>
            </base-dropdown>
          </div>
          <div class="col-md-1" v-if="widget.type === 'Boolean Input/Output'">
            <label class="form-control-label">Icon</label><br />
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle space-select"
                >
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
                <i :class="iconDisplay(icon)"></i>
              </a>
            </base-dropdown>
          </div>
        </div>

        <div class="column">
          <div class="col-md-6">
            <base-input
              label="Name"
              placeholder="Widget name"
              input-classes="form-control-alternative"
              v-model="widget.name"
            />
          </div>
          <div class="col-md-6">
            <base-input
              label="Description"
              placeholder="Widget description"
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

          <!-- PREVIEW WIDGET -->
          <div class="row">
            <div :class="widget.size">
              <widget-boolean-input-output
                v-if="widgetSelected === 'Boolean Input/Output'"
                :widget="widget"
              ></widget-boolean-input-output>
              <widget-indicator
                v-if="widgetSelected === 'Indicator'"
                :widget="widget"
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

    <!-- DASHBOARD -->
    <div class="container" v-if="hasDevices && widgetsArray.length !== 0">
      <hr />
      <!-- FORM -->
      <div class="row">
        <div class="col-md-4">
          <base-input
            label="Name"
            placeholder="Dashboard name"
            input-classes="form-control-alternative"
            v-model="dashboard.name"
          />
        </div>
        <div class="col-md-4">
          <base-input
            label="Description"
            placeholder="Dashboard description"
            input-classes="form-control-alternative"
            v-model="dashboard.description"
          />
        </div>
      </div>
      <base-button type="default" @click="saveDashboard">
        Save dashboard
      </base-button>
      <hr />
      <!-- PREVIEW -->
      <dashboard-generator
        :dashboard="dashboard"
        :widgets="widgetsArray"
        :isEdit="true"
      ></dashboard-generator>
    </div>

    <!-- DASHBOARDS TABLE -->
    <div class="add-margin">
      <div class="card shadow">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Dashboards</h3>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <base-table
            class="table align-items-center table-flush"
            thead-classes="thead-light"
            tbody-classes="list"
            :data="dashboardsList"
          >
            <template v-slot:columns>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th># Widgets</th>
              <th>Actions</th>
              <th></th>
            </template>

            <template v-slot:default="row">
              <td>{{ row.item._id }}</td>
              <td>{{ row.item.name }}</td>
              <td>{{ row.item.description }}</td>
              <td>{{ row.item.widgets.length }}</td>
              <td>
                <el-tooltip
                  placement="left"
                  :content="row.item.isActive ? 'Deactivate' : 'Activate'"
                >
                  <base-button
                    :key="row.item.id"
                    size="sm"
                    outline
                    :type="row.item.isActive ? 'success' : 'danger'"
                    :value="row.item.isActive"
                    @click="switchDashboardActive(row.item)"
                  >
                    {{ row.item.isActive ? "On" : "Off" }}
                  </base-button>
                </el-tooltip>
                <base-button
                  size="sm"
                  type="primary"
                  @click="editDashboard(row.item)"
                >
                  Edit
                </base-button>
                <base-button
                  size="sm"
                  type="danger"
                  @click="deleteDashboard(row.item)"
                >
                  Delete
                </base-button>
              </td>
            </template>
          </base-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetBooleanInputOutput from "./WidgetBooleanInputOutput.vue";
import WidgetIndicator from "./WidgetIndicator.vue";
import DashboardGenerator from "./DashboardGenerator.vue";
import values from "../data/values.json";
import delay from "../mixin/delay.js";
import toastMixin from "../mixin/toastMixin.js";

export default {
  name: "Widgets",
  mixins: [delay, toastMixin],
  components: { WidgetBooleanInputOutput, WidgetIndicator, DashboardGenerator },
  data() {
    return {
      colSizes: values.colSizes,
      widgets: values.widgets,
      widgetSelected: "", // default
      icons: values.icons,
      iconSelected: values.icons[0], // default
      widgetsArray: [],
      deviceSelected: "", // default
      variablesList: [],
      variableSelected: "", // default
      colSizesSelected: values.colSizes[5].name, // default
      widget: {
        type: "",
        name: "",
        description: "",
        icon: "",
        unit: "",
        timeInterval: 1,
        size: "col-6",
        device: "",
        variableFromDevice: "",
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
    this.getAllUserDashboards();
  },
  computed: {
    devicesList: function () {
      return this.$store.getters["device/getDevices"];
    },
    dashboardsList: function () {
      return this.$store.getters["dashboard/getDashboards"];
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
    getAllUserDashboards: async function () {
      await this.$store.dispatch("dashboard/getAllUserDashboards");
    },
    updateDeviceSelected: function (name, device) {
      this.deviceSelected = name;
      this.widget.device = device._id;
      this.variablesList = device.variables;
      this.widget.variableFromDevice = "";
      this.variableSelected = "";
    },
    updateVariableSelected: function (variable) {
      this.variableSelected = variable;
      this.widget.variableFromDevice = variable;
    },
    updateIconSelected: function (value) {
      this.iconSelected = value;
      this.widget.icon = value;
    },
    updateWidgetSelected: function (value) {
      this.widgetSelected = value;
      let clone = JSON.parse(JSON.stringify(this.widgetDefault));
      this.widget = clone; // "clean".
      this.widget.type = value;
      this.deviceSelected = "";
      this.variableSelected = "";
    },
    updateSize: function (value) {
      this.colSizesSelected = value.name;
      this.widget.size = value.value;
    },
    addWidgetToPreview: function () {
      if (
        this.widget.type === "" ||
        this.widget.name === "" ||
        this.widget.description === "" ||
        this.widget.timeInterval === "" ||
        this.widget.size === "" ||
        this.widget.device === "" ||
        this.widget.variableFromDevice === ""
      ) {
        this.toast("Missing fields!", "error");
        return;
      }
      let clone = JSON.parse(JSON.stringify(this.widget));
      this.widgetsArray.push(clone);
    },
    // clearConfig(configObj) {
    //   Object.keys(configObj).forEach((key) => {
    //     configObj[key] = "";
    //   });
    // },
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
      this.widgetsArray = [];
      this.dashboard.name = "";
      this.dashboard.description = "";
      this.dashboard.widgets = [];
      await this.delay(3000);
      this.getAllUserDashboards();
    },
    deleteDashboard: async function (item) {
      await this.$store.dispatch("dashboard/deleteDashboard", item._id);
      this.getAllUserDashboards();
    },
    editDashboard: function () {
      alert("edit not implemented yet");
      // todo: populate widgetsArray with selected dashboard widgets, possible to delete or edit using form.
    },
    switchDashboardActive: async function (item) {
      await this.$store.dispatch("dashboard/updateActiveDashboard", {
        dashboardID: item._id,
        isActive: !item.isActive,
      });
      this.$store.commit("dashboard/setSelectedDashboard", null);
      this.getAllUserDashboards();
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
