import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { PatientModel } from './PatientModel';

const {
  Wrapper: Patient,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({ model: PatientModel, loaderName: 'PatientLoader' });

registerLoader('PatientLoader', getLoader);

export const PatientLoader = {
  Patient,
  getLoader,
  clearCache,
  load,
  loadAll,
};
