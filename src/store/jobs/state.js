import { required } from "@vuelidate/validators";
import state from "../resources/state";
export const collection = "jobs";
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
  // Always give this columns as default
  {
    name: "action",
    label: null,
    field: "key",
  },
];

export const form = {
  country_id: null,
  province_id: null,
  name: null,
};

export const resetValue = { ...form };

export const layout = [[]];

export const validation = {};

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
