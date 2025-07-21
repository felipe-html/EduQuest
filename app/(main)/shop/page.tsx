'use client';

import React, { useState } from 'react';
import { Heart, Shield, Star, Zap, Trophy, Gem, Coins, ShoppingCart, Plus, Minus } from 'lucide-react';
import { getUserProgress } from '@/db/queries';

interface GameItem {
  id: number;
  name: string;
  price: number;
  icon: React.ReactNode;
  category: 'vida' | 'emblema' | 'poder' | 'moeda';
  description: string;
  rarity: 'comum' | 'raro' | 'epico' | 'lendario';
}

const GameItemsShop: React.FC = () => {
  const [coins, setCoins] = useState(1000);
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const gameItems: GameItem[] = [
    {
      id: 1,
      name: 'Vida Extra',
      price: 50,
      icon: <Heart className="w-8 h-8 text-red-500" />,
      category: 'vida',
      description: 'Recupera uma vida perdida',
      rarity: 'comum'
    },
    {
      id: 2,
      name: 'Coração Dourado',
      price: 150,
      icon: <Heart className="w-8 h-8 text-yellow-500" />,
      category: 'vida',
      description: 'Vida especial que dura mais tempo',
      rarity: 'raro'
    },
    {
      id: 3,
      name: 'Emblema Guerreiro',
      price: 200,
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      category: 'emblema',
      description: 'Mostra sua força em batalha',
      rarity: 'epico'
    },
    {
      id: 4,
      name: 'Estrela Brilhante',
      price: 100,
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      category: 'emblema',
      description: 'Emblema de conquista especial',
      rarity: 'raro'
    },
    {
      id: 5,
      name: 'Raio Energético',
      price: 75,
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      category: 'poder',
      description: 'Aumenta sua energia temporariamente',
      rarity: 'comum'
    },
    {
      id: 6,
      name: 'Troféu Lendário',
      price: 500,
      icon: <Trophy className="w-8 h-8 text-amber-500" />,
      category: 'emblema',
      description: 'O troféu mais raro do jogo',
      rarity: 'lendario'
    },
    {
      id: 7,
      name: 'Gema Mística',
      price: 300,
      icon: <Gem className="w-8 h-8 text-emerald-500" />,
      category: 'poder',
      description: 'Poder mágico ancestral',
      rarity: 'epico'
    },
    {
      id: 8,
      name: 'Moedas Extras',
      price: 25,
      icon: <Coins className="w-8 h-8 text-yellow-600" />,
      category: 'moeda',
      description: 'Pacote com 100 moedas extras',
      rarity: 'comum'
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'vida', name: 'Vidas', icon: <Heart className="w-4 h-4" /> },
    { id: 'emblema', name: 'Emblemas', icon: <Trophy className="w-4 h-4" /> },
    { id: 'poder', name: 'Poderes', icon: <Zap className="w-4 h-4" /> },
    { id: 'moeda', name: 'Moedas', icon: <Coins className="w-4 h-4" /> }
  ];

  const rarityColors = {
    comum: 'border-gray-400 bg-gray-50',
    raro: 'border-blue-400 bg-blue-50',
    epico: 'border-purple-400 bg-purple-50',
    lendario: 'border-yellow-400 bg-yellow-50'
  };

  const filteredItems = selectedCategory === 'todos' 
    ? gameItems 
    : gameItems.filter(item => item.category === selectedCategory);

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = gameItems.find(i => i.id === parseInt(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const purchaseItems = () => {
    const totalPrice = getTotalPrice();
    if (totalPrice <= coins) {
      setCoins(prev => prev - totalPrice);
      setCart({});
      alert('Compra realizada com sucesso! 🎉');
    } else {
      alert('Moedas insuficientes! 💰');
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
             Loja de Itens
          </h1>
          <div className="flex items-center justify-center gap-4 text-2xl">
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-700 text-white scale-105'
                  : 'bg-blue-400 text-white hover:bg-blue-300'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`${rarityColors[item.rarity]} backdrop-blur-sm border-2 rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="text-center mb-4">
                {item.icon}
                <h3 className="font-bold text-lg mt-2 text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Coins className="w-4 h-4 text-yellow-600" />
                  <span className="font-bold text-lg">{item.price}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    disabled={!cart[item.id]}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold min-w-[20px] text-center">
                    {cart[item.id] || 0}
                  </span>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.rarity === 'comum' ? 'bg-gray-200 text-gray-700' :
                  item.rarity === 'raro' ? 'bg-blue-200 text-blue-700' :
                  item.rarity === 'epico' ? 'bg-purple-200 text-purple-700' :
                  'bg-yellow-200 text-yellow-700'
                }`}>
                  {item.rarity.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {Object.keys(cart).length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white rounded-xl p-4 shadow-2xl border-2 border-purple-200">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Carrinho
            </h3>
            <div className="space-y-2 mb-4">
              {Object.entries(cart).map(([itemId, quantity]) => {
                const item = gameItems.find(i => i.id === parseInt(itemId));
                if (!item) return null;
                return (
                  <div key={itemId} className="flex items-center justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-medium">{quantity}x {item.price * quantity}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-3">
              <div className="flex items-center justify-between font-bold text-lg mb-3">
                <span>Total:</span>
                <div className="flex items-center gap-1">
                  <Coins className="w-5 h-5 text-yellow-600" />
                  {getTotalPrice()}
                </div>
              </div>
              <button
                onClick={purchaseItems}
                className={`w-full py-2 rounded-lg font-bold transition-all ${
                  getTotalPrice() <= coins
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={getTotalPrice() > coins}
              >
                {getTotalPrice() <= coins ? 'Comprar 🛒' : 'Moedas Insuficientes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameItemsShop;