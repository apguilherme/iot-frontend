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
        <div class="row">
          <div class="col-md-6">
            <base-input
              alternative=""
              label="Device name"
              placeholder="Device name"
              input-classes="form-control-alternative"
              v-model="deviceInfo.name"
            />
          </div>
          <div class="col-md-6">
            <base-input
              alternative=""
              label="Device ID"
              placeholder="Device ID"
              input-classes="form-control-alternative"
              v-model="deviceInfo.id"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input alternative="" label="Description">
              <textarea
                rows="4"
                class="form-control form-control-alternative"
                placeholder="Description"
                v-model="deviceInfo.description"
              ></textarea>
            </base-input>
          </div>
          <div class="col-md-6">
            <base-dropdown>
              <template v-slot:title>
                <base-button
                  type="secondary"
                  class="dropdown-toggle"
                  style="margin-top: 30px"
                >
                  {{ templateSelected }}
                </base-button>
              </template>
              <a
                v-for="t in templates"
                :key="t"
                class="dropdown-item"
                :value="t"
                @click="updateTemplateSelected(t)"
                >{{ t }}</a
              >
            </base-dropdown>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-button type="default" @click="saveDevice">Save</base-button>
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
            :data="devicesTable"
          >
            <template v-slot:columns>
              <th>Name</th>
              <th>ID</th>
              <th>Description</th>
              <th>Template</th>
              <th>Actions</th>
              <th></th>
            </template>

            <template v-slot:default="row">
              <td>{{ row.item.name }}</td>
              <td>{{ row.item.id }}</td>
              <td>{{ row.item.description }}</td>
              <td>{{ row.item.template }}</td>
              <td>
                <el-tooltip placement="left" :content="row.item.isActive ? 'Turn off' : 'Turn on'">
                  <base-button
                    :key="row.item.id"
                    size="sm"
                    outline
                    :type="row.item.isActive ? 'success' : 'danger'"
                    :value="row.item.isActive"
                    @click="switchDeviceActive(row.item)"
                  >
                    {{ row.item.isActive ? 'On' : 'Off' }}
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
  </div>
</template>

<script>
export default {
  name: "devices",
  data() {
    return {
      deviceInfo: {
        name: "",
        id: "",
        description: "",
        template: "",
        isActive: true,
      },
      templates: ["Template 1", "Template 2", "Template 3"], // todo: make this dynamic.
      templateSelected: "Template 1", // default
      devicesTable: [],
    };
  },
  methods: {
    updateTemplateSelected: function (value) {
      this.templateSelected = value;
    },
    getDevices: function () {
      // todo: call api.
    },
    saveDevice: function () {
      // todo: avoid adding device with same id, avoid empty fields.
      // todo: call api.
      this.deviceInfo.template = this.templateSelected;
      this.devicesTable.push(Object.assign({}, this.deviceInfo));
      this.cleanDeviceInfo();
    },
    cleanDeviceInfo: function () {
      this.deviceInfo.name = "";
      this.deviceInfo.id = "";
      this.deviceInfo.description = "";
      this.deviceInfo.template = "";
      this.deviceInfo.isActive = true;
      this.templateSelected = this.templates[0];
    },
    editDevice: function (item) {
      // todo: change btn from Save to Update, add Cancel btn, lock row on table.
      // todo: call api.
      this.deviceInfo.name = item.name;
      this.deviceInfo.id = item.id;
      this.deviceInfo.description = item.description;
      this.deviceInfo.template = item.template;
      this.templateSelected = item.template;
    },
    deleteDevice: function (item) {
      // todo: remove from table.
      // todo: call api.
      alert("Delete: " + item);
    },
    switchDeviceActive: function (item) {
      // todo: call api.
      this.devicesTable = this.devicesTable.map((device) => {
        if (device.id === item.id) {
          let isActive = !device.isActive;
          return { ...device, isActive };
        } else {
          return device;
        }
      });
    },
  },
};
</script>

<style scoped>
.add-margin {
  margin: 5%;
}
</style>
