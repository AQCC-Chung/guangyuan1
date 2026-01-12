import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MobileLayout } from './components/Layout';
import { Landing, Login } from './screens/Auth';
import { Dashboard, CourseList, CourseDetail } from './screens/Core';
import { Passbook, Rewards, Referral } from './screens/Assets';
import { Shop, Orders } from './screens/Commerce';
import { AdminDashboard } from './screens/Admin';
import { TeacherStudio, CourseEditor } from './screens/TeacherStudio';
import { UserRole, User } from './types';
import { AuthService } from './services/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasVisitedLanding, setHasVisitedLanding] = useState(false);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setHasVisitedLanding(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setHasVisitedLanding(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setHasVisitedLanding(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">Loading...</div>;
  }

  if (!hasVisitedLanding && !user) {
    return <Landing onStart={() => setHasVisitedLanding(true)} />;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const role = user.role;

  return (
    <Router>
      <MobileLayout role={role} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard role={role} />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
          
          {/* Teacher Specific Routes */}
          <Route path="/teacher/studio" element={role === UserRole.TEACHER || role === UserRole.ADMIN ? <TeacherStudio /> : <Navigate to="/" />} />
          <Route path="/teacher/edit/:id" element={role === UserRole.TEACHER || role === UserRole.ADMIN ? <CourseEditor /> : <Navigate to="/" />} />

          {/* Role Protected Routes */}
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

export default App;