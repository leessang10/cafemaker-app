export interface EstimateItem {
  id: string;
  name: string;
  category: string;
  unit_price: number;
  quantity: number;
  total_price: number;
  description?: string;
  supplier?: string;
  image_url?: string;
}

export interface EstimateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: EstimateTemplateItem[];
}

export interface EstimateTemplateItem {
  id: string;
  name: string;
  unit_price: number;
  description: string;
  supplier: string;
  image_url?: string;
  is_essential: boolean;
}

export interface Estimate {
  id: string;
  user_id: string;
  title: string;
  items: EstimateItem[];
  total_cost: number;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'completed' | 'exported';
}

export interface EstimateCreatePayload {
  title: string;
  items: Omit<EstimateItem, 'id' | 'total_price'>[];
}

export interface EstimateUpdatePayload {
  title?: string;
  items?: EstimateItem[];
  status?: 'draft' | 'completed' | 'exported';
}

export interface EstimateExportOptions {
  format: 'pdf' | 'excel';
  include_images: boolean;
  include_supplier_info: boolean;
  add_notes: string;
}