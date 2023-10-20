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
        <div class="col-12 row">
          <q-input :error="errors.name ? true : false" :error-message="errors.name" class="col-12 col-md-4" outlined v-model="dataModel.name" :label="$Lang.name" dense />
          <div class="text-right col-12">
            <q-checkbox v-model="selectAllPermissions" :label="$Lang.selectAll" />
          </div>
          <q-markup-table class="col-12" flat bordered separator="cell">
            <thead>
              <tr>
                <th class="text-center">{{ $Lang.permissions }}</th>
                <th class="text-center">Browse</th>
                <th class="text-center">Create</th>
                <th class="text-center">Read</th>
                <th class="text-center">Update</th>
                <th class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="val, i in dataModel.permissions" :key="i">
                <td class="text-center">{{ val.name }}</td>
                <td class="text-center">
                  <q-checkbox v-if="val.name !== 'Dashboard'" v-model="val.browse" />
                </td>
                <td class="text-center">
                  <q-checkbox v-if="val.name !== 'Dashboard'" v-model="val.create" />
                </td>
                <td class="text-center">
                  <q-checkbox v-model="val.read" />
                </td>
                <td class="text-center">
                  <q-checkbox v-if="val.name !== 'Dashboard'" v-model="val.update" />
                </td>
                <td class="text-center">
                  <q-checkbox v-if="val.name !== 'Dashboard'" v-model="val.delete" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
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
      selectAllPermissions: false
    }
  },

  created() {
    this.dataModel = this.$Helper.unReactive(this.Meta.model)
    if(this.$route.params.id) this.getData(this.$route.params.id)
    else this.getModules()
  },

  watch: {
    'selectAllPermissions'() {
      if(this.selectAllPermissions) {
        this.dataModel.permissions.forEach(element => {
          element.browse = true
          element.create = true
          element.read = true
          element.update = true
          element.delete = true
        })
      } else {
        this.dataModel.permissions.forEach(element => {
          element.browse = false
          element.create = false
          element.read = false
          element.update = false
          element.delete = false
        })
      }
    }
  },

  methods: {
    getData(id) {
      const endpoint = this.Meta.endpoint + `/${id}`
      this.$api.get(endpoint, this.$Helper.getToken()).then((response) => {
        if(response.status === 200) {
          this.dataModel = response.data.data
          this.getModules(true)
        }
      })
    },

    getModules(edit = false) {
      const endpoint = 'modules'
      this.$api.get(endpoint, this.$Helper.getToken()).then((response) => {
        if(response.status === 200) {
          if(edit) {
            const data = response.data.data
            let modules = []
            for(let i = 0; i < data.length; i++) {
              modules.push(data[i].name)
            }
            let dataModel = []
            for(let i = 0; i < this.dataModel.permissions.length; i++) {
              dataModel.push(this.dataModel.permissions[i].name)
            }
            const difference = modules.filter(element => {
              return !dataModel.includes(element)
            })

            difference.forEach(element => {
              this.dataModel.permissions.push({
                name: element,
                browse: false,
                create: false,
                read: false,
                update: false,
                delete: false
              })
            })
          } else {
            let modules = response.data.data
            modules.forEach(element => {
              element.name = element.name
              element.browse = false
              element.create = false
              element.read = false
              element.update = false
              element.delete = false
            })
            this.dataModel.permissions = modules
          }
        }
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

    onSelectAll() {
      console.log(1)
    }
  }
};
</script>