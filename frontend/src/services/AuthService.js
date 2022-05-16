import http from "../_helpers/http-common";
import AuthHeader from "./AuthHeader";
class AuthService {
    async login(seller) {
        return http
            .post('/login', {
                username: seller.seller_id,
                password: seller.seller_zip_code_prefix
            })
            .then(response => {
                if (response.data) {
                    localStorage.setItem('seller', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    async updateAccount(seller) {
        return http
            .patch('/account', {
                seller_id: seller.seller_id,
                seller_city: seller.seller_city,
                seller_state: seller.seller_state
            }, { headers: AuthHeader })
            .then(response => {
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('seller');
    }
}

export default new AuthService();