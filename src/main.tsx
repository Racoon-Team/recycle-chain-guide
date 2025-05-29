import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
// import App from './App'
import { LoginPage } from './auth/pages/LoginPage';


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <LoginPage />
{/* <App/> */}
  </StrictMode>,
)
