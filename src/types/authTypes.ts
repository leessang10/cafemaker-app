import { User, Session } from '@supabase/supabase-js';

export interface SignUpPayload {
  email: string;
  password: string;
  full_name: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthUser extends User {
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface AuthSession extends Session {
  user: AuthUser;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  error: string | null;
}

export interface SocialLoginProvider {
  provider: 'google' | 'kakao' | 'naver';
  name: string;
  icon: string;
  color: string;
}