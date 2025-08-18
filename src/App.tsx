import { useState } from 'react';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Hero from './components/Hero';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';

function App() {
  const [view, setView] = useState<'main' | 'admin'>('main');

  const navigateToAdmin = () => {
    // This will be triggered from the footer.
    // A simple way to switch views without a router.
    setView('admin');
  };

  const navigateToMain = () => {
    setView('main');
  }

  if (view === 'admin') {
    return <Admin onNavigateBack={navigateToMain} />;
  }

  return (
    <div className="bg-gray-50 font-sans text-gray-800">
      <main>
        <Hero />
        <MessageForm />
        <MessageList />
      </main>
      <Footer onAdminClick={navigateToAdmin} />
    </div>
  );
}

export default App;
