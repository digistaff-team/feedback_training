import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Evaluate } from './pages/Evaluate';
import { Analysis } from './pages/Analysis';
import { Planning } from './pages/Planning';
import { Discussion } from './pages/Discussion';
import { Theory } from './pages/Theory';
import { AICoach } from './components/AICoach';
import { AppRoute } from './types';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (Object.values(AppRoute).includes(hash as AppRoute)) {
        setCurrentRoute(hash as AppRoute);
      } else {
        setCurrentRoute(AppRoute.HOME);
      }
      setIsMobileMenuOpen(false); // Close menu on external hash change
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

    // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  const navigate = (route: AppRoute) => {
    window.location.hash = route;
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: AppRoute.HOME, label: 'Главная' },
    { id: AppRoute.EVALUATE, label: '1. Ситуация' },
    { id: AppRoute.ANALYZE, label: '2. Действия' },
    { id: AppRoute.PLANNING, label: '3. Причины' },
    { id: AppRoute.DISCUSSION, label: '4. Диалог' },
    { id: AppRoute.THEORY, label: 'Теория' },
  ];

  // Пункты меню для мобильной версии с добавлением "Теория"
  const mobileNavItems = [
    { id: AppRoute.HOME, label: 'Главная' },
    { id: AppRoute.EVALUATE, label: '1. Ситуация' },
    { id: AppRoute.ANALYZE, label: '2. Действия' },
    { id: AppRoute.PLANNING, label: '3. Причины' },
    { id: AppRoute.DISCUSSION, label: '4. Диалог' },
    { id: AppRoute.THEORY, label: 'Теория' },
  ];

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <Home onStart={() => navigate(AppRoute.EVALUATE)} />;
      case AppRoute.EVALUATE:
        return <Evaluate />;
      case AppRoute.ANALYZE:
        return <Analysis />;
      case AppRoute.PLANNING:
        return <Planning />;
      case AppRoute.DISCUSSION:
        return <Discussion />;
      case AppRoute.THEORY:
        return <Theory />;
      default:
        return <Home onStart={() => navigate(AppRoute.EVALUATE)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex w-full justify-between sm:w-auto sm:justify-start">
              <div className="flex-shrink-0 flex items-center cursor-pointer gap-3" onClick={() => navigate(AppRoute.HOME)}>
                <img 
                  src="https://i.ibb.co/VYn2JXwF/100-100.png" 
                  alt="Логотип" 
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <span className="font-bold text-lg text-gray-800 tracking-tight">
                  Мастерство управления
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`
                      inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors
                      ${currentRoute === item.id 
                        ? 'border-primary-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                    `}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

               {/* Mobile Menu Button */}
              <div className="flex items-center sm:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop for closing menu on click outside */}
            <div 
              className="fixed inset-0 bg-transparent z-40 sm:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <div className="sm:hidden bg-white border-b border-l border-gray-200 shadow-xl absolute w-1/2 right-0 z-50 animate-fade-in rounded-bl-xl">
              <div className="py-2 space-y-1">
                {mobileNavItems.map((item, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    onClick={() => navigate(item.id)}
                    className={`
                      block w-full text-right pr-6 pl-2 py-2.5 border-r-4 text-sm font-medium transition-colors
                      ${currentRoute === item.id
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'}
                    `}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {renderContent()}
      </main>

      {/* AI Coach Overlay - Positioned on border */}
      <div className="max-w-7xl w-full mx-auto relative z-50 pointer-events-none">
        <div className="absolute right-2 sm:right-4 lg:right-4 top-12 transform -translate-y-1/2 pointer-events-auto">
          <AICoach />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-indigo-800">
          <p>
            &copy; {new Date().getFullYear()} <a href="https://t.me/+aRkZGsApP0dmNTZi" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">Мастерство управления</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
