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
                <base-button
                  size="sm"
                  type="primary"
                  @click="editDevice(row.item)"
                  >Edit</base-button
                >
                <base-button size="sm" type="danger">Delete</base-button>
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
      },
      templates: ["Template 1", "Template 2", "Template 3"],
      templateSelected: "Template 1",
      devicesTable: [],
    };
  },
  methods: {
    updateTemplateSelected: function (value) {
      this.templateSelected = value;
      console.log(this.templateSelected);
    },
    saveDevice: function () {
      this.deviceInfo.template = this.templateSelected;
      this.devicesTable.push(Object.assign({}, this.deviceInfo));
      this.cleanDeviceInfo();
    },
    cleanDeviceInfo: function () {
      this.deviceInfo.name = "";
      this.deviceInfo.id = "";
      this.deviceInfo.description = "";
      this.deviceInfo.template = "";
      this.templateSelected = this.templates[0];
    },
    editDevice: function (item) {
      this.deviceInfo.name = item.name;
      this.deviceInfo.id = item.id;
      this.deviceInfo.description = item.description;
      this.deviceInfo.template = item.template;
      this.templateSelected = item.template;
    },
  },
};
</script>

<style scoped>
.add-margin {
  margin: 5%;
}
</style>
