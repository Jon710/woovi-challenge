import { ParameterizedContext } from "koa";

import { DataLoaders } from "../modules/loader/loaderRegister";

import { PatientDocument } from "../modules/patient/PatientModel";
import { DoctorDocument } from "../modules/doctor/DoctorModel";

interface GraphQLContext {
  ctx: ParameterizedContext;
  user?: PatientDocument | DoctorDocument;
  dataloaders: DataLoaders;
}

export type { GraphQLContext };
