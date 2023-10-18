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

    <FormWrapper :meta="Meta" @onSubmit="onSubmit">
      <q-form @submit="onSubmit" class="col-12 row">
        <div class="col-12 row q-col-gutter-md">
          <q-input class="col-12 col-md-3" outlined v-model="dataModel.name" :label="$Lang.name" dense />
        </div>
      </q-form>
    </FormWrapper>
  </div>
</template>
<script>
import Meta from "./meta";
export default {
  name: "FormUsers",
  data() {
    return {
      Meta,
      dataModel: null
    };
  },

  created() {
    this.dataModel = this.$Helper.unReactive(this.Meta.model)
  },

  methods: {
    onSubmit() {
      // this.$axios.defaults.withCredentials = true;
      // this.$axios.get(`${this.$Helper.rootBaseApi()}/sanctum/csrf-cookie`).then((response) => {
      //   console.log(response)
      // })
    }
  }
};
</script>