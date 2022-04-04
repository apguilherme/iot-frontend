<template>
  <div>
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
              <th>Owner</th>
              <th>Actions</th>
              <th></th>
            </template>

            <template v-slot:default="row">
              <td>{{ row.item._id }}</td>
              <td>{{ row.item.name }}</td>
              <td>{{ row.item.description }}</td>
              <td>{{ row.item.user.email }}</td>
              <td>
                <el-tooltip
                  placement="left"
                  :content="row.item.isActive ? 'Turn off' : 'Turn on'"
                >
                  <base-button
                    :key="row.item.id"
                    size="sm"
                    outline
                    :type="row.item.isActive ? 'success' : 'danger'"
                    :value="row.item.isActive"
                    @click="switchDeviceActive(row.item)"
                  >
                    {{ row.item.isActive ? "On" : "Off" }}
                  </base-button>
                </el-tooltip>
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
              label="Device name"
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
                placeholder="Description"
                v-model="deviceInfo.description"
              ></textarea>
            </base-input>
          </div>
          <br />
          <div class="row">
            <div class="col-md-1">
              <base-button type="default" @click="saveDevice">{{
                editID ? "Update" : "Save"
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
  </div>
</template>

<script>
import toastMixin from "../mixin/toastMixin.js";

export default {
  name: "Devices",
  mixins: [toastMixin],
  data() {
    return {
      devicesTable: [],
      deviceInfo: {
        name: "",
        description: "",
        templateID: "",
      },
      editID: "",
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
      this.toast("Devices list updated!", "success");
    },
    saveDevice: async function () {
      if (this.editID) {
        await this.$store.dispatch("device/updateDevice", {
          deviceID: this.editID,
          name: this.deviceInfo.name,
          description: this.deviceInfo.description,
        });
      } else {
        await this.$store.dispatch("device/createDevice", {
          name: this.deviceInfo.name,
          description: this.deviceInfo.description,
        });
      }
      this.cleanDeviceInfo();
      this.toast("Device saved!", "success");
      this.getAllUserDevices();
    },
    cleanDeviceInfo: function () {
      this.deviceInfo.name = "";
      this.deviceInfo.description = "";
      this.editID = false;
    },
    editDevice: async function (item) {
      this.editID = item._id;
      this.deviceInfo.name = item.name;
      this.deviceInfo.description = item.description;
    },
    deleteDevice: async function (item) {
      await this.$store.dispatch("device/deleteDevice", item._id);
      this.getAllUserDevices();
      this.toast("Device deleted!", "success");
    },
    switchDeviceActive: async function (item) {
      await this.$store.dispatch("device/updateActiveDevice", {
        deviceID: item._id,
        isActive: !item.isActive,
      });
      this.getAllUserDevices();
    },
  },
};
</script>

<style scoped>
.add-margin {
  margin: 5%;
}
</style>
