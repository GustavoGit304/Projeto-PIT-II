import type { Product } from './types';

type Language = 'pt' | 'en';

type TranslatedProductFields = {
  nome: Record<Language, string>;
  descrição: Record<Language, string>;
};

export const productTranslations: Record<Product['id'], TranslatedProductFields> = {
  1: {
    nome: {
      pt: 'Cupcake de Chocolate',
      en: 'Chocolate Cupcake'
    },
    descrição: {
      pt: 'Massa fofinha de chocolate com uma generosa cobertura de brigadeiro cremoso e granulado.',
      en: 'Fluffy chocolate cake with a generous topping of creamy brigadeiro and sprinkles.'
    }
  },
  2: {
    nome: {
      pt: 'Cupcake de Morango',
      en: 'Strawberry Cupcake'
    },
    descrição: {
      pt: 'Massa leve de baunilha com recheio de geleia de morango caseira e cobertura de buttercream de morango.',
      en: 'Light vanilla cake with homemade strawberry jam filling and strawberry buttercream frosting.'
    }
  },
  3: {
    nome: {
      pt: 'Cupcake Baunilha',
      en: 'Vanilla Cupcake'
    },
    descrição: {
      pt: 'Um clássico irresistível. Massa aveludada de baunilha com uma cobertura suave de buttercream e confeitos coloridos.',
      en: 'An irresistible classic. Velvety vanilla cake with a smooth buttercream frosting and colorful sprinkles.'
    }
  },
  4: {
    nome: {
      pt: 'Cupcake de Limão',
      en: 'Lemon Cupcake'
    },
    descrição: {
      pt: 'Massa cítrica de limão com recheio de curd de limão e uma cobertura de merengue suíço levemente tostado.',
      en: 'Zesty lemon cake with lemon curd filling and a lightly toasted Swiss meringue topping.'
    }
  },
  5: {
    nome: {
      pt: 'Cupcake Azul',
      en: 'Blueberry Cupcake'
    },
    descrição: {
      pt: 'Massa de baunilha recheada com mirtilos frescos, coberta com um delicioso buttercream azul de cream cheese.',
      en: 'Vanilla cake filled with fresh blueberries, topped with a delicious blue cream cheese buttercream.'
    }
  },
  6: {
    nome: {
      pt: 'Cupcake Maracujá',
      en: 'Passion Fruit Cupcake'
    },
    descrição: {
      pt: 'Uma explosão tropical! Massa leve com recheio de mousse de maracujá e cobertura de ganache de chocolate branco.',
      en: 'A tropical explosion! Light cake with passion fruit mousse filling and white chocolate ganache topping.'
    }
  },
};

export const translations: Record<string, Record<Language, string>> = {
  // Header
  'header.about': {
    pt: 'Quem Somos',
    en: 'About Us',
  },
  'header.cartAriaLabel': {
    pt: 'Abrir carrinho de compras',
    en: 'Open shopping cart',
  },

  // Shop Hero
  'shop.hero.title': {
      pt: 'Felicidade em forma de <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">cupcake</span>.',
      en: 'Happiness in the form of a <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">cupcake</span>.',
  },
  'shop.hero.subtitle': {
      pt: 'Feitos à mão com amor, nossos cupcakes são a maneira perfeita de alegrar o seu dia.',
      en: 'Handmade with love, our cupcakes are the perfect way to brighten your day.',
  },
  'shop.hero.button': {
      pt: 'Ver Cardápio',
      en: 'View Menu',
  },
  'shop.products.title': {
      pt: 'Nossas Obras de Arte',
      en: 'Our Masterpieces',
  },
  'shop.products.subtitle': {
      pt: 'Explore nossa seleção de cupcakes, cada um feito com uma pitada de carinho e os melhores ingredientes.',
      en: 'Explore our selection of cupcakes, each made with a dash of love and the finest ingredients.',
  },
  'shop.filters.all': {
    pt: 'Todos',
    en: 'All',
  },
  'shop.filters.bestSellers': {
    pt: 'Mais Vendidos',
    en: 'Best Sellers',
  },
  'shop.footer.rights': {
    pt: 'Todos os direitos reservados.',
    en: 'All rights reserved.',
  },
  'shop.footer.madeWith': {
    pt: 'Feito com ❤️ para os amantes de cupcakes.',
    en: 'Made with ❤️ for cupcake lovers.',
  },
  'footer.facebookAriaLabel': {
    pt: 'Visite nosso Facebook',
    en: 'Visit our Facebook',
  },
  'footer.instagramAriaLabel': {
    pt: 'Visite nosso Instagram',
    en: 'Visit our Instagram',
  },
  'footer.twitterAriaLabel': {
    pt: 'Visite nosso Twitter',
    en: 'Visit our Twitter',
  },
  'footer.youtubeAriaLabel': {
    pt: 'Visite nosso canal no YouTube',
    en: 'Visit our YouTube channel',
  },

  // Product Card
  'productCard.addToCart': {
    pt: 'Adicionar',
    en: 'Add',
  },
  'productCard.bestSeller': {
    pt: 'Mais Vendido',
    en: 'Best Seller',
  },
  'productCard.dealOfTheWeek': {
    pt: 'Promo da Semana!',
    en: 'Deal of the Week!',
  },

  // Cart
  'cart.title': {
    pt: 'Seu Carrinho',
    en: 'Your Cart',
  },
  'cart.closeAriaLabel': {
    pt: 'Fechar carrinho',
    en: 'Close cart',
  },
  'cart.empty.title': {
    pt: 'Seu carrinho está vazio.',
    en: 'Your cart is empty.',
  },
  'cart.empty.subtitle': {
    pt: 'Adicione alguns cupcakes para começar!',
    en: 'Add some cupcakes to get started!',
  },
  'cart.remove': {
    pt: 'Remover',
    en: 'Remove',
  },
  'cart.upsell.title': {
    pt: '✨ Você também pode gostar! ✨',
    en: '✨ You might also like! ✨',
  },
  'cart.upsell.addAriaLabel': {
    pt: 'Adicionar {productName} ao carrinho',
    en: 'Add {productName} to cart',
  },
  'cart.subtotal': {
    pt: 'Subtotal',
    en: 'Subtotal',
  },
  'cart.checkout': {
    pt: 'Finalizar Compra',
    en: 'Checkout',
  },

  // Product Detail
  'productDetail.backToShop': {
    pt: 'Voltar para a loja',
    en: 'Back to shop',
  },
  'productDetail.rating': {
    pt: '({rating} de 5 estrelas)',
    en: '({rating} out of 5 stars)',
  },
  'productDetail.addToCart': {
    pt: 'Adicionar ao Carrinho',
    en: 'Add to Cart',
  },
  'productDetail.nutritionalInfo': {
    pt: 'Informações Nutricionais',
    en: 'Nutritional Information',
  },
  'productDetail.calories': {
    pt: 'Calorias',
    en: 'Calories',
  },
  'productDetail.fats': {
    pt: 'Gorduras',
    en: 'Fats',
  },
  'productDetail.carbs': {
    pt: 'Carboidratos',
    en: 'Carbohydrates',
  },
  'productDetail.proteins': {
    pt: 'Proteínas',
    en: 'Proteins',
  },
  'productDetail.allergenInfo': {
    pt: 'Informações sobre Alergênicos',
    en: 'Allergen Information',
  },
  'productDetail.contains': {
    pt: 'Contém: {allergens}.',
    en: 'Contains: {allergens}.',
  },

  // Checkout
  'checkout.title': {
    pt: 'Finalizar Pedido',
    en: 'Checkout',
  },
  'checkout.subtitle': {
    pt: 'Quase lá! Preencha seus dados para entrega.',
    en: 'Almost there! Fill in your details for delivery.',
  },
  'checkout.deliveryAddress': {
    pt: 'Endereço de Entrega',
    en: 'Delivery Address',
  },
  'checkout.zip': {
    pt: 'CEP',
    en: 'ZIP Code',
  },
  'checkout.address': {
    pt: 'Endereço',
    en: 'Address',
  },
  'checkout.number': {
    pt: 'Número',
    en: 'Number',
  },
  'checkout.complement': {
    pt: 'Complemento',
    en: 'Complement',
  },
  'checkout.neighborhood': {
    pt: 'Bairro',
    en: 'Neighborhood',
  },
  'checkout.city': {
    pt: 'Cidade',
    en: 'City',
  },
  'checkout.state': {
    pt: 'Estado',
    en: 'State',
  },
  'checkout.additionalInfo': {
    pt: 'Informações Adicionais (Opcional)',
    en: 'Additional Information (Optional)',
  },
  'checkout.additionalInfo.placeholder': {
    pt: 'Ex: Deixar na portaria, campainha quebrada, etc.',
    en: 'E.g., Leave at the front desk, broken doorbell, etc.',
  },
  'checkout.confirmOrder': {
    pt: 'Confirmar Pedido',
    en: 'Confirm Order',
  },
  'checkout.backToShop': {
    pt: 'Voltar para a Loja',
    en: 'Back to Shop',
  },
  'checkout.orderSummary': {
    pt: 'Resumo do Pedido',
    en: 'Order Summary',
  },
  'checkout.quantity': {
    pt: 'Qtd: {quantity}',
    en: 'Qty: {quantity}',
  },
  'checkout.total': {
    pt: 'Total',
    en: 'Total',
  },

  // About Page
  'about.hero.title': {
    pt: 'Feito com Paixão',
    en: 'Made with Passion',
  },
  'about.hero.subtitle': {
    pt: 'Conheça a história por trás de cada mordida.',
    en: 'Discover the story behind every bite.',
  },
  'about.story.title': {
    pt: 'Nossa História',
    en: 'Our Story',
  },
  'about.story.content': {
    pt: 'A Cupcake Shop nasceu de um sonho doce e de uma cozinha cheia de amor. Tudo começou como um hobby, assando para amigos e familiares em ocasiões especiais. A alegria que nossos cupcakes traziam era contagiante, e logo percebemos que essa paixão poderia se tornar algo maior. Em {year}, demos o grande passo e abrimos nossa primeira lojinha, com a missão de espalhar felicidade em forma de bolinhos perfeitamente confeitados.',
    en: 'Cupcake Shop was born from a sweet dream and a kitchen full of love. It all started as a hobby, baking for friends and family on special occasions. The joy our cupcakes brought was contagious, and we soon realized this passion could become something bigger. In {year}, we took the big step and opened our first small shop, with the mission of spreading happiness in the form of perfectly frosted little cakes.',
  },
  'about.mission.title': {
    pt: 'Nossa Missão',
    en: 'Our Mission',
  },
  'about.mission.content': {
    pt: 'Nossa missão é simples: criar os cupcakes mais deliciosos e memoráveis que você já provou. Usamos apenas ingredientes frescos e de alta qualidade, combinando receitas clássicas com um toque de criatividade. Queremos que cada mordida seja uma experiência única, um momento de puro prazer que adoce o seu dia.',
    en: 'Our mission is simple: to create the most delicious and memorable cupcakes you have ever tasted. We use only fresh, high-quality ingredients, combining classic recipes with a touch of creativity. We want every bite to be a unique experience, a moment of pure pleasure that sweetens your day.',
  },
  'about.values.title': {
    pt: 'Nossos Valores',
    en: 'Our Values',
  },
  'about.values.quality': {
    pt: '<span class="font-semibold">Qualidade:</span> Nunca abrimos mão dos melhores ingredientes.',
    en: '<span class="font-semibold">Quality:</span> We never compromise on the best ingredients.',
  },
  'about.values.passion': {
    pt: '<span class="font-semibold">Paixão:</span> Cada cupcake é feito à mão, com carinho e dedicação.',
    en: '<span class="font-semibold">Passion:</span> Each cupcake is handmade with care and dedication.',
  },
  'about.values.happiness': {
    pt: '<span class="font-semibold">Felicidade:</span> Nosso maior pagamento é o sorriso de um cliente satisfeito.',
    en: '<span class="font-semibold">Happiness:</span> Our greatest reward is the smile of a satisfied customer.',
  },
  'about.values.community': {
    pt: '<span class="font-semibold">Comunidade:</span> Adoramos fazer parte dos momentos especiais da sua vida.',
    en: '<span class="font-semibold">Community:</span> We love being part of the special moments in your life.',
  },
  'about.backToShop': {
    pt: 'Voltar para a Loja',
    en: 'Back to Shop',
  },
};