<template>
  <div class="products-wrap">
    <div class="pagebanner" :style="{backgroundImage: 'url(' + categoryImg + ')'}">
      <h2>產品列表</h2>
    </div>

    <div class="container-fluid products">
      <div class="row">

        <div class="col-12 col-md-5 col-lg-3">

          <div class="categories">
            <h3 class="categories-title">產品分類</h3>
              <ul class="categories-list">
              <li v-for="category in categories" :key="category.key">
                <a href="#" class="categories-link">
                  {{ category.title }}
                </a>
              </li>
            </ul>
          </div>

          <div class="input-group search-inputgroup">
            <input type="text" class="form-control" placeholder="請輸入搜尋商品">
            <div class="input-group-append">
              <button class="btn btn-dark rounded-right" type="button">
                搜尋
              </button>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-7 col-lg-9">

          <div class="products-info" v-if="filterText">
            搜尋到 2 筆 "{{ filterText }}" 資料
          </div>

          <div class="row">
            <div class="col-12 col-lg-6 col-xl-4"
             v-for="product in products"
              :key="product.id">
              <router-link :to="`/products/${product.id}`" class="card">
                <div class="card-head">
                  <div class="card-img-wrap">
                    <span class="card-img"
                     :style="{backgroundImage: 'url(' + product.imageUrl[0] + ')'}">
                    </span>
                  </div>
                  <div class="card-category">{{ product.category }}</div>
                  <a href="#" class="favorite-icon" v-show="product.isFavorite">
                   <i class="fas fa-heart"></i>

                  </a>
                  <a href="#" class="favorite-icon" v-show="!product.isFavorite">
                    <i class="far fa-heart"></i>
                  </a>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ product.title }}</h4>
                  <ul class="card-price" v-if="product.origin_price === product.price">
                    <li class="price">
                      售價： {{ product.origin_price | currency }}
                    </li>
                  </ul>
                  <ul class="card-price" v-else>
                    <li class="price price-through">
                      售價： {{ product.origin_price | currency }}
                    </li>
                    <li class="price">
                      特價： {{ product.price | currency }}
                    </li>
                  </ul>
                  <a href="#" class="btn btn-dark btn-sm card-btn">
                    <span class="mr-1">
                      <i class="fas fa-shopping-basket"></i>
                    </span>
                    放入購物車
                  </a>
                </div>
              </router-link>
            </div>
          </div>

          <div class="products-pagination">
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import categoryImgAllmenu from '@/assets/images/banner-allmenu.jpg';
import categoryImgMaintmeal from '@/assets/images/banner-mainmeal.jpg';
import categoryImgLightmeal from '@/assets/images/banner-lightmeal.jpg';
import categoryImgDessert from '@/assets/images/banner-dessert.jpg';
import categoryImgDrinks from '@/assets/images/banner-drinks.jpg';

export default {
  name: 'Products',
  data() {
    return {
      isLoading: false,
      pagination: {
        total: 3,
        count: 3,
        per_page: 25,
        current_page: 1,
        total_pages: 1,
      },
      carts: [
        {
          product: {
            id: 'a9U3hqxc0BydyKfdzIwnz8tnyOpzXDjaZgyATTYndr4uS7GZv7v9IaVvnh44vxKE',
            title: '美式咖啡',
            category: '飲品',
            content: '使用品質良好的阿拉比卡咖啡，沖出美味的美式咖啡，提省醒腦，還可以減脂，快來喝一杯吧。',
            imageUrl: [
              'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/WnkTKZoCyJQoXtnnMzxvpflsc3cA40GccFs81uLwxezCFfwI1xTHTo7BSF7WkM5ZFjBvLYhUlwF3TkrpXORzaEy0PELtybpQstpTlSgTP6nuVssQTjNgEs4iIl8EQKEP.jpg',
              null,
            ],
            enabled: true,
            origin_price: 100,
            price: 100,
            unit: '杯',
          },
          quantity: 1,
          created: {
            diff: '5秒前',
            datetime: '2021-04-16 12:37:05',
            timestamp: 1618547825,
          },
          updated: {
            diff: '5秒前',
            datetime: '2021-04-16 12:37:05',
            timestamp: 1618547825,
          },
        },
        {
          product: {
            id: 'TU44OTBqGIU0qEJifrqVXuZiMEOi5OnmOG7CYgRdGt4eDaxAbzzJ0PX4TH6eKQQC',
            title: '風琴馬鈴薯',
            category: '輕食',
            content: '將馬鈴薯切成薄薄一片，在抹上調味料，讓食物更入味，烤好後的馬鈴薯，像手風琴一樣，好看又好吃。',
            imageUrl: [
              'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/ZO31qi6vT5RKD2VQ8vtgnyXaqRE2B81qhelBuo7ph9F7MVKV67LN7ePt1ymfRJprq7Pi44roh8NmaINT0FxYBzwUb7RSz3pOIlCq0DlNihKjlWKGpK1aWSZiM3SX2K8N.jpg',
            ],
            enabled: true,
            origin_price: 300,
            price: 250,
            unit: '份',
          },
          quantity: 1,
          created: {
            diff: '9秒前',
            datetime: '2021-04-16 12:37:01',
            timestamp: 1618547821,
          },
          updated: {
            diff: '9秒前',
            datetime: '2021-04-16 12:37:01',
            timestamp: 1618547821,
          },
        },
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
          quantity: 2,
          created: {
            diff: '1天前',
            datetime: '2021-04-14 16:30:11',
            timestamp: 1618389011,
          },
          updated: {
            diff: '1天前',
            datetime: '2021-04-14 16:30:18',
            timestamp: 1618389018,
          },
        },
      ],
      favorites: [
        {
          id: 'Iy0zKxztexOSTucPvCBlXqtpHxt3pB5yznckbMKhkUemzjHkvBc6yodqJzVN6W9b',
          title: '泰式綜合蔬菜沙拉',
          imageUrl: 'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/vTztVOkJ1nPPXbh0AlvFBLlWonzimMjc8SrPWDGXv6r0aj3HnaUX3qwbdqB66TjHYUTCN1V4BictbqhlJ9hF6H5MpsveqgFIc6ajHwkyt5Ec0hnCEGV7GpKzNRpYhh3t.jpg',
        },
        {
          id: 'TU44OTBqGIU0qEJifrqVXuZiMEOi5OnmOG7CYgRdGt4eDaxAbzzJ0PX4TH6eKQQC',
          title: '風琴馬鈴薯',
          imageUrl: 'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/ZO31qi6vT5RKD2VQ8vtgnyXaqRE2B81qhelBuo7ph9F7MVKV67LN7ePt1ymfRJprq7Pi44roh8NmaINT0FxYBzwUb7RSz3pOIlCq0DlNihKjlWKGpK1aWSZiM3SX2K8N.jpg',
        },
        {
          id: 'VsUEtsRggj29pjWdU7qpztNufU8V7A14EZwgUmyaF3CtXNHuE1AfElPLsJUZsdkj',
          title: '香蕉藍莓吐司',
          imageUrl: 'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/018MuZgNsws0HqBztf6ykaqD5rBLNaRet6a4uJ4J8wY6fPrR8c5WGY5GgHIDoG192xZIsEw0Iroo4IWtPebJPHsupSRjmRSxsn03A88TTOqwZtJvsR0Hvr3HGeuBRNuE.jpg',
        },
      ],
      categoryImg: categoryImgAllmenu,
      categories: [
        {
          title: '全部',
          categoryImg: categoryImgAllmenu,
        },
        {
          title: '主餐',
          categoryImg: categoryImgMaintmeal,
        },
        {
          title: '輕食',
          categoryImg: categoryImgLightmeal,
        },
        {
          title: '甜點',
          categoryImg: categoryImgDessert,
        },
        {
          title: '飲品',
          categoryImg: categoryImgDrinks,
        },
      ],
      products: [],
      searchText: '',
      filterText: '',
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      vm.isLoading = true;
      vm.$http.get(url).then((res) => {
        vm.products = res.data.data;
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/all';

.products-wrap {
  min-height: calc(100vh - 3.5rem);
}

.pagebanner {
  margin-bottom: 3.5rem;
  padding: 11rem 0 8rem;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  transition: 0.5s all ease;
  text-align: center;
  color: $white;
  h2{
    display:inline-block;
    margin-bottom:0;
    padding:1rem 5rem;
    background-color:rgba(52,58,64,.8);
    border-radius:.25rem;
    font-size:1.5rem
  }
}

.products {
  padding: 0 2rem;
}

.search-inputgroup {
  margin-bottom: 2rem;
  button {
    padding: 0.25rem 2rem;
  }
  input {
    height: auto;
    padding: 0.5rem 1rem;
    border-color: $dark;
  }
}

.categories {
  margin-bottom: 2rem;
  border-radius: 0.25rem;
  text-align: center;
}

.categories-title {
  margin-bottom: 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid $dark;
  font-size: 1.25rem;
}

.categories-list {
  padding: 1rem 1rem 1.5rem;
  background-color: $light;
  .active a {
    background-color: $dark;
    border-color: $dark;
    color: $white;
    &:hover {
      background-color: lighten($dark, 10%);
    }
  }
}

.categories-link {
  display: block;
  padding: 0.5rem 0;
  border-bottom: 1px solid $muted;
  color: $dark;
  font-size: 1rem;
  &:hover {
    background-color: $primary;
    border-color: $primary;
    color: $white;
    text-decoration: none;
  }
}

.products-info {
  margin-bottom: 2rem;
}

.card {
  margin-bottom: 2rem;
  transition: 0.5s all ease;
  color: $dark;
  &:hover {
    box-shadow: 1px 2px 11px lighten($primary, 20%);
    color: $dark;
    text-decoration: none;
    .card-img {
      transform: scale(1.05);
    }
  }
}

.card-head {
  position: relative;
  margin-bottom: 0.25rem;
}

.card-img-wrap {
  overflow: hidden;
}

.card-img {
  display: block;
  width: 100%;
  min-height: 10rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.5s all ease;
}

.card-category {
  position: absolute;
  bottom: -1rem;
  left: 45%;
  padding: 0.25rem 0.5rem;
  background-color: $dark;
  border-radius: 0.25rem;
  color: $white;
}

.card-price {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.75rem;
}

.price {
  font-size: 1.25rem;
}

.price-through {
  margin-right: 2rem;
  color: $primary;
  font-size: 1rem;
  text-decoration: line-through;
}

.card-btn:hover {
  background-color: $secondary;
  border-color: $secondary;
}

.products-pagination {
  margin: 0 auto 3rem;
}

.favorite-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: .25rem 1rem;
  transition: all .3s ease;
  color: $danger;
  font-size: 1.75rem;
  &:hover {
    transform: scale(1.2);
    color: $danger;
  }
}

.favorite-icon-lg {
  font-size: 2rem;
}
</style>
