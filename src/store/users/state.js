import { required } from "@vuelidate/validators";
import { Cookies } from "quasar";
import state from "../resources/state";

export const collection = "users";
export const params = {
  relationship: "roles",
  "orderby[users.id]": "desc",
};

const user = Cookies.get("user");
let myRoles = [];

if (user) {
  const { role } = user;
  if (role) {
    myRoles = role;
  }
}

export const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    format: (val, row) => `${row.first_name} ${row.last_name}`,
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "phone",
    align: "left",
    label: "Phone",
    field: "phone",
    sortable: true,
    format: (val, row) => val || " - ",
  },

  {
    name: "role",
    align: "left",
    label: "Roles",
    field: "roles",
    sortable: true,
    format: (roles, row) => {
      if (!roles) return "-";
      const roleNames = [];
      for (const item of row.roles) {
        roleNames.push(item.role.name);
      }
      return roleNames.join(", ");
    },
  },
  // Always give this columns as default
  {
    name: "action",
    label: null,
    field: "key",
  },
];

let forms = {
  first_name: null,
  last_name: null,
  username: null,
  email: null,
  password: null,
  password_confirmation: null,
  phone: null,
  dob: null, // Date
  residence: null,
  gender: null, // ['male', 'female']
  religion: null,
  country_id: null,
  province_id: null,
  city_id: null,
  status: "active", // ['active', 'inactive']
};

let layouts = [
  [
    {
      type: "QInput",
      col: "col",
      name: "first_name",
      label: "First Name",
      props: {},
      events: {},
    },
    {
      type: "QInput",
      col: "col",
      name: "last_name",
      label: "Last Name",
      props: {},
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col",
      name: "username",
      label: "User Name",
      props: {},
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col",
      name: "email",
      label: "Email",
      props: {
        type: "email",
      },
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col",
      name: "phone",
      label: "Phone",
      props: {
        type: "tel",
      },
      events: {},
    },
    {
      type: "QInput",
      col: "col",
      name: "dob",
      label: "Date Of Birth",
      props: {
        type: "date",
      },
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col",
      name: "residence",
      label: "Residence",
      props: {
        type: "textarea",
      },
      events: {},
    },
  ],
  [
    {
      type: "QSelect",
      col: "col",
      name: "gender",
      label: "Gender",
      props: {
        options: [
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
          {
            label: "Hidden",
            value: "hidden",
          },
        ],
        "use-input": true,
        "emit-value": true,
        "map-options": true,
        "option-value": "value",
        "option-label": "label",
        "hide-selected": true,
        "fill-input": true,
        hint: "",
      },
      events: {},
    },
    {
      type: "QSelect",
      col: "col",
      name: "religion",
      label: "Religion",
      props: {
        options: [
          {
            label: "Christian",
            value: "christian",
          },
          {
            label: "Catholic",
            value: "catholic",
          },
          {
            label: "Moslem",
            value: "moslem",
          },
          {
            label: "Hindu",
            value: "hindu",
          },
          {
            label: "Buddha",
            value: "buddha",
          },
          {
            label: "Confucianism",
            value: "confucianism",
          },
          {
            label: "Hidden",
            value: "hidden",
          },
        ],
        "use-input": true,
        "emit-value": true,
        "map-options": true,
        "option-value": "value",
        "option-label": "label",
        "hide-selected": true,
        "fill-input": true,
        hint: "",
      },
      events: {},
    },
  ],
  [
    {
      type: "QSelect",
      col: "col",
      name: "country_id",
      label: "Country",
      props: {
        options: [],
        "use-input": true,
        "emit-value": true,
        "map-options": true,
        "option-value": "id",
        "option-label": "name",
        "hide-selected": true,
        "fill-input": true,
        hint: "",
      },
      reference: "countries",
      updateValues: ["province_id", "city_id"],
      events: {},
    },
    {
      type: "QSelect",
      col: "col",
      name: "province_id",
      label: "Provices",
      props: {
        options: [],
        "use-input": true,
        "emit-value": true,
        "map-options": true,
        "option-value": "id",
        "option-label": "name",
        "hide-selected": true,
        "fill-input": true,
        hint: "",
      },
      reference: "provinces",
      updateValues: ["city_id"],
      params: {
        "id[in]": 11,
      },
      events: {},
    },
    {
      type: "QSelect",
      col: "col",
      name: "city_id",
      label: "Ciy",
      props: {
        options: [],
        "use-input": true,
        "emit-value": true,
        "map-options": true,
        "option-value": "id",
        "option-label": "name",
        "hide-selected": true,
        "fill-input": true,
        hint: "",
      },
      reference: "cities",
      params: {
        province_id: 11,
      },
      events: {},
    },
  ],
];

let validations = {
  first_name: { required },
  last_name: { required },
  username: { required },
  email: { required },
  password: { required },
  password_confirmation: { required },
  phone: { required },
  dob: { required },
  residence: { required },
  gender: { required },
  religion: { required },
  country_id: { required },
  province_id: { required },
  city_id: { required },
};

if (myRoles.includes("job_seeker")) {
  forms["cv"] = null;
  layouts.push([
    {
      type: "QFile",
      col: "col",
      name: "cv",
      label: "CV",
      imgfield: 'fullpath', // NOTE: field wil be shown
      props: {
        maxlength: 1024,
        accept: "application/pdf",
      },
      events: {},
    },
  ]);
  validations["cv"] = { required };
}

export const form = forms;

export const resetValue = { ...form };

export const layout = layouts;

export const validation = validations;

export const permissions = [];

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
    permissions,
  };
}
