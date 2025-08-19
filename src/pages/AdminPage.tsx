import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { Message } from '../lib/database';
import { FaSpinner } from 'react-icons/fa';

const AdminPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
    })
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to login.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const accessToken = session.access_token;
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-all-messages`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch messages');
          }
          const data = await response.json();
          setMessages(data.messages);
        } catch (err: any) {
          console.error("Error fetching messages:", err);
          setError(err.message || "Could not load messages.");
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    }
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-surface p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-display text-text-primary text-center mb-6">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-text-secondary mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-background border-accent text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  required
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
                  className="w-full px-4 py-2 border rounded-lg bg-background border-accent text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-600 text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Login'}
              </button>
              {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </form>
          </div>
          <Link to="/" className="text-sm text-text-secondary hover:text-primary mt-4 block w-full text-center">
            &larr; Back to main site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-display text-text-primary">All Messages</h1>
            <button
                onClick={() => supabase.auth.signOut()}
                className="text-sm text-primary hover:underline"
            >
                Logout
            </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <FaSpinner className="animate-spin text-4xl text-secondary mx-auto" />
            <p className="mt-4 text-text-secondary">Loading messages...</p>
          </div>
        ) : (
          <div className="bg-surface rounded-lg shadow-md">
            <ul className="divide-y divide-accent">
              {messages.map((msg) => (
                <li key={msg.id} className="p-4 md:p-6">
                  <div className="flex justify-between items-start">
                    <div className='max-w-full'>
                        {msg.message_type === 'voicenote' && msg.voicenote_url ? (
                            <audio src={msg.voicenote_url} controls className="w-full" />
                        ) : (
                            <p className="text-text-secondary whitespace-pre-wrap break-words">{msg.message}</p>
                        )}
                        <p className="text-sm text-text-primary font-bold mt-2">- {msg.name}</p>
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

export default AdminPage;
