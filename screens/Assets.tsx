import React, { useState } from 'react';
import { Card, Button, Badge, ProgressRing, formatCurrency } from '../components/UI';
import { AssetRecord } from '../types';
import { ArrowUpRight, Copy, QrCode, Download, CheckCircle, Clock, Store, TrendingUp, RefreshCw, DollarSign, Users } from 'lucide-react';

// --- Passbook (Investor) ---
export const Passbook: React.FC = () => {
  // Logic: 60 Periods, NT$ 1650 per period
  const totalPeriods = 60;
  const currentPeriod = 12;
  const unitCost = 98000;
  const monthlyReturn = 1650;
  const totalReturnCash = monthlyReturn * totalPeriods; // 99,000
  
  const records: AssetRecord[] = Array.from({ length: 5 }).map((_, i) => ({
    period: currentPeriod - i,
    date: `2024-0${5-i}-15`,
    amount: monthlyReturn,
    status: i === 0 ? 'PENDING' : 'PAID'
  }));

  return (
    <div className="space-y-6 pb-20">
      {/* Main Asset Card */}
      <Card className="flex flex-col items-center py-8 relative overflow-hidden bg-white border-t-4 border-primary">
        <div className="absolute top-4 right-4">
            <Badge label="合約履行中" color="green" />
        </div>
        
        <ProgressRing 
          current={currentPeriod} 
          total={totalPeriods} 
          label="財富能量累積" 
          subLabel="第 12 / 60 期" 
        />
        
        <div className="mt-6 text-center w-full px-4">
            <h3 className="text-lg font-bold text-gray-800">量子科技全戶型用水系統</h3>
            <div className="text-xs text-gray-500 mt-1">承購成本: {formatCurrency(unitCost)} / 單位</div>
        </div>

        <div className="mt-6 grid grid-cols-2 w-full gap-4 text-center border-t border-gray-100 pt-4 px-2">
          <div>
            <div className="text-xs text-gray-400 mb-1">已領取代租收益</div>
            <div className="text-lg font-bold text-secondary">{formatCurrency(monthlyReturn * currentPeriod)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">預期總現金回報</div>
            <div className="text-lg font-bold text-gray-800">{formatCurrency(totalReturnCash)}</div>
          </div>
        </div>
      </Card>

      {/* Bonus Card - 3% Revenue Share */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-card p-5 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
        <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center gap-1 text-white/90 text-sm mb-2">
                <Store className="w-4 h-4" />
                <span className="font-bold">增額紅利 (店家營收 3%)</span>
            </div>
            <div className="text-3xl font-bold tracking-tight">NT$ 1,240</div>
            <div className="mt-2 text-xs text-white/70 bg-black/10 inline-block px-2 py-1 rounded">
               * 本月綁定店家營業額分潤
            </div>
          </div>
          <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm border border-white/10">
            <ArrowUpRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Future Value Projection (End of Term) */}
      <div className="bg-gray-50 rounded-container p-5 border border-gray-200">
         <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-gray-800">期滿資產倍增計畫 (第 60 期)</h3>
         </div>
         <p className="text-xs text-gray-500 mb-4 leading-relaxed">
           當代租合約期滿，您除了已領回本金與收益共 <span className="text-gray-800 font-bold">NT$ 99,000</span> 外，公司將額外贈送一台全新設備，實現資產翻倍。
         </p>
         <div className="grid grid-cols-2 gap-3">
             <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <DollarSign className="w-6 h-6 text-emerald-500 mb-2" />
                <div className="font-bold text-gray-800 text-sm">直接出售變現</div>
                <div className="text-[10px] text-gray-400 mt-1">快速回收資金</div>
             </div>
             <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <RefreshCw className="w-6 h-6 text-primary mb-2" />
                <div className="font-bold text-gray-800 text-sm">繼續代租滾動</div>
                <div className="text-[10px] text-gray-400 mt-1">創造持續現金流</div>
             </div>
         </div>
      </div>

      {/* History */}
      <div>
        <h3 className="font-bold text-gray-800 mb-3 px-1">近期收益紀錄</h3>
        <div className="space-y-3">
          {records.map((record, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${record.status === 'PAID' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                   {record.status === 'PAID' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-gray-800">第 {record.period} 期租金</div>
                  <div className="text-xs text-gray-400">{record.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{formatCurrency(record.amount)}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${record.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {record.status === 'PAID' ? '已入帳' : '待核退'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Rewards (Promoter) ---
export const Rewards: React.FC = () => {
  // Logic: Tiered Bonus 25% -> 30% -> 35%
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
         <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">本月銷售階梯獎金</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-bold">目前累積：7 台</span>
         </div>
         <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '70%' }}></div>
         </div>
         
         <div className="grid grid-cols-3 gap-2">
            <TierCard percent={25} title="1-5 台" range="基礎獎金" />
            <TierCard percent={30} title="6-10 台" range="進階分潤" active />
            <TierCard percent={35} title="11 台以上" range="高額激勵" />
         </div>
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-container p-6 text-white shadow-xl shadow-gray-400/20 text-center">
        <div className="text-sm text-gray-400 mb-1">本月預估總獎金</div>
        <div className="text-4xl font-bold text-white mb-6">{formatCurrency(28500)}</div>
        
        <div className="grid grid-cols-2 gap-4 text-left">
             <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                <div className="text-[10px] text-gray-300 mb-1">第一代：直接銷售</div>
                <div className="font-bold text-lg">{formatCurrency(25000)}</div>
                <div className="text-[10px] text-primary mt-1">提成 30%</div>
             </div>
             <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                <div className="text-[10px] text-gray-300 mb-1">第二代：輔導獎金</div>
                <div className="font-bold text-lg text-emerald-400">{formatCurrency(3500)}</div>
                <div className="text-[10px] text-emerald-400 mt-1">組織分潤</div>
             </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="font-bold text-gray-800">獎金明細 (兩代組織)</h3>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500">
               <Download className="w-3 h-3 mr-1" /> 下載報表
            </Button>
        </div>
        
        <div className="space-y-2">
           <RewardItem type="1st" name="台中西屯加盟店" action="銷售 2 台量子水機" amount={15000} date="2024-05-20" />
           <RewardItem type="2nd" name="李大華 (業務)" action="銷售 1 台設備" amount={2500} date="2024-05-18" isCoaching />
           <RewardItem type="2nd" name="王小美 (學員)" action="購買商城套組" amount={1000} date="2024-05-15" isCoaching />
        </div>
      </div>
    </div>
  );
};

const RewardItem = ({ type, name, action, amount, date, isCoaching }: any) => (
  <div className="bg-white p-3 rounded-card flex justify-between items-center border-l-4 border-transparent hover:border-primary transition-all shadow-sm">
    <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${type === '1st' ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'}`}>
            {type === '1st' ? '直' : '輔'}
        </div>
        <div>
            <div className="font-bold text-sm text-gray-800">{name}</div>
            <div className="text-xs text-gray-400">{action}</div>
        </div>
    </div>
    <div className="text-right">
      <div className={`font-bold ${isCoaching ? 'text-emerald-600' : 'text-primary'}`}>+{formatCurrency(amount)}</div>
      <div className="text-[10px] text-gray-300">{date}</div>
    </div>
 </div>
);

const TierCard = ({ percent, title, range, active }: any) => (
  <div className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all relative ${active ? 'border-primary bg-amber-50 shadow-md transform scale-105 z-10' : 'border-gray-100 bg-white text-gray-400'}`}>
    {active && <div className="absolute -top-2.5 bg-primary text-white text-[9px] px-2 py-0.5 rounded-full shadow-sm">當前</div>}
    <span className={`text-xl font-bold ${active ? 'text-primary' : 'text-gray-300'}`}>{percent}%</span>
    <span className={`text-xs font-bold mt-1 ${active ? 'text-gray-800' : 'text-gray-400'}`}>{title}</span>
    <span className="text-[9px] mt-0.5">{range}</span>
  </div>
);

// --- Referral (Promoter) ---
export const Referral: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="flex flex-col items-center py-8 space-y-4 bg-white">
        <div className="p-4 bg-white border-4 border-gray-100 rounded-xl relative shadow-sm">
           <QrCode className="w-40 h-40 text-gray-800" />
           <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
             掃描即可永久綁定
           </div>
        </div>
        <div className="text-center w-full px-8">
          <h3 className="font-bold text-gray-800 text-lg">您的專屬推廣碼</h3>
          <div className="mt-3 flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl cursor-pointer active:bg-gray-100 transition-colors">
             <span className="font-mono text-xl font-bold tracking-wider text-gray-700">GY-8823</span>
             <Copy className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-sm text-amber-900 leading-relaxed max-w-xs text-center mx-auto mt-2">
          <div className="font-bold mb-1 flex items-center justify-center gap-1">
             <Users className="w-4 h-4" /> 永久綁定機制
          </div>
          受邀者一旦掃描綁定，其未來在商城的<span className="font-bold underline">每一筆消費與課程購買</span>，系統都將自動計算您的利潤分配。
        </div>
      </Card>

      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="font-bold text-gray-800">我的團隊 (兩代組織)</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">共 12 人</span>
        </div>
        <div className="space-y-3">
          {[
            { name: '林小美', status: '已啟用', role: '加盟店家(小)', type: '第一代', sales: 5 },
            { name: '張建國', status: '審核中', role: '學員', type: '第一代', sales: 0 },
            { name: '王阿姨', status: '已啟用', role: '超級業務', type: '第二代', sales: 12 },
          ].map((user, i) => (
            <div key={i} className="bg-white p-3 rounded-card flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${user.type === '第一代' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                  {user.type === '第一代' ? '1st' : '2nd'}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.role} • 累計銷售 {user.sales} 台</div>
                </div>
              </div>
              <Badge 
                label={user.status} 
                color={user.status === '已啟用' ? 'green' : 'amber'} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
