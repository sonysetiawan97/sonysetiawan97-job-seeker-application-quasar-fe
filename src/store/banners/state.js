import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'banners'
export const params = {
  relationship: ['banner', 'video'],
  'orderby[order]': 'asc'
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
    name: 'order',
    required: true,
    label: 'Order',
    align: 'left',
    field: 'order',
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
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: 'status',
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
  description: '',
  status: 'inactive',
  type: 'banner',
  videourl: null,
  link: null,
  order: 1,
  banner: null,
  video: null
}

export const resetValue = {...form}

export const layout = [
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'title',
      label: 'Banner Title',
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
      name: 'description',
      label: 'Description',
      props: {},
      events: {}
    },
  ],
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'videourl',
      label: 'Video URL',
      props: {
        maxlength: 1024
      },
      events: {}
    },
  ],
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'link',
      label: 'Link',
      props: {
        maxlength: 1024
      },
      events: {}
    },
  ],
  [
    {
      type: 'QFile',
      col: 'col-4',
      name: 'banner',
      label: 'Image',
      props: {
        maxlength: 1024
      },
      events: {}
    },
    {
      type: 'QFile',
      col: 'col-4',
      name: 'video',
      label: 'Video',
      props: {
        maxlength: 1024
      },
      events: {}
    },
  ],
  [
    {
      type: 'QInput',
      col: 'col-2',
      name: 'order',
      label: 'Order',
      props: {
        type: 'number',
        maxlength: 1024
      },
      events: {}
    },
    {
      type: 'QRadio',
      col: 'col-3',
      name: 'status',
      label: 'Status',
      props: {
        options: [
          {
            value: 'active',
            label: 'Active'
          },
          {
            value: 'inactive',
            label: 'Inactive'
          }
        ]
      },
      events: {}
    },
    {
      type: 'QRadio',
      col: 'col-4',
      name: 'type',
      label: 'Type',
      props: {
        options: [
          {
            value: 'banner',
            label: 'Banner'
          },
          {
            value: 'video',
            label: 'Video'
          }
        ]
      },
      events: {}
    },
  ],
]

export const validation = {
  title: {
    required
  },
  description: {
    required
  },
  status: {
    required
  },
  type: {
    required
  },
  videourl: {},
  link: {},
  order: {
    required
  },
  banner: {},
  video: {},
}

export const headers = {
  'Content-Type': 'multipart/form-data'
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
    headers,
    resetValue,
    layout,
    validation
  }
}
