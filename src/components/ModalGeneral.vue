<template>
	<q-dialog v-model="show" persistent>
		<q-card style="width: 90vw; height: 80vh">
			<q-bar style="position: sticky; top: 0; z-index: 10" :class="config.theme ? config.theme : 'bg-grey-8 text-white'">
				{{ config.title ?? 'Detail' }}
				<q-space />

				<slot name="closeBtn" />
			</q-bar>

			<q-card-section>
				<q-list bordered separator v-if="generalContent === ''">
					<q-item v-for="val, i in config.params" :key="i">
						<q-item-section>
							<q-item-label>{{ val.label }}</q-item-label>
							<q-item-label caption>{{ val.value }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
				<div v-else>
					<slot name="contents" />
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	name: 'ModalGeneral',
	props: ['config', 'generalContent'],
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