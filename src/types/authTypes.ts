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

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export interface SocialLoginProvider {
  provider: 'google' | 'kakao' | 'naver';
  name: string;
  icon: string;
  color: string;
}