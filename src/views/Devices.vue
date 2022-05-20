<template>
  <div>
    <!-- DEVICE FORM -->
    <div class="add-margin">
      <card shadow type="secondary">
        <template v-slot:header>
          <div class="bg-white border-0">
            <div class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">Add new device</h3>
              </div>
            </div>
          </div>
        </template>
        <div class="column">
          <div class="col-md-6">
            <base-input
              label="Name"
              placeholder="Device name"
              input-classes="form-control-alternative"
              v-model="deviceInfo.name"
            />
          </div>
          <div class="col-md-6">
            <base-input label="Description">
              <textarea
                rows="4"
                class="form-control form-control-alternative"
                placeholder="Device description"
                v-model="deviceInfo.description"
              ></textarea>
            </base-input>
          </div>
          <div class="col-md-6">
            <base-input
              label="Variables"
              placeholder="Separate using comma, example: temp, light, status"
              input-classes="form-control-alternative"
              v-model="deviceInfo.variables"
            />
          </div>
          <br />
          <div class="row">
            <div class="col-md-1">
              <base-button type="default" @click="saveDevice">{{
                editId ? "Update" : "Save"
              }}</base-button>
            </div>
            <div class="col-md-1">
              <base-button type="secondary" @click="cleanDeviceInfo">
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
              <h3 class="mb-0">Devices</h3>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <base-table
            class="table align-items-center table-flush"
            thead-classes="thead-light"
            tbody-classes="list"
            :data="devicesList"
          >
            <template v-slot:columns>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Variables</th>
              <th>Save data</th>
              <th>Actions</th>
              <th></th>
            </template>

            <template v-slot:default="row">
              <td>{{ row.item._id }}</td>
              <td>{{ row.item.name }}</td>
              <td>{{ row.item.description }}</td>
              <td>{{ row.item.variables }}</td>
              <td>
                <el-tooltip
                  placement="left"
                  :content="row.item.saverRule.status ? 'Turn off' : 'Turn on'"
                >
                  <base-button
                    :key="row.item.id"
                    size="sm"
                    outline
                    :type="row.item.saverRule.status ? 'success' : 'danger'"
                    :value="row.item.saverRule.status"
                    @click="switchSaverRule(row.item)"
                  >
                    {{ row.item.saverRule.status ? "On" : "Off" }}
                  </base-button>
                </el-tooltip>
              </td>
              <td>
                <base-button
                  size="sm"
                  type="primary"
                  @click="editDevice(row.item)"
                >
                  Edit
                </base-button>
                <base-button
                  size="sm"
                  type="danger"
                  @click="deleteDevice(row.item)"
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
import delay from "../mixin/delay.js";
import toastMixin from "../mixin/toastMixin.js";

export default {
  name: "Devices",
  mixins: [delay, toastMixin],
  data() {
    return {
      deviceInfo: {
        // new device
        name: "",
        description: "",
        variables: [],
      },
      editId: "",
    };
  },
  created: function () {
    this.getAllUserDevices();
  },
  computed: {
    devicesList: function () {
      return this.$store.getters["device/getDevices"];
    },
  },
  methods: {
    getAllUserDevices: async function () {
      await this.$store.dispatch("device/getAllUserDevices");
    },
    saveDevice: async function () {
      if (
        this.deviceInfo.name === "" ||
        this.deviceInfo.description === "" ||
        this.deviceInfo.variables.length === 0
      ) {
        this.toast("Missing fields!", "error");
        return;
      }
      if (this.editId) {
        let vars = [
          ...new Set(
            this.deviceInfo.variables.split(",").map((item) => item.trim())
          ),
        ];
        await this.$store.dispatch("device/updateDevice", {
          deviceID: this.editId.trim(),
          name: this.deviceInfo.name.trim(),
          description: this.deviceInfo.description.trim(),
          variables: vars,
        });
      } else {
        let vars = [
          ...new Set(
            this.deviceInfo.variables.split(",").map((item) => item.trim())
          ),
        ];
        await this.$store.dispatch("device/createDevice", {
          name: this.deviceInfo.name.trim(),
          description: this.deviceInfo.description.trim(),
          variables: vars,
        });
      }
      this.cleanDeviceInfo();
      await this.delay(3000);
      this.getAllUserDevices();
    },
    cleanDeviceInfo: function () {
      this.deviceInfo.name = "";
      this.deviceInfo.description = "";
      this.deviceInfo.variables = [];
      this.editId = false;
    },
    editDevice: async function (item) {
      this.editId = item._id;
      this.deviceInfo.name = item.name;
      this.deviceInfo.description = item.description;
      this.deviceInfo.variables = item.variables;
    },
    deleteDevice: async function (item) {
      await this.$store.dispatch("device/deleteDevice", {
        deviceId: item._id,
        emqxRuleId: item.saverRule.emqxRuleId,
      });
      await this.delay(3000);
      this.getAllUserDevices();
    },
    switchSaverRule: async function (item) {
      let saverRule = JSON.parse(JSON.stringify(item.saverRule));
      saverRule.status = !saverRule.status;
      await this.$store.dispatch("device/updateSaverRule", {
        deviceID: item._id,
        saverRule: saverRule,
      });
      await this.delay(3000);
      this.getAllUserDevices();
    },
    replaceVarsStr(item) {
      return item.variables.replace('"', "").replace("[", "").replace("]", "");
    },
  },
};
</script>

<style scoped>
.add-margin {
  margin: 5%;
}
</style>
