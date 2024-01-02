import { ParameterizedContext } from "koa";

import { getDataloaders } from "./modules/loader/loaderRegister";
import { PatientDocument } from "./modules/patient/PatientModel";

interface ContextVars {
  ctx?: ParameterizedContext;
  user: PatientDocument | null; // DoctorDocument
}

async function getContext({ ctx, user }: ContextVars) {
  const dataloaders = getDataloaders();

  return { ctx, dataloaders, user };
}

export { getContext };
