import React, { useState, useMemo } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';
import Cart from './Cart';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import About from './About';
import { PRODUCTS_DATA } from '../constants';
import { translations, productTranslations } from '../translations';
import type { Product, CartItem } from '../types';

type Language = 'pt' | 'en';
type FilterType = 'all' | 'best-sellers';

const Shop: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<'shop' | 'checkout' | 'productDetail' | 'about'>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [language, setLanguage] = useState<Language>('pt');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const t = (key: string, params: Record<string, string | number> = {}) => {
    let text = translations[key]?.[language] || key;
    for (const param in params) {
      text = text.replace(`{${param}}`, String(params[param]));
    }
    return text;
  };
  
  const translatedProducts = useMemo(() => {
    return PRODUCTS_DATA.map(p => {
      const translation = productTranslations[p.id];
      if (translation) {
        return {
          ...p,
          nome: translation.nome[language],
          descrição: translation.descrição[language],
        };
      }
      return p;
    });
  }, [language]);
  
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'best-sellers') {
      return translatedProducts.filter(p => p.isBestSeller);
    }
    return translatedProducts;
  }, [activeFilter, translatedProducts]);


  const handleAddToCart = (e: React.MouseEvent | null, product: Product) => {
    e?.stopPropagation(); 
    const originalProduct = PRODUCTS_DATA.find(p => p.id === product.id)!;
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.product.id === originalProduct.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.product.id === originalProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product: originalProduct, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddUpsellToCart = (productId: number) => {
    const productToAdd = PRODUCTS_DATA.find(p => p.id === productId);
    if (productToAdd) {
      handleAddToCart(null, productToAdd);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('productDetail');
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };
  
  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleBackToShop = () => {
    setView('shop');
    setSelectedProduct(null);
  };
  
  const handleAboutClick = () => {
    setView('about');
  }

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);
  
  const translatedCartItems = useMemo(() => {
    return cartItems.map(item => {
      const translatedProduct = translatedProducts.find(p => p.id === item.product.id);
      return {
        ...item,
        product: translatedProduct || item.product
      };
    });
  }, [cartItems, translatedProducts]);


  const renderContent = () => {
    switch (view) {
      case 'about':
        return <About onBackToShop={handleBackToShop} t={t} />;
      case 'productDetail':
        if (!selectedProduct) return null;
        return (
          <ProductDetail
            product={selectedProduct}
            onBackToShop={handleBackToShop}
            onAddToCart={(e, p) => handleAddToCart(e, p)}
            t={t}
          />
        );
      case 'checkout':
        return <Checkout items={translatedCartItems} onBackToShop={handleBackToShop} t={t} />;
      case 'shop':
      default:
        return (
          <>
            <main>
              {/* Hero Section */}
              <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left">
                      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
                          dangerouslySetInnerHTML={{ __html: t('shop.hero.title') }}>
                      </h1>
                      <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-300 mx-auto md:mx-0">
                        {t('shop.hero.subtitle')}
                      </p>
                       <a href="#products" className="mt-8 inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                        {t('shop.hero.button')}
                      </a>
                    </div>
                    <div className="relative flex justify-center items-center">
                       <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
                       <img 
                        src="https://i.imgur.com/M1MBaSK.jpeg" 
                        alt="Cupcake de Baunilha em destaque"
                        className="relative z-10 w-full max-w-sm rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                       />
                    </div>
                  </div>
                </div>
              </section>

              {/* Products Section */}
              <section id="products" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                      {t('shop.products.title')}
                    </h2>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                      {t('shop.products.subtitle')}
                    </p>
                    <div className="mt-4 w-24 h-1 bg-purple-800 mx-auto rounded-full"></div>
                  </div>
                  
                  {/* Filters */}
                  <div className="flex justify-center items-center gap-2 md:gap-4 mb-10 bg-gray-800/50 p-2 rounded-full max-w-xs mx-auto">
                    <button 
                        onClick={() => setActiveFilter('all')}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${activeFilter === 'all' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                        {t('shop.filters.all')}
                    </button>
                    <button 
                        onClick={() => setActiveFilter('best-sellers')}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${activeFilter === 'best-sellers' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                        {t('shop.filters.bestSellers')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onCardClick={() => handleProductClick(product)}
                        onAddToCart={(e) => handleAddToCart(e, product)} 
                        t={t}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </main>
            <footer className="bg-gray-800 border-t border-gray-700 mt-12">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                <div className="flex justify-center items-center space-x-6 mb-4">
                  <a href="#" aria-label={t('footer.facebookAriaLabel')} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
                  </a>
                  <a href="#" aria-label={t('footer.instagramAriaLabel')} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
                  </a>
                  <a href="#" aria-label={t('footer.twitterAriaLabel')} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.418 0-6.178 2.76-6.178 6.178 0 .485.055.958.16 1.41-5.133-.258-9.683-2.716-12.73-6.453-.532.915-.836 1.97-.836 3.094 0 2.14.99 4.032 2.508 5.14-.844-.027-1.638-.258-2.33-.642v.077c0 2.986 2.125 5.478 4.95 6.045-.517.14-1.06.216-1.625.216-.398 0-.784-.038-1.162-.11.783 2.446 3.053 4.226 5.74 4.276-2.11 1.65-4.773 2.634-7.665 2.634-.5 0-.99-.03-1.474-.086 2.73 1.75 5.96 2.77 9.434 2.77 11.323 0 17.52-9.38 17.52-17.52 0-.267-.006-.534-.018-.798.81-.58 1.51-1.308 2.065-2.14z"/></svg>
                  </a>
                  <a href="#" aria-label={t('footer.youtubeAriaLabel')} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </a>
                </div>
                <p>&copy; {new Date().getFullYear()} Cupcake Shop. {t('shop.footer.rights')}</p>
                <p className="text-sm text-gray-500">{t('shop.footer.madeWith')}</p>
              </div>
            </footer>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)}
        onAboutClick={handleAboutClick}
        onLogoClick={handleBackToShop}
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      />

      {isCartOpen && (
        <Cart
          items={translatedCartItems}
          allProducts={translatedProducts}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
          onAddToCart={handleAddUpsellToCart}
          t={t}
        />
      )}
      
      {renderContent()}
    </div>
  );
};

export default Shop;