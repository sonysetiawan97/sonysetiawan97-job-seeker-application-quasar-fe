import { required } from "@vuelidate/validators";
import state from "../resources/state";
export const collection = "user_experiences";
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
  id: null,
  title: null,
  company_name: null,
  job_description: null,
  location: null,
  start_date: null,
  end_date: null,
};

export const resetValue = { ...form };

export const layout = [
  [
    {
      type: "QInput",
      col: "col",
      name: "title",
      label: "Title",
      props: {},
      events: {},
    },
    {
      type: "QInput",
      col: "col",
      name: "company_name",
      label: "Company Name",
      props: {},
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col",
      name: "job_description",
      label: "Description",
      props: {
        type: "textarea",
      },
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col",
      name: "location",
      label: "Location",
      props: {},
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col",
      name: "start_date",
      label: "Start Date",
      props: {
        type: "date",
      },
      events: {},
    },
    {
      type: "QInput",
      col: "col",
      name: "end_date",
      label: "End Date",
      props: {
        type: "date",
      },
      events: {},
    },
  ],
];

export const validation = {
  id: {},
  title: { required },
  company_name: { required },
  job_description: { required },
  location: { required },
  start_date: { required },
  end_date: {},
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
