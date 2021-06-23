//CRiando contexto
import {createContext, useState, useEffect, ReactNode} from 'react';

//Para criar integração com o firebase
import {auth, firebase} from '../services/firebase';

type User ={
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps ={
  children: ReactNode; //Passando componente como propriedade
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user=>{
      if(user){
        const {displayName, photoURL, uid} = user;
      
        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account');
        }
        setUser({
          id: uid,
          name: displayName, 
          avatar: photoURL
        });
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle(){
    //Fazendo login
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const result = await auth.signInWithPopup(provider);
    if (result.user){
      const {displayName, photoURL, uid} = result.user;
      
      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account');
      }
      setUser({
        id: uid,
        name: displayName, 
        avatar: photoURL
      });
    };
  };

  
  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}> {/* tudo dentro de AuthContext pode enxergar esse contexto */}
      {props.children}
    </AuthContext.Provider>
  );
}