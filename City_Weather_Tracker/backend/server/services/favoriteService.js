import Favorite from '../models/Favorite.js';


//--------------------------------------------------------------------
// export const getAllFavorites = async () => {
//   return await Favorite.find().sort({ savedAt: -1 });
// };
          // Pagination support
const DEFAULT_LIMIT = 5;

export const getAllFavorites = async (page, limit) => {
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || DEFAULT_LIMIT, 1);
  const skip = (pageNum - 1) * limitNum;

  const data = await Favorite.find()
    .sort({ savedAt: -1 })  // Newest first: sort by savedAt field descending order -1 
    .skip(skip)
    .limit(limitNum);

  const totalItems = await Favorite.countDocuments();
  const totalPages = Math.ceil(totalItems / limitNum);

  return {
    data,
    currentPage: pageNum,
    totalPages,
    totalItems,
    pageSize: limitNum,
  };
};

//--------------------------------------------------------------------
export const addFavorite = async ({ city, country }) => {
  if (!city) throw new Error('City required');
   
  const existing = await Favorite.findOne({ city: new RegExp(`^${city}$`, 'i') });// Case-insensitive check
  if (existing) throw new Error('City already saved');

  const fav = new Favorite({ city, country });
  await fav.save();
  return fav;
};

//-----------------------------------------------------------------------
export const deleteFavorite = async (id) => {
  await Favorite.findByIdAndDelete(id);
  return { success: true };
};
