<template>
  <div style="width: 100%">
    <div class="row">
      <q-input
        class="text-capitalize"
        outlined
        v-model="text"
        :label="$Lang.search"
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="text = ''" class="cursor-pointer" />
        </template>
      </q-input>

      <q-space />

      <q-btn
        color="primary"
        size="sm"
        icon="add"
        :label="$Lang.add"
        unelevated
        padding="sm lg"
        @click="$emit('addEvent')"
      >
        <q-tooltip>{{ $Lang.addData }}</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopTable",
  emits: ["addEvent"],
};
</script>