import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import FavoritesList from './components/FavoritesList';

function App() {
  return (
     <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesList />} />
      </Routes>
    </>
  );
}

export default App;
