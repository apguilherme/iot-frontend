<template>
  <div>
    <!-- ALERT FORM -->
    <div class="add-margin">
      <card shadow type="secondary">
        <template v-slot:header>
          <div class="bg-white border-0">
            <div class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">Add alert to device</h3>
              </div>
            </div>
          </div>
        </template>
        <div class="row">
          <div class="col-md-3">
            <label class="form-control-label">Select a device</label><br />
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle space-select"
                >
                  {{ deviceSelected ? deviceSelected : "Select device" }}
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
          <div class="col-md-3">
            <label class="form-control-label">Condition</label><br />
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle space-select"
                >
                  {{ conditionSelected ? conditionSelected : "Select" }}
                </base-button>
              </template>
              <a
                v-for="condition in conditionsList"
                :key="condition"
                class="dropdown-item"
                :value="condition"
                @click="updateConditionSelected(condition)"
                >{{ condition }}
              </a>
            </base-dropdown>
          </div>
          <div class="col-md-3">
            <base-input
              label="Value"
              placeholder="Value received from device"
              input-classes="form-control-alternative"
              v-model="alertInfo.value"
            />
          </div>
        </div>
        <br />
        <div class="column">
          <div class="col-md-6">
            <base-input
              label="Alert name"
              placeholder="Alert name"
              input-classes="form-control-alternative"
              v-model="alertInfo.name"
            />
          </div>
          <div class="col-md-6">
            <base-input label="Description">
              <textarea
                rows="4"
                class="form-control form-control-alternative"
                placeholder="Description"
                v-model="alertInfo.description"
              ></textarea>
            </base-input>
          </div>
          <div class="col-md-6">
            <base-input
              label="Trigger interval"
              placeholder="Interval between alarms for the same variable (seconds)"
              input-classes="form-control-alternative"
              v-model="alertInfo.triggerTimeInterval"
            />
          </div>
          <br />
          <div class="row">
            <div class="col-md-1">
              <base-button type="default" @click="saveAlert">Save</base-button>
            </div>
            <div class="col-md-1">
              <base-button type="secondary" @click="cleanAlertInfo">
                Clean
              </base-button>
            </div>
          </div>
        </div>
      </card>
    </div>

    <!-- TABLE -->
    <div class="add-margin">
      <div class="card shadow">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Alerts</h3>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <base-table
            class="table align-items-center table-flush"
            thead-classes="thead-light"
            tbody-classes="list"
            :data="alertsList"
          >
            <template v-slot:columns>
              <th>Device name</th>
              <th>Alert name</th>
              <th>Description</th>
              <th>Variable</th>
              <th>Condition</th>
              <th>Value</th>
              <th>Time interval (mins)</th>
              <th>Status</th>
              <th>Actions</th>
              <th></th>
            </template>

            <template v-slot:default="row">
              <td>{{ getDeviceNameById(row.item.deviceId) }}</td>
              <td>{{ row.item.name }}</td>
              <td>{{ row.item.description }}</td>
              <td>{{ row.item.variable }}</td>
              <td>{{ row.item.condition }}</td>
              <td>{{ row.item.value }}</td>
              <td>{{ row.item.triggerTimeInterval }}</td>
              <td>
                <el-tooltip
                  placement="left"
                  :content="row.item.status ? 'Turn off' : 'Turn on'"
                >
                  <base-button
                    :key="row.item.id"
                    size="sm"
                    outline
                    :type="row.item.status ? 'success' : 'danger'"
                    :value="row.item.status"
                    @click="switchAlertRule(row.item)"
                  >
                    {{ row.item.status ? "On" : "Off" }}
                  </base-button>
                </el-tooltip>
              </td>
              <td>
                <base-button
                  size="sm"
                  type="danger"
                  @click="deleteAlert(row.item)"
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
import toastMixin from "../mixin/toastMixin.js";
import delay from "../mixin/delay.js";

export default {
  name: "Alerts",
  mixins: [toastMixin, delay],
  data() {
    return {
      alertInfo: {
        // new alert
        name: "",
        description: "",
        deviceId: "",
        status: false,
        variable: "",
        value: "",
        condition: "",
        triggerTimeInterval: "", // time interval between same alerts
      },
      deviceSelected: "", // default
      variablesList: [],
      variableSelected: "", // default
      conditionsList: ["<", "<=", ">", ">=", "=", "!="],
      conditionSelected: "", // default
    };
  },
  created: function () {
    this.getAllUserDevices();
  },
  computed: {
    alertsList: function () {
      return this.$store.getters["device/getAlerts"];
    },
    devicesList: function () {
      return this.$store.getters["device/getDevices"];
    },
  },
  methods: {
    getAllUserDevices: async function () {
      await this.$store.dispatch("device/getAllUserDevices");
    },
    getDeviceNameById: function (id) {
      return this.devicesList.find((device) => device._id === id).name;
    },
    saveAlert: async function () {
      if (
        this.alertInfo.name === "" ||
        this.alertInfo.description === "" ||
        this.alertInfo.variable.length === 0 ||
        this.alertInfo.value === "" ||
        this.alertInfo.condition === "" ||
        this.alertInfo.triggerTimeInterval === "" ||
        this.alertInfo.deviceId === ""
      ) {
        this.toast("Missing fields!", "error");
        return;
      }
      await this.$store.dispatch("device/createAlert", {
        deviceId: this.alertInfo.deviceId.trim(),
        name: this.alertInfo.name.trim(),
        description: this.alertInfo.description.trim(),
        status: false,
        variable: this.alertInfo.variable.trim(),
        value: this.alertInfo.value.trim(),
        condition: this.alertInfo.condition.trim(),
        triggerTimeInterval: this.alertInfo.triggerTimeInterval.trim(),
      });
      this.cleanAlertInfo();
      await this.delay(3000);
      this.toast("Alert saved!", "success");
      this.getAllUserDevices();
    },
    cleanAlertInfo: function () {
      this.alertInfo.name = "";
      this.alertInfo.description = "";
      this.alertInfo.deviceId = "";
      this.alertInfo.status = false;
      this.alertInfo.variable = "";
      this.alertInfo.value = "";
      this.alertInfo.condition = "";
      this.alertInfo.triggerTimeInterval = "";
      this.deviceSelected = "";
      this.variableSelected = "";
    },
    deleteAlert: async function (item) {
      await this.$store.dispatch("device/deleteAlert", {
        deviceId: item.deviceId,
        emqxRuleId: item.emqxRuleId,
      });
      await this.delay(3000);
      this.getAllUserDevices();
      this.toast("Alert deleted!", "success");
    },
    switchAlertRule: async function (item) {
      let alertRule = JSON.parse(JSON.stringify(item));
      alertRule.status = !alertRule.status;
      await this.$store.dispatch("device/updateAlertRule", {
        deviceId: item.deviceId,
        alertRule: alertRule,
      });
      await this.delay(3000);
      this.getAllUserDevices();
    },
    updateDeviceSelected: function (name, device) {
      this.deviceSelected = name;
      this.alertInfo.deviceId = device._id;
      this.variableSelected = "";
      this.conditionSelected = "";
      this.variablesList = device.variables;
    },
    updateVariableSelected: function (variable) {
      this.variableSelected = variable;
      this.alertInfo.variable = variable;
    },
    updateConditionSelected: function (condition) {
      this.conditionSelected = condition;
      this.alertInfo.condition = condition;
    },
  },
};
</script>

<style scoped>
.add-margin {
  margin: 5%;
}
</style>
