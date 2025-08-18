import { useState, useEffect } from 'react';
import Admin from './components/Admin';
import Footer from './components/Footer';
// import Hero from './components/Hero';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';

function App() {
  const [view, setView] = useState<'main' | 'admin'>('main');

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === '/admin') {
        setView('admin');
      } else {
        setView('main');
      }
    };

    handleLocationChange(); // Check on initial load
    window.addEventListener('popstate', handleLocationChange); // Check on back/forward

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateToMain = () => {
    window.history.pushState({}, '', '/');
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  if (view === 'admin') {
    return <Admin onNavigateBack={navigateToMain} />;
  }

  return (
    <div className="bg-background font-sans text-text-primary min-h-screen">
      <main>
        {/* <div className="flex justify-center items-center">
        <Hero  /> */}
        <MessageForm />
        {/* </div> */}
        <MessageList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
