<template>
    <div class="goods-list">
        <goods-item v-for="item in fgoods"
                v-bind:item="item"
                v-bind:key="item.id_product"
                @addItem="$emit('add', item)"
        >
        </goods-item>
    </div>
</template>
<script>
import goodsItem from './goods-item.vue'
export default {
    name: 'goods-list',
    props: ['fgoods'],
    components: {
        'goods-item': goodsItem
    }
}
</script>