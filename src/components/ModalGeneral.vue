<template>
	<q-dialog v-model="show" persistent>
		<q-card style="width: 90vw; height: 80vh">
			<q-bar style="position: sticky; top: 0; z-index: 10" class="bg-grey-8 text-white">
				{{ config.title ?? 'Detail' }}
				<q-space />

				<slot name="closeBtn" />
			</q-bar>

			<q-card-section>
				<q-list bordered separator>
					<q-item v-for="val, i in config.params" :key="i">
						<q-item-section>
							<q-item-label>{{ val.label }}</q-item-label>
							<q-item-label caption>{{ val.value }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	name: 'ModalGeneral',
	props: ['config'],
	data() {
		return {
			show: false
		}
	},

	watch: {
		'config.show'() {
			this.show = this.config.show
		}
	}
}
</script>