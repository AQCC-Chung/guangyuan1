import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MobileLayout } from './components/Layout';
import { Landing, Login } from './screens/Auth';
import { Dashboard, CourseList, CourseDetail } from './screens/Core';
import { Passbook, Rewards, Referral } from './screens/Assets';
import { Shop, Orders } from './screens/Commerce';
import { AdminDashboard } from './screens/Admin';
import { UserRole } from './types';

const App: React.FC = () => {
  // Simple State for Demo
  const [role, setRole] = useState<UserRole | null>(null);
  const [hasVisitedLanding, setHasVisitedLanding] = useState(false);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
    setHasVisitedLanding(false); // Reset to landing for demo purposes
  };

  if (!hasVisitedLanding) {
    return <Landing onStart={() => setHasVisitedLanding(true)} />;
  }

  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <MobileLayout title={getPageTitle()} role={role} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard role={role} />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
          
          {/* Role Protected Routes (Simple Client Side Check) */}
          <Route path="/passbook" element={role === UserRole.INVESTOR || role === UserRole.ADMIN ? <Passbook /> : <Navigate to="/" />} />
          <Route path="/rewards" element={role === UserRole.PROMOTER || role === UserRole.ADMIN ? <Rewards /> : <Navigate to="/" />} />
          <Route path="/referral" element={role === UserRole.PROMOTER || role === UserRole.ADMIN ? <Referral /> : <Navigate to="/" />} />
          <Route path="/admin" element={role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/" />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MobileLayout>
    </Router>
  );
};

// Helper to update header title based on rough path
function getPageTitle() {
  const hash = window.location.hash;
  if (hash.includes('courses')) return '共學課程';
  if (hash.includes('shop')) return '共生商城';
  if (hash.includes('orders')) return '我的訂單';
  if (hash.includes('passbook')) return '數位存摺';
  if (hash.includes('rewards')) return '獎金透明';
  if (hash.includes('referral')) return '推廣中心';
  if (hash.includes('admin')) return '管理後台';
  return '首頁';
}

export default App;
