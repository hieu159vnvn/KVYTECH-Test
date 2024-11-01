'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrentPage } from '@/redux/features/productSlice';

export default function Pagination() {
    const dispatch = useDispatch();
    const { currentPage, totalPages } = useSelector((state: RootState) => state.product);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (totalPages <= 1) return null;

    return (
        <ol className="flex justify-center gap-1 text-xs font-medium mt-6">
            {/* Previous Button */}
            <li>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`inline-flex size-8 items-center justify-center rounded border ${
                        currentPage === 1
                            ? 'border-gray-200 bg-gray-100 text-gray-400'
                            : 'border-gray-100 bg-white text-gray-900 hover:bg-gray-50'
                    }`}
                >
                    <span className="sr-only">Previous Page</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </li>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                    return (
                        <li key={pageNumber}>
                            {pageNumber === currentPage ? (
                                <div className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                                    {pageNumber}
                                </div>
                            ) : (
                                <button
                                    onClick={() => handlePageChange(pageNumber)}
                                    className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 hover:bg-gray-50"
                                >
                                    {pageNumber}
                                </button>
                            )}
                        </li>
                    );
                }
                if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return <li key={pageNumber} className="text-gray-400 leading-8">...</li>;
                }
                return null;
            })}

            {/* Next Button */}
            <li>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`inline-flex size-8 items-center justify-center rounded border ${
                        currentPage === totalPages
                            ? 'border-gray-200 bg-gray-100 text-gray-400'
                            : 'border-gray-100 bg-white text-gray-900 hover:bg-gray-50'
                    }`}
                >
                    <span className="sr-only">Next Page</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </li>
        </ol>
    );
}