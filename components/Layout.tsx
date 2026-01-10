import React, { useState } from 'react';
import { Menu, X, Bell, Home, BookOpen, ShoppingBag, User as UserIcon, LogOut, FileText, Gift, Users, CreditCard, ShieldCheck, PenTool, BarChart3 } from 'lucide-react';
import { UserRole } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  role: UserRole;
  onLogout: () => void;
}

// Global Menu Items (Drawer)
const MENU_ITEMS = [
  { label: '首頁', path: '/', icon: Home, roles: [UserRole.MEMBER, UserRole.INVESTOR, UserRole.PROMOTER, UserRole.TEACHER, UserRole.ADMIN] },
  { label: '數位存摺', path: '/passbook', icon: CreditCard, roles: [UserRole.INVESTOR, UserRole.ADMIN] },
  { label: '共學課程', path: '/courses', icon: BookOpen, roles: [UserRole.MEMBER, UserRole.INVESTOR, UserRole.PROMOTER, UserRole.TEACHER, UserRole.ADMIN] },
  { label: '內容管理', path: '/teacher/studio', icon: PenTool, roles: [UserRole.TEACHER, UserRole.ADMIN] }, // New for Teacher
  { label: '獎金透明', path: '/rewards', icon: Gift, roles: [UserRole.PROMOTER, UserRole.ADMIN] },
  { label: '推廣中心', path: '/referral', icon: Users, roles: [UserRole.PROMOTER, UserRole.ADMIN] },
  { label: '共生商城', path: '/shop', icon: ShoppingBag, roles: [UserRole.MEMBER, UserRole.INVESTOR, UserRole.PROMOTER, UserRole.TEACHER, UserRole.ADMIN] },
  { label: '我的訂單', path: '/orders', icon: FileText, roles: [UserRole.MEMBER, UserRole.INVESTOR, UserRole.PROMOTER, UserRole.TEACHER, UserRole.ADMIN] },
  { label: '管理後台', path: '/admin', icon: ShieldCheck, roles: [UserRole.ADMIN] },
];

export const MobileLayout: React.FC<LayoutProps> = ({ children, title, role, onLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleNav = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const filteredMenu = MENU_ITEMS.filter(item => item.roles.includes(role));

  // Dynamic Tab Bar based on Role
  const renderTabBar = () => {
    const commonProps = { isActive: false, onClick: () => {} }; // Helper to keep TS happy, logic below
    
    // 1. Member: Home / Courses / Shop / Orders
    if (role === UserRole.MEMBER) {
      return (
        <>
          <TabItem icon={Home} label="學習" isActive={location.pathname === '/'} onClick={() => navigate('/')} />
          <TabItem icon={BookOpen} label="課程" isActive={location.pathname.startsWith('/courses')} onClick={() => navigate('/courses')} />
          <TabItem icon={ShoppingBag} label="商城" isActive={location.pathname.startsWith('/shop')} onClick={() => navigate('/shop')} />
          <TabItem icon={UserIcon} label="我的" isActive={location.pathname === '/orders'} onClick={() => navigate('/orders')} />
        </>
      );
    }

    // 2. Investor: Home (Assets) / Passbook / Shop / Profile
    if (role === UserRole.INVESTOR) {
      return (
        <>
          <TabItem icon={CreditCard} label="資產" isActive={location.pathname === '/'} onClick={() => navigate('/')} />
          <TabItem icon={BarChart3} label="明細" isActive={location.pathname === '/passbook'} onClick={() => navigate('/passbook')} />
          <TabItem icon={ShoppingBag} label="商城" isActive={location.pathname.startsWith('/shop')} onClick={() => navigate('/shop')} />
          <TabItem icon={UserIcon} label="我的" isActive={location.pathname === '/orders'} onClick={() => navigate('/orders')} />
        </>
      );
    }

    // 3. Promoter: Home (Stats) / Referral / Shop / Rewards
    if (role === UserRole.PROMOTER) {
      return (
        <>
          <TabItem icon={BarChart3} label="業績" isActive={location.pathname === '/'} onClick={() => navigate('/')} />
          <TabItem icon={Users} label="圈粉" isActive={location.pathname === '/referral'} onClick={() => navigate('/referral')} />
          <TabItem icon={ShoppingBag} label="商城" isActive={location.pathname.startsWith('/shop')} onClick={() => navigate('/shop')} />
          <TabItem icon={Gift} label="獎金" isActive={location.pathname === '/rewards'} onClick={() => navigate('/rewards')} />
        </>
      );
    }

    // 4. Teacher: Home (Studio) / Courses / Products / Profile
    if (role === UserRole.TEACHER) {
      return (
        <>
          <TabItem icon={PenTool} label="工作台" isActive={location.pathname === '/'} onClick={() => navigate('/')} />
          <TabItem icon={BookOpen} label="課程庫" isActive={location.pathname.startsWith('/courses')} onClick={() => navigate('/courses')} />
          <TabItem icon={ShoppingBag} label="商品庫" isActive={location.pathname.startsWith('/shop')} onClick={() => navigate('/shop')} />
          <TabItem icon={UserIcon} label="我的" isActive={location.pathname === '/orders'} onClick={() => navigate('/orders')} />
        </>
      );
    }

    // Default/Admin
    return (
      <>
        <TabItem icon={Home} label="首頁" isActive={location.pathname === '/'} onClick={() => navigate('/')} />
        <TabItem icon={BookOpen} label="課程" isActive={location.pathname.startsWith('/courses')} onClick={() => navigate('/courses')} />
        <TabItem icon={ShoppingBag} label="商城" isActive={location.pathname.startsWith('/shop')} onClick={() => navigate('/shop')} />
        <TabItem icon={ShieldCheck} label="管理" isActive={location.pathname === '/admin'} onClick={() => navigate('/admin')} />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background text-text font-sans pb-20 relative overflow-hidden">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={toggleDrawer} className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full text-gray-500 font-medium">
                {role}
            </span>
            <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
        </div>
      </header>

      {/* Main Content with Transition Wrapper */}
      <main className="px-4 py-4 animate-[fadeIn_0.3s_ease-out]">
        {children}
      </main>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={toggleDrawer}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
            <div className="p-6 bg-gradient-to-br from-primary to-amber-600 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                  廣
                </div>
                <button onClick={toggleDrawer} className="text-white/80 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <h2 className="font-bold text-lg">廣圓科技</h2>
              <p className="text-sm text-white/80">共生生活圈</p>
              <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-white/20 text-xs backdrop-blur-sm">
                {role}
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
              {filteredMenu.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path 
                      ? 'bg-amber-50 text-primary font-bold shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-primary' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-2 bg-gray-50">
               <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-500 text-sm hover:bg-red-50 rounded-lg"
               >
                  <LogOut className="w-4 h-4" />
                  <span>登出</span>
               </button>
               <div className="text-center text-xs text-gray-300 pt-2">v1.2.0</div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 pb-safe">
        <div className="flex justify-around items-center h-16">
          {renderTabBar()}
        </div>
      </nav>
    </div>
  );
};

const TabItem: React.FC<{ icon: any, label: string, isActive: boolean, onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
      isActive ? 'text-primary' : 'text-gray-400'
    }`}
  >
    <Icon className={`w-6 h-6 ${isActive ? 'fill-current opacity-20 stroke-2' : 'stroke-2'}`} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
