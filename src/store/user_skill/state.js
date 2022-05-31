import { required } from "@vuelidate/validators";
import state from "../resources/state";
export const collection = "user_skill";
export const headers = {
  "Content-Type": "multipart/form-data",
};
export const params = {};

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
  {
    name: "description",
    required: true,
    label: "Description",
    align: "left",
    field: "description",
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
  description: null,
};

export const resetValue = { ...form };

export const layout = [
  [
    {
      type: "QInput",
      col: "col",
      name: "name",
      label: "Name",
      props: {},
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col",
      name: "description",
      label: "Description",
      props: {
        type: "textarea",
      },
      events: {},
    },
  ],
];

export const validation = {
  name: { required },
  description: { required },
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
  };
}
