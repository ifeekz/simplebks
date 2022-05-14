import http from "../_helpers/http-common";
class AuthService {
    async login(seller) {
        return http
            .post('/login', {
                username: seller.seller_id,
                password: seller.seller_zip_code_prefix
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('seller', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('seller');
    }
}

export default new AuthService();