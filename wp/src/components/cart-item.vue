<template>
    <div class="cartItem">
            <img v-bind:src="pathToImage(item.id_product)" class="cartItemImg" alt="No image">
            <h3>{{item.product_name}}</h3>
            <p>{{item.price}}</p>
            <p>{{item.quantity}}</p>
            <div class="buttonBlock">
                <div class="removeButton" @click="$emit('removeItem',item.id_product)">
                    <i class="fas  fa-minus"></i>
                </div>
                <div class="addButton" @click="$emit('addItem',item)">
                    <i class="fas  fa-plus"></i>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'cart-item',
    props: ['item', 'full'],
    methods: {
        pathToImage(id) {
            return `./static/img/${id}.jpg`;
        }
    }
}
</script>