import { ParameterizedContext } from "koa";

import { getDataLoaders } from "./modules/loader/loaderRegister";
import { PatientDocument } from "./modules/patient/PatientModel";
import { DoctorDocument } from "./modules/doctor/DoctorModel";

interface ContextVars {
  ctx?: ParameterizedContext;
  user: PatientDocument | DoctorDocument | null;
}

async function getContext({ ctx, user }: ContextVars) {
  const dataloaders = getDataLoaders();

  return { ctx, dataloaders, user };
}

export { getContext };
