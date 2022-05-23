<template>
  <div>
    <div class="text-subtitle q-mb-md">{{label}}</div>
    <q-avatar
      v-if="['show', 'update', 'trashed'].indexOf(stateForm) >= 0"
      class="q-mb-md"
      rounded
      size="250px"
      @click="popupimage=true"
    >
      <q-img :src="selectedImg" contain />
    </q-avatar>

    <q-file
      v-if="!readonly"
      outlined
      :readonly="readonly"
      :label="label"
      stack-label
      v-model="form.file"
      v-bind="props"
      v-on="events"
      :error="error"
      :loading="loading"
      clearable
      @input="fileSelected"
    >
      <template v-slot:before>
        <q-avatar>
          <q-icon
            v-if="!selectedImg"
            name="insert_photo"
            size="md"
          />
          <q-img
            v-if="selectedImg"
            :src="selectedImg"
            spinner-color="white"
            class="rounded-borders"
            @click="popupimage=true"
          >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
          </q-img>
        </q-avatar>
      </template>
    </q-file>
    <q-dialog v-model="popupimage">
      <q-img :src="selectedImg" width="50%" contain />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'FieldFileUploader',
  props: {
    value: {
      type: String,
      required: false,
      validator: prop => typeof prop === 'string' || prop === null,
      default: ''
    },
    label: {
      type: String
    },
    stateForm: {
      type: String,
      default: 'show'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean
    },
    events: {
      type: Object
    },
    props: {
      type: Object
    },
    directory: {}
  },
  components: {},
  data () {
    return {
      form: {
        file: null,
        directory: null
      },
      filesrc: null,
      selectedImg: null,
      loading: false,
      popupimage: false
    }
  },
  methods: {
    ...mapActions('uploader', {
      upload: 'create'
    }),
    ...mapMutations('uploader', {
      mutateUploaderParam: 'form'
    }),
    updateData (value) {
      console.log(value)
      this.$emit('input', value)
    },
    readSrcFile (file) {
      return URL.createObjectURL(file)
    },
    fileSelected (file) {
      this.selectedImg = null
      if (file) {
        this.loading = true
        this.upload({ data: this.form }).then((response) => {
          const { data } = response
          this.updateData(data)
          this.selectedImg = this.readSrcFile(file)
          this.loading = false
        }).catch((error) => {
          if (error.response) {
            this.$q.dialog({
              title: 'Error',
              message: 'Something Error happened',
              ok: {
                flat: true
              },
              persistent: true
            })
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  },
  watch: {
    value (value) {
      this.selectedImg = value
    }
  },
  mounted () {
    if (this.value) {
      this.selectedImg = this.value
    }

    if (this.directory) {
      this.form.directory = this.directory
    }
  },
  computed: {}
}
</script>
