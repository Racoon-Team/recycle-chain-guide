import AppRouter from '@routes/AppRouter';
import { useCheckAuth } from './hooks/useCheckAuth';
// import AppRouter from './routes/AppRouter';

function RecycleApp() {
  useCheckAuth();
  return (
    <>
      <AppRouter />
    </>
  );
}

export default RecycleApp;
