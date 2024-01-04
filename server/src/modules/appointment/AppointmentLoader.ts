import { createLoader } from "@entria/graphql-mongo-helpers";

import { registerLoader } from "../loader/loaderRegister";
import { AppointmentModel } from "./AppointmentModel";

const {
  Wrapper: Appointment,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({ model: AppointmentModel, loaderName: "AppointmentLoader" });

registerLoader("AppointmentLoader", getLoader);

export const AppointmentLoader = {
  Appointment,
  getLoader,
  clearCache,
  load,
  loadAll,
};
