export interface RestaurantInterface {
  restaurant_id: number;
  owner_id: number;
  name: string;
  description: string | null;
  address: string | null;
  opening_hours: string;
  closing_hours: string;
  is_active: boolean;
  created_at: string;
  update_at: string;
}

export interface RestaurantCreateInterface {
  owner_id: number;
  name: string;
  description?: string | null;
  address?: string | null;
  opening_hours: string;
  closing_hours: string;
}