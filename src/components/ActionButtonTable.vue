<template>
	<div class="q-gutter-xs">
		<q-btn v-if="meta.permissions.update" @click="$emit('onClickEdit', id)" unelevated round color="primary" icon="edit" size="xs">
			<q-tooltip>{{ $Lang.update }}</q-tooltip>
		</q-btn>
		<q-btn v-if="meta.permissions.browse" @click="$emit('onClickDetail', id)" unelevated round color="blue" icon="info" size="xs">
			<q-tooltip>{{ $Lang.detail }}</q-tooltip>
		</q-btn>
		<!-- <q-btn v-if="meta.permissions.delete" @click="$emit('onClickDelete', id)" unelevated round color="red-5" icon="delete_forever" size="xs">
			<q-tooltip>{{ $Lang.delete }}</q-tooltip>
		</q-btn> -->
	</div>
</template>
<script>
export default {
	name: 'ActionButtonTable',
	props: ['meta', 'id'],
	emits: ['onClickEdit', 'onClickDetail']
}
</script>