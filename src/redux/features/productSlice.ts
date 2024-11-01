import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, SortOption } from '@/app/types';
interface ProductState {
    products: ProductType[];
    filteredProducts: ProductType[];
    categories: string[];
    filters: {
        category: string;
        priceRange: { min: number; max: number };
        rating: number;
        search: string
    };
    sortBy: SortOption | '';
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
}

const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    categories: [],
    filters: {
        category: 'all',
        priceRange: { min: 0, max: 1000 },
        rating: 0,
        search: ''
    },
    sortBy: '',
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 8,
};

const sortProducts = (products: ProductType[], sortBy: SortOption) => {
    const sortedProducts = [...products];

    switch (sortBy) {
        case 'price-asc':
            return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sortedProducts.sort((a, b) => b.price - a.price);
        case 'rating-desc':
            return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        case 'name-asc':
            return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        case 'name-desc':
            return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        default:
            return sortedProducts;
    }
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        setCategories: (state, action: PayloadAction<string[]>) => {
            state.categories = action.payload;
        },
        updateFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };

            // Apply filters
            state.filteredProducts = state.products.filter(product => {
                const categoryMatch =
                    state.filters.category === 'all' ||
                    product.category === state.filters.category;
                const priceMatch =
                    product.price >= state.filters.priceRange.min &&
                    product.price <= state.filters.priceRange.max;
                const ratingMatch =
                    Math.round(product.rating.rate) >= state.filters.rating;
                const searchMatch =
                    product.title.toLowerCase().includes(state.filters.search.toLowerCase());
                return categoryMatch && priceMatch && ratingMatch && searchMatch;
            });

            // Apply sorting after filtering
            if (state.sortBy) {
                state.filteredProducts = sortProducts(state.filteredProducts, state.sortBy);
            }
        },
        setSortBy: (state, action: PayloadAction<SortOption>) => {
            state.sortBy = action.payload;
            state.filteredProducts = sortProducts(state.filteredProducts, action.payload);
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state) => {
            state.totalPages = Math.ceil(state.filteredProducts.length / state.itemsPerPage);
        },
    }
});

export const { setProducts, setCategories, updateFilters, setSortBy, setCurrentPage, setTotalPages } = productSlice.actions;
export default productSlice.reducer;