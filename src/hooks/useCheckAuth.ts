import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { checkingCredentials, login, logout } from '../store/auth/authSlice';

export const useCheckAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkingCredentials());

    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispatch(logout(null));

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });

    return () => unsubscribe();
  }, [dispatch]);
};
