const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
//const { graphqlHTTP } = require('express-graphql'); Outra opção
const { buildSchema, GraphQLSchema } = require('graphql');
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index.js');
const graphQlResolvers = require('./graphql/resolvers/index.js');
const isAuth = require('./middleware/is-auth');

const app = express();


app.use(bodyParser.json());

app.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

const host = '127.0.0.1' || process.env.host

const port = 8000 || process.env.port

const configApi = {
    port: {
        config: port
    },
    host: {
        config: host
    },
    user: {
        config: process.env.MONGO_USER
    },
    database: {
        config: process.env.MONGO_DB
    },
    running_command: {
        config: 'npm ' + process.env.npm_lifecycle_event
    },
    running_script: {
        config: process.env.npm_lifecycle_script
    },
    IDE: {
        config: process.env.TERM_PROGRAM
    }
}

const success = "Funcionando Corretamente - Conexão Estabelecida com Sucesso"

const error = "Algo deu Errado: "

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
}@cluster0.38xfe.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(port);
    console.log(success);
    console.table(configApi)
}).catch(err => {
    console.log(error, err);
})



