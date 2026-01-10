import React, { useState } from 'react';
import { Card, Button, Badge, formatCurrency } from '../components/UI';
import { ShoppingCart, Truck, Package, Tag, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Shop ---
export const Shop: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const products = [
    { id: '1', name: '量子科技全戶型用水系統 (專業版)', price: 98000, tag: '套裝設備', image: 'https://picsum.photos/300/300?random=20', isPackage: true, vendorDirect: true },
    { id: '2', name: '有機小農米 (2kg)', price: 350, tag: '小農好物', image: 'https://picsum.photos/300/300?random=21', vendorDirect: true },
    { id: '3', name: '共生社區一日體驗券', price: 1200, tag: '體驗行程', image: 'https://picsum.photos/300/300?random=22' },
    { id: '4', name: '高效濾心組 (3入)', price: 4500, tag: '耗材選配', image: 'https://picsum.photos/300/300?random=23' },
  ];

  // Filter logic
  const filteredProducts = activeTab === 'all' 
    ? products 
    : activeTab === 'package' 
      ? products.filter(p => p.isPackage) 
      : products.filter(p => !p.isPackage);

  return (
    <div className="pb-20">
      {/* Promotion Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3 rounded-lg mb-4 text-xs flex items-center justify-between shadow-md">
         <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span className="font-bold">廠商直送免運</span>
         </div>
         <span>全館滿 NT$ 7,000 免運費</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
         <button 
           onClick={() => setActiveTab('all')}
           className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'}`}
         >
           全部
         </button>
         <button 
           onClick={() => setActiveTab('package')}
           className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'package' ? 'bg-primary text-white' : 'bg-white text-gray-500'}`}
         >
           套裝設備
         </button>
         <button 
           onClick={() => setActiveTab('selection')}
           className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'selection' ? 'bg-secondary text-white' : 'bg-white text-gray-500'}`}
         >
           自由選配
         </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-card overflow-hidden shadow-soft group flex flex-col">
            <div className="aspect-square bg-gray-100 relative">
               <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
               <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                 {product.isPackage && <Badge label="熱銷套裝" color="red" />}
                 {product.vendorDirect && <Badge label="廠商直送" color="green" />}
                 {!product.isPackage && !product.vendorDirect && <Badge label={product.tag} color="amber" />}
               </div>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{product.name}</h3>
              <div className="mt-auto flex justify-between items-center pt-2">
                <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
                <button className="p-1.5 bg-gray-100 rounded-full text-gray-600 active:bg-primary active:text-white transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Orders ---
export const Orders: React.FC = () => {
  const orders = [
    { id: 'ORD-20240501', status: '已出貨', date: '2024-05-01', total: 98000, items: ['量子科技全戶型用水系統 x1'] },
    { id: 'ORD-20240412', status: '已完成', date: '2024-04-12', total: 480, items: ['環保餐具 x1'] },
  ];

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <Card key={order.id} className="flex flex-col gap-3">
          <div className="flex justify-between items-start border-b border-gray-100 pb-2">
            <div>
              <div className="font-bold text-gray-800 text-sm">{order.id}</div>
              <div className="text-xs text-gray-400">{order.date}</div>
            </div>
            <Badge 
              label={order.status} 
              color={order.status === '已完成' ? 'green' : 'amber'} 
            />
          </div>
          
          <div className="space-y-1">
            {order.items.map((item, i) => (
              <div key={i} className="text-sm text-gray-600 flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-gray-300" />
                 {item}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 mt-1">
             <div className="text-sm font-bold text-gray-500">總計: <span className="text-gray-900 text-lg">{formatCurrency(order.total)}</span></div>
             {order.status === '已出貨' && (
               <Button size="sm" variant="outline" className="px-3 h-8 text-xs">
                 <Truck className="w-3 h-3 mr-1" /> 追蹤物流
               </Button>
             )}
          </div>
          
          {/* Simple Timeline for Shipped Order */}
          {order.status === '已出貨' && (
            <div className="bg-gray-50 p-3 rounded-lg mt-1">
               <div className="flex gap-3">
                 <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mb-1" />
                    <div className="w-0.5 h-full bg-gray-300" />
                 </div>
                 <div className="pb-4">
                    <div className="text-xs font-bold text-gray-800">廠商已發貨</div>
                    <div className="text-[10px] text-gray-400">05-02 14:30 • 新竹物流</div>
                 </div>
               </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
