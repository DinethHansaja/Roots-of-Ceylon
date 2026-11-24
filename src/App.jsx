import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { StorefrontPage } from './pages/StorefrontPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function AppShell() {
  const { activeView } = useStore();

  return (
    <div className="flex min-h-screen flex-col bg-[#1A1919] text-[#F5F2EB]">
      <Navbar />
      <main className="flex-1">
        {activeView === 'dashboard' ? <AdminDashboardPage /> : <StorefrontPage />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
