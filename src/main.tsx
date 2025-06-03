
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './i18n/config.ts';
import RecycleApp from './RecycleApp.tsx';
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <RecycleApp />
      </StrictMode>
    </BrowserRouter>
  </Provider>

);
