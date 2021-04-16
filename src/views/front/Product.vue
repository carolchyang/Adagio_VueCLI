<template>
  <div class="product">
    <div class="pagebanner" :style="{backgroundImage: 'url(' + categoryImg + ')'}">
      <h2>{{ product.category }}</h2>
    </div>

    <div class="container">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb py-3">
          <li class="breadcrumb-item">
            <router-link to="/">
              首頁
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'Products', query: { categoryName: product.category }}">
              {{ product.category }}
            </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.title }}
          </li>
        </ol>
      </nav>

      <div class="row mb-md-5">
        <div class="col-12 col-md-6  mb-4 mb-md-0">
          <div class="cover" v-if="product.imageUrl">
            <div class="cover-img" :style="{backgroundImage: 'url(' + product.imageUrl[0] + ')'}">
              <a href="#" class="favorite-icon favorite-icon-lg">
                <i class="fas fa-heart"></i>

              </a>
              <a href="#" class="favorite-icon favorite-icon-lg">
                <i class="far fa-heart"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="text-center">
            <h2 class="mb-2">{{ product.title }}</h2>
            <h3 class="product-category">{{ product.category }}</h3>
            <ul class="product-price" v-if="product.origin_price === product.price">
              <li class="price">售價： {{ product.origin_price | currency }}</li>
            </ul>
            <ul class="product-price" v-else>
              <li class="price price-through">售價： {{ product.origin_price | currency }}</li>
              <li class="price">特價： {{ product.price | currency }}</li>
            </ul>
            <div class="product-cart">
              <div class="counter">
                <a href="#" class="lessNum">
                  <i class="fas fa-minus"></i>
                </a>
                <input type="number" min="1" readonly="readonly" class="counter-input"
                 v-model="counterNum">
                <a href="#" class="addNum">
                  <i class="fas fa-plus"></i>
                </a>
              </div>

              <a href="#" class="btn btn-dark">
                <span class="mr-1">
                  <i class="fas fa-shopping-basket"></i>
                </span>
                放入購物車
              </a>
            </div>
            <h4 class="product-subtitle">產品介紹</h4>
            <p class="product-text">
              {{ product.content }}
            </p>
            <h4 class="product-subtitle">產品成分</h4>
            <p class="product-text" v-if="product.options">
              {{ product.options.ingredient }}
            </p>
          </div>
        </div>
      </div>

      <h4 class="swiper-title">您可能會喜歡</h4>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="item in relatedProducts" :key="item.id">
          <router-link :to="`/products/${item.id}`"
           :style="{backgroundImage: 'url(' + item.imageUrl[0] + ')'}" class="swipter-item">
            <span class="swipter-item-category">{{ item.title }}</span>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import categoryImgAllmenu from '@/assets/images/banner-allmenu.jpg';
import categoryImgMaintmeal from '@/assets/images/banner-mainmeal.jpg';
import categoryImgLightmeal from '@/assets/images/banner-lightmeal.jpg';
import categoryImgDessert from '@/assets/images/banner-dessert.jpg';
import categoryImgDrinks from '@/assets/images/banner-drinks.jpg';

export default {
  name: 'Product',
  data() {
    return {
      product: {
        id: '2iLSi2kbqs72XKbTMKs6X3yJcyGqMptMjiJj653osYlxeDvlW5Fh2OqfCi2Wz0OJ',
        title: '西班牙焗烤蝦套餐',
        category: '主餐',
        content: '使用進口西班牙香料加入米飯，製作而成的黃色烤飯，配上焗烤大蝦，箇中滋味唯有親自品嚐才知道！',
        description: '<p>使用進口西班牙香料加入米飯，製作而成的黃色烤飯，配上焗烤大蝦，箇中滋味唯有親自品嚐才知道！</p>',
        imageUrl: [
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Xgqp5VvHrlsdOUbVeUDs2zjy1nSkVUEzLfW82SVFBOYp7Tj89BGh7DCHiYdKJkrr0HUsZvxXpNN4PUta4ioTXl6qLXyc9MDzHaD1bBIE2eVU3uc6fBlgb3uvgTQa4hdP.jpg',
        ],
        enabled: true,
        origin_price: 800,
        price: 750,
        unit: '份',
        created: {
          diff: '7個月前',
          datetime: '2020-09-16 08:09:29',
          timestamp: 1600214969,
        },
        updated: {
          diff: '7個月前',
          datetime: '2020-09-16 12:11:59',
          timestamp: 1600229519,
        },
        options: {
          ingredient: '西班牙米、蝦、薑黃粉、紅椒原粒、起司絲、義式香料',
        },
      },
      relatedProducts: [
        {
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
          options: {
            ingredient: '羊排、薯條、玉米片、義式香料、洋蔥、番茄',
          },
        },
        {
          id: 'akApjvnRxJ6Rfnx6WhvM1bsbii4BMohVqtbJ228jDvv0RTfqBnffFaIWvQIdCICh',
          title: '義士燻雞披薩',
          category: '主餐',
          content: '特選煙燻雞絲，加上鳳梨、洋蔥、起司，烘焙出美味披薩。',
          imageUrl: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/4dZZSxR5v4Rm1VMzDjFfFz26MLuO6PdN4vOpPeHTAB7BrGilrHEcqOLjj7RS0XQgoOUqYmkwP1xfrb4ot2CoIM3wufkMhm0iRyx13JMmKFjcUJlfqg2UdyYImoH6L7oH.jpg',
            null,
          ],
          enabled: true,
          origin_price: 700,
          price: 650,
          unit: '份',
          options: {
            ingredient: '燻雞、麵粉、鳳梨、起司、燻雞、洋蔥、香菜、番茄醬',
          },
        },
        {
          id: 'nr1v272FfwWQRaVJYorcIEnhEiH4kSvY82ouo5SejPNgbLEqI7lAnnfuXbmIYXmB',
          title: '煙燻火腿潛艇堡',
          category: '主餐',
          content: '在新鮮出爐的麵包裡夾入義式煙燻火腿及生菜，是最熱銷的一款潛艇堡，是絕不容錯過的選擇。',
          imageUrl: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/b7CyKWJjFLplYYoi5ju3R6CDzaG5exT8LTqKpFUCj01AWcfvBn7QIG5gwOGn4Gsp32APRpiDfztfvAi6Ro7hoYIMhd7LIT8Ed4imKlrAbNZTBC8E85XjPzQHdh9Ggz5m.jpg',
            null,
          ],
          enabled: true,
          origin_price: 350,
          price: 300,
          unit: '份',
          options: {
            ingredient: '麵粉、糖、鹽、酵母、煙燻火腿、番茄、洋蔥、生菜、起司片',
          },
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
      counterNum: 0,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesPerGroup: 1,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup: 1,
          },
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/all';

.product {
  min-height: calc(100vh - 3.5rem);
  padding-bottom: 3rem;
}

.pagebanner {
  margin-bottom: 2rem;
}

.cover {
  height: 100%;
  padding: 0 0 1.5rem 1.5rem;
}

.cover-img {
  position: relative;
  height: 100%;
  min-height: 15rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.25rem;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 100%;
    height: 100%;
    background-color: $muted;
    border-radius: 0.25rem;
    z-index: -1;
  }
}

.product-category {
  margin-bottom: 1.5rem;
  color: $secondary;
  font-size: 1.25rem;
}

.product-price {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.price {
  font-size: 1.25rem;
}

.price-through {
  margin-right: 1rem;
  color: $primary;
  font-size: 1rem;
  text-decoration: line-through;
}

.product-cart {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 2rem;
  @include mobile {
    flex-direction: row;
  }
}

.product-subtitle {
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid $dark;
  text-align: left;
  font-size: 1.25rem;
}

.product-text {
  margin-bottom: 1.5rem;
  padding-bottom: 0;
  text-align: left;
  line-height: 1.75;
}

// counter

.counter {
  display: flex;
  width: 100%;
  max-width: 100%;
  margin: 0 auto 1.5rem;
  @include mobile {
    max-width: 10rem;
    margin: 0;
  }
}

.counter-input {
  width: 100%;
  padding: 0.25rem;
  border: 1px solid $dark;
  border-radius: 0;
  text-align: center;
  outline: none;
  cursor: context-menu;
}

.addNum, .lessNum {
  padding: 0.4rem 0.75rem;
  border: 1px solid $dark;
  color: $dark;
  &:hover, &:focus {
    color: $white;
    background-color: darken($dark, 10%);
  }
}

.lessNum {
  border-right: none;
  border-radius: 0.25rem 0 0 0.25rem;
}

.addNum {
  border-left: none;
  border-radius: 0 0.25rem 0.25rem 0;
}

// swiper 設定

.swiper-title {
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid $dark;
  font-size: 1.25rem;
}

.swipter-item {
  display: block;
  position: relative;
  min-height: 10rem;
  margin: 0.5rem 0.25rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.25rem;
  transition: 0.5s all ease;
  &:hover, &:focus {
    box-shadow: 0px 0px 3px 4px $primary;
    .swipter-item-category {
      background-color: $dark;
    }
  }
}

.swipter-item-category {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.25rem;
  background-color: rgba($dark, 0.8);
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  transition: 0.5s all ease;
  text-align: center;
  color: $white;
}
</style>
