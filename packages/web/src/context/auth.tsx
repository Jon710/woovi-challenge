import {
  useState,
  useMemo,
  useCallback,
  createContext,
  ReactNode,
} from 'react';

import { getAuthToken, updateAuthToken } from '../helpers/getToken';

export interface IAuthContext {
  token: string | undefined | null;
  signIn: (token: string | undefined | null, cb: VoidFunction) => void;
  signOut: (cb: VoidFunction) => void;
}

export const AuthContext = createContext<IAuthContext>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<IAuthContext['token']>(() =>
    getAuthToken(),
  );

  const signIn = useCallback<IAuthContext['signIn']>((token, cb) => {
    updateAuthToken(token);
    setUserToken(token);
    cb();
  }, []);

  const signOut = useCallback<IAuthContext['signOut']>(cb => {
    setUserToken(null);
    updateAuthToken();
    cb();
  }, []);

  const value = useMemo<IAuthContext>(
    () => ({
      token: userToken,
      signIn,
      signOut,
    }),
    [userToken, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
