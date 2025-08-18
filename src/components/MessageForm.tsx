import React, { useState, useRef } from 'react';
import { addMessage, uploadVoiceNote } from '../lib/database';
import type { Message } from '../lib/database';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle, FaMicrophone, FaStop, FaPlay } from 'react-icons/fa';

const MessageForm: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [messageType, setMessageType] = useState<'text' | 'voicenote'>('text');

  // Voice note state
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'stopped'>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecordingStatus('recording');
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (err) {
      console.error("Failed to get microphone access:", err);
      setError("Microphone access is required to record a voice note.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecordingStatus('stopped');
    }
  };

  const resetRecording = () => {
    setRecordingStatus('idle');
    setAudioBlob(null);
    setAudioUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (messageType === 'text' && !message.trim()) {
      setError('Please write a message.');
      return;
    }
    if (messageType === 'voicenote' && !audioBlob) {
      setError('Please record a voice note.');
      return;
    }

    setError(null);
    setSubmitting(true);
    setSuccess(false);

    try {
      let voiceNoteUrl: string | undefined = undefined;
      if (messageType === 'voicenote' && audioBlob) {
        voiceNoteUrl = await uploadVoiceNote(audioBlob, name);
        if (!voiceNoteUrl) {
          throw new Error('Failed to upload voice note.');
        }
      }

      const newMessage: Omit<Message, 'id' | 'created_at'> = {
        name: name.trim(),
        message: messageType === 'text' ? message.trim() : '[Voice Note]',
        is_public: isPublic,
        message_type: messageType,
        voicenote_url: voiceNoteUrl,
      };

      const result = await addMessage(newMessage);
      if (result) {
        setSuccess(true);
        setName('');
        setMessage('');
        resetRecording();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error('Supabase returned null while adding the message.');
      }
    } catch (err: any) {
      console.error("Error submitting message:", err);
      setError(err.message || 'There was an error submitting your message. Please try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface p-8 rounded-lg shadow-lg" data-aos="fade-left">
      <h2 className="text-3xl font-display text-text-primary text-center mb-6">Share a Message</h2>

      <div className="flex justify-center mb-6">
        <div className="bg-background p-1 rounded-full flex">
          <button onClick={() => setMessageType('text')} className={`px-4 py-1 rounded-full text-sm font-bold ${messageType === 'text' ? 'bg-primary text-white' : 'text-text-secondary'}`}>Text</button>
          <button onClick={() => setMessageType('voicenote')} className={`px-4 py-1 rounded-full text-sm font-bold ${messageType === 'voicenote' ? 'bg-primary text-white' : 'text-text-secondary'}`}>Voice Note</button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-text-secondary font-bold mb-2">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-background border border-accent rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Jane Smith"
            disabled={submitting}
          />
        </div>

        {messageType === 'text' ? (
          <div className="mb-4">
            <label htmlFor="message" className="block text-text-secondary font-bold mb-2">Your Message</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-background border border-accent rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Share a memory or a message of comfort..."
              disabled={submitting}
            ></textarea>
          </div>
        ) : (
          <div className="mb-4 text-center">
            <label className="block text-text-secondary font-bold mb-2">Record your voice note</label>
            {recordingStatus === 'idle' && (
              <button type="button" onClick={startRecording} className="bg-red-600 text-white rounded-full p-4 hover:bg-red-700 transition">
                <FaMicrophone size={24} />
              </button>
            )}
            {recordingStatus === 'recording' && (
              <button type="button" onClick={stopRecording} className="bg-red-600 text-white rounded-full p-4 animate-pulse">
                <FaStop size={24} />
              </button>
            )}
            {recordingStatus === 'stopped' && audioUrl && (
              <div className="space-y-4">
                <audio src={audioUrl} controls className="w-full" />
                <button type="button" onClick={resetRecording} className="text-sm text-text-secondary hover:text-primary">Record again</button>
              </div>
            )}
          </div>
        )}

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-5 w-5 text-primary bg-background border-accent rounded focus:ring-primary"
              disabled={submitting}
            />
            <span className="ml-2 text-text-secondary">Make this message public for others to see</span>
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center justify-center w-full disabled:bg-gray-400"
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
        <div className="mt-4 text-center text-primary flex items-center justify-center">
          <FaCheckCircle className="mr-2" /> Thank you for your heartfelt message.
        </div>
      )}
      {error && (
        <div className="mt-4 text-center text-red-600 flex items-center justify-center">
          <FaExclamationCircle className="mr-2" /> {error}
        </div>
      )}
    </div>
  );
};

export default MessageForm;
