<template>
  <div class="q-pa-md">
    <q-breadcrumbs class="text-grey q-mb-sm" active-color="black">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="black" />
      </template>
      <q-breadcrumbs-el
        v-for="(val, i) in Meta.breadcrumbsForm"
        :key="i"
        :label="val.label"
        :icon="val.icon"
        :class="i === Meta.breadcrumbsForm.length - 2 ? 'cursor-pointer' : ''"
        @click="
          i === Meta.breadcrumbsForm.length - 2
            ? $router.push({ name: `index-${Meta.endpoint}` })
            : ''
        "
      />
    </q-breadcrumbs>

    <q-scroll-area class="row" style="height: 80vh">
      <q-card class="q-pa-md" flat bordered style="height: 100%">
        <q-input
          class="col-12 col-md-6"
          outlined
          v-model="text"
          label="Label"
          dense
        />
      </q-card>
    </q-scroll-area>
  </div>
</template>
<script>
import Meta from "./meta";
export default {
  name: "FormUsers",
  data() {
    return {
      Meta,
    };
  },
};
</script>