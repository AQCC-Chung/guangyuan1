import React from 'react';
import { Card } from '../components/UI';
import { Users, ShoppingBag, FileText, AlertCircle, DollarSign } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 pb-20">
      <AdminCard icon={Users} label="用戶管理" value="1,240" color="bg-blue-500" />
      <AdminCard icon={ShoppingBag} label="商品管理" value="86" color="bg-emerald-500" />
      <AdminCard icon={FileText} label="訂單總覽" value="12" sub="今日新單" color="bg-amber-500" />
      <AdminCard icon={DollarSign} label="待撥款項" value="5" sub="需審核" color="bg-rose-500" />
      
      <div className="col-span-2 mt-4">
        <h3 className="font-bold text-gray-800 mb-3">待辦事項</h3>
        <Card className="flex items-start gap-3 border-l-4 border-red-500">
           <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
           <div>
             <div className="font-bold text-gray-800 text-sm">3 筆大額投資待審核</div>
             <div className="text-xs text-gray-500 mt-1">來自：王大明, 李小華...</div>
           </div>
        </Card>
      </div>
    </div>
  );
};

const AdminCard = ({ icon: Icon, label, value, sub, color }: any) => (
  <Card className="flex flex-col items-start gap-3">
    <div className={`p-2 rounded-lg text-white ${color} shadow-md`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
      {sub && <div className="text-xs text-red-500 font-medium">{sub}</div>}
    </div>
  </Card>
);
