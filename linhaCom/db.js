// PROJETO CRIADO COM O DRIVER NATIVO DO MONGODB USANDO ASYNC/AWAIT: COMPLETO

const { MongoClient, ObjectId } = require("mongodb");

//Conexão do NodeJS com o MongoDB usando o driver nativo: mongodb.
async function connect() {
    if(global.db) return global.db;
    const conn = await MongoClient.connect("mongodb://localhost:27017/", {useUnifiedTopology: true });
    if(!conn) {
        return new Error('Can´t Connected!'); 
    } else {
        console.log('We´re CONNECTED!');
    }     
    global.db = await conn.db("aula03");
    return global.db;
}

// Criar funções para manipular o banco de dados pela aplicação:
/* Listar todos os clientes */
async function findAll() {
    const db = await connect();
    return db.collection("new").find().toArray();
}

/* Inserir um cliente */
async function insert(customer) {
    const db = await connect();
    return db.collection("new").insertOne(customer);
}

/* Listar um cliente */
async function findOne(id) {
    const db = await connect();
    const objId = new ObjectId(id);
    return db.collection("new").findOne(objId);
}

/* Atualizar um cliente */
async function update(id, customer) {
    const filter = {_id: new ObjectId(id)};
    const db = await connect();
    return db.collection("new").update(filter, customer);
}
/* Excluir um cliente */
async function deleteOne(id) {
    const db = await connect();
    const filter = {_id: new ObjectId(id)};
    return db.collection("new").deleteOne(filter);
}

module.exports = {findAll, insert, findOne, update, deleteOne }
