import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Clean up any stale dev service workers that could intercept @vite/client requests
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.DEV) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  }).catch(() => {});
}

createRoot(document.getElementById('root')!).render(<App />);
