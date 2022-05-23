<template>
  <q-select
    filled
    v-model="value"
    use-input
    :label="label"
    emit-value
    map-options
    :option-value="optionValue"
    :option-label="optionLabel"
    :options="options"
    @filter="onFilter"
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
</template>

<script>
export default {
  name: 'SelectReference',
  props: {
    collection: {
      type: String,
      default: null
    },
    action: {
      type: String,
      default: 'fetch'
    },
    modelValue: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    optionValue: {
      type: String,
      default: 'id'
    },
    optionLabel: {
      type: [String, Function],
      default: 'title'
      // default: (item) => item === null ? 'No data' : item.title
    },
  },
  emits: ['update:modelValue'],
  setup () {
    return {}
  },
  data () {
    return {
      options: []
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    onFilter (search, update, abort) {
      const params = {
        search
      }
      this.$store.dispatch(`${this.collection}/${this.action}`, { params }).then(response => {
        const { data } = response
        update(() => {
          this.options = data
        })
      })
    }
  }
}
</script>
