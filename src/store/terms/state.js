import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'contents'
export const params = {
  type: 'terms'
}

export const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: 'title',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'category',
    required: true,
    label: 'Language',
    align: 'left',
    field: 'category',
    format: (val) => val == 'id'? 'Indoensia': 'English',
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
  category: 'id',
  content: '',
  type: 'terms',
  image: null,
}
export const resetValue = {...form}
export const layout = [
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'title',
      label: 'Title',
      props: {
        maxlength: 1024
      },
      events: {}
    },
  ],
  [
    {
      type: 'QEditor',
      col: 'col',
      name: 'content',
      label: 'Content',
      props: {},
      events: {}
    },
  ],
  [
    {
      type: 'QRadio',
      col: 'col-4',
      name: 'category',
      label: 'Language',
      props: {
        options: [
          {
            value: 'id',
            label: 'Indonesia'
          },
          {
            value: 'en',
            label: 'English'
          }
        ]
      },
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
  category: { required },
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
