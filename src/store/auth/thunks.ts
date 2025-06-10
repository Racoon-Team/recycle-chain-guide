import { signOut } from 'firebase/auth';
import type { AppDispatch } from 'store/store';
import { FirebaseAuth } from '../../firebase/config';
import { signInWithEmailPassword, singInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';

export const startGoogleSingIn = () => {
  return async (dispatch: AppDispatch) => {
    const result = await singInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    const { uid, displayName, email, photoURL } = result;
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ correo, password }: { correo: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithEmailPassword({ correo, password });

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      // Cierra sesión en Firebase
      await signOut(FirebaseAuth);

      // Limpia el estado en Redux (authSlice)
      dispatch(logout(null));
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Aquí podrías despachar otro action para manejar errores si quieres
    }
  };
};
