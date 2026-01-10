import React from 'react';
import { Card, Button, Badge, Skeleton, formatCurrency, ProgressRing } from '../components/UI';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, Award, Flame, Zap, ChevronRight, Bookmark, FileText, ShoppingBag, MapPin, Store, TrendingUp, Users, PenTool, BarChart3, Edit, Settings, Gift } from 'lucide-react';
import { AdminDashboard } from './Admin';

// --- MAIN WRAPPER ---
export const Dashboard: React.FC<{ role: UserRole }> = ({ role }) => {
  if (role === UserRole.MEMBER) return <MemberDashboard />;
  if (role === UserRole.INVESTOR) return <InvestorDashboard />;
  if (role === UserRole.PROMOTER) return <PromoterDashboard />;
  if (role === UserRole.TEACHER) return <TeacherDashboard />;
  if (role === UserRole.ADMIN) return <AdminDashboard />;
  return <MemberDashboard />; // Default
};

// -------------------------------------------
// 1. MEMBER DASHBOARD (學員：學習 -> 消費)
// -------------------------------------------
const MemberDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Welcome Banner - Focus on Learning */}
      <div className="bg-gradient-to-r from-[#2C3E50] to-[#4CA1AF] rounded-container p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <div className="bg-white/20 p-1 rounded text-xs font-bold px-2">廣緣共學</div>
             <div className="text-white/60 text-xs">Online University</div>
          </div>
          <h2 className="text-2xl font-bold mb-4 leading-snug">知識是最好的引流<br/>智慧是最大的財富</h2>
          <div className="flex items-center gap-2">
             <Badge label="連續學習 12 天" color="amber" />
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div>
         <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-lg">繼續學習</h3>
          <button className="text-primary text-sm" onClick={() => navigate('/courses')}>全部課程</button>
        </div>
        <div className="bg-white p-4 rounded-card shadow-soft flex gap-4 items-center cursor-pointer" onClick={() => navigate('/courses/1')}>
            <div className="w-16 h-16 bg-gray-200 rounded-lg relative overflow-hidden shrink-0">
               <img src="https://picsum.photos/100/100?random=1" className="w-full h-full object-cover" />
               <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <PlayCircle className="w-8 h-8 text-white/90" />
               </div>
            </div>
            <div className="flex-1">
               <div className="text-xs text-primary font-bold mb-1">上次看到 12:30</div>
               <h4 className="font-bold text-gray-800 text-sm line-clamp-1">水與生命：量子科技的健康革命</h4>
               <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
               </div>
            </div>
        </div>
      </div>

      {/* Conversion: Product Recommendation */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
         <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">💧</div>
            <div className="flex-1">
               <div className="font-bold text-gray-800">體驗量子好水</div>
               <div className="text-xs text-gray-500">課程學員獨享，免費預約線下試飲</div>
            </div>
            <Button size="sm" onClick={() => navigate('/shop')}>去預約</Button>
         </div>
      </Card>
    </div>
  );
};

// -------------------------------------------
// 2. INVESTOR DASHBOARD (投資人：資金 -> 收益)
// -------------------------------------------
const InvestorDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Asset Overview Card */}
      <Card className="relative overflow-hidden bg-white border-t-4 border-primary pt-6 pb-8">
         <div className="flex justify-between items-start mb-6">
            <div>
               <h2 className="text-gray-500 text-xs font-bold tracking-wider">總資產價值</h2>
               <div className="text-3xl font-bold text-gray-800 mt-1">{formatCurrency(98000)}</div>
            </div>
            <Badge label="合約履行中" color="green" />
         </div>
         
         <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 rounded-xl p-3">
                 <div className="text-[10px] text-gray-400 mb-1">本月代租收益</div>
                 <div className="text-lg font-bold text-primary">{formatCurrency(1650)}</div>
                 <div className="text-[10px] text-gray-400 mt-1">固定撥款</div>
             </div>
             <div className="bg-amber-50 rounded-xl p-3">
                 <div className="text-[10px] text-amber-700 mb-1">增額紅利 (3%)</div>
                 <div className="text-lg font-bold text-amber-600">{formatCurrency(1240)}</div>
                 <div className="text-[10px] text-amber-700 mt-1">來自店家營收</div>
             </div>
         </div>
      </Card>

      {/* Quick Action to Full Passbook */}
      <div 
        onClick={() => navigate('/passbook')}
        className="bg-white p-4 rounded-card shadow-soft flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
      >
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
               <BarChart3 className="w-5 h-5" />
            </div>
            <div>
               <div className="font-bold text-gray-800">查看數位存摺</div>
               <div className="text-xs text-gray-400">詳細撥款紀錄與合約進度</div>
            </div>
         </div>
         <ChevronRight className="w-5 h-5 text-gray-300" />
      </div>

       {/* Support Shop */}
       <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-card border border-emerald-100">
          <h3 className="font-bold text-emerald-800 mb-2 text-sm">支持您的共生店家</h3>
          <p className="text-xs text-emerald-600 mb-3">您的設備目前安裝於 <span className="font-bold">台中西屯加盟店</span>，購買該店商品可協助提升您的紅利收益。</p>
          <Button size="sm" variant="secondary" onClick={() => navigate('/shop')} className="w-full">前往商城支持</Button>
       </div>
    </div>
  );
};

// -------------------------------------------
// 3. PROMOTER DASHBOARD (推廣夥伴：圈粉 -> 利潤)
// -------------------------------------------
const PromoterDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Performance Card - The "Harvest" */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-container p-6 text-white shadow-xl">
         <div className="flex justify-between items-center mb-6">
            <div>
               <div className="text-gray-400 text-xs">本月預估獎金</div>
               <div className="text-3xl font-bold mt-1">{formatCurrency(28500)}</div>
            </div>
            <div className="text-right">
               <div className="text-emerald-400 text-xs font-bold">目前階梯 30%</div>
               <div className="text-gray-500 text-[10px]">下一階梯 35% (差 4 台)</div>
            </div>
         </div>
         
         {/* Progress Bar for Tier */}
         <div className="mb-2">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
               <span>已售 7 台</span>
               <span>目標 11 台</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
               <div className="bg-gradient-to-r from-primary to-amber-400 h-full rounded-full" style={{ width: '63%' }}></div>
            </div>
         </div>
      </div>

      {/* Quick Actions - The "Farming Tools" */}
      <div className="grid grid-cols-2 gap-3">
         <div onClick={() => navigate('/referral')} className="bg-white p-4 rounded-card shadow-soft flex flex-col items-center justify-center gap-2 cursor-pointer active:bg-gray-50">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
               <Users className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 text-sm">推廣圈粉</span>
            <span className="text-[10px] text-gray-400">專屬 QR Code</span>
         </div>
         <div onClick={() => navigate('/rewards')} className="bg-white p-4 rounded-card shadow-soft flex flex-col items-center justify-center gap-2 cursor-pointer active:bg-gray-50">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
               <Gift className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 text-sm">獎金明細</span>
            <span className="text-[10px] text-gray-400">查看兩代分潤</span>
         </div>
      </div>

      {/* Team Insights */}
      <div>
         <h3 className="font-bold text-gray-800 mb-3 px-1">團隊動態</h3>
         <div className="bg-white p-4 rounded-card border-l-4 border-blue-500 shadow-sm">
            <div className="flex justify-between items-start">
               <div>
                  <div className="font-bold text-gray-800 text-sm">王阿姨 (第二代)</div>
                  <div className="text-xs text-gray-500 mt-1">剛剛成交 1 台量子水機</div>
               </div>
               <div className="text-right">
                  <div className="text-emerald-600 font-bold text-sm">+ NT$ 3,500</div>
                  <div className="text-[10px] text-gray-400">輔導獎金</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// -------------------------------------------
// 4. TEACHER DASHBOARD (講師：課程 -> 引流)
// -------------------------------------------
const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
       {/* Impact Stats */}
       <div className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col gap-2">
             <div className="text-xs text-gray-400">累積學員</div>
             <div className="text-2xl font-bold text-gray-800">1,208 人</div>
             <div className="text-[10px] text-emerald-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +12 本週
             </div>
          </Card>
          <Card className="flex flex-col gap-2">
             <div className="text-xs text-gray-400">內容引流轉化</div>
             <div className="text-2xl font-bold text-primary">8.5%</div>
             <div className="text-[10px] text-gray-400">點擊商品率</div>
          </Card>
       </div>

       {/* Course Management (Lite) */}
       <div>
          <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-gray-800 text-lg">我的課程庫</h3>
             <Button size="sm" className="h-8 text-xs px-3">+ 新增課程</Button>
          </div>
          <div className="space-y-3">
             <CourseEditCard title="水與生命：量子科技的健康革命" students={350} status="已上架" />
             <CourseEditCard title="日常經絡保養實務" students={120} status="審核中" />
          </div>
       </div>

       {/* Product Management (Lite) */}
       <div>
          <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-gray-800 text-lg">關聯商品管理</h3>
             <span className="text-xs text-gray-400">可編輯商品資訊</span>
          </div>
          <Card className="flex items-center gap-3">
             <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                <img src="https://picsum.photos/100/100?random=20" className="w-full h-full object-cover" />
             </div>
             <div className="flex-1">
                <div className="font-bold text-gray-800 text-sm">量子科技全戶型用水系統</div>
                <div className="text-xs text-gray-500">庫存: 充足 | 廠商直送</div>
             </div>
             <Button variant="ghost" size="sm" className="p-2 h-auto"><Edit className="w-4 h-4" /></Button>
          </Card>
       </div>
    </div>
  );
};

const CourseEditCard = ({ title, students, status }: any) => (
   <div className="bg-white p-3 rounded-card shadow-soft flex justify-between items-center">
      <div className="flex items-center gap-3">
         <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
            <PlayCircle className="w-6 h-6 text-gray-500" />
         </div>
         <div>
            <div className="font-bold text-gray-800 text-sm line-clamp-1">{title}</div>
            <div className="text-xs text-gray-500">{students} 位學員</div>
         </div>
      </div>
      <div className="flex flex-col items-end gap-1">
         <Badge label={status} color={status === '已上架' ? 'green' : 'amber'} />
         <button className="text-xs text-gray-400 underline mt-1">編輯</button>
      </div>
   </div>
);


// --- Shared Components for Reusability ---

export const CourseList: React.FC = () => {
  const navigate = useNavigate();
  const courses = [
    { id: '1', title: '水與生命：量子科技的健康革命', category: '營養學', duration: '1h 30m', level: '初階', image: 'https://picsum.photos/400/250?random=1' },
    { id: '2', title: '十二經絡與日常保養', category: '經絡', duration: '2h 15m', level: '中階', image: 'https://picsum.photos/400/250?random=2' },
    { id: '3', title: '正念冥想：找回內心的平靜', category: '身心靈', duration: '45m', level: '初階', image: 'https://picsum.photos/400/250?random=3' },
    { id: '4', title: '基督教靈修導引', category: '宗教', duration: '1h 00m', level: '初階', image: 'https://picsum.photos/400/250?random=4' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['全部', '營養學', '經絡', '身心靈', '宗教'].map((tag, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium ${i === 0 ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-4 pb-20">
        {courses.map(course => (
          <CourseCard 
            key={course.id}
            {...course}
            onClick={() => navigate(`/courses/${course.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

const CourseCard = ({ title, category, duration, level, image, onClick }: any) => (
  <div onClick={onClick} className="bg-white rounded-card overflow-hidden shadow-soft cursor-pointer active:opacity-90 transition-opacity">
    <div className="relative h-40 bg-gray-200">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
        {duration}
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold text-primary bg-amber-50 px-2 py-0.5 rounded">{category}</span>
        <div className="flex gap-1">
          <Badge label={level} color="gray" />
        </div>
      </div>
      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
      <div className="flex items-center text-xs text-gray-400 gap-4">
        <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500" /> 350人已學</span>
        <span className="flex items-center gap-1"><Award className="w-3 h-3 text-emerald-500" /> 專業認證</span>
      </div>
    </div>
  </div>
);

// --- Course Detail ---
export const CourseDetail: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('about');
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Video Placeholder */}
      <div className="rounded-xl overflow-hidden bg-black aspect-video relative flex items-center justify-center group shadow-lg">
        <img src="https://picsum.photos/400/250?random=1" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <PlayCircle className="w-16 h-16 text-white/90 relative z-10 group-hover:scale-110 transition-transform cursor-pointer" />
      </div>

      <div className="bg-white rounded-container p-5 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-2">水與生命：量子科技的健康革命</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 1h 30m</span>
          <span>•</span>
          <span>營養學</span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-4">
          {['關於課程', '章節列表', '體驗預約'].map((tab) => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium relative ${activeTab === tab ? 'text-primary' : 'text-gray-500'}`}
             >
               {tab}
               {activeTab === tab && (
                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
               )}
             </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-[fadeIn_0.3s_ease-out]">
            {activeTab === '關於課程' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800">課程重點</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-1">
                    <li>人體水分的奧秘與量子效應</li>
                    <li>如何選擇對身體有益的好水</li>
                    <li>居家飲用水系統的選擇標準</li>
                  </ul>
                </div>
                
                <div className="pt-2">
                  <h3 className="font-bold text-gray-800 mb-3">講師介紹</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      <img src="https://picsum.photos/100/100?random=15" alt="Avatar" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">張博士</div>
                      <div className="text-xs text-gray-500">營養學專家 / 水資源研究員</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* The "Conversion" Tab - Online to Offline Strategy */}
            {activeTab === '體驗預約' && (
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                   <h3 className="text-lg font-bold mb-2">免費預約量子水體驗</h3>
                   <p className="text-sm text-white/90 mb-4">
                     聽完課程想親自體驗好水的口感嗎？<br/>
                     立即預約離您最近的服務據點。
                   </p>
                   <Button size="sm" className="w-full bg-white text-indigo-600 hover:bg-gray-100 shadow-sm border-none">
                      <MapPin className="w-4 h-4 mr-1" /> 尋找附近店家
                   </Button>
                </div>

                <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-4 mt-2">
                   <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img src="https://picsum.photos/100/100?random=20" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1">
                      <Badge label="學員獨享" color="amber" />
                      <h4 className="font-bold text-gray-800 text-sm mt-1">量子科技全戶型用水系統</h4>
                      <div className="text-xs text-gray-500 mt-1">搭配課程購買享專屬優惠</div>
                      <button 
                        onClick={() => navigate('/shop')}
                        className="mt-3 text-xs text-primary font-bold flex items-center gap-1 hover:underline"
                      >
                         前往商城查看 <ChevronRight className="w-3 h-3" />
                      </button>
                   </div>
                </div>
              </div>
            )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-safe z-30">
        <Button size="lg" className="w-full">開始學習</Button>
      </div>
      <div className="h-20" /> {/* Spacer */}
    </div>
  );
};
