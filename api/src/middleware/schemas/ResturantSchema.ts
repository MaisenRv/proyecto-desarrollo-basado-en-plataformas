import { z } from "zod";

export const RestaurantCreateSchema = z.object({
  owner_id: z.number(),
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z.string().optional(),
  address: z.string().optional(),
  opening_hours: z.string(),
  closing_hours: z.string(),
  is_active: z.boolean().default(true),
});

export const RestaurantUpdateSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z.string().optional(),
  address: z.string().optional(),
  opening_hours: z.string(),
  closing_hours: z.string(),
  is_active: z.boolean().default(true),
});