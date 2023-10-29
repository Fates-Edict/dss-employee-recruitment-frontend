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
          <q-select dense class="col-12 col-md-6" outlined multiple use-chips v-model="dataModel.alternatives" :label="$Lang.alternativeName" :options="alternatives" option-label="name" emit-value map-options />
          <q-select dense class="col-12 col-md-6" outlined multiple use-chips v-model="dataModel.criterias" :label="$Lang.criteriaName" :options="criterias" option-label="name" emit-value map-options />
        </div>

        <div class="col-12 row q-mt-md">
          <div class="col-12 text-h6 q-mb-sm">
            Presentase Bobot Kriteria <span style="font-size: 13px" class="text-red">*Harus berjumlah 100</span>
          </div>

          <q-markup-table class="col-12" flat>
            <tr>
              <td class="text-center border" v-for="val, i in dataModel.criterias" :key="i">
                <div class="row items-center justify-center">
                  <span class="text-h6">C{{i + 1}}</span>
                  <q-icon class="cursor-pointer" size="sm" :color="val.type === 'cost' ? 'red-5' : 'blue'" :name="val.type === 'cost' ? 'sentiment_very_dissatisfied' : 'add_reaction'">
                    <q-tooltip class="text-capitalize">{{ val.name }}</q-tooltip>
                  </q-icon>
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-center border" v-for="val, i in dataModel.criterias" :key="i">
                <q-input style="width: 70px" class="text-h4 text-center q-mx-auto" v-model="val.weight" @update:modelValue="checkWeightPercentage($event)" />
              </td>
            </tr>
          </q-markup-table>
        </div>

        <div class="col-12 row q-mt-md" v-if="weightPass">
          <div class="col-12 text-h6 row justify-between items-center q-mb-sm">
            Sumber Data
            <q-btn label="Simulasikan" icon="calculate" color="blue-5" size="sm" unelevated @click="onSimulate()" />
          </div>

          <q-markup-table class="col-12" flat>
            <tr>
              <td rowspan="2" class="text-center border">Alternatif</td>
              <td :colspan="dataModel.criterias.length" class="text-center border">Kriteria</td>
            </tr>
            <tr>
              <td v-for="val, i in dataModel.criterias" :key="i" class="border">
                <div class="row items-center justify-center">
                  <span class="text-h6">C{{i + 1}}</span>
                  <q-icon size="sm" class="cursor-pointer" 
                    :color="val.type === 'cost' ? 'red-5' : 'blue'" 
                    :name="val.type === 'cost' ? 'sentiment_very_dissatisfied' : 'add_reaction'"
                    >
                    <q-tooltip>{{ val.name }}</q-tooltip>
                  </q-icon>
                </div>
              </td>
            </tr>
            <tr v-for="val, i in dataModel.alternatives" :key="i">
              <td :key="i" class="border">
                <div class="row items-center justify-center">
                  <span class="text-h6">A{{i + 1}} </span>
                  <q-icon class="cursor-pointer" size="sm" color="positive" name="info">
                    <q-tooltip>{{ val.name }}</q-tooltip>
                  </q-icon>
                </div>
              </td>
              <td v-for="x, y in dataModel.criterias" :key="y" class="border">
                {{ val.criteria_alternatives ? val.criteria_alternatives.find(obj => obj.criteria_id === x.id).value : '' }}
              </td>
            </tr>
          </q-markup-table>
        </div>

        <div class="col-12 row q-mt-md">
          <div class="col-12 text-h6 row q-mb-sm">
            Hasil Pencarian Bobot <span style="font-size: 13px" class="text-red q-ml-sm">*Penjumlahan masing - masing hasil. Hasil = Bobot Kriteria * Hasil Ternormalisasi</span>
          </div>

          <q-markup-table class="col-12" flat>
            <tr>
              <td rowspan="2" class="text-center border">Alternatif</td>
              <td :colspan="dataModel.criterias.length + 1" class="text-center border">Kriteria</td>
            </tr>
            <tr>
              <td v-for="val, i in dataModel.criterias" :key="i" class="border">
                <div class="row items-center justify-center">
                  <span class="text-h6">C{{i + 1}}</span>
                  <q-icon size="sm" class="cursor-pointer" 
                    :color="val.type === 'cost' ? 'red-5' : 'blue'" 
                    :name="val.type === 'cost' ? 'sentiment_very_dissatisfied' : 'add_reaction'"
                    >
                    <q-tooltip>{{ val.name }}</q-tooltip>
                  </q-icon>
                </div>
              </td>
              <td class="border">Jumlah</td>
            </tr>
            <tr v-for="val, i in dataModel.alternatives" :key="i">
              <td class="border">
                <div class="row items-center justify-center">
                  <span class="text-h6">A{{i + 1}} </span>
                  <q-icon class="cursor-pointer" size="sm" color="positive" name="info">
                    <q-tooltip>{{ val.name }}</q-tooltip>
                  </q-icon>
                </div>
              </td>

              <td v-for="x, y in matrixNormalize" :key="y" class="border">
                {{ weightPercentage[y] }} * {{ x[i] }} = {{ parseFloat(weightPercentage[y] * x[i]).toFixed(3) }}
              </td>
              <td class="border">1</td>
            </tr>
          </q-markup-table>
        </div>

        <div class="col-12 row q-mt-md">
          <div class="col-12 text-h6 row q-mb-sm">
            Data Ternormalisasi
          </div>

          <q-markup-table class="col-12" flat>
            <tr>
              <td rowspan="2" class="text-center border">Alternatif</td>
              <td :colspan="dataModel.criterias.length" class="text-center border">Kriteria</td>
            </tr>
            <tr>
              <td v-for="val, i in dataModel.criterias" :key="i" class="border">
                <div class="row items-center justify-center">
                  <span class="text-h6">C{{i + 1}}</span>
                  <q-icon size="sm" class="cursor-pointer" 
                    :color="val.type === 'cost' ? 'red-5' : 'blue'" 
                    :name="val.type === 'cost' ? 'sentiment_very_dissatisfied' : 'add_reaction'"
                    >
                    <q-tooltip>{{ val.name }}</q-tooltip>
                  </q-icon>
                </div>
              </td>
            </tr>
            
            <tr v-for="val, i in dataModel.alternatives" :key="i">
              <td class="border">
                <div class="row items-center justify-center">
                  <span class="text-h6">A{{i + 1}} </span>
                  <q-icon class="cursor-pointer" size="sm" color="positive" name="info">
                    <q-tooltip>{{ val.name }}</q-tooltip>
                  </q-icon>
                </div>
              </td>
              <td v-for="x, y in matrixNormalize" :key="y" class="border">
                {{ x[i] }}
              </td>
            </tr>
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
      alternatives: [],
      criterias: [],
      weightPass: false,
      weightPercentage: [],
      isNormalize: false,
      matrixNormalize: []
    }
  },

  created() {
    this.dataModel = this.$Helper.unReactive(this.Meta.model)
    this.getAlternatives()
    this.getCriterias()
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

    getAlternatives() {
      const endpoint = 'alternatives?order=id:desc'
      this.$api.get(endpoint, this.$Helper.getToken()).then((response) => {
        if(response.status === 200) this.alternatives = response.data.data
      })
    },

    getCriterias() {
      const endpoint = 'criteria?order=id:desc'
      this.$api.get(endpoint, this.$Helper.getToken()).then((response) => {
        if(response.status === 200) this.criterias = response.data.data
      })
    },

    checkWeightPercentage() {
      let percentage = 0
      this.weightPercentage = []
      this.dataModel.criterias.forEach(element => {
        if(Number.isInteger(parseInt(element.weight))) {
          percentage += parseInt(element.weight)
          this.weightPercentage.push(element.weight / 100)
        }
      })
      if(percentage !== 100) this.weightPass = false
      else this.weightPass = true
    },

    onSimulate() {
      const alternatives = this.dataModel.alternatives
      const criteria = this.dataModel.criterias
      let matrix = []
      let minMax = []
      let matrixNormalize = []

      for(let i = 0; i < criteria.length; i++) {
        let tempMatrix = []
        let tempMinMax = {}
        alternatives.forEach(element => {
          tempMatrix.push(element.criteria_alternatives[i].value)
        })
        matrix.push(tempMatrix)

        const min = Math.min(...tempMatrix)
        const max = Math.max(...tempMatrix)
        tempMinMax = { min, max }
        minMax.push(tempMinMax)
      }
      
      for(let i = 0; i < matrix.length; i++) {
        const type = criteria[i].type
        let tempNormalize = []
        for(let j = 0; j < matrix[i].length; j++) {
          if(type === 'cost') {
            const count = minMax[i].min / matrix[i][j]
            tempNormalize.push(parseFloat(count.toFixed(3)))
          } else {
            const count = matrix[i][j] / minMax[i].max
            tempNormalize.push(parseFloat(count.toFixed(3)))
          }
        }
        matrixNormalize.push(tempNormalize)
      }
      this.matrixNormalize = matrixNormalize
    }
  }
};
</script>
<style scoped>
.border {
  border: .95px solid #bdb7b7;
  text-align: center;
}
</style>