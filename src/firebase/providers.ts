
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider  = new GoogleAuthProvider ();

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