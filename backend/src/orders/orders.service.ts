import OrdersDao from './order.dao';
import {OrdersInterface} from "./orders.interface";
import {OrderDto} from "./order.dto";

class OrdersService implements OrdersInterface {

    async list(limit: number, page: number) {
        return OrdersDao.getOrders();
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