import {
  createContext, ReactNode, useContext, useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

type AuthContextData = {
  signIn: (email:string, password:string) => Promise<void>
  isLogging: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

// Função do Component TSX
function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Preencha os campos');
    }

    setIsLogging(true);

    auth().signInWithEmailAndPassword(email, password)
      .then((account) => {
        console.log(account);
      })
      .catch((error) => {
        const { code } = error;

        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail e/ou senha inválido');
        }
        return Alert.alert('Login', 'Nâo foi possível logar');
      })
      .finally(() => setIsLogging(false));
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      isLogging,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
