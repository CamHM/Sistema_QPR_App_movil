//Información de la base de datos
const pg =  require('pg');
const client = new pg.Client({
    user: 'rpiieouhijvuqm',
    host: 'ec2-174-129-208-118.compute-1.amazonaws.com',
    database: 'd5nu1f0qoqk6uo',
    password: 'a00d339948f36ce7a4c272dbca1db9546f5a6fb9dce2382aef8e0557c777f17f',
    port: 5432,
    ssl: true   
});
client.connect();
module.exports = client;