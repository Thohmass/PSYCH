import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PsychologistProfilePage from './pages/PsychologistProfilePage';

const SearchResultsPage = () => {
  return (
      <div>
        <h2>Výsledky vyhľadávania</h2>
        {/* TODO výsledky vyhľadávania*/}
      </div>
  );
};

function App() {
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
            {/* Príklad odkazu na profil psychológa s konkrétnym ID */}
            <li>
              <Link to="/psycholog/1">Profil psychológa s ID 1</Link>
            </li>
            <li>
              <Link to="/psycholog/2">Profil psychológa s ID 2</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<SearchForm/>}/>
          <Route path="/search" element={<SearchResultsPage/>}/>
          <Route path="/psycholog/:id" element={<PsychologistProfilePage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
