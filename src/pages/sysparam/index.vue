<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pb-md q-px-none">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$t(`${storeCollection}.index.title`)" :to="`/${storeCollection}`" />
        <q-breadcrumbs-el label="Record" />
      </q-breadcrumbs>
    </q-toolbar>
    <q-toolbar class="q-pb-md q-px-none">
      <select-reference
        :collection="storeCollection"
        :action="'groups'"
        v-model="params.group"
        label="Group"
        :optionValue="'group'"
        :optionLabel="'group'"
      ></select-reference>

      <q-toolbar-title></q-toolbar-title>

      <q-btn flat rounded icon="delete" color="negative" label="Trash" :to="`/${storeCollection}/trash`" />
      <q-btn rounded icon="add" color="secondary" class="q-ml-sm" label="New" :to="`/${storeCollection}/create`" />
    </q-toolbar>

    <DataTable
      ref="refDatatable"
      :columns="columns"
      :fetch="fetch"
      :destroy="destroy"
      :collection="storeCollection"
      :params="params"
      :stateForm="stateForm"
    />
  </q-page>
</template>

<script>
import DataTable from 'components/resources/DataTable'
import SelectReference from 'components/SelectReference'
import { mapState, mapActions } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    DataTable,
    SelectReference
  },
  props: {
    collection: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      stateForm: 'entries' // entries, trash
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
    })
  },
  watch: {
    params: {
      handler (val) {
        this.$refs.refDatatable.emitFilter(this.params)
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      columns (state, getters) {
        return getters[`${this.storeCollection}/columns`]
      },
      params (state, getters) {
        return getters[`${this.storeCollection}/params`]
      }
    }),
    storeCollection() {
      const { collection } = this.$route.params
      const storeCollection = this.collection || collection
      return storeCollection
    }
  },
}
</script>
