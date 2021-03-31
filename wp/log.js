const fs = require('fs').promises;
console.log('Запись статистики...')
async function log (type, id, client_ip) {
    try{
        const data = await fs.readFile('./dist/data/stats.json', 'utf-8');
        const logData = JSON.parse(data);
        console.log(logData);
        const actionObj = {
            type,
            id,
            time: (new Date()).toISOString(),
            client_ip
        };
        logData.push(actionObj);
        console.log(actionObj);
        
        await fs.writeFile('./dist/data/stats.json', JSON.stringify(logData));
    }
    catch(err){
        console.log('Error file logging',err);
    };
}; 

module.exports = log;