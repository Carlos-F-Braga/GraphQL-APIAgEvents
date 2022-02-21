const userResolver = require('./resolvers/user');
const eventsResolver = require('./resolvers/events');

module.exports = {
    ...userResolver,
    ...eventsResolver
}