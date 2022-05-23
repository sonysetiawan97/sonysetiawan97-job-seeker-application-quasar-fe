import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'notifications'
export const params = {
  relationship: ['user']
}

export const columns = []

export const form = {
  type: 'agent',
  users: null,
  excludes: null,
  subject: null,
  template: null,
  message: ''
}

export const resetValue = {
  ...form
}

export const layout = [
  [
    {
      type: 'QSelect',
      col: 'col-4',
      name: 'type',
      label: 'Type',
      props: {
        options: [
          {
            value: 'all',
            label: 'Broadcast to All Users'
          },
          {
            value: 'agent',
            label: 'Broadcast to Agents'
          },
          {
            value: 'student',
            label: 'Broadcast to Students'
          },
        ],
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'value',
        'option-label': 'label',
        'hide-selected': true,
        'fill-input': true
      },
      events: {}
    },
  ],
  [
    {
      type: 'QSelect',
      col: 'col-6',
      name: 'users',
      label: 'Broadcast to Users',
      props: {
        options: [],
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'id',
        'option-label': (item) => `${item.first_name} ${item.last_name}`,
        'multiple': true,
        'hint': '--Left blank to broadcast to all users'
      },
      reference: 'users',
      params: {
        role: ['agent']
      },
      events: {}
    },
  ],
  [
    {
      type: 'QSelect',
      col: 'col-6',
      name: 'excludes',
      label: 'Exclude Users',
      props: {
        options: [],
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'id',
        'option-label': (item) => `${item.first_name} ${item.last_name}`,
        'multiple': true,
      },
      reference: 'users',
      params: {
        role: 'agent'
      },
      events: {}
    },
  ],
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'subject',
      label: 'Subject',
      props: {
        type: 'text'
      },
      events: {}
    },
  ],
  [
    {
      type: 'QSelect',
      col: 'col-4',
      name: 'template',
      label: 'Template',
      props: {
        options: [],
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'id',
        'option-label': 'subject',
        'hide-selected': true,
        'fill-input': true
      },
      reference: 'notificationTemplates',
      events: {}
    },
  ],
  [
    {
      type: 'QEditor',
      col: 'col',
      name: 'message',
      label: 'Message',
      props: {},
      events: {}
    },
  ],
]

export const validation = {
  type: {required},
  users: {},
  excludes: {},
  subject: {required},
  template: {},
  message: {required}
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
