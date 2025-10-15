import { useEffect, useState ,useCallback} from 'react';
import { getFavorites, deleteFavorite } from '../services/api';
import { toast } from 'react-toastify';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch favorites from backend
  const fetchFavs = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getFavorites(page);

      if (!data) {
        // fallback if API returns null or undefined
        setFavorites([]);
        setCurrentPage(1);
        setTotalPages(1);
      } else if (Array.isArray(data)) {
        // old behavior: full array without pagination
        setFavorites(data);
        setCurrentPage(1);
        setTotalPages(1);
      } else {
        // paginated response
        setFavorites(data.data || []);
        setCurrentPage(data.currentPage || 1);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      toast.error('Error fetching favorites:', err);
      setFavorites([]);
      setCurrentPage(1);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // // Delete a favorite city
  // const handleDelete = async (id) => {
  //   try {
  //     await deleteFavorite(id);
  //     // refresh current page
  //     fetchFavs(currentPage);
  //   } catch (err) {
  //     console.error('Error deleting favorite:', err);
  //   }
  // };
// use callback to memoize handleDelete and avoid unnecessary re-renders
// Without useCallback, handleDelete gets recreated on every render, which can cause unnecessary re-renders of child components receiving it as a prop.
// With useCallback, the function keeps the same reference unless currentPage changes.  
const handleDelete = useCallback(async (id) => {
  try {
    await deleteFavorite(id);
    toast.success('City removed from favorites');

    // Fetch updated favorites after deletion
    const data = await getFavorites(currentPage);

    // If current page has no items, move to previous page if possible
    if (data.data.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      // Otherwise, update the list on the same page
      setFavorites(data.data);
      setTotalPages(data.totalPages || 1);

      if (data.data.length === 0) {
        toast.info('No favorite cities left on this page.');
      }
    }
  } catch (err) {
    toast.error('Error deleting favorite');
  }
}, [currentPage]);


  // Initial fetch and when page changes
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

{/* Conditional Rendering */}
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
          {(favorites || []).map((fav) => (     // handle null or undefined
            <li
              key={fav._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {fav.city}, {fav.country}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(fav._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="card-footer d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage <= 1 || loading}
            onClick={handlePrev}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary btn-sm"
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
