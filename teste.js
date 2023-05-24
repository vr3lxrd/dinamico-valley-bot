const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'valley_database',
  password: '1103',
  port: 5432,
})
pool.query('SELECT discord_id, person_name, class_id FROM public.valley_persons', (error, results) => { 
    console.log(results.rows)
})