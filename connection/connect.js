const { Pool } = require('pg');
const client=require('./connecton')
const pool = new Pool(client.db);
module.exports=pool