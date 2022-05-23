<template>
  <q-page class="q-pa-md">
    <div class="text-h5">{{country.name}}</div>
    <q-toolbar class="q-pb-md q-px-none q-mt-lg">
      <q-tabs v-model="tab" shrink stretch active-color="light-blue-10" content-class="tabs-border" class="full-width" align="left">
        <q-route-tab :to="`/countries/${country_id}`" no-caps name="country" label="Country" />
        <q-route-tab :to="`/countries/${country_id}/provinces`" no-caps name="provinces" label="Provinces" />
        <q-route-tab :to="`/countries/${country_id}/cities`" no-caps name="cities" label="Cities" />
      </q-tabs>
    </q-toolbar>
    <q-toolbar class="q-pb-md q-px-none">
      <q-select
        filled
        v-model="params.province_id"
        use-input
        label="Province"
        emit-value
        map-options
        option-value="id"
        option-label="name"
        class="col-4"
        :options="provincesOptions"
        @filter="provinceSelect"
        @update:model-value="provinceChanged"
        autocomplete="off"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-italic text-grey">
              Data not found
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-toolbar-title></q-toolbar-title>
      <q-btn flat rounded icon="delete" color="negative" label="Trash" :to="`/${parentCollection}/${country_id}/${storeCollection}/trash`" />
      <q-btn rounded icon="add" color="secondary" class="q-ml-sm" label="New" :to="`/${parentCollection}/${country_id}/${storeCollection}/create`" />
    </q-toolbar>
    <DataTable
      ref="refDatatable"
      :columns="columns"
      :fetch="fetch"
      :destroy="destroy"
      :basePath="`${parentCollection}/${country_id}/${storeCollection}`"
      :collection="storeCollection"
      :params="params"
      :stateForm="stateForm"
    />
  </q-page>
</template>
<style>
.tabs-border {
  border-bottom: 1px solid #e0e0e0;
}
</style>
<script>
import DataTable from 'components/resources/DataTable'
import { mapState, mapActions } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    DataTable
  },
  props: {
    parentCollection: {
      type: String,
      default: null
    },
    collection: {
      type: String,
      default: null
    }
  },
  setup () {
    const route = useRoute()
    const { country_id } = route.params
    return {
      country_id
    }
  },
  mounted () {
    this.$store
    .dispatch(`${this.parentCollection}/detail`, { id: this.country_id })
    .then(response => {
      const { data } = response
      this.country = data
    })
    .catch(error => {
      this.loading = false
      if (!error.response) return
      const { data } = error.response
      this.$q.dialog({
        title: `${data.status}`,
        message: `${data.message}`,
        ok: {
          flat: true
        },
        persistent: true
      })
    })
  },
  data () {
    return {
      stateForm: 'entries', // entries, trash
      country: {},
      tab: 'provinces',
      provincesOptions: []
    }
  },
  methods: {
    ...mapActions({
      fetch (dispatch, payload) {
        return dispatch(this.storeCollection + '/fetch', payload)
      },
      destroy (dispatch, payload) {
        return dispatch(this.storeCollection + '/destroy', payload)
      }
    }),
    provinceChanged () {
      this.stateData = new Date().toISOString()
      this.$refs.refDatatable.emitFilter(this.params)
    },
    provinceSelect (search, update, abort) {
      const params = {
        search
      }
      this.$store.dispatch('provinces/fetch', { params }).then(response => {
        const { data } = response
        update(() => {
          this.provincesOptions = data
        })
      })
    }
  },
  computed: {
    ...mapState({
      columns (state, getters) {
        return getters[`${this.storeCollection}/columns`]
      },
      params (state, getters) {
        const params = getters[`${this.storeCollection}/params`]
        params['country_id'] = this.country_id
        return params
      }
    }),
    storeCollection() {
      const route = useRoute()
      const { collection } = route.params
      const storeCollection = this.collection || collection
      return storeCollection
    }
  },
}
</script>
