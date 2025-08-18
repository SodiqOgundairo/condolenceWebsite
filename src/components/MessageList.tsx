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

    const interval = setInterval(fetchMessages, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <FaCommentDots className="animate-pulse text-4xl text-gray-400 mx-auto" />
        <p className="mt-4 text-text-secondary">Loading messages...</p>
      </div>
    );
  }

  return (
<section className="py-16 mx-auto" data-aos="fade-up">
  <div className="container mx-auto px-4 max-w-6xl">
    <h2 className="text-3xl font-display font-bold text-center text-text-primary mb-12">
      Messages of Comfort
    </h2>
    {messages.length === 0 ? (
      <p className="text-center text-text-secondary">
        Be the first to share a message.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {messages.map((msg) => (
          <article
            key={msg.id}
            className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
            data-aos="fade-up"
          >
            {msg.message_type === 'voicenote' && msg.voicenote_url ? (
              <div className="flex flex-col items-center">
                <audio
                  controls
                  src={msg.voicenote_url}
                  className="w-full rounded-md border border-border"
                />
                <p className="mt-4 text-sm text-text-secondary italic">
                  Voice note from {msg.name}
                </p>
              </div>
            ) : (
              <p className="text-text-primary text-base leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            )}
            <p className="text-right text-sm text-text-secondary mt-6 font-medium">
              — {msg.name}
            </p>
          </article>
        ))}
      </div>
    )}
  </div>
</section>

  );
};

export default MessageList;
