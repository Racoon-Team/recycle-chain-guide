import type { AppDispatch } from "store/store";
import { singInWithGoogle } from "../../firebase/providers";
import { login, logout } from "./authSlice";

export const startGoogleSingIn = () => {

  return async (dispatch: AppDispatch) => {
    const result = await singInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

    const { uid, displayName, email, photoURL } = result;
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};