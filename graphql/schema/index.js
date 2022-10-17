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
    status: Int
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

type UpdateDataResponse {
    isUpdated: Boolean!
}

type ChangeDataResponse {
    isChanged: Boolean!
}

type RemoveDataResponse {
    isRemoved: Boolean!
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
    status: Int
    category: Int
    priority: Int
}

input UserInput {
    name: String!
    phone: String!
    email: String!
    password: String
}

input SearchEventsMobile {
    title: String
    finalDate: String
    initialDate: String
    category: Int
    priority: Int
}

type RootQuery {
    events: [Event!]
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData
    getUserById(userId: ID!): User
    getEventById(eventId: ID!): Event
    getUserByPhone(phone: String!): User
    searchEventsFromUser(userId: ID!, searchEventsMobile: SearchEventsMobile!): [Event!]
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createEventMobile(eventInputMobile: EventInputMobile!, userId: ID!): Event
    updateEventMobile(eventInputMobile: EventInputMobile!, eventId: ID!): UpdateDataResponse
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
    cancelEvent(eventId: ID!): User!
    killUser(userId: ID!): User
    changeUserPassword(userId: ID!, password: String!): ChangeDataResponse
    changeStatusEvent(eventId: ID!, status: Int!): ChangeDataResponse
    removeEvent(eventId: ID!): RemoveDataResponse
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)