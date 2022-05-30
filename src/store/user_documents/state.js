import { required } from "@vuelidate/validators";
import state from "../resources/state";
export const collection = "user_documents";
export const params = {};

export const columns = [
  // Always give this columns as default
  {
    name: "action",
    label: null,
    field: "key",
  },
];

export const permissions = [];

export const form = {
  cv: null,
};

export const resetValue = { ...form };

export const layout = [
  [
    {
      type: "QFile",
      col: "col",
      name: "cv",
      label: "CV",
      props: {
        maxlength: 1024,
        accept: "application/pdf",
      },
      events: {},
    },
  ],
];

export const validation = {
  cv: { required },
};

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
