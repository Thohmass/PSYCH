import React from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PsychologistProfilePage from './pages/PsychologistProfilePage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from './context/AuthContext';

function App() {
    const { isAuthenticated, logout, userRole } = useAuth();

    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Domov</Link>
                    </li>
                    <li>
                        <Link to="/search">Výsledky vyhľadávania</Link>
                    </li>
                    <li>
                        <Link to="/psychologists/e3XMp7pHunRZeHlCTBOJ">Profil psychológa s ID 1</Link>
                    </li>
                    <li>
                        <Link to="/psychologists/UAofiQdg8jACldCksAwH">Profil psychológa s ID 2</Link>
                    </li>
                    {userRole === 'admin' ? (
                        <li>
                            <Link to="/admin">Admin Dashboard</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/profile">Profile Page</Link>
                        </li>
                    )}
                    {isAuthenticated ? (
                        <li>
                        <button onClick={logout}>Odhlásiť sa</button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Prihlásiť sa</Link>
                        </li>
                    )}
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<SearchForm/>}/>
                <Route path="/search" element={<SearchResultsPage/>}/>
                <Route path="/psychologists/:id" element={<PsychologistProfilePage/>}/>
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/admin" element={<AdminDashboard/>} />
                <Route path="/unauthorized" element={<div>Nemáte povolenie na prístup na túto stránku.</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
