<template>
  <div style="width: 100%" class="q-py-md">
    <div class="row">
      <slot name="search" />

      <q-space />

      <q-btn
        v-if="meta.permissions.create"
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
  props: ['meta'],
  emits: ["addEvent"],
};
</script>