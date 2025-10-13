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
    <div className="card shadow mt-4">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Favorites</h3>
      </div>
      <ul className="list-group list-group-flush">
        {favorites.map((fav) => (
          <li key={fav._id} className="list-group-item d-flex justify-content-between align-items-center">
            {fav.city}, {fav.country}
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(fav._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {favorites.length === 0 && (
        <div className="card-body">
          <p className="text-muted text-center mb-0">No favorite cities yet.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
