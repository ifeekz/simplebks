import Vue from "vue";
import Router from "vue-router";

import Home from '@/views/OrderItems';
import Login from '@/views/Login';
import OrderDetails from '@/views/OrderDetails';
import EditOrderItem from '@/views/EditOrderItem';

Vue.use(Router);
export const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/order_items",
            name: "order-items",
            component: Home // () => import("./components/OrderItems")
        },
        {
            path: "/order_items/:id",
            name: "order-details",
            component: OrderDetails
        },
        {
            path: "/order_items/:id/edit",
            name: "edit-order-item",
            component: EditOrderItem
        },
        {
            path: "/login",
            name: "login",
            component: Login
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     const publicPages = ['/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('seller');

//     if (authRequired && !loggedIn) {
//         next('/login');
//     } else {
//         next();
//     }
// });