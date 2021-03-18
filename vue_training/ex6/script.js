Vue.component('v-header', {
    template: `<div>
                    Foo is {{foo}}
                    <v-logo>
                        <template v-slot:image>
                            logo-image slot
                        </template>
                        <template v-slot:text>
                            logo-text slot
                        </template>
                        logo default slot
                    </v-logo>
                    
                    <h1>Hello, student!</h1>

                    v-body:
                    <v-body v-bind:content='inputValue' v-on:input="handleInput"></v-body>
                    
                    <p>{{inputValue}}</p>
                </div>`,
    data: function() {
        return {
            foo: 'bar',
            inputValue: 'default value'
        }
    },
    methods: {
        handleInput(value){
            this.inputValue=value; 
        }
    }
    
});

Vue.component('v-body', {
    props: ['content'],
    template:`
        <div>
            <div>{{content}}</div>
            <input type="text" v-bind:value="content" v-on:input="handleInput">
        </div>
    `,
    methods: {
        handleInput(e) {
            this.$emit('input',e.target.value)           
        }
    }
})
Vue.component('v-logo', {
    template: `<div class="logo">
                    <p class="logo-image">
                        <slot name="image"></slot>
                    </p>
                    <p class="logo-text">
                        <slot name="text"></slot>
                    </p>
                    <p class="logo-other"><slot></slot></p>
                </div>`
});


const app = new Vue({
    el: "#app",
    data: {

    },
    computed: {

    },
    methods: {

    }
});