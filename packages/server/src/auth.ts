import jwt from 'jsonwebtoken';

import { config } from './config';
import { PatientDocument, PatientModel } from './modules/patient/PatientModel';
import { DoctorDocument, DoctorModel } from './modules/doctor/DoctorModel';

interface User extends PatientDocument, DoctorDocument {}

async function getUser(token: string | undefined | null) {
  if (!token) return null;

  [, token] = token.split('JWT ');

  const decodedToken = jwt.verify(token, config.JWT_SECRET) as { id: string };

  const user =
    (await PatientModel.findOne({ _id: decodedToken.id })) ||
    (await DoctorModel.findOne({ _id: decodedToken.id }));

  if (!user) return null;

  return user;
}

function generateToken(user: User) {
  return `JWT ${jwt.sign({ id: user._id }, config.JWT_SECRET)}`;
}

export { getUser, generateToken };
