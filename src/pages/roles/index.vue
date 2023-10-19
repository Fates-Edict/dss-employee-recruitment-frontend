<template>
  <div class="q-pa-md">
    <q-breadcrumbs class="text-grey q-mb-sm" active-color="black">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="black" />
      </template>
      <q-breadcrumbs-el
        v-for="(val, i) in Meta.breadcrumbsIndex"
        :key="i"
        :label="val.label"
        :icon="val.icon"
      />
    </q-breadcrumbs>

    <q-table
      flat
      dense
      bordered
      :rows="table.data"
      :columns="table.columns"
      row-key="name"
      style="height: 80vh"
      :loading="table.loading"
      :rows-per-page-options="$Helper.rowsPerPageOptions()"
      selection="multiple"
      v-model:selected="table.selected"
      v-model:pagination="table.pagination"
      @request="getData"
      binary-state-sort
    >
      <template v-slot:top>
        <TopTable v-model="table" :meta="Meta" @addEvent="onAdd()" @refresh="getData(table)">
          <template v-slot:search>
            <div class="col-6 col-sm-3 col-md-2">
              <q-input class="text-capitalize" outlined v-model="quickSearch" :label="$Lang.search" dense>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="quickSearch = ''" class="cursor-pointer" />
              </template>
            </q-input>
            </div>
          </template>
        </TopTable>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <ActionButtonTable :id="props.row.id" :meta="Meta" @onClickEdit="onClickEdit($event)" @onClickDetail="onClickDetail" />
        </q-td>
      </template>

      <template v-slot:body-cell-permissions="props">
        <q-td :props="props">
          
        </q-td>
      </template>
    </q-table>

    <ModalGeneral generalContent :config="modal">
      <template v-slot:closeBtn>
        <q-btn dense flat icon="close" v-close-popup @click="modal.show = false">
					<q-tooltip>{{ $Lang.close }}</q-tooltip>
				</q-btn>
      </template>
    </ModalGeneral>
  </div>
</template>

<script>
import Meta from "./meta";

export default {
  name: Meta.indexName,
  data() {
    return {
      loading: false,
      Meta,
      table: null,
      quickSearch: null,
      modal: {
        title: '',
        show: false,
        params: null
      }
    };
  },
  created() {
    this.table = this.$Helper.makeTable(
      this.Meta.table(this.$Helper, this.$Lang)
    )
    this.Meta.permissions = this.$Helper.extractPermissions(this.Meta)
    this.getData(this.table)
  },
  watch: {
    'quickSearch'() {
      this.getData(this.table)
    }
  },
  methods: {
    getData(props) {
      this.table.loading = true
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const orderType = descending ? 'DESC' : 'ASC'
      let endpoint = this.Meta.endpoint + '?table'
      endpoint += '&page=' + page
      endpoint += '&paginate=' + (rowsPerPage === 0 ? props.pagination.rowsNumber : rowsPerPage)
      endpoint += '&order=' + sortBy + ':' + orderType
      this.quickSearch ? endpoint += '&s=' + this.quickSearch : ''
      this.$api.get(endpoint, this.$Helper.getToken()).then((response) => {
        this.table.loading = false
        if(response.status === 200) {
          const data = response.data.data
          this.table.data.splice(0, this.table.data.length, ...data.data)
          this.table.pagination = this.$Helper.handlePagination(page, rowsPerPage, sortBy, descending, data.total)
        }
      });
    },
    onAdd() {
      this.$router.push({ name: `add-${this.Meta.endpoint}` });
    },
    onClickEdit(id) {
      this.$router.push({ name: `edit-${this.Meta.endpoint}`, params: { id } })
    },
    onClickDetail(id) {
      const endpoint = this.Meta.endpoint + '/' + id
      this.$api.get(endpoint, this.$Helper.getToken()).then((response) => {
        if(response.status === 200) {
          const data = response.data.data
          let details = this.Meta.details(this.$Lang)
          details.forEach(element => { element.value = data[element.key] })
          this.modal.title = data.name
          this.modal.params = details
          this.modal.show = !this.modal.show
        }
      })
    }
  },
};
</script>