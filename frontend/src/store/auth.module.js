import AuthService from '../services/AuthService';
const seller = JSON.parse(localStorage.getItem('seller'));
const initialState = seller
    ? { status: { loggedIn: true }, seller }
    : { status: { loggedIn: false }, seller: null };
export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, seller) {
            return AuthService.login(seller).then(
                seller => {
                    commit('loginSuccess', seller);
                    return Promise.resolve(seller);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        update_account({ commit }, seller) {
            return AuthService.updateAccount(seller).then(
                data => {
                    commit('updateAccountSuccess', data);
                    return Promise.resolve(data);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginSuccess(state, seller) {
            state.status.loggedIn = true;
            state.seller = seller;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.seller = null;
        },
        updateAccountSuccess(state, data) {
            state.seller.seller_city = data.seller_city;
            state.seller.seller_state = data.seller_state;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.seller = null;
        }
    }
};