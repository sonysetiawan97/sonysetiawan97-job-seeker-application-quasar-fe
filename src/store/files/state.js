import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'files'

export const columns = [
  {
    name: 'display',
    required: true,
    label: 'File',
    align: 'left',
    field: 'full_path',
    format: (val, row) => val,
    sortable: false,
    style: 'width: 120px'
  },
  {
    name: 'caption',
    required: true,
    label: 'Caption',
    align: 'left',
    field: 'title',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'directory',
    required: true,
    label: 'Directory',
    align: 'left',
    field: 'directory',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'download',
    label: null,
    style: 'width: 50px',
    field: 'key'
  },
  // Always give this columns as default
  {
    name: 'action',
    style: 'width: 50px',
    label: null,
    field: 'key'
  }
]

export const directories = [
  {
    value: 'banners/image',
    label: 'Banners Image'
  },
  {
    value: 'banners/video',
    label: 'Banners Video'
  },
  {
    value: 'files',
    label: 'Files'
  },
]

export const form = {
  file: null,
  title: null,
  description: '',
  directory: null,
  foreign_table: null,
  foreign_id: null,
  type: 'image',
  fullpath: null // NOTE: fullpath will not be submited
}

export const resetValue = {...form}
export const layout = [
  [
    {
      type: 'QFile',
      col: 'col-4',
      name: 'file',
      label: 'File',
      imgfield: 'fullpath', // NOTE: field wil be shown
      props: {
        maxlength: 1024,
        accept: 'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*'
      },
      events: {}
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'title',
      label: 'Title',
      props: {
        maxlength: 1024,
        autogrow: true,
        hint: '-- optional'
      },
      events: {}
    }
  ],
  [
    {
      type: 'QEditor',
      col: 'col',
      name: 'description',
      label: 'Description',
      props: {
        maxlength: 1024,
        autogrow: true,
        hint: '-- optional'
      },
      events: {}
    }
  ],
  [
    {
      type: 'QRadio',
      col: 'col',
      name: 'type',
      label: 'Type',
      props: {
        options: [
          {
            label: 'Compress',
            value: 'compress'
          },
          {
            label: 'Documents',
            value: 'document'
          },
          {
            label: 'Image',
            value: 'image'
          },
          {
            label: 'Video',
            value: 'video'
          },
          {
            label: 'Audio',
            value: 'audio'
          },
          {
            label: 'Other',
            value: 'other'
          }
        ]
      },
      events: {}
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col-2',
      name: 'foreign_table',
      label: 'Foreign Table',
      props: {
        maxlength: 1024,
        autogrow: true,
        hint: '-- optional'
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-2',
      name: 'foreign_id',
      label: 'Foreign ID',
      props: {
        maxlength: 1024,
        autogrow: true,
        hint: '-- optional'
      },
      events: {}
    },
    {
      type: 'QSelect',
      col: 'col-3',
      name: 'directory',
      label: 'Directory',
      props: {
        options: directories,
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'value',
        'option-label': 'label',
        'hide-selected': true,
        'fill-input': true,
        hint: '-- optional'
      },
      events: {}
    },
  ],
]

export const validation = {
  file: {},
  title: {},
  description: {},
  directory: {},
  foreign_table: {},
  foreign_id: {},
  type: {
    required
  }
}

export const headers = {
  'Content-Type': 'multipart/form-data'
}

export default function () {
  return {
    ...state(),
    // Collection name
    collection,
    // Datatable config
    columns,
    form,
    resetValue,
    directories,
    layout,
    validation,
    headers
  }
}
