import { z } from "zod";

export const RestaurantCreateSchema = z.object({
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

export const RestaurantDeleteSchema = z.object({
  restaurant_id: z.number("Debe ser un id valido")
});

export const RestaurantGetSchema = z.object({
  user_id: z.number("Debe ser un id valido")
});
