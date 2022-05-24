import { required } from "@vuelidate/validators";
import state from "../resources/state";
export const collection = "companies";
export const headers = {
  "Content-Type": "multipart/form-data",
};
export const params = {
  "orderby[id]": "asc",
};

export const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    format: (val) => val,
    sortable: true,
  },
  // Always give this columns as default
  {
    name: "action",
    label: null,
    field: "key",
  },
];

export const form = {
  name: null,
  location: null,
  description: null,
};

export const resetValue = { ...form };

export const layout = [
  [
    {
      type: "QInput",
      col: "col-12",
      name: "name",
      label: "Name",
      props: {},
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col-12",
      name: "location",
      label: "Location",
      props: {},
      events: {},
    },
  ],
  [
    {
      type: "QEditor",
      col: "col-12",
      name: "description",
      label: "Description",
      props: {},
      events: {},
    },
  ],
];

export const validation = {
  name: { required },
  location: { required },
  description: { required },
};

export const registerForm = {
  company_id: null,
};

export const registerLayout = [
  [
    {
      type: "QSelect",
      col: "col-4",
      name: "company_id",
      label: "Company",
      props: {
        options: [],
        "use-input": true,
        "emit-value": true,
        "map-options": true,
        "option-value": "id",
        "option-label": "name",
        "hide-selected": true,
        "fill-input": true,
        hint: "contact admin if your company didn't exist",
      },
      reference: "companies",
      events: {},
    },
  ],
];

export const registerValidation = {
  company_id: { required },
};

export default function () {
  return {
    ...state(),
    headers,
    // Collection name
    collection,
    // Datatable config
    columns,
    params,
    form,
    resetValue,
    layout,
    validation,

    // REGISTER COMPANY
    registerForm,
    registerLayout,
    registerValidation,
  };
}
