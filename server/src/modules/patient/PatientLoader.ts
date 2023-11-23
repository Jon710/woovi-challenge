// loaders (data loaders) provide 2 main benefits: caching and batching requests
import { createLoader } from "@entria/graphql-mongo-helpers";
import { registerLoader } from "../loader/loaderRegister";
import { PatientModel } from "./PatientModel";

const {
  Wrapper: Patient,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({ model: PatientModel, loaderName: "PatientLoader" });

registerLoader("PatientLoader", getLoader);

export { Patient, getLoader, clearCache, load, loadAll };
