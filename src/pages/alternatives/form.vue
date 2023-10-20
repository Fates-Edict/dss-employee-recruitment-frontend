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
    
    <q-form @submit.prevent="onSubmit" class="col-12 row" autocomplete="off">
      <HeaderForm :meta="Meta" />

      <CardGeneral>
        <div class="col-12 row q-col-gutter-md">
          <q-input :error="errors.name ? true : false" :error-message="errors.name" class="col-12 col-md-4" outlined v-model="dataModel.name" :label="$Lang.name" dense />
          <div class="col-12 q-py-none text-h6">
            {{ $Lang.detailCriteria }}
            <q-btn unelevated round size="sm" color="blue-5" icon="add" @click="onAddCriteriaDetail">
              <q-tooltip>{{ $Lang.add }}</q-tooltip>
            </q-btn>
          </div>
          <div class="col-12 row q-col-gutter-md items-center" v-for="val, i in dataModel.criteria_alternatives" :key="i">
            <div>
              <q-btn @click="dataModel.criteria_alternatives.splice(i, 1)" unelevated round color="red-5" icon="remove" size="xs">
              <q-tooltip>{{ $Lang.delete }}</q-tooltip>
            </q-btn>
            </div>
            <q-select dense class="col-12 col-md-4" outlined v-model="val.criteria_id" :label="$Lang.criteriaName" :options="criterias" option-label="name" option-value="id" emit-value map-options>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-italic text-primary">
                    No Data
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input class="col-12 col-md-4" outlined v-model="val.value" :label="$Lang.value" dense />
          </div>
        </div>
      </CardGeneral>
    </q-form>
  </div>
</template>
<script>
import Meta from "./meta";
export default {
  name: Meta.formName,
  data() {
    return {
      Meta,
      dataModel: null,
      errors: [],
      disableSubmit: false,
      criterias: []
    }
  },

  created() {
    this.dataModel = this.$Helper.unReactive(this.Meta.model)
    this.getCriteria()
    if(this.$route.params.id) this.getData(this.$route.params.id)
  },

  methods: {
    getData(id) {
      const endpoint = this.Meta.endpoint + `/${id}`
      this.$api.get(endpoint, this.$Helper.getToken()).then((response) => {
        if(response.status === 200) this.dataModel = response.data.data
      })
    },

    save() {
      const endpoint = this.Meta.endpoint
      this.$api.post(endpoint, this.dataModel, this.$Helper.getToken()).then((response) => {
        if(response.status === 201) {
          this.$Helper.alertSuccess(response.data.msg)
          this.$router.push({ name: `index-${this.Meta.endpoint}` })
        }
      }).catch((resE) => {
        this.disableSubmit = false
        if(resE.response.status === 400) this.errors = this.$Helper.extractErrors(resE.response.data.data, this.Meta.model)
      })
    },

    update() {
      const endpoint = this.Meta.endpoint + '/' + this.$route.params.id
      this.$api.put(endpoint, this.dataModel, this.$Helper.getToken()).then((response) => {
        if(response.status === 201) {
          this.$Helper.alertSuccess(response.data.msg)
          this.$router.push({ name: `index-${this.Meta.endpoint}` })
        }
      }).catch((resE) => {
        this.disableSubmit = false
        if(resE.response.status === 400) this.errors = this.$Helper.extractErrors(resE.response.data.data, this.Meta.model)
      })
    },

    onSubmit() {
      this.disableSubmit = true
      if(this.$route.params.id) this.update()
      else this.save()
    },

    getCriteria() {
      const endpoint = 'criteria'
      this.$api.get(endpoint, this.$Helper.getToken()).then((response) => {
        if(response.status === 200) this.criterias = response.data.data
      })
    },

    onAddCriteriaDetail() {
      this.dataModel.criteria_alternatives.push({
        id: null,
        alternative_id: null,
        criteria_id: null,
        value: null
      })
    }
  }
};
</script>