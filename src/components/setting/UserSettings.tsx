import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from 'store/store';

export const UserSettings = () => {
  const { status } = useSelector((state: RootState) => state.auth);

  return status === 'authenticated' ? <Outlet /> : <Navigate to="*" />;
};
