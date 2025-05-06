import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
if (!HTMLElement) {
    throw new Error("Root element not found. Make sure 'root' div exists in index.html.");
}

root.render(
    <React.StrictMode>
        <AuthProvider> {/* Obalíme App s AuthProvider */}
            <App />
        </AuthProvider>
    </React.StrictMode>
);

// https://bit.ly/CRA-vitals
reportWebVitals();
