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

				<div class="col-12 row q-mt-md" v-if="isNormalize">
          <div class="col-12 text-h6 row justify-between items-center q-mb-sm">Data Ternormalisasi</div>

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

						<tr v-for="val, i in model" :key="i">
              <td class="border">
                <div class="row items-center justify-center">
                  <span class="text-h6">A{{i + 1}} </span>
                  <q-icon class="cursor-pointer" size="sm" color="positive" name="info">
                    <q-tooltip>{{ val[0].alternative.name }}</q-tooltip>
                  </q-icon>
                </div>
              </td>
              <td class="border" v-for="x, y in val" :key="y">{{ x.data.normalize }}</td>
						</tr>
					</q-markup-table>
				</div>

        <div class="col-12 row q-mt-md" v-if="isNormalize">
          <div class="col-12 text-h6 row justify-between items-center q-mb-sm">Hasil Perankingan</div>

					<q-markup-table class="col-12" flat>
            <tr>
              <td rowspan="2" class="text-center border">Alternatif</td>
              <td :colspan="dataModel.criterias.length" class="text-center border">Kriteria</td>
              <td rowspan="2" class="text-center border">Total</td>
              <td rowspan="2" class="text-center border">Ranking</td>
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

						<tr v-for="val, i in model" :key="i">
              <td class="border">
                <div class="row items-center justify-center">
                  <span class="text-h6">A{{i + 1}} </span>
                  <q-icon class="cursor-pointer" size="sm" color="positive" name="info">
                    <q-tooltip>{{ val[0].alternative.name }}</q-tooltip>
                  </q-icon>
                </div>
              </td>
              <td class="text-center border" v-for="x, y in val" :key="y">{{ x.data.normalize }} * {{ weightPercentage[y] }}</td>
              <td class="text-center border">{{ score[i] }}</td>
              <td class="text-center border">{{ rankings[i] }}</td>
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
			model: [],
      score: [],
      rankings: []
		}
	},

	created() {
		this.dataModel = this.$Helper.unReactive(this.Meta.model)
		this.getAlternatives()
		this.getCriterias()
		if(this.$route.params.id) this.getData(this.$route.params.id)
	},

	methods: {
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
			this.isNormalize = false
    },

		onSimulate() {
			this.isNormalize = true
			const alternatives = this.dataModel.alternatives
      const criteria = this.dataModel.criterias
			let matrix = []
      let minMax = []
			let criteriaAlternatives = []

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

			alternatives.forEach(element => {
				let temp = []
				element.criteria_alternatives.forEach((x, i) => {
					const type = x.criteria.type
					const data = {
						value: x.value,
						normalize: type === 'cost' ? parseFloat((minMax[i].min / x.value).toFixed(3)) : parseFloat((x.value / minMax[i].max).toFixed(3))
					}
					temp.push({
						alternative: element,
						data
					})
				})
				criteriaAlternatives.push(temp)
			})
			this.model = criteriaAlternatives

      let score = [];
      this.model.forEach(element => {
        let tempScore = 0;
        element.forEach((x, i) => {
          tempScore += (x.data.normalize * this.weightPercentage[i])
        })
        score.push(tempScore)
      })
      this.score = score
      const ranking = this.score
      .map((v, i) => [v, i])
      .sort((a, b) => b[0] - a[0])
      .map((a, i) => [...a, i + 1])
      .sort((a, b) => a[1] - b[1])
      .map(a => a[2])
      this.rankings = ranking
		}
	}
}
</script>

<style scoped>
	.border {
		border: .95px solid #bdb7b7;
		text-align: center;
	}
</style>