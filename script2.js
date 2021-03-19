const API_URL = 'https://dmhlupin.github.io/';

Vue.component('cart-items',{
    props:['cart','full'],
    template: `
        
        <div class="cartSection">
            {{cart.length}}
            <div class="cartItem cartItemNaming" v-if="cart.length>0">
                <div></div>
                <h3>Наименование</h3>   
                <p>Цена</p>
                <p>Количество</p>
            </div>
            <div v-for="(item, index) in cart"
                v-bind:item="item"
                v-bind:key="item.id"
                v-bind:index="index"
                >
                    <p>{{item.name}}</p>
                    <button @click="$emit('remove',index)">Remove
                    </button>
                    <button @click="$emit('add',index)">Add
                    </button>
            </div>  
        </div>
    `
})


Vue.component('cart-item',{
    props:['item','index'],
})








const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        cartGoods: [],
        filteredGoods: [],
        searchLine: "",
        cartVisibility: true
    },

    created() {
        this.fetchGoods();
        this.fetchCart();
    },


    computed: {
        fullPrice() {
            return this.cartGoods.reduce((acc, curr) => {
                return acc + curr.price*curr.quantity
            }, 0);
        },
    },
    methods: {
        async fetchGoods() {
            try {
                console.log(`Загрузка товаров из ${API_URL}/response.json...`)
                const request = await fetch(`${API_URL}/response.json`);
                const goods = await request.json();
                this.goods = goods;
                this.filteredGoods = goods;
                console.log(`Загрузка товаров завершена!`);
            } catch (err) {
                console.log(`Невозможно загрузить товары!`, err);
            }
        },
        async fetchCart() {
            try {
                console.log(`Загрузка корзины...`);
                const response = await fetch(`${API_URL}/getBasket.json`);
                const goods = await response.json();
                this.cartGoods = goods.contents;
                console.log(`загрузка корзины завершена!`);  
                console.log(this.cartGoods);  
            } catch (err) {
                console.log(err);
            }
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        clearFilter() {
            this.searchLine='';
            this.filterGoods();
        },
        removeItems(){

        },
        addItems(){}
    }


}
)