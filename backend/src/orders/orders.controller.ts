import express from "express";
import ordersService from "./orders.service";
import debug from "debug";
import { MongoClient } from "mongodb";

const log: debug.IDebugger = debug("app:orders-controller");
class OrdersController {
  async listOrders(req: express.Request, res: express.Response) {
    const limit = !req.query.limit ? 20 : Number(req.query.limit);
    const offet = !req.query.offset ? 0 : Number(req.query.offset);
    const sort = !req.query.sort ? 'shipping_limit_date' : req.query.sort;
    
    const orders = await ordersService.list(req.user.seller_id, limit, offet);
    return res.status(200).send(orders);
  }

  async getOrderById(req: express.Request, res: express.Response) {
    try {
      const order = await ordersService.readById(req.params.id);
      return res.status(200).send(order);

    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: "Something went wrong: " + error });
    }
  }

  async updateOrder(req: express.Request, res: express.Response) {
    log(
      await ordersService.updateById({ id: req.params.orderId, ...req.body })
    );
    res.status(204).send(``);
  }

  async deleteOrder(req: express.Request, res: express.Response) {
    log(await ordersService.deleteById(req.params.order_id));
    res.status(204).send(``);
  }
}

export default new OrdersController();
