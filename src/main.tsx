import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import RecycleApp from './RecycleApp.tsx';
import { store } from './store/store';

import './i18n/config.ts';

// import { LoginPage } from './auth/pages/LoginPage';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <RecycleApp />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
