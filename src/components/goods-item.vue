<template>
    <div class="goods-item">
        <img v-bind:src="pathToImage(item.id_product)" class="itemImg" alt="No image">
        <h3> {{item.product_name}} </h3>
        <p> {{item.price}} </p>
        <div class="addToCart" @click="$emit('addItem', item)"> В корзину </div>
    </div>
</template>

<script>
export default {
    name: 'goods-item',
    props:['item'],
    methods: {
        pathToImage(id){
            return `./static/img/${id}.jpg`;
        }
    }
}
</script>