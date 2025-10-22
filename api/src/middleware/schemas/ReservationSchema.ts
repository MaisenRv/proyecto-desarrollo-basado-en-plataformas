import { z } from "zod";

export const ReservationCreateSchema = z.object({
    restaurant_id: z.number({ message: "Debe ser un id válido" }),
    table_id: z.number({ message: "Debe ser un id válido" }),
    reservation_data: z.string({ message: "La fecha de la reserva es obligatoria" }),
    reservation_time: z.string({ message: "La hora de la reserva es obligatoria" }),
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