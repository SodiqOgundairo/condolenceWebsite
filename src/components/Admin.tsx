import React, { useEffect, useState } from 'react';
import { getAllMessages } from '../lib/database';
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
        const allMessages = await getAllMessages();
        setMessages(allMessages);
        setLoading(false);
      };
      fetchMessages();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
            <p className="text-center text-gray-500 mb-6">Welcome, Fe</p>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value="Fe"
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                Login
                </button>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
            </div>
            <button onClick={onNavigateBack} className="text-sm text-gray-600 hover:underline mt-4 block w-full text-center">
                &larr; Back to main site
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">All Messages</h1>
            <button onClick={onNavigateBack} className="text-sm text-blue-500 hover:underline">
                &larr; Back to main site
            </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <FaSpinner className="animate-spin text-4xl text-gray-400 mx-auto" />
            <p className="mt-4 text-gray-500">Loading messages...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <ul className="divide-y divide-gray-200">
              {messages.map((msg) => (
                <li key={msg.id} className="p-4 md:p-6">
                  <div className="flex justify-between items-start">
                    <div className='max-w-full'>
                        <p className="text-gray-800 whitespace-pre-wrap break-words">{msg.message}</p>
                        <p className="text-sm text-gray-500 mt-2">- {msg.name}</p>
                    </div>
                    <span
                      className={`ml-2 flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full ${
                        msg.is_public
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
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
