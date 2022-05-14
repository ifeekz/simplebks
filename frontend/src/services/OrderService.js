import http from "../_helpers/http-common"
import AuthHeader from './AuthHeader'

class OrderService {
  getAll(limit = 20, offset = 0) {
    limit = (limit > 100) ? 100 : limit
    return http.get(`/order_items?limit=${limit}&offset=${offset}`, { headers: AuthHeader });
  }
  get(id) {
    return http.get(`/order_items/${id}`, { headers: AuthHeader() });
  }
  update(id, data) {
    return http.put(`/order_items/${id}`, data, { headers: AuthHeader() });
  }
  delete(id) {
    return http.delete(`/order_items/${id}`, { headers: AuthHeader() });
  }
}

export default new OrderService();