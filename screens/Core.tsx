
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, formatCurrency } from '../components/UI';
import { UserRole, User } from '../types';
import { useNavigate } from 'react-router-dom';
// Add missing Plus icon to imports from lucide-react
import { PlayCircle, Award, Zap, ChevronRight, TrendingUp, Users, Gift, Star, PenTool, Plus } from 'lucide-react';
import { AuthService } from '../services/auth';
import { AdminDashboard } from './Admin';

export const Dashboard: React.FC<{ role: UserRole }> = ({ role }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-primary/20 p-0.5">
            <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900">{user.name}</span>
              <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold border border-amber-200 flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-current" /> {user.level}
              </span>
            </div>
            <div className="text-[11px] text-gray-400">ID: {user.id.split('-')[1]}</div>
          </div>
        </div>
        <div className="text-right">
           <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">能量積分</div>
           <div className="text-xl font-black text-primary flex items-center justify-end gap-1">
             <Zap className="w-4 h-4 fill-current" /> {user.points}
           </div>
        </div>
      </div>

      {role === UserRole.MEMBER && <MemberDashboard user={user} />}
      {role === UserRole.INVESTOR && <InvestorDashboard user={user} />}
      {role === UserRole.PROMOTER && <PromoterDashboard user={user} />}
      {role === UserRole.TEACHER && <TeacherDashboard user={user} />}
      {role === UserRole.ADMIN && <AdminDashboard />}
    </div>
  );
};

const MemberDashboard = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary to-amber-600 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">智慧即財富</h2>
          <p className="text-white/80 text-xs mb-4">累積連續學習，解鎖更高等級福利</p>
          <div className="flex items-center gap-2">
             <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1">
               <Zap className="w-3 h-3" /> 連續 {user.streak} 天
             </div>
          </div>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
           <Zap className="w-40 h-40" />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">繼續學習</h3>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
        <Card className="flex gap-4 items-center" onClick={() => navigate('/courses/1')}>
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
            <img src="https://picsum.photos/200/200?random=1" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-gray-800">量子科技的健康革命</h4>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2"><div className="bg-primary h-full rounded-full" style={{width: '45%'}}></div></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const InvestorDashboard = ({ user }: { user: User }) => (
  <div className="space-y-6">
    <Card className="border-t-4 border-primary p-6">
      <div className="flex justify-between mb-4">
        <div>
           <div className="text-xs text-gray-400 font-bold mb-1">資產總覽 ({user.level})</div>
           <div className="text-3xl font-black text-gray-800">{formatCurrency(98000)}</div>
        </div>
        <Badge label="穩定收益中" color="green" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-3 rounded-xl"><div className="text-[10px] text-gray-400">本月收益</div><div className="font-bold text-primary text-lg">+1,650</div></div>
        <div className="bg-gray-50 p-3 rounded-xl"><div className="text-[10px] text-gray-400">分潤比例</div><div className="font-bold text-gray-800 text-lg">3.5%</div></div>
      </div>
    </Card>
  </div>
);

const PromoterDashboard = ({ user }: { user: User }) => (
  <div className="space-y-6">
    <div className="bg-gray-900 rounded-[2rem] p-6 text-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-gray-400 text-xs mb-1">預估推廣獎金 ({user.level})</div>
          <div className="text-3xl font-bold">{formatCurrency(28500)}</div>
        </div>
        <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-[10px] font-bold">L2 領袖等級</div>
      </div>
      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden"><div className="bg-primary h-full" style={{width: '65%'}}></div></div>
    </div>
    <div className="grid grid-cols-2 gap-4">
       <Card className="flex flex-col items-center gap-2"><Users className="text-primary"/><span className="text-xs font-bold">我的團隊</span></Card>
       <Card className="flex flex-col items-center gap-2"><Gift className="text-emerald-500"/><span className="text-xs font-bold">領取獎勵</span></Card>
    </div>
  </div>
);

const TeacherDashboard = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white"><div className="text-xs text-gray-400">總學員</div><div className="text-2xl font-black mt-1">1,208</div></Card>
        <Card className="bg-white"><div className="text-xs text-gray-400">課程評分</div><div className="text-2xl font-black text-amber-500 mt-1">4.9</div></Card>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-gray-800 px-1">快速功能</h3>
        <Button className="w-full h-14 rounded-2xl" onClick={() => navigate('/teacher/studio')}>
          <PenTool className="w-5 h-5 mr-2"/> 進入內容管理工作台
        </Button>
        <Button variant="outline" className="w-full h-14 rounded-2xl" onClick={() => navigate('/teacher/edit/new')}>
          <Plus className="w-5 h-5 mr-2"/> 快速新增課程
        </Button>
      </div>
    </div>
  );
};

export const CourseList = () => <div className="p-4">課程列表 (建設中)</div>;
export const CourseDetail = () => <div className="p-4">課程內容 (建設中)</div>;
