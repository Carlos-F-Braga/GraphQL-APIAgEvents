const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
//const { graphqlHTTP } = require('express-graphql'); Outra opção
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();


app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User{
            _id: ID!
            email: String!
            password: String
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }


        type RootQuery {
            events: [Event!]!
        }

        type RootMutation{
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
            .then(events => {
                return events.map(event => {
                    return { ...event._doc, _id: event.id/*event._doc._id.toString() não mais necessário*/ };
                });
            })
            .catch(err => {
                console.log(err);
                throw err;
            });  
        },
        createEvent: (args) => {
            const event = new Event ({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '621936f0aaca5f6f6edae80e'
            });
            let createdEvent;
            return event
            .save()
            .then(result => {
                createdEvent = {...result._doc, _id: result.id/*event._doc._id.toString() não mais necessário*/ };
                return User.findById('621936f0aaca5f6f6edae80e')
            })
            .then(user => {
                if (!user){
                throw new Error('Usuário não Encontrado!');
                }
                user.createdEvents.push(event);
                return user.save();
             })
             .then(result => {
                console.log(result);
                return createdEvent;
             })
            .catch(err => {
                console.log(err);
                throw err;
            });  
        },
        createUser: args => {
            return User.findOne({email: args.userInput.email})
            .then(user =>{
                if (user){
                    throw new Error('Usuário já Existe!');
                }
                return bcrypt
                .hash(args.userInput.password, 12);
            })
            .then(hashedPassword =>{
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                return user.save();
            })
            .then(result => {
                return {...result._doc, password: null, _id: result.id};
            })
            .catch(err => {
                console.log(err);
                throw err;
            });   
        }
    },
    graphiql: true
}));


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
}@cluster0.38xfe.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(3000);
    console.log("Funcionando Corretamente - Conexão Estabelecida com Sucesso");
}).catch(err => {
    console.log(err);
})



