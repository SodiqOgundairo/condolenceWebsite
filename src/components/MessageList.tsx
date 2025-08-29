import React, { useEffect, useState } from 'react';
import { getPublicMessages } from '../lib/database';
import type { Message } from '../lib/database';
import { FaCommentDots, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const messagesPerPage = 6;

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

  // Calculate pagination values
  const totalPages = Math.ceil(messages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const currentMessages = messages.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Message display helpers
  const getPreviewText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const openMessageModal = (message: Message) => {
    setSelectedMessage(message);
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMessageModal();
      }
    };

    if (selectedMessage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedMessage]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <FaCommentDots className="animate-pulse text-4xl text-gray-400 mx-auto" />
        <p className="mt-4 text-text-secondary">Loading messages...</p>
      </div>
    );
  }

  return (
    <>
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
            <>
              {/* Messages Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {currentMessages.map((msg) => (
                  <article
                    key={msg.id}
                    className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-48 flex flex-col"
                    data-aos="fade-up"
                  >
                    {msg.message_type === 'voicenote' && msg.voicenote_url ? (
                      <div className="flex flex-col items-center flex-1">
                        <audio
                          controls
                          src={msg.voicenote_url}
                          className="w-full rounded-md border border-border"
                        />
                        <p className="mt-4 text-sm text-text-secondary italic text-center">
                          Voice note from {msg.name}
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col">
                        <p className="text-text-primary text-base leading-relaxed whitespace-pre-wrap flex-1 overflow-hidden text-ellipsis">
                          {getPreviewText(msg.message)}
                        </p>
                        {msg.message.length > 150 && (
                          <button
                            onClick={() => openMessageModal(msg)}
                            className="text-gray-600 hover:text-gray-800 text-sm font-medium mt-2 self-start underline flex-shrink-0"
                          >
                            See more
                          </button>
                        )}
                      </div>
                    )}
                    <p className="text-right text-sm text-text-secondary mt-4 font-medium flex-shrink-0">
                      — {msg.name}
                    </p>
                  </article>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  {/* Previous Button */}
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <FaChevronLeft className="w-3 h-3 mr-1" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Next
                    <FaChevronRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              )}

              {/* Page Info */}
              {totalPages > 1 && (
                <p className="text-center text-sm text-text-secondary mt-4">
                  Showing {startIndex + 1}-{Math.min(endIndex, messages.length)} of {messages.length} messages
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Message from {selectedMessage.name}</h3>
              <button
                onClick={closeMessageModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {selectedMessage.message_type === 'voicenote' && selectedMessage.voicenote_url ? (
                <div className="flex flex-col items-center">
                  <audio
                    controls
                    src={selectedMessage.voicenote_url}
                    className="w-full rounded-md border border-gray-200"
                  />
                  <p className="mt-4 text-sm text-gray-600 italic">
                    Voice note from {selectedMessage.name}
                  </p>
                </div>
              ) : (
                <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-6">
              <p className="text-right text-sm text-gray-600 font-medium">
                — {selectedMessage.name}
              </p>
              <p className="text-right text-xs text-gray-400 mt-1">
                {selectedMessage.created_at ? new Date(selectedMessage.created_at).toLocaleDateString() : ''}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageList;