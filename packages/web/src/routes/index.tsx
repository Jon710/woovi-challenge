import { Routes as Router, Route } from 'react-router-dom';

import { AuthRoutes } from './AuthRoutes';
import Appointments from '@/pages/patient/Appointments';
import { PrivateRoutes } from './PrivateRoutes';

export const Routes = () => (
  <Router>
    <Route path="/*" element={<AuthRoutes />} />
    <Route element={<PrivateRoutes />}>
      <Route path="/appointments" element={<Appointments />} />
    </Route>
  </Router>
);
