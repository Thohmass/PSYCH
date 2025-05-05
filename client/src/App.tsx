import React from 'react';
import './styles/App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PsychologistProfilePage from './pages/PsychologistProfilePage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from './context/AuthContext';
import PsychologistRegistrationForm from "./components/PsychologistRegistrationForm";
import ForumPostList from "./pages/ForumPostList";
import ForumPostDetail from "./pages/ForumPostDetail";
import FeedbackForm from "./components/FeedbackForm";
import {logoutUser} from "./services/authService";
import ClientRegistrationForm from "./components/ClientRegistrationForm";
import ProfilePage from "./pages/ProfilePage";

function App() {
    const { isAuthenticated, logout, userRole } = useAuth();
    // const navigate = useNavigate();

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
                        <Link to="/forum">Fórum</Link>
                    </li>
                    <li>
                        <Link to="/feedback">Feedback :)</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            {userRole === 'admin' ? (
                                <li>
                                    <Link to="/admin">Admin Dashboard</Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/profile">Profile Page</Link>
                                </li>
                            )}
                            <li>
                                <button onClick={() => {
                                    logoutUser();
                                    logout();
                                    // navigate("/login");
                                }}>Odhlásiť sa</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Prihlásiť sa</Link>
                            </li>
                            <li>
                                <p>Registrovať sa:  <Link to="/register-client">Klient</Link>  |  <Link to="/register-psychologist">Psychológ</Link></p>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<SearchForm/>}/>
                <Route path="/search" element={<SearchResultsPage/>}/>
                <Route path="/forum" element={<ForumPostList/>}/>
                <Route path="/forum/:postId" element={<ForumPostDetail/>}/>
                <Route path="/feedback" element={<FeedbackForm/>}/>
                <Route path="/psychologists/:id" element={<PsychologistProfilePage/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register-client" element={<ClientRegistrationForm/>}/>
                <Route path="/register-psychologist" element={<PsychologistRegistrationForm/>}/>
                <Route path="/admin" element={<AdminDashboard/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/profile/edit" element={<ProfilePage/>}/>
                <Route path="/unauthorized" element={<div>Nemáte povolenie na prístup na túto stránku.</div>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
