const express = require('express');
const app = express();

app.use(express.static('./static'));

app.get('/ip', (request, response) => {
    const ip = request.ip;
    console.log('/catalog route handler', request.ip);
    response.send(`Your IP = ${ip}`)
})



app.listen(3000, () => {
    console.log('App is running on localhost: 3000')
});