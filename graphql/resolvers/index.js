const authResolver = require('./auth')
const eventResolver = require('./events')
const bookingResolver = require('./booking')
const auth = require('./auth')

const rootResolver = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver
}

module.exports = rootResolver;