import debug from "debug";
import OrdersDao from "./order.dao";
import { OrdersInterface } from "./orders.interface";
import { OrderDto } from "./order.dto";
import { DbManager } from "../common/common.db.config";
import { Collection, Db, MongoClient } from "mongodb";

const log: debug.IDebugger = debug("app:in-memory-dao");

class OrdersService extends DbManager implements OrdersInterface {
    db: Db | undefined;
    orders: Collection | undefined;

  constructor() {
    super();
    this.connect();
  }

  async connect () {
    const client = new MongoClient(this.uri);
    try {
        // Connect to the MongoDB cluster
        const connection = await client.connect();
        this.db = connection.db(this.dbName);
        this.orders = this.db.collection('orders')

    } catch (e) {
        console.error(e);
    }
  }

  async list(limit: number = 25, offset: number = 0) {
    const orders = await this.orders
      ?.find({}, {})
      .skip(offset)
      .limit(limit)
      .toArray()
      .then((results: any) => {
        return results;
      })
      .catch((error: any) => log(error));

      offset = offset + limit
      const data = { 
        data: orders,
        limit,
        offset
     }
    return data;
  }

  async create(resource: OrderDto) {
    return OrdersDao.addOrder(resource);
  }

  async readById(resourceId: string) {
    return OrdersDao.getOrderById(resourceId);
  }

  async updateById(resource: OrderDto) {
    return OrdersDao.updateOrderById(resource);
  }

  async deleteById(resourceId: string) {
    return OrdersDao.deleteOrderById(resourceId);
  }
}

export default new OrdersService();
