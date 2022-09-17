const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking{
    _id: ID!
   event: Event!
   user: User!
   createdAt: String!
   updatedAt: String! 
}

type Event{
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    category: Int
    priority: Int
    creator: User!

}

type User{
    _id: ID!
    name: String!
    phone: String!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!

}

input EventInput{
    title: String!
    description: String!
    price: Float!
    date: String!
}

input UserInput {
    name: String!
    phone: String!
    email: String!
    password: String
}


type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
    getUserById(userId: ID!): User
}

type RootMutation{
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
    cancelEvent(eventId: ID!): User!
    killUser(userId: ID!): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)