import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/Layout.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardLayout.vue'),
    children: [
      {
        path: 'productsmanage',
        name: 'ProductsManage',
        component: () => import('../views/admin/ProductsManage.vue'),
      },
      {
        path: 'couponsmanage',
        name: 'CouponsManage',
        component: () => import('../views/admin/CouponsManage.vue'),
      },
      {
        path: 'ordersmanage',
        name: 'OrdersManage',
        component: () => import('../views/admin/OrdersManage.vue'),
      },
      {
        path: 'storagesmanage',
        name: 'StoragesManage',
        component: () => import('../views/admin/StoragesManage.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes,
});

export default router;
