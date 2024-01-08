import { BrowserRouter } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'react-relay';

import { RelayEnvironment } from './relay/RelayEnvironment';
import { AuthProvider } from './context/auth';

interface Props {
  children: React.ReactElement;
}

export const Providers = ({ children }: Props) => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  </RelayEnvironmentProvider>
);
