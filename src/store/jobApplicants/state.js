import { required } from "@vuelidate/validators";
import state from "../resources/state";
import { Cookies } from "quasar";

export const collection = "job_applicants";
export const headers = {
  "Content-Type": "multipart/form-data",
};
export const params = {
  relationship: ["job", "user", "company"],
  "orderby[created_at]": "desc",
};

const user = Cookies.get("user");
const { roles } = user;

let column = [];

if (roles.includes("job_seeker")) {
  column = [
    {
      name: "job",
      required: true,
      label: "Job",
      align: "left",
      field: "job",
      format: (entry) => {
        if (entry?.title) {
          return entry.title;
        }
        return "-";
      },
      sortable: true,
    },
    {
      name: "company",
      required: true,
      label: "Company",
      align: "left",
      field: "company",
      format: (entry, row) => {
        if (row?.company?.name) {
          return row.company.name;
        }
        return "-";
      },
      sortable: true,
    },
    {
      name: "status_applicant",
      required: true,
      label: "Status",
      align: "left",
      field: "status_applicant",
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
} else if (roles.includes("recruiter")) {
  column = [
    {
      name: "job",
      required: true,
      label: "Job",
      align: "left",
      field: "job",
      format: (entry) => {
        if (entry?.title) {
          return entry.title;
        }
        return "-";
      },
      sortable: true,
    },
    {
      name: "user",
      required: true,
      label: "User",
      align: "left",
      field: "user",
      format: (entry, row) => {
        if (entry?.username) {
          return entry?.username;
        }
        return "-";
      },
      sortable: true,
    },
    {
      name: "status_applicant",
      required: true,
      label: "Status",
      align: "left",
      field: "status_applicant",
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
} else if (roles.includes("superadmin")) {
  column = [
    {
      name: "job",
      required: true,
      label: "Job",
      align: "left",
      field: "job",
      format: (entry) => {
        if (entry?.title) {
          return entry.title;
        }
        return "-";
      },
      sortable: true,
    },
    {
      name: "company",
      required: true,
      label: "Company",
      align: "left",
      field: "company",
      format: (entry, row) => {
        if (row?.company?.name) {
          return row.company.name;
        }
        return "-";
      },
      sortable: true,
    },
    {
      name: "user",
      required: true,
      label: "User",
      align: "left",
      field: "user",
      format: (entry, row) => {
        if (entry?.username) {
          return entry?.username;
        }
        return "-";
      },
      sortable: true,
    },
    {
      name: "status_applicant",
      required: true,
      label: "Status",
      align: "left",
      field: "status_applicant",
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
}

export const columns = column;

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
