import http from "../_helpers/http-common";
import AuthHeader from "./AuthHeader";

class OrderService {
  getAll(limit = 20, offset = 0, sort = "shipping_limit_date") {
    limit = (limit > 100) ? 100 : limit
    return http.get(
        `/order_items?limit=${limit}&offset=${offset}&sort=${sort}`, 
        { headers: AuthHeader }
      );
  }
  get(order_id) {
    return http.get(`/order_items/${order_id}`, { headers: AuthHeader });
  }
  update(order_id, data) {
    return http.put(`/order_items/${order_id}`, data, { headers: AuthHeader });
  }
  delete(order_id) {
    return http.delete(`/order_items/${order_id}`, { headers: AuthHeader });
  }
}

export default new OrderService();