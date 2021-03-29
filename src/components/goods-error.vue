<template>
    <div class="emptyBlock">
            {{ message }}
        </div>
</template>

<script>
export default {
    name: 'goods-empty',
    data(){
        return{
            message: 'Доступ к серверу ограничен!'
        }
    }
}
</script>