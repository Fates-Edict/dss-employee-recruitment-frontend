<template>
	<div class="row">
		<div class="col-12 row q-mb-sm">
			<div class="col-6">
				<span class="text-primary text-h5 text-capitalize">{{ meta.title ?? '' }}</span>
			</div>
			<div class="col-6 q-gutter-xs justify-end row">
				<q-btn color="red-5" size="sm" icon="cancel" :label="$Lang.cancel" unelevated padding="sm lg" @click="back" />
				<q-btn color="primary" size="sm" icon="check" :label="$Lang.save" unelevated padding="sm lg" @click="$emit('onSubmit')" />
			</div>
		</div>

		<q-card class="col-12 q-pa-md row" style="border-radius: 8px;" flat bordered>
			<slot />
		</q-card>
	</div>
</template>

<script>
export default {
	name: 'CardForm',
	props: ['meta'],
	emits: ['onSubmit'],

	methods: {
		back() {
			this.$router.push({ name: `index-${this.meta.endpoint}` })
		}
	}
}
</script>