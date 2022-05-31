import { api } from "boot/axios";
import { Cookies } from "quasar";

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
