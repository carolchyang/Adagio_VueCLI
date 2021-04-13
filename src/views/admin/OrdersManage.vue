<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">下單時間</th>
            <th scope="col" class="d-none d-md-table-cell">購買款項</th>
            <th scope="col" class="d-none d-lg-table-cell">
              付款方式
            </th>
            <th scope="col">應付金額</th>
            <th scope="col" class="d-none d-lg-table-cell">付款狀態</th>
          </tr>
        </thead>
        <tbody v-if="orders.length">
          <tr v-for="item in orders" :key="item.id" :class="{ 'table-success': item.paid }">
            <td>{{ item.created.datetime }}</td>
            <td class="d-none d-md-table-cell">
              <ul class="mb-0 list-unstyled" v-for="(product, key) in item.products" :key="key">
                <li>
                  {{ product.product.title }} ： {{ product.quantity }} {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="d-none d-lg-table-cell">
              {{ item.payment }}
            </td>
            <td class="text-right">{{ item.amount | currency }}</td>
            <td class="d-none d-lg-table-cell">
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input active"
                 :id="item.id" v-model="item.paid" @change.prevent="setOrderPaid(item)">
                <label class="custom-control-label" :for="item.id"></label>
                <span class="text-success" v-if="item.paid">已付款</span>
                <span class="text-muted" v-else>未付款</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @get-data="getOrders"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'OrdersManage',
  data() {
    return {
      pagination: {},
      orders: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(url).then((res) => {
        vm.orders = res.data.data;
        vm.pagination = res.data.meta.pagination;
        vm.isLoading = false;
      });
    },
    setOrderPaid() {
    },
  },
  components: {
    Pagination,
  },
  created() {
    this.getOrders();
  },
};
</script>

<style lang="scss">

</style>
