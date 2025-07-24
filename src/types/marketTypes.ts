export interface MarketAnalysisRequest {
  address: string;
  business_type: string;
  target_radius: number;
  analysis_type: 'basic' | 'premium' | 'enterprise';
}

export interface MarketAnalysisResult {
  id: string;
  user_id: string;
  request: MarketAnalysisRequest;
  analysis_url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  expires_at: string;
}

export interface MarketData {
  population: {
    total: number;
    age_groups: {
      '20s': number;
      '30s': number;
      '40s': number;
      '50s+': number;
    };
    income_level: 'low' | 'medium' | 'high';
  };
  competition: {
    coffee_shops: number;
    cafes: number;
    bakeries: number;
    restaurants: number;
  };
  foot_traffic: {
    weekday_average: number;
    weekend_average: number;
    peak_hours: string[];
  };
  score: {
    overall: number;
    location: number;
    competition: number;
    demographics: number;
  };
}