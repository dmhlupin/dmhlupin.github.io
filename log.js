const fs = require('fs').promises;
console.log('Запись статистики...')
async function log (type, id, name, client_ip) {
    try{
        const data = await fs.readFile('./stats.json', 'utf-8');
        const logData = JSON.parse(data);
        console.log(logData);
        const actionObj = {
            type,
            id,
            name,
            time: (new Date()).toISOString(),
            client_ip
        };
        logData.push(actionObj);
        
        await fs.writeFile('./stats.json', JSON.stringify(logData));
    }
    catch(err){
        console.log('Error file logging',err);
    };
}; 

module.exports = log;