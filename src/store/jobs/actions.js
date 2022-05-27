import { api } from "boot/axios";
import { Cookies } from "quasar";

const jobApplicantCollection = 'job_applicants'

export {
  fetch,
  create,
  detail,
  update,
  patch,
  destroy,
  hardDelete,
  trash,
  trashed,
  restore,
} from "../resources/actions";

export async function applyJobs(
  { state, commit, dispatch, getters },
  { data, params = {}, headers = {}, config = {} }
) {
  const token = Cookies.get("authorization_token");
  const _headers = state.headers;

  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers, ..._headers };
  }

  if (headers["Content-Type"] === "multipart/form-data") {
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) formData.append(key, data[key]);
    }
    data = formData;
  }

  config = { ...getters.config, ...config };
  const { collection } = state;
  const ROUTE_CREATE = `/${jobApplicantCollection}/apply_job`;
  const promise = new Promise((resolve, reject) => {
    return api
      .post(ROUTE_CREATE, data, { params, headers, ...config })
      .then((response) => {
        const { data /** , status, statusText, headers, config **/ } = response;
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}
