import { useEffect, useState } from 'react';
import { getFavorites, deleteFavorite } from '../services/api';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavs = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleDelete = async (id) => {
    await deleteFavorite(id);
    fetchFavs();
  };

  useEffect(() => {
    fetchFavs();
  }, []);

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map(fav => (
          <li key={fav._id}>
            {fav.city}, {fav.country}
            <button onClick={() => handleDelete(fav._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
