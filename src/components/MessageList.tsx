import React, { useEffect, useState } from 'react';
import { getPublicMessages } from '../lib/database';
import type { Message } from '../lib/database';
import { FaCommentDots, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const messagesPerPage = 3;

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

  if (loading) {
    return (
      <div className="text-center py-20">
        <FaCommentDots className="animate-pulse text-4xl text-gray-400 mx-auto" />
        <p className="mt-4 text-text-secondary">Loading messages...</p>
      </div>
    );
  }

  return (
    <section id="messages" className="py-16 mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {currentMessages.map((msg) => (
                <article
                  key={msg.id}
                  className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
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
                    <div>
                      <p className="text-text-primary text-base leading-relaxed whitespace-pre-wrap">
                        {(() => {
                          const full = msg.message || '';
                          const isOpen = !!expanded[msg.id ?? ''];
                          const limit = 220;
                          const truncated = full.length > limit ? full.slice(0, limit).trimEnd() + '…' : full;
                          return isOpen ? full : truncated;
                        })()}
                      </p>
                      {(msg.message?.length ?? 0) > 220 && (
                        <button
                          type="button"
                          onClick={() => setExpanded((s) => ({ ...s, [msg.id!]: !s[msg.id!] }))}
                          className="mt-3 text-sm text-primary hover:underline"
                        >
                          {expanded[msg.id ?? ''] ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  )}
                  <p className="text-right text-sm text-text-secondary mt-6 font-medium">
                    — {msg.name}
                  </p>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                {/* Previous Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors border border-border ${
                    currentPage === 1
                      ? 'text-text-secondary/60 cursor-not-allowed'
                      : 'text-text-secondary hover:bg-secondary'
                  }`}
                >
                  <FaChevronLeft className="w-3 h-3 mr-1" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        currentPage === pageNum ? 'bg-primary' : 'bg-border hover:bg-text-secondary/40'
                      }`}
                    >
                      <span className="sr-only">Go to page {pageNum}</span>
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors border border-border ${
                    currentPage === totalPages
                      ? 'text-text-secondary/60 cursor-not-allowed'
                      : 'text-text-secondary hover:bg-secondary'
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
  );
};

export default MessageList;
