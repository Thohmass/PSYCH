import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
if (!HTMLElement) {
    throw new Error("Root element not found. Make sure 'root' div exists in index.html.");
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Ak chcete začať merať výkon vo vašej aplikácii, prejdite na https://bit.ly/CRA-vitals
// a postupujte podľa pokynov.
reportWebVitals();
