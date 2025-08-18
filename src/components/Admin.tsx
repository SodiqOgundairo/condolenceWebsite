import React, { useEffect, useState } from 'react';
import type { Message } from '../lib/database';
import { FaSpinner } from 'react-icons/fa';

const Admin: React.FC<{ onNavigateBack: () => void }> = ({ onNavigateBack }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'edameg') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/get-all-messages', {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_MESSAGES_SECRET_KEY}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }
          const data = await response.json();
          setMessages(data.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
          setError("Could not load messages.");
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-surface p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-display font-bold text-center text-text-primary mb-2">Admin Login</h1>
            <p className="text-center text-text-secondary mb-6">Welcome, Fe</p>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                <label className="block text-text-secondary mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value="Fe"
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-text-secondary cursor-not-allowed"
                />
                </div>
                <div className="mb-6">
                <label className="block text-text-secondary mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                </div>
                <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
                >
                Login
                </button>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
            </div>
            <button onClick={onNavigateBack} className="text-sm text-text-secondary hover:text-primary mt-4 block w-full text-center">
                &larr; Back to main site
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary">All Messages</h1>
            <button onClick={onNavigateBack} className="text-sm text-primary hover:underline">
                &larr; Back to main site
            </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <FaSpinner className="animate-spin text-4xl text-text-secondary mx-auto" />
            <p className="mt-4 text-text-secondary">Loading messages...</p>
          </div>
        ) : (
          <div className="bg-surface rounded-lg shadow-md">
            <ul className="divide-y divide-gray-200">
              {messages.map((msg) => (
                <li key={msg.id} className="p-4 md:p-6">
                  <div className="flex justify-between items-start">
                    <div className='max-w-full'>
                        {msg.message_type === 'voicenote' && msg.voicenote_url ? (
                          <audio controls src={msg.voicenote_url} className="w-full" />
                        ) : (
                          <p className="text-text-primary whitespace-pre-wrap break-words">{msg.message}</p>
                        )}
                        <p className="text-sm text-text-secondary mt-2">- {msg.name}</p>
                    </div>
                    <span
                      className={`ml-2 flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full ${
                        msg.is_public
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {msg.is_public ? 'Public' : 'Private'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
