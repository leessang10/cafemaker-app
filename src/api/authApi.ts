import { supabase } from '@utils/supabase';
import { SignUpPayload, SignInPayload } from '@/types/authTypes';

export const authApi = {
  // Sign up with email and password
  signUp: async (payload: SignUpPayload) => {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          full_name: payload.full_name,
        },
      },
    });

    if (error) throw error;
    return data;
  },

  // Sign in with email and password
  signIn: async (payload: SignInPayload) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  },

  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  // Update user password
  updatePassword: async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return data;
  },

  // Update user email
  updateEmail: async (newEmail: string) => {
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) throw error;
    return data;
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'your-app-scheme://reset-password',
    });

    if (error) throw error;
    return data;
  },

  // Social login
  signInWithOAuth: async (provider: 'google' | 'apple' | 'kakao' | 'naver') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: 'your-app-scheme://auth/callback',
      },
    });

    if (error) throw error;
    return data;
  },

  // Verify OTP (for email verification)
  verifyOtp: async (email: string, token: string, type: 'signup' | 'recovery') => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });

    if (error) throw error;
    return data;
  },

  // Resend email confirmation
  resendConfirmation: async (email: string) => {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) throw error;
    return data;
  },
};