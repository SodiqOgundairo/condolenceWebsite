import React, { useState } from 'react';
import { addMessage } from '../lib/database';
import type { Message } from '../lib/database';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const MessageForm: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Please fill in your name and message.');
      return;
    }
    setError(null);
    setSubmitting(true);
    setSuccess(false);

    const newMessage: Omit<Message, 'id' | 'created_at' | 'voicenote_url'> = {
      name: name.trim(),
      message: message.trim(),
      is_public: isPublic,
      message_type: 'text',
    };

    try {
      const result = await addMessage(newMessage);
      setSubmitting(false);

      if (result) {
        setSuccess(true);
        setName('');
        setMessage('');
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error('Supabase returned null');
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      setSubmitting(false);
      setError('There was an error submitting your message. Please try again.');
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <section className="py-16 bg-dark-bg" data-aos="fade-up">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-display font-bold text-center text-light-text mb-8">Share a Message</h2>
        <div className="bg-dark-card p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-light-text font-bold mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Doe"
                disabled={submitting}
              />
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-light-text focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Share a memory or a message of comfort..."
                disabled={submitting}
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="h-5 w-5 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
                  disabled={submitting}
                />
                <span className="ml-2 text-light-text">Make this message public</span>
              </label>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-blue-500 transition duration-300 flex items-center justify-center w-full md:w-auto disabled:bg-gray-500"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Submit Message
                  </>
                )}
              </button>
            </div>
          </form>
          {success && (
            <div className="mt-4 text-center text-green-400 flex items-center justify-center">
              <FaCheckCircle className="mr-2" /> Thank you for your heartfelt message.
            </div>
          )}
          {error && (
            <div className="mt-4 text-center text-red-400 flex items-center justify-center">

              <FaExclamationCircle className="mr-2" /> {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MessageForm;
