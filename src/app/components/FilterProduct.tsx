'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateFilters } from '@/redux/features/productSlice';
import { setSortBy } from '@/redux/features/productSlice';
import { SortOption } from '../types';

interface FilterProps {
  categories: string[];
}

export default function Filter({ categories }: FilterProps) {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.product.filters);
  const sortBy = useSelector((state: RootState) => state.product.sortBy);

  return (
    <div className="md:p-4 space-y-4 rounded-lg shadow">
      {/* Category Filter */}
      <div>
        <h3 className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Category</h3>
        <select
          className="w-full p-2 rounded-md bg-neutral-800 text-neutral-300 text-sm capitalize"
          value={filters.category}
          onChange={(e) => {
            dispatch(updateFilters({ category: e.target.value }));
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full p-2 rounded-md bg-neutral-800 text-sm"
            value={filters.priceRange.min}
            onChange={(e) => {
              dispatch(updateFilters({
                priceRange: { ...filters.priceRange, min: Number(e.target.value) }
              }));
            }}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full p-2 rounded-md bg-neutral-800 text-sm"
            value={filters.priceRange.max}
            onChange={(e) => {
              dispatch(updateFilters({
                priceRange: { ...filters.priceRange, max: Number(e.target.value) }
              }));
            }}
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Minimum Rating</h3>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                dispatch(updateFilters({ rating: star }));
              }}
              className={`p-1 ${filters.rating >= star ? 'text-yellow-300' : 'text-gray-300'}`}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <h3 className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Sorting</h3>

      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
        className="w-full p-2 rounded-md bg-neutral-800 text-neutral-300 text-sm capitalize"
      >
        <option value="">None</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  );
}