import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'contents'
export const params = {
  type: 'faqs'
}

export const columns = [
  {
    name: 'title',
    required: true,
    label: 'Ask',
    align: 'left',
    field: 'title',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left',
    field: 'type',
    format: (val) => val,
    sortable: true
  },
  // Always give this columns as default
  {
    name: 'action',
    label: null,
    field: 'key'
  }
]

export const form = {
  title: null,
  category: null,
  content: '',
  type: 'faqs',
  image: null,
}
export const resetValue = {...form}
export const layout = [
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'title',
      label: 'Ask',
      props: {
        maxlength: 1024,
        autogrow: true
      },
      events: {}
    },
  ],
  [
    {
      type: 'QEditor',
      col: 'col',
      name: 'content',
      label: 'Answer',
      props: {},
      events: {}
    },
  ],
  [
    {
      type: 'QFile',
      col: 'col-4',
      name: 'image',
      label: 'Image',
      props: {
        maxlength: 1024
      },
      events: {}
    }
  ],
]

export const validation = {
  title: { required },
  content: { required },
  type: { required },
  category: {},
  image: {},
}

export default function () {
  return {
    ...state(),
    // Collection name
    collection,
    params,
    // Datatable config
    columns,
    form,
    resetValue,
    layout,
    validation
  }
}
