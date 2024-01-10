import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { DoctorModel } from './DoctorModel';

const {
  Wrapper: Doctor,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({ model: DoctorModel, loaderName: 'DoctorLoader' });

registerLoader('DoctorLoader', getLoader);

export const DoctorLoader = {
  Doctor,
  getLoader,
  clearCache,
  load,
  loadAll,
};
