"use client";
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}
const Product: React.FC<ProductProps> = ({ id, title, price, image, rating, category }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addToCart({ id, title, price, image }));
    };

    return (
        <a href="#" className="relative block overflow-hidden rounded-lg border hover:border-blue-600 border-neutral-800">
            <Image
                width={370}
                height={500}
                src={image}
                alt={title}
                className="h-64 w-full object-contain transition duration-500 overflow-hidden"
            />
            <div className="absolute top-6 left-6 bg-blue-600 text-xs capitalize px-2 py-1 rounded">{category}</div>
            <div className="relative bg-dark p-6 rounded-b-lg h-[260px]">
                <h3 className="mt-4 text-lg font-medium text-white title-3-lines">{title}</h3>
                <form className="absolute bottom-0 w-full p-6 left-0">
                    <p></p>
                    <p className="mt-1.5 text-sm text-white">${price}</p>
                    <div className="flex items-center mt-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-4 h-4 ${index < Math.round(rating.rate)
                                            ? 'text-yellow-300'
                                            : 'text-gray-300'
                                        }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                            ({rating.count})
                        </span>
                    </div>
                    <button 
                     onClick={handleAddToCart}
                    type="button"
                    className="block w-full rounded bg-blue-600 p-4 text-sm font-medium transition hover:scale-105 mt-2">
                        Add to Cart
                    </button>
                </form>
            </div>
        </a>
    );
}

export default Product;