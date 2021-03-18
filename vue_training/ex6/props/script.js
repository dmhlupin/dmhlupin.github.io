Vue.component('v-body',{
    props: ['items', 'quantity'],
    template: `
        <div>
            <p v-bind:quantity="quantity">Количество: {{quantity}}</p>
            <button v-on:click="addQuantity">Add quantity</button>   
            <div v-for="i in items">
                <v-item v-bind:item='i'></v-item>
            </div>
        </div>        
        `,
    data: function(){
        return {
            itemQuantity: this.quantity
        }
    },
    methods: {
        addQuantity(){
            this.$emit('quantity', this.itemQuantity +=1)
        }
    }
})

Vue.component('v-item',{
    props:['item'],
    template: 
        `
        <div>
            <h3>{{item.name}}</h3>
            <p>Price: {{item.price}}, Quantity: {{item.quantity}} </p>
            <button class="addButton" v-on:click="$emit('add', item)">Add</button>
        </div>
        `,
    methods: {
        add(){
            console.log('success');
            this.$emit('add',this.item)
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
        ],
        quantity: 1
    },
    methods: {
        addItem(item){item += 1},
        changeQuantity(value){
            this.quantity = value;
        }
    }
    
})