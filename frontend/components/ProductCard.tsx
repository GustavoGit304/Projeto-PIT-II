import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent) => void;
  onCardClick: () => void;
  t: (key: string) => string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.064 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);


const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onCardClick, t }) => {
  const cardClasses = product.isDealOfTheWeek
    ? "bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-purple-500 shadow-purple-500/20 cursor-pointer"
    : "bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-700 cursor-pointer hover:border-purple-500/50 hover:shadow-purple-500/10";

  return (
    <div 
      onClick={onCardClick}
      className={cardClasses}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCardClick()}
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={product.imagem}
          alt={product.nome}
        />
        {product.isDealOfTheWeek && (
            <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full z-10 flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.064 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
              {t('productCard.dealOfTheWeek')}
            </div>
        )}
        {product.isBestSeller && !product.isDealOfTheWeek && (
            <div className="absolute top-0 left-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 m-2 rounded-full z-10 flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.783.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.064 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
              {t('productCard.bestSeller')}
            </div>
        )}
        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
          {product.sabor}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-100 mb-1">{product.nome}</h3>
        <p className="text-sm text-gray-400 mb-3 h-10">{product.descrição}</p>
        <div className="flex justify-between items-center mb-4 mt-auto">
          <p className="text-xl font-black text-cyan-400">R$ {product.preço}</p>
          <StarRating rating={product.rating} />
        </div>
        <button
          onClick={onAddToCart}
          className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          {t('productCard.addToCart')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;