import React from 'react';

import { Providers } from './Providers';
import { Routes } from './routes';

export const App = () => (
  <Providers>
    <React.Suspense fallback={'Loading...'}>
      <Routes />
    </React.Suspense>
  </Providers>
);