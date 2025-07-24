-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    store_name VARCHAR(255),
    store_address TEXT,
    phone VARCHAR(20),
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.profiles
         FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
         FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
         FOR INSERT WITH CHECK (auth.uid() = id);

     -- Create function to handle new user registration
     CREATE OR REPLACE FUNCTION public.handle_new_user()
     RETURNS TRIGGER AS $$
BEGIN
INSERT INTO public.profiles (id, email, full_name)
VALUES (
           NEW.id,
           NEW.email,
           COALESCE(NEW.raw_user_meta_data->>'full_name', '')
       );
RETURN NEW;
END;
     $$ LANGUAGE plpgsql SECURITY DEFINER;

     -- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
     RETURNS TRIGGER AS $$
BEGIN
         NEW.updated_at = NOW();
RETURN NEW;
END;
     $$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create estimates table
CREATE TABLE IF NOT EXISTS public.estimates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    total_cost DECIMAL(12,2) NOT NULL DEFAULT 0,
    items JSONB NOT NULL DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Create chat_rooms table
CREATE TABLE IF NOT EXISTS public.chat_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    consultant_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'pending')),
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Create notices table
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'general',
    priority INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMPTZ NOT NULL,
    location VARCHAR(255),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    registration_fee DECIMAL(10,2) DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Create success_stories table
CREATE TABLE IF NOT EXISTS public.success_stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_name VARCHAR(255),
    business_type VARCHAR(100),
    location VARCHAR(255),
    revenue_info VARCHAR(255),
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Create faqs table
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'general',
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
    );

-- Enable RLS on all tables
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for estimates
CREATE POLICY "Users can view own estimates" ON public.estimates
         FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own estimates" ON public.estimates
         FOR INSERT WITH CHECK (auth.uid() = user_id);
     CREATE POLICY "Users can update own estimates" ON public.estimates
         FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view messages in their rooms" ON public.chat_messages
         FOR SELECT USING (
                        EXISTS (
                        SELECT 1 FROM public.chat_rooms
                        WHERE id = chat_messages.room_id
                        AND (user_id = auth.uid() OR consultant_id = auth.uid())
                        )
                        );
CREATE POLICY "Users can send messages in their rooms" ON public.chat_messages
         FOR INSERT WITH CHECK (
             auth.uid() = sender_id AND
             EXISTS (
                 SELECT 1 FROM public.chat_rooms
                 WHERE id = chat_messages.room_id
                 AND (user_id = auth.uid() OR consultant_id = auth.uid())
             )
         );

     -- RLS Policies for chat_rooms
     CREATE POLICY "Users can view own chat rooms" ON public.chat_rooms
         FOR SELECT USING (auth.uid() = user_id OR auth.uid() = consultant_id);
CREATE POLICY "Users can create own chat rooms" ON public.chat_rooms
         FOR INSERT WITH CHECK (auth.uid() = user_id);
     CREATE POLICY "Users can update own chat rooms" ON public.chat_rooms
         FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = consultant_id);

-- RLS Policies for public content (notices, events, success_stories, faqs)
CREATE POLICY "Anyone can view published notices" ON public.notices
         FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can view published events" ON public.events
         FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can view published success stories" ON public.success_stories
         FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can view published faqs" ON public.faqs
         FOR SELECT USING (is_published = true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_estimates_user_id ON public.estimates(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON public.chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_user_id ON public.chat_rooms(user_id);
CREATE INDEX IF NOT EXISTS idx_notices_published ON public.notices(is_published, created_at);
CREATE INDEX IF NOT EXISTS idx_events_published ON public.events(is_published, event_date);
CREATE INDEX IF NOT EXISTS idx_success_stories_published ON public.success_stories(is_published, created_at);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category, order_index);

-- Create updated_at triggers for all tables
CREATE TRIGGER update_estimates_updated_at
    BEFORE UPDATE ON public.estimates
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_rooms_updated_at
    BEFORE UPDATE ON public.chat_rooms
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notices_updated_at
    BEFORE UPDATE ON public.notices
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_success_stories_updated_at
    BEFORE UPDATE ON public.success_stories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON public.faqs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();