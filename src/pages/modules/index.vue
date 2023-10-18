<template>
  <div class="q-pa-md">
    <q-breadcrumbs class="text-grey q-mb-sm" active-color="black">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="black" />
      </template>
      <q-breadcrumbs-el
        v-for="(val, i) in Meta.breadcrumbsIndex"
        :key="i"
        :label="val.label"
        :icon="val.icon"
      />
    </q-breadcrumbs>

    <q-table
      flat
      bordered
      :rows="table.data"
      :columns="table.columns"
      row-key="name"
      style="height: 80vh"
      :loading="loading"
      :rows-per-page-options="$Helper.rowsPerPageOptions()"
      selection="multiple"
      v-model:selected="table.selected"
      rowsNumber="10"
    >
      <template v-slot:top><TopTable @addEvent="onAdd()" /></template>
      <template v-slot:body-cell-action="props">
        {{ props.row }}
      </template>
    </q-table>
  </div>
</template>

<script>
import Meta from "./meta";

export default {
  name: "IndexModules",
  data() {
    return {
      loading: false,
      Meta,
      table: null,
    };
  },
  created() {
    this.table = this.$Helper.makeTable(
      this.Meta.table(this.$Helper, this.$Lang)
    );
    this.getData();
  },
  methods: {
    getData() {
      this.$api.get(this.Meta.endpoint).then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          console.log(data)
        }
      });
    },
    onAdd() {
      this.$router.push({ name: "add-modules" });
    },
  },
};
</script>