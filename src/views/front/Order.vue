<template>
  <div>
    <div class="pagebanner pagebanner-img">
      <h2>結帳流程</h2>
    </div>

    <div class="container checkorder">
      <ul class="step">
        <li class="step-item active" :class="{'step-active': step === 1 }">
          <span class="d-block">STEP 1</span>
          確認購物清單
        </li>
        <li class="step-item"
        :class="{'active': step === 2 || step === 3, 'step-active': step === 2 }">
          <span class="d-block">STEP 2</span>
          填寫訂購資料
        </li>
        <li class="step-item" :class="{'active': step === 3, 'step-active': step === 3 }">
          <span class="d-block">STEP 3</span>
          付款/完成訂單
        </li>
      </ul>

      <div v-if="step === 3">
        <h2 class="checkorder-title">訂單清單</h2>
        <div class="table-responsive-md mb-5">
          <table class="table">
            <tbody>
              <tr v-for="(item, key) in order.products" :key="key">
                <td class="align-middle text-nowrap">
                  {{ item.product.title }}
                </td>
                <td class="align-middle text-center text-nowrap">
                  {{ item.quantity }} / {{ item.product.unit }}
                </td>
                <td class="d-none d-sm-table-cell align-middle text-right">
                  {{ item.product.price * item.quantity | currency }}
                </td>
              </tr>
            </tbody>
            <tfoot class="bg-light table-borderless border-top">
              <tr v-if="order.coupon" class="text-success">
                <td class="d-none d-sm-table-cell"></td>
                <td class="text-right" colspan="2">已使用折價劵 - [{{ order.coupon.title }}]</td>
              </tr>
              <tr>
                <td class="d-none d-sm-table-cell"></td>
                <td class="text-right">總額</td>
                <td class="text-right">{{ order.amount | currency }}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <h2 class="checkorder-title">訂購資訊</h2>
        <div class="table-responsive-md order-table">
          <table class="table" v-if="order.user">
            <tr>
              <th scope="row" width="150" class="text-nowrap">收件人</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th scope="row" width="150" class="text-nowrap">電子信箱</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th scope="row" width="150" class="text-nowrap">電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th scope="row" width="150" class="text-nowrap">地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th scope="row" width="150" class="text-nowrap">支付方式</th>
              <td>{{ order.payment }}</td>
            </tr>
            <tr>
              <th scope="row" width="150" class="text-nowrap">備註</th>
              <td>{{ order.message }}</td>
            </tr>
            <tr>
              <th scope="row" width="150" class="text-nowrap">付款狀態</th>
              <td class="text-success" v-show="order.paid">已付款</td>
              <td v-show="!order.paid">未付款</td>
            </tr>
          </table>
        </div>

        <div class="text-center" v-if="!order.paid">
          <a href="#" class="btn btn-secondary btn-lg">
            付款去
            <span class="ml-1">
              <i class="fas fa-money-check-alt"></i>
            </span>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      step: 3,
      orderId: '',
      order: {
        id: 'sETLFTz2eqgDr5ZIRGABWPq4WzNTHt1LFR8ZNSXwu2964btDylp3tib3iOQmBAT9',
        message: '1',
        user: {
          name: '生活',
          email: 'carol@gmail.com',
          tel: '1234567891',
          address: 's',
        },
        coupon: {
          title: '周年慶9折',
          code: 'happy9',
          percent: 90,
          enabled: true,
          deadline_at: '2021-01-01T04:59:00.000000Z',
        },
        amount: 90,
        products: [
          {
            product: {
              title: '泰式綜合蔬菜沙拉',
              category: '輕食',
              content: '酸酸甜甜的泰式酸辣醬，搭配爽脆口可的蔬菜，在炎熱的天氣裡促進您的食慾，營養又健康。',
              description: '<p>酸酸甜甜的泰式酸辣醬，搭配爽脆口可的蔬菜，在炎熱的天氣裡促進您的食慾，營養又健康。</p>',
              imageUrl: [
                'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/vTztVOkJ1nPPXbh0AlvFBLlWonzimMjc8SrPWDGXv6r0aj3HnaUX3qwbdqB66TjHYUTCN1V4BictbqhlJ9hF6H5MpsveqgFIc6ajHwkyt5Ec0hnCEGV7GpKzNRpYhh3t.jpg',
              ],
              enabled: true,
              origin_price: 150,
              price: 100,
              unit: '份',
            },
            quantity: 1,
          },
        ],
        payment: 'WebATM',
        paid: false,
        paid_at: null,
        paid_diff: null,
        created: {
          diff: '3秒前',
          datetime: '2021-04-29 03:12:16',
          timestamp: 1619637136,
        },
        updated: {
          diff: '3秒前',
          datetime: '2021-04-29 03:12:16',
          timestamp: 1619637136,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/all';

.pagebanner-img {
  background-image: url('../../assets/images/banner-checkorder.jpg');
}

.order-table {
  margin-bottom: 3rem;
  padding: 0 1rem;
  background: $light;
}
</style>
