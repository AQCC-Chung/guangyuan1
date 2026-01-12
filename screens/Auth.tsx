import React, { useState } from 'react';
import { Button } from '../components/UI';
import { UserRole, User } from '../types';
import { AuthService } from '../services/auth';
import { ArrowRight, Mail, Lock, User as UserIcon, Phone, AlertCircle, ShieldCheck, TrendingUp, Users, GraduationCap, Star, Loader2 } from 'lucide-react';

// Validation Regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^09\d{8}$/;

export const Landing: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans flex flex-col">
      <nav className="flex items-center justify-between px-6 py-5 sticky top-0 bg-[#FAF9F6]/95 backdrop-blur-md z-50 border-b border-gray-100/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-amber-600 rounded-lg flex items-center justify-center text-white font-bold">廣</div>
          <span className="font-bold text-lg text-gray-800">廣圓科技</span>
        </div>
        <Button size="sm" onClick={onStart} variant="ghost" className="text-primary font-bold">登入</Button>
      </nav>

      <section className="px-6 pt-10 pb-12 flex-1">
        <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold mb-4">● WEB 3.0 生活型態</div>
        <h1 className="text-[2.2rem] font-bold text-gray-900 leading-tight mb-4">共生生活圈<br/><span className="text-primary">連結溫暖</span>與能量</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">重新定義財富與生活的未來。在這裡，每一次互動都是價值的流動。</p>
        <Button size="lg" onClick={onStart} className="w-full h-14 text-lg">立即開啟之旅 <ArrowRight className="ml-2 w-5 h-5"/></Button>
        <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
           <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
        </div>
      </section>
    </div>
  );
};

export const Login: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.MEMBER);

  const handleSubmit = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    
    const targetEmail = customEmail || email;
    const targetPass = customPass || password;

    try {
      if (isRegister) {
        // Registration Validation
        if (!name || !email || !phone || !password) throw new Error('請填寫所有必填欄位');

        if (!EMAIL_REGEX.test(email)) throw new Error('電子信箱格式不正確');
        if (!PHONE_REGEX.test(phone)) throw new Error('手機號碼格式錯誤 (需為 09 開頭共 10 碼)');
        if (password.length < 6) throw new Error('密碼長度至少需 6 碼');

        const user = await AuthService.register(name, email, password, role, phone);
        onLogin(user);
      } else {
        // Login Validation
        if (!targetEmail || !targetPass) throw new Error('請輸入帳號與密碼');
        if (!EMAIL_REGEX.test(targetEmail)) throw new Error('電子信箱格式不正確');

        const user = await AuthService.login(targetEmail, targetPass);
        onLogin(user);
      }
    } catch (err: any) {
      setError(err.message || '發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('123456');
    // 自動觸發登入
    handleSubmit(undefined, demoEmail, '123456');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-6 flex flex-col justify-center">
      <div className="max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto mb-4">廣</div>
          <h2 className="text-2xl font-bold text-gray-900">{isRegister ? '建立新帳戶' : '歡迎回來'}</h2>
          <p className="text-xs text-gray-400 mt-2">使用 Google Sheets 作為雲端資料庫</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs flex items-center gap-2 border border-red-100 animate-pulse"><AlertCircle className="w-4 h-4"/>{error}</div>}
          
          {isRegister && (
            <>
              <InputGroup icon={UserIcon} type="text" placeholder="真實姓名" value={name} onChange={(e:any) => setName(e.target.value)} disabled={loading} />
              <InputGroup icon={Phone} type="tel" placeholder="手機號碼" value={phone} onChange={(e:any) => setPhone(e.target.value)} disabled={loading} maxLength={10} />
              <div className="grid grid-cols-2 gap-2 pb-2">
                {[UserRole.MEMBER, UserRole.INVESTOR, UserRole.PROMOTER, UserRole.TEACHER].map(r => (
                  <button 
                    key={r} 
                    type="button" 
                    onClick={() => setRole(r)} 
                    disabled={loading}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${role === r ? 'bg-primary text-white border-primary' : 'bg-white text-gray-400 border-gray-200'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </>
          )}
          
          <InputGroup icon={Mail} type="email" placeholder="電子信箱" value={email} onChange={(e:any) => setEmail(e.target.value)} disabled={loading} />
          <InputGroup icon={Lock} type="password" placeholder="密碼" value={password} onChange={(e:any) => setPassword(e.target.value)} disabled={loading} />
          
          <Button type="submit" className="w-full h-12" loading={loading} disabled={loading}>
            {loading ? '處理中...' : (isRegister ? '立即註冊' : '登入')}
          </Button>
        </form>

        {!isRegister && !loading && (
          <div className="mt-10 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">開發測試：一鍵登入</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <QuickAction icon={ShieldCheck} label="管理" onClick={() => handleQuickLogin('admin@test.com')} />
              <QuickAction icon={Star} label="學員" onClick={() => handleQuickLogin('member@test.com')} />
              <QuickAction icon={TrendingUp} label="投資" onClick={() => handleQuickLogin('investor@test.com')} />
              <QuickAction icon={Users} label="推廣" onClick={() => handleQuickLogin('promoter@test.com')} />
              <QuickAction icon={GraduationCap} label="講師" onClick={() => handleQuickLogin('teacher@test.com')} />
            </div>
          </div>
        )}

        <button 
          onClick={() => { setIsRegister(!isRegister); setError(null); }} 
          className="w-full mt-6 text-sm text-gray-500 font-medium hover:text-primary transition-colors"
          disabled={loading}
        >
          {isRegister ? '已經有帳號？ 登入' : '還沒有帳號？ 註冊'}
        </button>
      </div>
    </div>
  );
};

const InputGroup = ({ icon: Icon, ...props }: any) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input {...props} className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-primary transition-all text-sm disabled:bg-gray-50 disabled:text-gray-400" />
  </div>
);

const QuickAction = ({ icon: Icon, label, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1.5 group active:scale-90 transition-transform">
    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/30 group-hover:bg-amber-50 transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <span className="text-[10px] font-bold text-gray-500">{label}</span>
  </button>
);