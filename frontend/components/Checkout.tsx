import React, { useMemo } from 'react';
import type { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onBackToShop: () => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBackToShop, t }) => {
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      return total + parseFloat(item.product.preço) * item.quantity;
    }, 0).toFixed(2);
  }, [items]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Pedido confirmado com sucesso! Obrigado por comprar conosco.');
    // Here you would normally handle order submission, payment, etc.
    // For now, we just show an alert.
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-300">{t('checkout.title')}</h1>
          <p className="text-gray-400 mt-2">{t('checkout.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Shipping Form */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-gray-200 mb-6">{t('checkout.deliveryAddress')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="cep" className="text-sm font-bold text-gray-300 block mb-1">{t('checkout.zip')}</label>
                <input type="text" id="cep" name="cep" required className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="00000-000" />
              </div>
              <div>
                <label htmlFor="address" className="text-sm font-bold text-gray-300 block mb-1">{t('checkout.address')}</label>
                <input type="text" id="address" name="address" required className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Rua dos Cupcakes" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="number" className="text-sm font-bold text-gray-300 block mb-1">{t('checkout.number')}</label>
                  <input type="text" id="number" name="number" required className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="123" />
                </div>
                <div className="flex-1">
                  <label htmlFor="complement" className="text-sm font-bold text-gray-300 block mb-1">{t('checkout.complement')}</label>
                  <input type="text" id="complement" name="complement" className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Apto 4B" />
                </div>
              </div>
              <div>
                <label htmlFor="neighborhood" className="text-sm font-bold text-gray-300 block mb-1">{t('checkout.neighborhood')}</label>
                <input type="text" id="neighborhood" name="neighborhood" required className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div className="flex gap-4">
                <div className="flex-auto">
                  <label htmlFor="city" className="text-sm font-bold text-gray-300 block mb-1">{t('checkout.city')}</label>
                  <input type="text" id="city" name="city" required className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </div>
                <div className="w-20">
                  <label htmlFor="state" className="text-sm font-bold text-gray-300 block mb-1">{t('checkout.state')}</label>
                  <input type="text" id="state" name="state" required maxLength={2} className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="SP" />
                </div>
              </div>
              <div>
                <label htmlFor="additional-info" className="text-sm font-bold text-gray-300 block mb-1">{t('checkout.additionalInfo')}</label>
                <textarea 
                  id="additional-info" 
                  name="additional-info" 
                  rows={3} 
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder={t('checkout.additionalInfo.placeholder')}
                ></textarea>
              </div>
              <div className="pt-6 flex flex-col sm:flex-row-reverse gap-4">
                <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                  {t('checkout.confirmOrder')}
                </button>
                <button type="button" onClick={onBackToShop} className="w-full bg-gray-700 text-purple-300 font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300">
                  {t('checkout.backToShop')}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 self-start">
            <h2 className="text-2xl font-bold text-gray-200 mb-6">{t('checkout.orderSummary')}</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={item.product.imagem} alt={item.product.nome} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-gray-200">{item.product.nome}</p>
                      <p className="text-sm text-gray-400">{t('checkout.quantity', { quantity: item.quantity.toString() })}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-300">R$ {(parseFloat(item.product.preço) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-200">{t('checkout.total')}</span>
                <span className="font-bold text-purple-300">R$ {totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;