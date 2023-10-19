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

    <FormWrapper :meta="Meta">
      <div class="col-12 row q-col-gutter-md">
        <q-input class="col-12 col-md-4" outlined v-model="dataModel.name" :label="$Lang.name" dense />
        <q-input class="col-12 col-md-4" outlined v-model="dataModel.username" :label="$Lang.username" dense />
        <q-input class="col-12 col-md-4" outlined v-model="dataModel.email" :label="$Lang.email" dense />
        <q-input class="col-12 col-md-4" outlined v-model="dataModel.password" :label="$Lang.password" dense />
      </div>
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
    }
  },

  created() {
    this.dataModel = this.$Helper.unReactive(this.Meta.model)
    if(this.$route.params.id) this.getData(this.$route.params.id)
  },

  methods: {
    getData(id) {
      const endpoint = this.Meta.endpoint + `/${id}`
      this.$api.get(endpoint, this.$Helper.getToken()).then((response) => {
        if(response.status === 200) this.dataModel = response.data.data
      })
    }
  }
};
</script>