import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'users'
export const params = {
  relationship: ['roles.role'],
  // relationship: ['photo'],
  'orderby[users.id]': 'desc'
}

export const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    format: (val, row) => `${row.first_name} ${row.last_name}`,
    sortable: true
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'email',
    sortable: true
  },
  {
    name: 'phone',
    align: 'left',
    label: 'Phone',
    field: 'phone',
    sortable: true,
    format: (val, row) => val || ' - '
  },

  {
    name: 'role',
    align: 'left',
    label: 'Roles',
    field: 'roles',
    sortable: true,
    format: (roles, row) => {
      if(!roles) return '-'
      const roleNames = []
      for (const item of row.roles) {
        roleNames.push(item.role.name)
      }
      return roleNames.join(', ')
    }
  },
  // Always give this columns as default
  {
    name: 'action',
    label: null,
    field: 'key'
  }
]

export const form = {
  email: null,
  username: null,
  first_name: null,
  last_name: null,
  password: null,
  password_confirmation: null,
  phone: null,
  gender: null, // ['male', 'female']
  dob: null, // Date
  status: 'inactive', // ['active', 'inactive']
}

export const resetValue = {...form}

export const layout = [
  [
    {
      type: 'QInput',
      col: 'col-6',
      name: 'email',
      label: 'Email',
      props: {
        type: 'email'
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-6',
      name: 'username',
      label: 'Username',
      props: {
        type: 'text'
      },
      events: {}
    }
    // {
    //   type: 'QSelect',
    //   col: 'col-2',
    //   name: 'role',
    //   label: 'Role',
    //   props: {
    //     options: [],
    //     'use-input': true,
    //     'emit-value': true,
    //     'map-options': true,
    //     'option-value': 'name',
    //     'option-label': 'name',
    //     'hide-selected': true,
    //     'fill-input': true
    //   },
    //   reference: 'roles',
    //   updateValues: [], // update values to be null on value changed
    //   events: {}
    // },
  ],
  [
    {
      type: 'QInput',
      col: 'col-4',
      name: 'first_name',
      label: 'First Name',
      props: {
        maxlength: 50
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-4',
      name: 'last_name',
      label: 'Last Name',
      props: {
        maxlength: 50
      },
      events: {}
    },
  ],
  // [
  //   {
  //     type: 'QInput',
  //     col: 'col-4',
  //     name: 'password',
  //     label: 'Password',
  //     props: {
  //       type: 'password',
  //       maxlength: 50
  //     },
  //     events: {}
  //   },
  //   {
  //     type: 'QInput',
  //     col: 'col-4',
  //     name: 'password_confirmation',
  //     label: 'Retype Password',
  //     props: {
  //       type: 'password',
  //       maxlength: 50
  //     },
  //     events: {}
  //   },
  // ],
  [
    {
      type: 'QInput',
      col: 'col-3',
      name: 'dob',
      label: 'Date of Birth',
      props: {
        type: 'date',
      },
      events: {}
    },
    {
      type: 'QRadio',
      col: 'col-5',
      name: 'gender',
      label: 'Gender',
      props: {
        options: [
          {
            value: 'female',
            label: 'Female'
          },
          {
            value: 'male',
            label: 'Male'
          }
        ]
      },
      events: {}
    },
  ],
  [
    {
      type: 'QInput',
      col: 'col-3',
      name: 'phone',
      label: 'Phone',
      props: {
        type: 'tel',
      },
      events: {}
    },
  ],
]

export const validation = {
  email: { required },
  username: { required },
  // role: { required },
  // role: { },
  first_name: { required },
  last_name: { required },
  password: { },
  password_confirmation: { },
  phone: { },
  gender: { required },
  dob: { required },
  status: { required },
}

export const permissions = []

export default function () {
  return {
    ...state(),
    // Collection name
    collection,
    // Datatable config
    columns,
    form,
    params,
    resetValue,
    layout,
    validation,
    permissions
  }
}
