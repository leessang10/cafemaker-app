import { supabase } from '@/utils/supabase';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  max_participants: number;
  current_participants: number;
  registration_fee: number;
}

export interface SuccessStory {
  id: string;
  title: string;
  content: string;
  author_name: string;
  business_type: string;
  location: string;
  revenue_info?: string;
  image_url?: string;
  created_at: string;
}

export const homeApi = {
  // Get latest notices
  getNotices: async (limit: number = 5) => {
    const { data, error } = await supabase
      .from('notices')
      .select('id, title, content, category, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Notice[];
  },

  // Get upcoming events
  getEvents: async (limit: number = 3) => {
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, event_date, location, max_participants, current_participants, registration_fee')
      .eq('is_published', true)
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data as Event[];
  },

  // Get success stories
  getSuccessStories: async (limit: number = 4) => {
    const { data, error } = await supabase
      .from('success_stories')
      .select('id, title, content, author_name, business_type, location, revenue_info, image_url, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as SuccessStory[];
  },

  // Get featured success stories
  getFeaturedSuccessStories: async () => {
    const { data, error } = await supabase
      .from('success_stories')
      .select('id, title, content, author_name, business_type, location, revenue_info, image_url, created_at')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(2);

    if (error) throw error;
    return data as SuccessStory[];
  },

  // Get notice by id
  getNoticeById: async (id: string) => {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) throw error;
    return data as Notice;
  },

  // Get event by id
  getEventById: async (id: string) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) throw error;
    return data as Event;
  },

  // Get success story by id
  getSuccessStoryById: async (id: string) => {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) throw error;
    return data as SuccessStory;
  },

  // Register for event
  registerForEvent: async (eventId: string, userId: string) => {
    // First check if already registered
    const { data: existingRegistration } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();

    if (existingRegistration) {
      throw new Error('이미 등록된 이벤트입니다.');
    }

    // Check if event is full
    const { data: event } = await supabase
      .from('events')
      .select('max_participants, current_participants')
      .eq('id', eventId)
      .single();

    if (event && event.current_participants >= event.max_participants) {
      throw new Error('참가 인원이 마감되었습니다.');
    }

    // Register for event
    const { error: registrationError } = await supabase
      .from('event_registrations')
      .insert({
        event_id: eventId,
        user_id: userId,
        registered_at: new Date().toISOString(),
      });

    if (registrationError) throw registrationError;

    // Update participant count
    const { error: updateError } = await supabase
      .from('events')
      .update({
        current_participants: (event?.current_participants || 0) + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', eventId);

    if (updateError) throw updateError;

    return true;
  },
};