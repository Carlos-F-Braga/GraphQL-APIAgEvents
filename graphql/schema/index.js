const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking{
    _id: ID!
   event: Event!
   user: User!
   createdAt: String!
   updatedAt: String! 
}

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    category: Int
    priority: Int
    creator: User!
}

type User {
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

type ChangeUserPasswordResponse {
    isChanged: Boolean!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

input EventInputMobile {
    title: String!
    description: String!
    date: String!
    category: Int
    priority: Int
}

input UserInput {
    name: String!
    phone: String!
    email: String!
    password: String
}

type RootQuery {
    events: [Event!]
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData
    getUserById(userId: ID!): User
    getUserByPhone(phone: String!): User
    getEventsFromUser(userId: ID!): [Event!]
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createEventMobile(eventInputMobile: EventInputMobile, userId: ID!): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
    cancelEvent(eventId: ID!): User!
    killUser(userId: ID!): User
    changeUserPassword(userId: ID!, password: String!): ChangeUserPasswordResponse
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)