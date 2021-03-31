<template>
  <div id="app">
    <header>
      <div class="logo"><a href="#">eShop</a></div>
      <button
        v-if="filteredGoods.length < goods.length"
        class="clearFilterBtn"
        v-on:click="clearFilter"
      >
        Очистить поиск
      </button>
      <search @start-search="filterGoods" :sline="searchLine"></search>
      <div
        class="card-button"
        v-bind:class="{ cardButtonActive: cartVisibility }"
        v-on:click="cartVisibility = !cartVisibility"
      >
        <span>Корзина </span>
        <i v-if="!cartVisibility" class="fas fa-angle-double-down"></i>
        <i v-else class="fas fa-angle-double-up"></i>
      </div>
    </header>
    <main>
      <div
        class="closeCartButton"
        v-if="cartVisibility"
        v-on:click="cartVisibility = !cartVisibility"
      >
        <i class="fas fa-times"></i>
      </div>
      <cart-items
        v-if="cartVisibility"
        :cart="cartGoods"
        :full="fullPrice"
        @remove="removeItem"
        @add="addItem"
      >
      </cart-items>
      <goods-list
        v-if="filteredGoods.length > 0"
        :fgoods="filteredGoods"
        @add="addItem"
      >
      </goods-list>
      <goods-error v-else-if="!connected"></goods-error>
      <goods-empty v-else></goods-empty>
    </main>
  </div>
</template>

<script>
const API_URL = "http://localhost:3000/api";
import goodsList from './components/goods-list.vue';
import goodsEmpty from './components/goods-empty.vue';
import goodsError from './components/goods-error.vue';
import search from './components/search.vue';
import cartItems from './components/cart-items.vue';


export default {
  name: "App",
  data() {
    return {
      goods: [],
      cartGoods: [],
      filteredGoods: [],
      searchLine: "",
      cartVisibility: false,
      connected: false,
    };
  },
  components: {
    'goods-list': goodsList,
    'goods-empty':goodsEmpty,
    'goods-error':goodsError,
    'search': search,
    'cart-items': cartItems
  },
  created() {
    this.fetchGoods();
    this.fetchCart();
  },
  computed: {
    fullPrice() {
      return this.cartGoods.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
    },
  },
  methods: {
    async fetchGoods() {
      try {
        console.log(`Загрузка товаров из ${API_URL}/goods`);
        const request = await fetch(`${API_URL}/goods`);
        const goods = await request.json();
        this.connected = true;
        this.goods = goods;
        this.filteredGoods = goods;
        console.log(`Загрузка товаров завершена!`);
      } catch (err) {
        this.connected = false;
        console.log(`Невозможно загрузить товары!`, err);
      }
    },
    async fetchCart() {
      try {
        console.log(`Загрузка корзины...`);
        const request = await fetch(`${API_URL}/cart`);
        const goods = await request.json();
        this.connected = true;
        this.cartGoods = goods.contents;
        console.log(`загрузка корзины завершена!`);
        console.log(this.cartGoods);
      } catch (err) {
        this.connected = false;
        console.log(err);
      }
    },
    filterGoods(line) {
      this.searchLine = line;
      const regexp = new RegExp(this.searchLine, "i");
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },
    clearFilter() {
      this.searchLine = "";
      this.filterGoods();
    },
    async addItem(item) {
      // - метод для добавления элемента в корзину
      try {
        const answer = await fetch(`${API_URL}/cart`, {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-type": "application/json",
          },
        });
        const response = await answer.json();
        if (response.result !== 0) {
          this.connected = true;
          const itemIndex = this.cartGoods.findIndex(
            (goodsItem) => goodsItem.id_product === item.id_product
          );
          if (itemIndex > -1) {
            this.cartGoods[itemIndex].quantity += 1;
          } else {
            this.cartGoods.push({
              ...item,
              quantity: 1,
            });
          }
        } else {
          console.log(`Не получается загрузить корзину на сервер...`);
        }
      } catch (err) {
        this.connected = false;
        console.log(err);
      }
    },
    async removeItem(id) {
      try {
        const answer = await fetch(`${API_URL}/cart/${id}`, {
          method: "DELETE",
        });
        const response = await answer.json();
        if (response.result !== 0) {
          this.connected = true;
          const itemIndex = this.cartGoods.findIndex(
            (goodsItem) => goodsItem.id_product === id
          );
          if (itemIndex > -1) {
            if (this.cartGoods[itemIndex].quantity > 1) {
              this.cartGoods[itemIndex].quantity -= 1;
            } else {
              this.cartGoods = this.cartGoods.filter(
                (item) => item.id_product !== +id
              );
            }
          } else {
            console.log(`Нет такого элемента в корзине`);
          }
        }
      } catch (err) {
        this.connected = false;
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>
