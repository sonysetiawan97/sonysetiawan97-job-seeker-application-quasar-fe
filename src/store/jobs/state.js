import { required } from "@vuelidate/validators";
import state from "../resources/state";
import { payRange } from "src/data/helpers/payRange";
export const collection = "jobs";
export const headers = {
  "Content-Type": "multipart/form-data",
};
export const params = {};

export const columns = [
  {
    name: "title",
    required: true,
    label: "Name",
    align: "left",
    field: "title",
    format: (val) => val,
    sortable: true,
  },
  {
    name: "work_location",
    required: true,
    label: "Work Location",
    align: "left",
    field: "work_location",
    format: (val) => val,
    sortable: true,
  },
  {
    name: "work_schedule",
    required: true,
    label: "Work Schedule",
    align: "left",
    field: "work_schedule",
    format: (val) => val,
    sortable: true,
  },
  {
    name: "work_level",
    required: true,
    label: "Work Level",
    align: "left",
    field: "work_level",
    format: (val) => val,
    sortable: true,
  },
  {
    name: "education_level",
    required: true,
    label: "Education Level",
    align: "left",
    field: "education_level",
    format: (val) => val,
    sortable: true,
  },
  {
    name: "pay_range",
    required: true,
    label: "Pay Range",
    align: "left",
    field: "pay_range",
    format: (val, entry) => {
      return payRange(entry.pay_range_start, entry.pay_range_end);
    },
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
  title: null,
  company_id: null,
  work_location: null,
  work_schedule: null,
  work_level: null,
  education_level: null,
  description: null,
  pay_range_start: null,
  pay_range_end: null,
  still_hiring: true,
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
  ],
  [
    {
      type: "QSelect",
      col: "col",
      name: "work_location",
      label: "Work Location",
      props: {
        options: [
          {
            label: "WFO",
            value: "wfo",
          },
          {
            label: "WFH",
            value: "wfh",
          },
          {
            label: "Hybrid",
            value: "hybrid",
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
      name: "work_schedule",
      label: "Work Schedule",
      props: {
        options: [
          {
            label: "Full Time",
            value: "full_time",
          },
          {
            label: "Part Time",
            value: "part_time",
          },
          {
            label: "Freelance",
            value: "freelance",
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
      name: "education_level",
      label: "Education Level",
      props: {
        options: [
          {
            label: "SD",
            value: "sd",
          },
          {
            label: "SMP",
            value: "smp",
          },
          {
            label: "SMA",
            value: "sma",
          },
          {
            label: "S1",
            value: "s1",
          },
          {
            label: "S2",
            value: "s2",
          },
          {
            label: "S3",
            value: "s3",
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
      type: "QInput",
      col: "col",
      name: "work_level",
      label: "Level",
      props: {},
      events: {},
    },
  ],
  [
    {
      type: "QEditor",
      col: "col",
      name: "description",
      label: "Description",
      props: {},
      events: {},
    },
  ],
  [
    {
      type: "QInput",
      col: "col",
      name: "pay_range_start",
      label: "Pay Range Start",
      props: {
        type: "number",
      },
      events: {},
    },
    {
      type: "QInput",
      col: "col",
      name: "pay_range_end",
      label: "Pay Range End",
      props: {
        type: "number",
      },
      events: {},
    },
  ],
];

export const validation = {
  title: { required },
  company_id: { required },
  work_location: { required },
  work_schedule: { required },
  work_level: { required },
  education_level: { required },
  description: { required },
  pay_range_start: {},
  pay_range_end: {},
  still_hiring: { required },
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
