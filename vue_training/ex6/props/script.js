Vue.component('good-items',{
    props:['items'],
    template: `
    <div>
    <good-item v-for="(item, index) in items"
                    :item="item"
                    :key="item.id"
                    :index="index"
                    v-on:add-item="$emit('add-item', $event)"
                    v-on:remove="$emit('remove-item', $event)"
    >
    
    </good-item>
</div>
    
    `
})



Vue.component('good-item', {
    props:['item', 'index'],
    template: `
        <div>
            <p>Title: {{item.name}}</p>
            <p>Price: {{item.price}}</p>
            <p>Quantity: {{item.quantity}}</p>
            <button v-on:click="add(index)">Add</button>
            <button v-on:click="rem(index)">Remove</button>
        </div>
        `,
    methods: {
        add(index){
            this.$emit('add-item',index)
        },
        rem(index){
            this.$emit('remove', index)
        }
    }
})

const app = new Vue({
    el: "#app",
    data: {
        items: [
            {id: 1001, name: 'Компьютер', price: 13600, quantity: 1},
            {id: 1002, name: 'Монитор', price: 7400, quantity: 1},
            {id: 1003, name: 'Мышь', price: 600, quantity: 1},
            {id: 1004, name: 'Клавиатура', price: 1200, quantity: 1}
        ]
    },
    methods: {
        addItem(index){this.items[index].quantity += 1},
        removeItem(index){this.items[index].quantity -= 1}
    }
    
})