<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

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

      <!-- step 1 -->
      <div v-if="step === 1">

        <table class="table table-borderless checkorder-table">
          <thead>
            <tr class="bg-dark text-light">
              <th scope="col" class="d-none d-md-table-cell text-center">縮圖</th>
              <th scope="col" class="text-center">商品名稱</th>
              <th scope="col" class="d-none d-sm-table-cell text-center">數量</th>
              <th scope="col" class="d-none d-md-table-cell text-center">原價</th>
              <th scope="col" class="d-none d-sm-table-cell text-center">售價</th>
              <th scope="col" class="text-center">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-bottom" v-for="cart in carts" :key="cart.product.id">
              <td class="d-none d-md-table-cell text-center">
                <span class="thumbnail"
                :style="{backgroundImage: 'url(' + cart.product.imageUrl[0] + ')'}">
                </span>
              </td>
              <td class="align-middle">
                {{ cart.product.title }}
              </td>
              <td class="d-none d-sm-table-cell align-middle text-center">
                <div class="counter">
                  <a href="#" class="lessNum">
                    <i class="fas fa-minus"></i>
                  </a>
                  <input type="number" min="1" readonly="readonly"
                   :value="cart.quantity" class="counter-input">
                  <a href="#" class="addNum">
                    <i class="fas fa-plus"></i>
                  </a>
                </div>
              </td>
              <td class="d-none d-md-table-cell align-middle text-right">
                {{ cart.product.origin_price | currency }}
              </td>
              <td class="d-none d-sm-table-cell align-middle text-right">
                {{ cart.product.price | currency }}
              </td>
              <td class="align-middle text-center">
                <a href="#" class="text-danger">
                  <i class="far fa-trash-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-light table-borderless border-top" v-show="cartsNum">
            <tr>
              <td class="d-none d-md-table-cell" colspan="2"></td>
              <td class="d-none d-sm-table-cell"></td>
              <td class="d-none d-sm-table-cell text-right">共 {{ cartsNum }} 件</td>
              <td class="text-right">總計</td>
              <td class="text-right">{{ totalMoney | currency }}</td>
            </tr>
            <tr>
              <td class="d-none d-md-table-cell" colspan="2"></td>
              <td class="d-none d-sm-table-cell" colspan="2"></td>
              <td class="text-right">運費</td>
              <td class="text-right">$0</td>
            </tr>
            <tr v-show="coupon.title" class="text-success">
              <td class="d-none d-md-table-cell" colspan="2"></td>
              <td class="d-none d-sm-table-cell text-right" colspan="2">
                已套用折價卷 - [{{ coupon.title }}]
              </td>
              <td class="text-right">折扣</td>
              <td class="text-right">
                - {{ totalMoney - (totalMoney * coupon.percent/100 ) | currency }}
              </td>
            </tr>
            <tr :class="{'text-success': coupon.title}">
              <td class="d-none d-md-table-cell" colspan="2"></td>
              <td class="d-none d-sm-table-cell" colspan="2"></td>
              <td class="text-right">應付</td>
              <td class="text-right" v-show="!coupon.title">{{ totalMoney | currency }}</td>
              <td class="text-right" v-show="coupon.title">
                {{ totalMoney * coupon.percent/100 | currency }}
              </td>
            </tr>
          </tfoot>
        </table>

        <div v-show="!cartsNum" class="text-center">
          <h4 class="h5 mb-4 text-muted">購物車是空的</h4>
          <router-link to="/products" class="btn btn-secondary btn-lg py-2">
            <span class="mr-1">
              <i class="far fa-hand-point-up fa-lg"></i>
            </span>
            立即購物去
          </router-link>
        </div>

        <div class="input-group mb-4 mb-xl-5" v-show="cartsNum">
          <input type="text" class="form-control" placeholder="請輸入折價券代碼" v-model.trim="couponInput">
          <div class="input-group-append">
            <button type="button" class="btn btn-dark">
              使用 Coupon 券
            </button>
          </div>
        </div>

        <div class="checkorder-btngroup" v-show="cartsNum">
          <router-link to="/products" class="btn btn-muted btn-lg mb-3 mb-md-0">
            <span class="mr-1">
              <i class="fas fa-arrow-alt-circle-left"></i>
            </span>
              繼續購物
          </router-link>
          <button type="submut" class="btn btn-dark btn-lg" :disabled="!cartsNum"
           @click.prevent="step = 2">
            確認結帳
            <span class="ml-1">
            <i class="fas fa-arrow-alt-circle-right"></i>
            </span>
          </button>
        </div>

      </div>

       <!-- step 2 -->
      <div v-if="step === 2">

        <table class="table table-borderless checkorder-table mb-5">
          <thead>
            <tr class="bg-dark text-light">
              <th colspan="4" class="pl-4">購物清單</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-bottom" v-for="cart in carts" :key="cart.product.id">
              <td class="d-none d-md-table-cell text-center">
                <span class="thumbnail-small"
                :style="{backgroundImage: 'url(' + cart.product.imageUrl[0] + ')'}">
                </span>
              </td>
              <td class="align-middle">
                {{ cart.product.title }}
              </td>
              <td class="align-middle text-center">
                {{ cart.quantity }} {{ cart.product.unit }}
              </td>
              <td class="d-none d-md-table-cell align-middle text-right">
                {{ cart.product.price * cart.quantity | currency }}
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-light table-borderless border-top" v-show="cartsNum">
            <tr v-show="coupon.title" class="text-success">
              <td class="d-none d-md-table-cell text-right" colspan="2">
                已套用折價卷 - [{{ coupon.title }}]
              </td>
              <td class="text-right">折扣</td>
              <td class="text-right">
                - {{ totalMoney - (totalMoney * coupon.percent/100 ) | currency }}
              </td>
            </tr>
            <tr :class="{'text-success': coupon.title}">
              <td class="d-none d-md-table-cell" colspan="2"></td>
              <td class="text-right">總計</td>
              <td class="text-right" v-show="!coupon.title">{{ totalMoney | currency }}</td>
              <td class="text-right" v-show="coupon.title">
                {{ totalMoney * coupon.percent/100 | currency }}
              </td>
            </tr>
          </tfoot>
        </table>

        <h2 class="checkorder-title">訂購資料</h2>

        <form tag="form">

          <div class="bg-light  mb-3 mb-md-5 p-4">
            <div class="form-row">
              <div class="form-group col-md-6" name="收件人姓名">
                  <label for="name">
                    <span class="text-danger">*</span>
                    收件人姓名：
                  </label>
                  <input type="text" id="name" class="form-control" placeholder="請輸入收件人姓名"
                   v-model="orderData.name" required>
                  <span class="invalid-feedback"></span>
              </div>

              <div class="form-group col-md-6" name="收件人電話">
                  <label for="tel">
                    <span class="text-danger">*</span>
                    收件人電話：
                  </label>
                  <input type="text" id="tel" class="form-control" placeholder="請輸入收件人電話"
                   v-model="orderData.tel" required>
                  <span class="invalid-feedback"></span>
              </div>
            </div>

            <div class="form-group">
              <label for="email">
                <span class="text-danger">*</span>
                電子郵件：
              </label>
              <input type="email" id="email" class="form-control" placeholder="請輸入電子郵件"
               v-model="orderData.email" required>
              <span class="invalid-feedback"></span>
            </div>

            <div class="form-group">
              <label for="address">
                <span class="text-danger">*</span>
                收件地址：
              </label>
              <input type="text" id="address" class="form-control" placeholder="請輸入收件地址"
               v-model="orderData.address" required>
              <span class="invalid-feedback"></span>
            </div>

            <div class="form-group">
              <label for="payment">
                <span class="text-danger">*</span>
                支付方式
              </label>
              <select id="payment" class="form-control" name="支付方式"
               v-model="orderData.payment" required>
                <option selected="selected" disabled value="">請選擇支付方式</option>
                <option value="WebATM">WebATM</option>
                <option value="ATM">ATM</option>
                <option value="CVS">CVS</option>
                <option value="Barcode">Barcode</option>
                <option value="Credit">Credit</option>
                <option value="ApplePay">ApplePay</option>
                <option value="GooglePay">GooglePay</option>
              </select>
              <span class="invalid-feedback"></span>
            </div>

            <div class="form-group">
              <label for="message">備註：</label>
              <textarea class="form-control" id="message" rows="3" placeholder="留言給我們"
              v-model="orderData.message"
              ></textarea>
            </div>
          </div>

          <div class="checkorder-btngroup">
            <button type="submut" class="btn btn-muted btn-lg mb-3 mb-md-0"
             @click.prevent="step = 1">
              <span class="mr-1">
                <i class="fas fa-arrow-alt-circle-left"></i>
              </span>
              回上一步
            </button>
            <button type="submut" class="btn btn-dark btn-lg">
              確認結帳
              <span class="ml-1">
              <i class="fas fa-arrow-alt-circle-right"></i>
              </span>
            </button>
          </div>
        </form>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateOrder',
  data() {
    return {
      isLoading: false,
      step: 1,
      couponInput: '',
      coupon: {
        id: 'n6ZmDYhUpW9khDOgccsnRDiwiUlYSCHOpH34egbM82PZB8dkPwGq1zjBjDFG5WI5',
        title: '週年慶 全品項打八折',
        code: 'xxxxx-xxxxx-xxxxx-xxxxx',
        percent: 80,
        enabled: true,
        deadline: {
          diff: '1秒前',
          datetime: '2019-12-31 01:23:45',
          timestamp: 1577755425,
        },
        created: {
          diff: '1秒前',
          datetime: '2019-12-31 01:23:45',
          timestamp: 1577755425,
        },
        updated: {
          diff: '1秒前',
          datetime: '2019-12-31 01:23:45',
          timestamp: 1577755425,
        },
      },
      isCreateOrderAllow: true,
      orderData: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        coupon: '',
        message: '',
      },
      carts: [
        {
          product: {
            id: 'VsUEtsRggj29pjWdU7qpztNufU8V7A14EZwgUmyaF3CtXNHuE1AfElPLsJUZsdkj',
            title: '香蕉藍莓吐司',
            category: '甜點',
            content: '外皮烤得酥脆的吐司，淋上蜂蜜，在放上新鮮藍莓及香蕉，是下午茶的最佳選擇。',
            imageUrl: [
              'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/018MuZgNsws0HqBztf6ykaqD5rBLNaRet6a4uJ4J8wY6fPrR8c5WGY5GgHIDoG192xZIsEw0Iroo4IWtPebJPHsupSRjmRSxsn03A88TTOqwZtJvsR0Hvr3HGeuBRNuE.jpg',
            ],
            enabled: true,
            origin_price: 150,
            price: 150,
            unit: '份',
          },
          quantity: 1,
          created: {
            diff: '4小時前',
            datetime: '2021-04-28 21:43:43',
            timestamp: 1619617423,
          },
          updated: {
            diff: '4小時前',
            datetime: '2021-04-28 21:43:43',
            timestamp: 1619617423,
          },
        },
        {
          product: {
            id: 'WkNnSAFsYZiVye4acw3iHfNRrCYjpGY53Qq8sc2PE5hty8e34tysgECWbNz4zkqX',
            title: '精選小羊排',
            category: '主餐',
            content: '特別嚴選的羊小排，使用獨家配方醃製，肉質鮮嫩多汁，保證讓您垂涎欲滴。',
            imageUrl: [
              'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lRexmdNb7cBQLXrhUkO4M14oXaFQco1fSg0OWEHKLO5jQxGnF92tyYMEyO9phJcDtZwcxa8lpED3EvcCIaTm19HDDIDh0VIR5EvIHXleWUbWVaJnSrQdVRRQtbMwUPlB.jpg',
              null,
            ],
            enabled: true,
            origin_price: 700,
            price: 700,
            unit: '份',
          },
          quantity: 2,
          created: {
            diff: '4小時前',
            datetime: '2021-04-28 21:37:46',
            timestamp: 1619617066,
          },
          updated: {
            diff: '4小時前',
            datetime: '2021-04-28 21:37:46',
            timestamp: 1619617066,
          },
        },
      ],
      cartsNum: 2,
      totalMoney: 100,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/all';

.pagebanner-img {
  background-image: url('../../assets/images/banner-checkorder.jpg');
}

.checkorder {
  padding: 2rem 1rem;
  @include desktop-s {
    padding: 2rem 3rem
  }
  @include desktop {
    padding: 3rem 7rem
  }
}

.step-wrap {
  background-color: $dark;
}

.step {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  @include desktop {
    margin-bottom: 3.5rem;
  }
}

.step-item {
  display: none;
  position: relative;
  padding: 1rem 2rem;
  background-color: $light;
  border: 2px solid $muted;
  border-radius: .25rem;
  text-align: center;
  @include pad {
    display: block;
    margin-left: 10rem
  }
  &:after {
    content: "";
    display: none;
    position: absolute;
    top: 50%;
    right: 0;
    width: 25rem;
    height: .5rem;
    background-color: $light;
    border: 1px solid $muted;
    z-index: -2;
    @include pad {
      display: block
    }
  }
  &:first-child {
    margin-left: 0;
    &:after {
      display: none;
    }
  }
  &.active {
    background-color: $dark;
    border: 2px solid $dark;
    color: $light;
    &:after {
      background-color: $dark;
      border: 1px solid $dark;
    }
  }
}

.step-active {
  display: block;
}

.checkorder-title {
  margin-bottom: 0;
  padding: .75rem 1.5rem;
  background-color: $dark;
  color: $white;
  font-size: 1rem;
  font-weight: 400
}

.checkorder-table {
  margin-bottom: 2rem;
  th {
    font-weight: normal;
  }
}

.thumbnail, .thumbnail-small {
  display: inline-block;
  width: 5rem;
  height: 5rem;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.thumbnail-small {
  width: 4rem;
  height: 4rem;
}

.checkorder-btngroup {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @include pad {
    flex-direction: row;
  }
}

.checkorder-form {
  padding: 0 2rem;
}

</style>
