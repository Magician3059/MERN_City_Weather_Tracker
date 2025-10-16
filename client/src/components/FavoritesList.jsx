import { useEffect, useState, useCallback } from 'react';
import { getFavorites, deleteFavorite } from '../services/api';
import { toast } from 'react-toastify';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchFavs = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getFavorites(page);
      if (!data) {
        setFavorites([]);
        setCurrentPage(1);
        setTotalPages(1);
      } else if (Array.isArray(data)) {
        setFavorites(data);
        setCurrentPage(1);
        setTotalPages(1);
      } else {
        setFavorites(data.data || []);
        setCurrentPage(data.currentPage || 1);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      toast.error('Please login to view favorites');
      setFavorites([]);
      setCurrentPage(1);
      setTotalPages(1);
    } finally {        // Ensure loading is set to false after fetch attempt
      setLoading(false); // regardless of success or failure reset loading state
    }
  };

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteFavorite(id);
      toast.success('City removed from favorites');
      const data = await getFavorites(currentPage);

      if (data.data.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        setFavorites(data.data);
        setTotalPages(data.totalPages || 1);
        if (data.data.length === 0) toast.info('No favorite cities left on this page.');
      }
    } catch {
      toast.error('Error deleting favorite');
    }
  }, [currentPage]);

  useEffect(() => {
    fetchFavs(currentPage);
  }, [currentPage]);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="card shadow mt-4">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Favorites</h3>
      </div>

      {loading ? (
        <div className="card-body text-center">
          <p className="text-muted mb-0">Loading favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="card-body text-center">
          <p className="text-muted mb-0">No favorite cities yet.</p>
        </div>
      ) : (
        <ul className="list-group list-group-flush">
          {favorites.map((fav) => (
            <li key={fav._id} className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
              <span>{fav.city}, {fav.country}</span>
              <button className="btn btn-danger btn-sm mt-2 mt-sm-0" onClick={() => handleDelete(fav._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="card-footer d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary btn-sm mb-2 mb-sm-0"
            disabled={currentPage <= 1 || loading}
            onClick={handlePrev}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-outline-primary btn-sm mt-2 mt-sm-0"
            disabled={currentPage >= totalPages || loading}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
