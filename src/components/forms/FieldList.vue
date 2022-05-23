<template>
  <div>
    <div class="text-subtitle">{{label}}</div>
    <div class="row q-gutter-md q-mb-md" v-for="(item, key) of list" :key="key">
      <div class="col">
        <q-input
          outlined
          v-model="list[key]"
          @input="updateData"
          :readonly="readonly"
        >
          <template v-slot:after v-if="!readonly">
            <q-btn round dense flat icon="remove" color="red" @click="removeItem(key)" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-gutter-md q-mb-md">
      <q-btn flat icon="add" color="green" label="Add Item" @click="addItem" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldList',
  props: {
    value: {
      type: Array,
      required: true,
      default () {
        return ['']
      }
    },
    label: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data () {
    return {
      list: ['']
    }
  },
  methods: {
    addItem () {
      this.list.push('')
    },
    removeItem (index) {
      this.list.splice(index, 1)
    },
    updateData () {
      const data = this.list
      this.$emit('input', data)
    }
  },
  watch: {
    value (value) {
      this.list = value
    }
  },
  mounted () {
    if (typeof this.value === 'object' && this.value.length) {
      this.list = this.value
    }
  },
  computed: {}
}
</script>
