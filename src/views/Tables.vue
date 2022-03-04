<template>
  <br />
  <br />
  <br />
  <br />
  <br />
  <div>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table title="Light Table"></projects-table>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <projects-table type="dark" title="Dark Table"></projects-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectsTable from "./Tables/ProjectsTable";
export default {
  name: "tables",
  components: {
    ProjectsTable,
  },
};
</script>
<style></style>
