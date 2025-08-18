import { supabase } from './supabaseClient';

export interface Message {
  id?: string;
  created_at?: string;
  name: string;
  message: string;
  is_public: boolean;
  message_type: 'text' | 'voicenote';
  voicenote_url?: string;
}

export const getPublicMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching public messages:', error);
    return [];
  }

  return data || [];
};

export const addMessage = async (message: Omit<Message, 'id' | 'created_at'>): Promise<Message | null> => {
  const { data, error } = await supabase
    .from('messages')
    .insert([message])
    .select();

  if (error) {
    console.error('Error adding message:', error);
    return null;
  }

  return data ? data[0] : null;
};
