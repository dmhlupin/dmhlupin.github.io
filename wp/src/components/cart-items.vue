<template>
    <div class="cartSection">
        <h3 class="cartHeader" v-if="cart.length > 0">Ваша корзина:</h3>
        <h3 class="cartHeader" v-if="cart.length === 0">Ваша корзина пуста!</h3>
        <div class="cartItem cartItemNaming" v-if="cart.length > 0">
            <div></div>
            <h3>Наименование</h3>
            <p>Цена</p>
            <p>Количество</p>
        </div>
        <cart-item
            v-for="item in cart"
            v-bind:item="item"
            v-bind:key="item.id_product"
            v-on:addItem="$emit('add', $event)"
            v-on:removeItem="$emit('remove', $event)"
        >
        </cart-item>
        <div v-if="cart.length > 0" class="fullCartPrice">
        Полная стоимость товаров: {{ full }} рублей
        </div>
    </div>
</template>

<script>
import cartItem from './cart-item.vue';
export default {
    name: 'cart-items',
    props: ['cart', 'full'],
    components: {
        'cart-item': cartItem
    }
}
</script>

