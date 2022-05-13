import express from 'express';
import orderService from './orders.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:orders-controller');
class OrdersMiddleware {

    async validateRequiredOrderBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            res.status(400).send({error: `Missing required fields email and password`});
        }
    }

    async validateOrderExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const order = await orderService.readById(req.params.orderId);
        if (order) {
            next();
        } else {
            res.status(404).send({error: `Order ${req.params.orderId} not found`});
        }
    }

    async extractOrderId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.orderId;
        next();
    }
}

export default new OrdersMiddleware();