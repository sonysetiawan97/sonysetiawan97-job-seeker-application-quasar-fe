<template>
  <div class="bg-grey-2 q-pa-md rounded-borders q-mb-md">
    <!-- <div class="text-subtitle">{{label}}</div> -->
    <div v-for="(item, key) in options" :key="key">
      {{item['label']}}:
      <q-option-group
        :name="name"
        v-model="list"
        :options="item['options']"
        type="checkbox"
        color="primary"
        inline
        @input="updateData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldOptionGroup',
  props: {
    value: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    options: {
      type: Array,
      required: true,
      default () {
        return [{}]
      }
    },
    label: {
      type: String
    },
    name: {
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
      list: []
    }
  },
  methods: {
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
