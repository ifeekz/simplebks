import express from "express";
import ordersService from "./orders.service";
import debug from "debug";
import { MongoClient } from "mongodb";

const log: debug.IDebugger = debug("app:orders-controller");
class OrdersController {
  async listOrders(req: express.Request, res: express.Response) {
    const orders = await ordersService.list(100, 0);
    // const client = new MongoClient(process.env.DATABASE_URL || "");
    // const connection = await client.connect();
    // const db = connection.db(process.env.DATABASE_NAME || "");
    // const collection = db.collection("orders");
    // const orders = await collection
    //   .find({}, {})
    //   .limit(10)
    //   .toArray()
    //   .then((results: any) => {
    //     console.log(results);
    //     return results
    //   })
    //   .catch((error: any) => console.log(error));
    // console.log("orders: ", orders);
    res.status(200).send(orders);
  }

  async getOrderById(req: express.Request, res: express.Response) {
    const order = await ordersService.readById(req.params.orderId);
    res.status(200).send(order);
  }

  async createOrder(req: express.Request, res: express.Response) {
    const orderId = await ordersService.create(req.body);
    res.status(201).send({ id: orderId });
  }

  async updateOrder(req: express.Request, res: express.Response) {
    log(
      await ordersService.updateById({ id: req.params.orderId, ...req.body })
    );
    res.status(204).send(``);
  }

  async deleteOrder(req: express.Request, res: express.Response) {
    log(await ordersService.deleteById(req.params.orderId));
    res.status(204).send(``);
  }
}

export default new OrdersController();
