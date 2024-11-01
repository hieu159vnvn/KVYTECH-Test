'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setProducts, setCategories, setTotalPages } from '@/redux/features/productSlice';
import FilterProduct from './FilterProduct';
import Product from './Product';
import { ProductType } from '../types';
import Pagination from './Pagination';

interface ClientHomeProps {
    initialProducts: ProductType[];
    categories: string[];
}

export default function ProductList({ initialProducts, categories }: ClientHomeProps) {
    const dispatch = useDispatch();
    const { filteredProducts, currentPage, itemsPerPage } = useSelector(
        (state: RootState) => state.product
    );
    const storeCategories = useSelector((state: RootState) => state.product.categories);

    useEffect(() => {
        dispatch(setProducts(initialProducts));
        dispatch(setCategories(categories));
    }, [dispatch, initialProducts, categories]);

    useEffect(() => {
        dispatch(setTotalPages());
    }, [dispatch, filteredProducts]);
    // Get current page products
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    return (
        <main className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
                <div className="md:col-span-1 lg:col-span-1">
                    <FilterProduct categories={storeCategories} />
                </div>
                <div className="md:col-span-3 lg:col-span-4">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentProducts.map((product) => (
                            <Product key={product.id} {...product} />
                        ))}
                    </ul>
                    <Pagination />
                </div>
            </div>
        </main>
    );
}