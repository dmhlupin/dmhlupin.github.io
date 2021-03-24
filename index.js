const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('./static'));

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
})


app.listen(3000, () => {
    console.log('App is running on localhost: 3000')
});