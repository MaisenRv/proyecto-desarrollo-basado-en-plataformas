import { Request, Response, NextFunction } from "express";


export const parseJsonFieldsRestaurantUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.old_restaurant) {
      req.body.old_restaurant = JSON.parse(req.body.old_restaurant);
    }
    if (req.body.update_restaurant) {
      req.body.update_restaurant = JSON.parse(req.body.update_restaurant);
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: "Error al parsear campos JSON" });
  }
};