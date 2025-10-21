export interface TableInterface {
  table_id: number;
  restaurant_id: number;
  name: string;
  available: boolean;
  created_at: string; // ISO timestamp
  update_at: string;  // ISO timestamp
}

export interface TableCreateInterface {
  restaurant_id: number;
  name: string;
  available?: boolean; // opcional, por defecto true en BD
}

export interface TableUpdateInterface {
  old_table: TableInterface;
  update_table: TableInterface;
}

export interface TableDeleteInterface {
  table_id: number;
}

export interface TableGetInterface {
  table_id: number;
}

export interface TablesByRestaurantInterface {
  restaurant_id: number;
}