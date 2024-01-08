import { RelayEnvironmentProvider, Environment } from 'react-relay';

import { RelayEnvironment } from '../src/relay/RelayEnvironment';
import { AuthProvider } from '../src/context/auth';

interface Props {
  children: React.ReactElement;
  relayEnvironment?: Environment;
}

export const WithProviders = ({
  children,
  relayEnvironment = RelayEnvironment,
}: Props) => (
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <AuthProvider>{children}</AuthProvider>
  </RelayEnvironmentProvider>
);
