'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateFilters } from '@/redux/features/productSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.product.filters.search);

  return (

    <div className="justify-center flex">
    <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full" >
        <input placeholder="Search for products..." autoComplete="off" 
        className="text-md w-full rounded-lg border px-4 py-2 md:text-sm border-neutral-800 bg-transparent text-white placeholder:text-neutral-400" 
        type="text"  value={search}
        onChange={(e) => dispatch(updateFilters({ search: e.target.value }))}/>
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
            </svg>
        </div>
    </div>
</div>
  );
}