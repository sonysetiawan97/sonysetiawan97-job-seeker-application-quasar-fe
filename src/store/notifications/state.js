import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'notifications'
export const params = {
  relationship: ['user']
}

export const columns = [
  {
    name: 'notifiable_id',
    required: true,
    label: 'User',
    align: 'left',
    field: 'notifiable_id',
    format: (val, row) => {
      if(!row.user) return '-'
      return `${row.user.first_name} ${row.user.last_name}`
    },
    sortable: true
  },
  {
    name: 'subject',
    required: true,
    label: 'Subject',
    align: 'left',
    field: 'subject',
    format: (val, row) => {
      if(!row.data) return '-'
      const data = JSON.parse(row.data)
      return `${data.subject}`
    },
    sortable: true
  },
  {
    name: 'read_at',
    required: true,
    label: 'Status',
    align: 'left',
    field: 'read_at',
    format: (val) => val == null? 'Unread': 'Read',
    sortable: true
  },
  {
    name: 'created_at',
    required: true,
    label: 'Date',
    align: 'left',
    field: 'created_at',
    format: (val) => val.substr(0, 10),
    sortable: false
  },

  // Always give this columns as default
  // {
  //   name: 'action',
  //   label: null,
  //   field: 'key'
  // }
]

export const form = {
  type: null,
  notifiable_type: null,
  notifiable_id: null,
  data: null,
  read_at: null
}

export const resetValue = {
  ...form
}

export const layout = []

export const validation = {
  type: {},
  notifiable_type: {},
  notifiable_id: {},
  data: {},
  read_at: {}
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
