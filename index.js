const { request, response } = require('express');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(express.static('./static'));
app.use(express.json());
app.use(cors());

app.get('/api/goods', (request, response) => {
    
    console.log('/goods route handler', request.ip);
    fs.readFile('./goods.json', 'utf-8', (err,data) => {
        if(err){
            console.log('Read goods.json error', err);
            response.send('Read goods.json error');
            return;
        }

        const goods = JSON.parse(data);
        console.log(goods);
        return response.send(data);
    });
})
app.get('/api/cart', (request, response) => {
    
    console.log('/cart route handler', request.ip);
    fs.readFile('./cart.json', 'utf-8', (err,data) => {
        if(err){
            console.log('Read cart.json error', err);
            response.send('Read cart.json error');
            return;
        }
        
        return response.send(data);
    });
});


app.delete('/api/cart/:id', (request, response) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if(err){
            console.log('Read cart.json error', err);
            response.json({ result: 0 });
            return;
        }
        const cart = JSON.parse(data);
        const id = +request.params.id;
        console.log(request,' id: ', id);
        const itemIndex = cart.contents.findIndex((goodsItem) => goodsItem.id_product === id);
        if (itemIndex > -1) {
            if (cart.contents[itemIndex].quantity > 1) {
                cart.contents[itemIndex].quantity -= 1;
            } else {
                cart.contents = cart.contents.filter((item) => item.id_product !== id);
            }
        } else {
            console.log(`Нет такого элемента в корзине`)
        }
        cart.countGoods -= 1;
        cart.amount = cart.contents.reduce((acc, curr) => {return acc + curr.price*curr.quantity}, 0);

        fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
            if(err){
                console.log('Write cart.json error!', err);
                response.json(
                    {
                        result: 0,
                        message: 'Error write to cart',
                        err: err
                    }
                );
                return;
            }
            return response.json({ 
                result: 1, 
                quantity: cart.amount,
                cartCount: cart.goodsCount
            });
        });



        response.json({ result: 1 });
    })
}

)

app.post('/api/cart', (request, response) => {
    console.log('/cart POST route handler', request.ip);
    fs.readFile('./cart.json', 'utf-8', (err,data) => {
        if(err){
            console.log('Read cart.json error', err);
            response.json({ result: 0 });
            return;
        }
        const cart = JSON.parse(data);
        console.log(cart.contents[1].product_name);
        
        const item = request.body;
        console.log('POST item: ', item);
        const itemIndex = cart.contents.findIndex((cartItem) => cartItem.id_product === item.id_product);     
        if(itemIndex > -1){
            console.log('huvaa!', itemIndex)    ;
            cart.contents[itemIndex].quantity += 1;
        }    
        else {
            console.log('ei huvaa!', itemIndex);
            cart.contents.push({
                ...item,
                quantity: 1
            });
        }   
        cart.countGoods += 1;
        cart.amount += item.price;
        const statItem = {
            action: 'add item to cart',
            item: item,
            time: new Date()
        }
        console.log(statItem);
        const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';
        fs.appendFile('./stats.json', `${newLineChar}${JSON.stringify(statItem)}`, (err) => {
            if(err){
                console.log('Write stats.json error!', err);
                return;
            }    
        });
        
        fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
            if(err){
                console.log('Write cart.json error!', err);
                response.json(
                    {
                        result: 0,
                        message: 'Error write to cart',
                        err: err
                    }
                );
                return;
            }
            return response.json({ 
                result: 1, 
                quantity: cart.amount,
                cartCount: cart.goodsCount
            });
        });
    });
});

app.listen(3000, () => {
    console.log('App is running on localhost: 3000')
});