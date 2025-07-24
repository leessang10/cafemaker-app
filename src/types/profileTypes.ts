export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  store_name: string | null;
  store_address: string | null;
  phone: string | null;
  preferences: UserPreferences | null;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  equipment_types: string[];
  budget_range: {
    min: number;
    max: number;
  };
  preferred_suppliers: string[];
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  theme: 'light' | 'dark' | 'system';
}

export interface OnboardingData {
  step: number;
  completed_steps: number[];
  data: {
    personal_info?: {
      full_name: string;
      phone: string;
    };
    store_info?: {
      store_name: string;
      store_address: string;
      store_type: string;
    };
    preferences?: UserPreferences;
  };
}

export interface ProfileUpdatePayload {
  full_name?: string;
  store_name?: string;
  store_address?: string;
  phone?: string;
  preferences?: UserPreferences;
}