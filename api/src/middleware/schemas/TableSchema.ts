import { z } from "zod";

export const TableSchema = z.object({
  table_id: z.number({ message: "Debe ser un id válido" }),
  restaurant_id: z.number({ message: "Debe ser un id válido" }),
  name: z.string().min(1, { message: "El nombre de la mesa es requerido" }),
  available: z.coerce.boolean(),
  created_at: z.string(),
  update_at: z.string(),
});

export const TableCreateSchema = z.object({
  restaurant_id: z.number({ message: "Debe ser un id de restaurante válido" }),
  name: z.string().min(1, { message: "El nombre de la mesa debe tener al menos 1 caracter" }),
  available: z.boolean().optional().default(true),
});

export const TableUpdateSchema = z.object({
  old_table: z.object({
    table_id: z.number({ message: "Debe ser un id válido" }),
    restaurant_id: z.number({ message: "Debe ser un id válido" }),
    name: z.string().min(1, { message: "El nombre de la mesa es requerido" }),
    available: z.coerce.boolean(),
    created_at: z.string(),
    update_at: z.string(),
  }),

  update_table: z.object({
    name: z.string().min(1, { message: "El nombre de la mesa debe tener al menos 1 caracter" }),
    available: z.coerce.boolean(),
  }),
});

export const TableDeleteSchema = z.object({
  table_id: z.number({ message: "Debe ser un id válido" }),
});

export const TableGetSchema = z.object({
  table_id: z.number({ message: "Debe ser un id válido" }),
});

export const TablesByRestaurantSchema = z.object({
  restaurant_id: z.number({ message: "Debe ser un id válido" }),
});