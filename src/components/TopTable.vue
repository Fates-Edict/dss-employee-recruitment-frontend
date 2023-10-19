<template>
  <div style="width: 100%" class="q-py-md">
    <div class="row items-center">
      <div class="q-mr-sm">
        <q-btn v-if="meta.permissions.delete && dataModel.selected.length > 0" @click="confirmDelete()" unelevated round color="red-5" icon="delete_forever" size="sm">
          <q-tooltip>{{ $Lang.delete }}</q-tooltip>
        </q-btn>
      </div>
      <slot name="search" />

      <q-space />

      <q-btn
        v-if="meta.permissions.create"
        color="primary"
        size="sm"
        icon="add"
        :label="$Lang.add"
        unelevated
        padding="sm lg"
        @click="$emit('addEvent')"
      >
        <q-tooltip>{{ $Lang.addData }}</q-tooltip>
      </q-btn>
    </div>

    <q-dialog v-model="modal.show" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="red-5" text-color="white" />
          <span class="q-ml-sm">{{ modal.params }}</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn unelevated :label="$Lang.cancel" color="primary" v-close-popup />
          <q-btn unelevated :label="$Lang.delete" color="red-5" @click="modal.show = false; onDelete()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: "TopTable",
  props: ['meta', 'modelValue'],
  emits: ["addEvent", "refresh"],

  data() {
    return {
      dataModel: this.modelValue,
      modal: {
        title: '',
        show: false,
        params: null,
        theme: ['bg-red-5 text-white']
      }
    }
  },

  methods: {
    async onDelete() {
      const rows = this.dataModel.selected
      this.$Helper.loadingOverlay(true, this.$Lang.deleting + ' data, ' + this.$Lang.pleaseWait)
      await rows.forEach(element => {
        const endpoint = this.meta.endpoint + '/' + element.id
        this.$api.delete(endpoint, this.$Helper.getToken()).then((response) => {
          if(response.status === 200) this.$Helper.alertSuccess(response.data.msg)
        })
      })
      this.dataModel.selected = []
      this.$emit('refresh')
      this.$Helper.loadingOverlay(false)
    },

    confirmDelete() {
      this.modal.title = this.$Lang.delete + ` ${this.dataModel.selected.length} data.`
      this.modal.params = this.$Lang.confirmDelete + this.dataModel.selected.length + ' data ?'
      this.modal.show = true
    }
  }
};
</script>