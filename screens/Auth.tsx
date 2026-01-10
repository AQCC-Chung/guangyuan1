import React from 'react';
import { Button, Card } from '../components/UI';
import { UserRole } from '../types';
import { ArrowRight, Leaf, Coins, GraduationCap, HeartHandshake, Rocket, CheckCircle2 } from 'lucide-react';

// --- Landing Page ---
export const Landing: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans overflow-x-hidden flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-5 sticky top-0 bg-[#FAF9F6]/95 backdrop-blur-md z-50 border-b border-gray-100/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-amber-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
            廣
          </div>
          <span className="font-bold text-lg text-gray-800 tracking-tight">廣圓科技</span>
        </div>
        <Button size="sm" onClick={onStart} className="px-5 shadow-none bg-amber-600 hover:bg-amber-700">登入</Button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-10 pb-12 flex-1">
        <div className="inline-block px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[11px] font-bold tracking-wider mb-5 shadow-sm">
          ● WEB 3.0 生活型態
        </div>
        
        <h1 className="text-[2.5rem] font-bold text-gray-900 leading-[1.15] mb-4 tracking-tight">
          共生生活圈<br/>
          <span className="text-[#D97706]">連結溫暖</span>與<br/>
          <span className="text-[#059669]">有機的能量</span>
        </h1>
        
        <p className="text-gray-500 mt-4 leading-relaxed text-base">
          重新定義財富、智慧與生活的未來。在這裡，每一次互動都是價值的流動，每一個連結都孕育著新的可能。
        </p>

        <div className="flex gap-3 mt-8 mb-12">
          <Button size="md" onClick={onStart} className="flex-1 bg-[#D97706] text-white shadow-lg shadow-orange-500/20 h-12 text-[15px]">
            立即加入 <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button size="md" variant="outline" className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 h-12 text-[15px] bg-white">
            了解更多
          </Button>
        </div>

        {/* Hero Image Mobile Composition */}
        <div className="relative rounded-[24px] overflow-hidden shadow-2xl shadow-emerald-900/10 aspect-[4/3.2] group">
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Community" 
            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          
          {/* Floating Card: Bottom Left */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md p-3 rounded-xl text-white border border-white/10 shadow-lg">
            <div className="text-[10px] text-white/70 mb-0.5">廣圓生態系</div>
            <div className="font-bold text-sm tracking-wide">自然 • 人本 • 科技</div>
          </div>
          
          {/* Floating Card: Top Right */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2 pr-3 rounded-full flex items-center gap-2 shadow-sm border border-emerald-50">
             <div className="p-1.5 bg-emerald-100 rounded-full">
               <Leaf className="w-3 h-3 text-emerald-600" />
             </div>
             <div className="text-[10px] font-bold text-gray-800 leading-tight">
               <div>永續發展</div>
               <div className="text-emerald-600">100% 綠色能源</div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white rounded-t-[40px] shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.03)] -mt-6 z-10 relative">
        <div className="text-center mb-12">
          <div className="text-[#059669] text-xs font-bold mb-3 tracking-widest uppercase">我們的核心支柱</div>
          <h2 className="text-2xl font-bold text-gray-900 leading-snug">
            打造平衡財富、教育<br/>與生活的共生生態系統
          </h2>
        </div>

        <div className="space-y-6">
          <FeatureCard 
            icon={Coins} 
            title="財富共享" 
            desc="透過創新的分配機制，創造可持續的價值流動與資產增長，讓每一份貢獻都被看見。"
            iconColor="text-amber-600"
            bgColor="bg-amber-50"
          />
          <FeatureCard 
            icon={GraduationCap} 
            title="終身教育" 
            desc="建立無邊界的學習網絡，孕育智慧與個人成長的沃土，賦能每一個追求卓越的靈魂。"
            iconColor="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <FeatureCard 
            icon={HeartHandshake} 
            title="質感生活" 
            desc="回歸自然與人本的社群連結，在科技與溫度的交會點，重塑理想的生活樣貌。"
            iconColor="text-stone-600"
            bgColor="bg-[#FAF9F6]"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-16 bg-white">
        <div className="bg-[#2C2016] rounded-[32px] p-8 text-center relative overflow-hidden isolate shadow-2xl shadow-orange-900/20">
          {/* Abstract blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-20 -mt-20 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -ml-20 -mb-20 -z-10"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Rocket className="w-8 h-8 text-[#D97706]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">準備好開始了嗎？</h2>
            <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
              加入廣圓科技，與我們一起共創美好未來。<br/>現在就是加入生態圈的最佳時機。
            </p>
            <Button onClick={onStart} size="lg" className="w-full bg-[#D97706] hover:bg-[#b45309] text-white border-none h-14 text-lg shadow-xl shadow-orange-900/30">
              開啟旅程
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-center bg-[#FAF9F6] border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white text-xs font-bold">
            廣
          </div>
          <span className="font-bold text-gray-800">廣圓科技</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-500 mb-8 font-medium">
          <a href="#" className="hover:text-gray-900 transition-colors">關於我們</a>
          <a href="#" className="hover:text-gray-900 transition-colors">隱私政策</a>
          <a href="#" className="hover:text-gray-900 transition-colors">服務條款</a>
          <a href="#" className="hover:text-gray-900 transition-colors">聯絡我們</a>
        </div>
        <div className="text-[10px] text-gray-400 font-mono">
          © 2024 Guangyuan Technology. All rights reserved.<br/>
          v1.2.0
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, iconColor, bgColor }: any) => (
  <div className={`p-6 rounded-[24px] border border-gray-100 ${bgColor === 'bg-[#FAF9F6]' ? 'bg-[#FAF9F6]' : 'bg-white'}`}>
    <div className={`w-14 h-14 ${bgColor} rounded-full flex items-center justify-center mb-5`}>
      <Icon className={`w-7 h-7 ${iconColor}`} />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-7">{desc}</p>
  </div>
);


// --- Login Page (Role Selection Demo) ---
export const Login: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-amber-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-500/30 mx-auto mb-6">
            廣
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">歡迎回到共生圈</h2>
            <p className="text-gray-500">請選擇您的身份進入系統</p>
        </div>

        <div className="space-y-3">
          <RoleCard 
            role="學員 (Member)" 
            desc="學習課程，購買商品"
            onClick={() => onLogin(UserRole.MEMBER)} 
          />
          <RoleCard 
            role="投資人 (Investor)" 
            desc="查看數位存摺，資產管理"
            onClick={() => onLogin(UserRole.INVESTOR)} 
            highlight
          />
           <RoleCard 
            role="推廣夥伴 (Promoter)" 
            desc="推廣連結，獎金查看"
            onClick={() => onLogin(UserRole.PROMOTER)} 
          />
          <RoleCard 
            role="講師 (Teacher)" 
            desc="課程管理，學員互動"
            onClick={() => onLogin(UserRole.TEACHER)} 
          />
          <RoleCard 
            role="管理員 (Admin)" 
            desc="系統總覽，全權管理"
            onClick={() => onLogin(UserRole.ADMIN)} 
          />
        </div>

        <div className="mt-10 text-center">
            <Button variant="ghost" className="text-sm text-gray-400 font-normal">
              遇到問題？ <span className="underline ml-1">聯繫客服</span>
            </Button>
        </div>
      </div>
    </div>
  );
};

const RoleCard: React.FC<{ role: string; desc: string; onClick: () => void; highlight?: boolean }> = ({ role, desc, onClick, highlight }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 active:scale-[0.98] ${
        highlight 
        ? 'bg-white border-primary shadow-lg shadow-orange-500/10' 
        : 'bg-white border-transparent shadow-sm hover:border-gray-200'
    }`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${highlight ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
      {role[0]}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
          <h3 className={`font-bold ${highlight ? 'text-gray-900' : 'text-gray-700'}`}>{role}</h3>
          {highlight && <CheckCircle2 className="w-5 h-5 text-primary" />}
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
    </div>
  </button>
);
