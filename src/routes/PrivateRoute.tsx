import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { type RootState } from '../store/store';

export const PrivateRoute = () => {
  const { status } = useSelector((state: RootState) => state.auth);

  if (status === 'checking') {
    return <h3>CARGANDO................</h3>;
  }

  return status === 'authenticated' ? <Outlet /> : <Navigate to="/login" />;
};
