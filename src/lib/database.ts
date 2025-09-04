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

export interface Photo {
  id?: string;
  created_at?: string;
  name: string;
  caption?: string;
  photo_url: string;
  is_public: boolean;
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

export const uploadPhoto = async (file: File, userName: string): Promise<string | null> => {
  try {
    if (!supabase) throw new Error('Supabase not configured.');
    const ext = file.name.split('.').pop() || 'jpg';
    const safeName = userName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
    const fileName = `${safeName}_${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from('photos')
      .upload(fileName, file, { cacheControl: '3600', upsert: false, contentType: file.type });

    if (error) throw error;
    const { data: publicUrlData } = supabase.storage.from('photos').getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return null;
  }
};

export const addPhoto = async (photo: Omit<Photo, 'id' | 'created_at'>): Promise<boolean> => {
  if (!supabase) {
    console.error('Supabase not configured.');
    return false;
  }
  const { error } = await supabase.from('photos').insert([photo]);
  if (error) {
    console.error('Error adding photo:', error);
    return false;
  }
  return true;
};

export const getPublicPhotos = async (): Promise<Photo[]> => {
  if (!supabase) {
    console.error('Supabase not configured. Check env.');
    return [];
  }
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
  return data || [];
};
