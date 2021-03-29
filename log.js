const fs = require('fs').promises;
console.log('Запись статистики...')
<<<<<<< HEAD
async function log (type, id, name, client_ip) {
=======
async function log (type, id) {
>>>>>>> baf305861cbbbb17ce2fccba8e503c28e0e48759
    try{
        const data = await fs.readFile('./stats.json', 'utf-8');
        const logData = JSON.parse(data);
        console.log(logData);
        const actionObj = {
            type,
            id,
<<<<<<< HEAD
            name,
            time: (new Date()).toISOString(),
            client_ip
=======
            time: (new Date()).toISOString()
>>>>>>> baf305861cbbbb17ce2fccba8e503c28e0e48759
        };
        logData.push(actionObj);
        
        await fs.writeFile('./stats.json', JSON.stringify(logData));
    }
    catch(err){
        console.log('Error file logging',err);
    };
}; 

module.exports = log;