import { Routes, Route } from 'react-router-dom';

import Appointments from '@/pages/patient/Appointments';

export const PatientRoutes = () => (
  <Routes>
    <Route path="/appointments" element={<Appointments />} />
  </Routes>
);
