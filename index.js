

const server = require('./routes/index');
const db = require('./config/db');

const Port = process.env.PORT || 5000;

db()
    .then(() => {
        console.log('mongo_db database is  connected');
    }).catch(error => {
        console.log(error)
    });

server.listen(Port, () => console.log(`server running on port ${Port}`));