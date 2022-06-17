<template>
  <!-- NOTIFICATIONS TABLE -->
  <div class="add-margin">
    <div class="card shadow">
      <div class="card-header border-0">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="mb-0">Notifications</h3>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <base-table
          class="table align-items-center table-flush"
          thead-classes="thead-light"
          tbody-classes="list"
          :data="notificationsList"
        >
          <template v-slot:columns>
            <th>Date</th>
            <th>Device ID</th>
            <!-- <th>Device name</th> -->
            <th>Variable</th>
            <th>Value received</th>
            <th>Condition</th>
            <th>Value limit</th>
            <th>Message</th>
            <th></th>
          </template>

          <template v-slot:default="row">
            <td>{{ new Date(row.item.createdAt).toLocaleString() }}</td>
            <td>{{ row.item.deviceId }}</td>
            <!-- <td>{{ getDeviceNameById(row.item.deviceId) }}</td> -->
            <td>{{ row.item.variable }}</td>
            <td>{{ row.item.payload.value }}</td>
            <td>{{ row.item.condition }}</td>
            <td>{{ row.item.value }}</td>
            <td>
              Alert: {{ row.item.variable }} = {{ row.item.payload.value }}.
              This is {{ row.item.condition }} {{ row.item.value }}.
            </td>
          </template>
        </base-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notifications",
  data() {
    return {};
  },
  created: function () {
    this.$store.dispatch("user/getUserNotifications");
  },
  computed: {
    notificationsList: function () {
      return this.$store.getters["user/getNotifications"];
    },
    devicesList: function () {
      return this.$store.getters["device/getDevices"];
    },
  },
  methods: {
    getDeviceNameById: function (id) {
      return this.devicesList?.find((device) => device._id === id).name;
    },
  },
};
</script>
<style scoped>
.add-margin {
  margin: 5%;
}
</style>
