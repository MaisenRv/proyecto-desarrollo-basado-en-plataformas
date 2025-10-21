import { z } from "zod";

export const ReservationCreateSchema = z.object({
    restaurant_id: z.number({ message: "Debe ser un id válido" }),
    table_id: z.number({ message: "Debe ser un id válido" }),
    reservation_data: z.string({ message: "La fecha de la reserva es obligatoria" }),
    reservation_time: z.string({ message: "La hora de la reserva es obligatoria" }),
    costumer_name: z.string().min(3, { message: "El nombre del cliente debe tener al menos 3 caracteres" }),
    consumer_id: z.number({ message: "Debe ser un id válido" }),
});

export const ReservationGetByRestaurantSchema = z.object({
    restaurant_id: z.number({ message: "Debe ser un id válido" }),
});

export const ReservationGetByConsumerSchema = z.object({
    consumer_id: z.number({ message: "Debe ser un id válido" }),
});

export const ReservationDeleteSchema = z.object({
    reservation_id: z.number({ message: "Debe ser un id válido" }),
});