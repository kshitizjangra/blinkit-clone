import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from './ui/Toaster';
import CategoryNav from './CategoryNav';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isHomePage && <CategoryNav />}
      <main className="flex-grow pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;