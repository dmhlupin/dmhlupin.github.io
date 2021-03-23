const fs = require('fs');

fs.readFile('./data.json', 'utf-8',(err, data) => {
    if(err){
        console.log('Error!', err);
        return;
    }
    const user = JSON.parse(data);
    user.fatherName = 'Johnovitch';
    fs.writeFile('./data.json', JSON.stringify(user), (err,data) => {
        if(err){
            console.log('Error!', err);
            return;
        }
        console.log('write success')
    })
});

