import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
export const startCreatingUserWithEmailPassword = ({
  nombre,
  correo,
  password,
}: {
  nombre: string;
  correo: string;
  password: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    try {
      const resp = await createUserWithEmailAndPassword(FirebaseAuth, correo, password);
      const { uid } = resp.user;

      // Actualizar nombre del usuario
      await updateProfile(resp.user, { displayName: nombre });

      dispatch(login({ uid, displayName: nombre, email: correo }));
    } catch (error: unknown) {
      console.error(error);
      dispatch(logout(unknown.message));
    }
  };
};
