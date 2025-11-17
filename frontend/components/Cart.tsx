import React, { useMemo } from 'react';
import type { CartItem, Product } from '../types';

interface CartProps {
  items: CartItem[];
  allProducts: Product[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemove: (productId: number) => void;
  onCheckout: () => void;
  onAddToCart: (productId: number) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const Cart: React.FC<CartProps> = ({ items, allProducts, onClose, onUpdateQuantity, onRemove, onCheckout, onAddToCart, t }) => {
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      return total + parseFloat(item.product.preço) * item.quantity;
    }, 0).toFixed(2);
  }, [items]);

  const upsellProduct = useMemo(() => {
    if (items.length === 0) {
      return null;
    }

    const cartProductIds = new Set(items.map(item => item.product.id));
    const potentialUpsellProducts = allProducts.filter(p => !cartProductIds.has(p.id));

    if (potentialUpsellProducts.length === 0) {
      return null;
    }

    // Encontra o produto mais bem avaliado que não está no carrinho
    potentialUpsellProducts.sort((a, b) => b.rating - a.rating);
    
    return potentialUpsellProducts[0];
  }, [items, allProducts]);


  return (
    <div className="fixed inset-0 bg-black/60 z-50" aria-modal="true" role="dialog">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true"></div>
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-gray-800 shadow-xl flex flex-col text-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-purple-400">{t('cart.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-700"
            aria-label={t('cart.closeAriaLabel')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            <p className="text-lg font-semibold text-gray-300">{t('cart.empty.title')}</p>
            <p className="text-gray-500 mt-1">{t('cart.empty.subtitle')}</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex items-start space-x-4 bg-gray-900/50 p-3 rounded-lg">
                <img src={item.product.imagem} alt={item.product.nome} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-200">{item.product.nome}</h3>
                  <p className="text-sm text-cyan-400">R$ {item.product.preço}</p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 border border-gray-600 bg-gray-700 hover:bg-gray-600 rounded-l">-</button>
                    <span className="px-3 py-1 border-t border-b border-gray-600 bg-gray-800">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 border border-gray-600 bg-gray-700 hover:bg-gray-600 rounded-r">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-bold text-purple-400">R$ {(parseFloat(item.product.preço) * item.quantity).toFixed(2)}</p>
                  <button onClick={() => onRemove(item.product.id)} className="text-xs text-gray-500 hover:text-red-400 mt-2">{t('cart.remove')}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            {upsellProduct && (
              <div className="bg-gray-900/50 border-2 border-dashed border-purple-800 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-bold text-purple-400 mb-2 text-center">{t('cart.upsell.title')}</h4>
                <div className="flex items-center gap-3">
                  <img src={upsellProduct.imagem} alt={upsellProduct.nome} className="w-16 h-16 rounded-md object-cover" />
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-200 text-sm">{upsellProduct.nome}</p>
                    <p className="text-cyan-400 font-bold text-sm">R$ {upsellProduct.preço}</p>
                  </div>
                  <button 
                    onClick={() => onAddToCart(upsellProduct.id)}
                    className="bg-purple-600 text-white font-bold text-xs py-2 px-3 rounded-md hover:bg-purple-700 transition-colors"
                    aria-label={t('cart.upsell.addAriaLabel', { productName: upsellProduct.nome })}
                  >
                    {t('productCard.addToCart')}
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-200">{t('cart.subtotal')}</span>
              <span className="text-xl font-bold text-purple-300">R$ {totalPrice}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              {t('cart.checkout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;