<template>
    <div class="searchContainer">
        <input type="text" class="goods-search" v-model="this.sline" />
        <button
            class="search-button"
            type="button"
            @click="$emit('start-search', this.sline)"
            >
            Искать
        </button>
    </div>
</template>

<script>
export default {
    name: 'search',
    props:['sline']
}
</script>