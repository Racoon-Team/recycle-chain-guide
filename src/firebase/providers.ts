import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      uid,
      displayName,
      email,
      photoURL,
    };
  } catch (error: unknown) {
    let message = 'Unknown error';

    if (error instanceof Error) {
      message = error.message;
    }

    return {
      ok: false,
      errorMessage: message,
    };
  }
};

export const signInWithEmailPassword = async ({ correo, password }: { correo: string; password: string }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, correo, password);
    const { uid, displayName, photoURL } = resp.user;

    return {
      ok: true,
      uid,
      displayName,
      photoURL,
    };
  } catch (error: unknown) {
    let message = 'Unknown error';

    if (error instanceof Error) {
      message = error.message;
    }

    return {
      ok: false,
      errorMessage: message,
    };
  }
};
export const registerUserWithEmailPassword = async ({
  correo,
  password,
  nombre,
}: {
  correo: string;
  password: string;
  nombre: string;
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, correo, password);
    const { uid, photoURL } = resp.user;

    await updateProfile(resp.user, { displayName: nombre });

    return {
      ok: true,
      uid,
      photoURL,
      email: correo,
      displayName: nombre,
    };
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }

    return {
      ok: false,
      errorMessage: message,
    };
  }
};
