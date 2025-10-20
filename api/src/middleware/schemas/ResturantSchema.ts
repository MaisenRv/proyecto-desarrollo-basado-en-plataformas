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
  old_restaurant: z.object({
    restaurant_id: z.number({ message: "Debe ser un id válido" }),
    owner_id: z.number({ message: "Debe ser un id válido" }),
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    description: z.string().optional().or(z.literal("")),
    address: z.string().optional().or(z.literal("")),
    opening_hours: z.string(),
    closing_hours: z.string(),
    is_active: z.coerce.boolean(),
    img: z.string().optional().or(z.literal("")),
    created_at: z.string(),
    update_at: z.string(),
  }),

  update_restaurant: z.object({
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    description: z.string().optional().or(z.literal("")),
    address: z.string().optional().or(z.literal("")),
    opening_hours: z.string(),
    closing_hours: z.string(),
    is_active: z.coerce.boolean(),
  }),
});

export const RestaurantDeleteSchema = z.object({
  restaurant_id: z.number("Debe ser un id valido")
});

export const RestaurantGetSchema = z.object({
  user_id: z.number("Debe ser un id valido")
});
