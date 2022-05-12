import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";

export class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "OrdersRoutes");
  }

  configureRoutes() {
    // request to /order_items
    this.app
      .route(`/order_items`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`List all order items that belong to the logged in user`);
      })

      // requests to all http verb with this patters /order_items/:id
      this.app
      .route(`/order_items/:id`)
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET an order item ${req.params.id} from the order items collection.`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE an order item ${req.params.id} from the order items collection.`);
      });
    return this.app;
  }
}
