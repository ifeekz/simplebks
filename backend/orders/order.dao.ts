import {OrderDto} from "./order.dto";
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class OrdersDao {
    orders: Array<OrderDto> = [];

    constructor() {
        log('Created new instance of OrdersDao');
    }

    async getOrders() {
        return this.orders;
    }

    async addOrder(order: OrderDto) {
        this.orders.push(order);
        return order.id;
    }

    async getOrderById(orderId: string) {
        return this.orders.find((order: { id: string; }) => order.id === orderId);
    }

    async updateOrderById(order: OrderDto) {
        const objIndex = this.orders.findIndex((obj: { id: string; }) => obj.id === order.id);
        this.orders.splice(objIndex, 1, order);
        return `${order.id} updated via put`;
    }


    async deleteOrderById(orderId: string) {
        const objIndex = this.orders.findIndex((obj: { id: string; }) => obj.id === orderId);
        this.orders.splice(objIndex, 1);
        return `${orderId} removed`;
    }
}

export default new OrdersDao();