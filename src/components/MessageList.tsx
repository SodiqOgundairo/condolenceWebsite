import React, { useEffect, useState } from 'react';
import { getPublicMessages } from '../lib/database';
import type { Message } from '../lib/database';
import { FaCommentDots } from 'react-icons/fa';

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const publicMessages = await getPublicMessages();
      setMessages(publicMessages);
      setLoading(false);
    };

    fetchMessages();


    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <FaCommentDots className="animate-pulse text-4xl text-gray-400 mx-auto" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-dark-bg" data-aos="fade-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-display font-bold text-center text-light-text mb-12">Messages of Comfort</h2>
        {messages.length === 0 ? (
          <p className="text-center text-muted-text">Be the first to share a message.</p>
        ) : (
          <div className="space-y-8">
            {messages.map((msg) => (
              <article key={msg.id} className="bg-dark-card p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-primary/20" data-aos="fade-up">
                <p className="text-light-text text-lg whitespace-pre-wrap">{msg.message}</p>
                <p className="text-right text-muted-text mt-4">- {msg.name}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MessageList;
