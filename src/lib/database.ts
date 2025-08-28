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
  if (!supabase) {
    console.error('Supabase not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    return [];
  }
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

export const uploadVoiceNote = async (voiceNote: Blob, userName: string): Promise<string | null> => {
  try {
    if (!supabase) {
      throw new Error('Supabase not configured.');
    }
    const fileName = `${userName.replace(/\s+/g, '_')}_${Date.now()}.webm`;
    const { data, error } = await supabase.storage
      .from('voicenotes')
      .upload(fileName, voiceNote, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('voicenotes')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading voice note:', error);
    return null;
  }
};

export const addMessage = async (message: Omit<Message, 'id' | 'created_at'>): Promise<boolean> => {
  if (!supabase) {
    console.error('Supabase not configured.');
    return false;
  }
  const { error } = await supabase
    .from('messages')
    .insert([message]);

  if (error) {
    console.error('Error adding message:', error);
    return false;
  }

  return true;
};
