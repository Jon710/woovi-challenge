import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import { Providers } from './Providers';
import { Routes } from './routes';

export const App = () => (
  <Providers>
    <Suspense fallback={'Loading...'}>
      <Routes />
      <ToastContainer position="top-center" autoClose={3000} />
    </Suspense>
  </Providers>
);
