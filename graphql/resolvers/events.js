const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { transformEvent, DeleteEvent, KillUser } = require('./merge');
const { ObjectId } = require("mongodb");
const User = require('../../models/user');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events
                .map(event => {
                    return transformEvent(event);
                })
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        });
        let createdEvent;
        try {
            const result = await event
                .save()
            createdEvent = transformEvent(result);
            const creator = await User.findById(req.userId);

            if (!creator) {
                throw new Error('Usuário não Encontrado!');
            }
            creator.createdEvents.push(event);
            await creator.save();

            console.log(result);
            return createdEvent;
        }
        catch (err) {

            console.log(err);
            throw err;
        };
    },
    cancelEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const event = await Event.findById(args.eventId).populate('creator');
            const user = DeleteEvent(event.creator);
            console.log(user);
            await Event.deleteOne({ _id: args.eventId });
            await Booking.deleteMany({ event: args.eventId });
            return user;

        }
        catch (err) {
            throw err;
        }
    },
    killUser: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const user = KillUser(args.userId);
            console.log(args);
            await User.deleteOne({ _id: args.userId })
            await Event.deleteMany({ creator: args.userId });
            await Booking.deleteMany({ user: args.userId });
            return user;

        }
        catch (err) {
            throw err;
        }
    },
    createEventMobile: async ({ eventInputMobile, userId }) => {
        const event = new Event({
            title: eventInputMobile.title,
            description: eventInputMobile.description,
            price: 0.00,
            date: new Date(eventInputMobile.date),
            status: eventInputMobile.status,
            category: eventInputMobile.category,
            priority: eventInputMobile.priority,
            creator: userId
        });

        try {
            const result = await event.save();
            let createdEvent = transformEvent(result);
            const creator = await User.findById(userId);

            if (!creator) {
                throw new Error('Usuário não Encontrado!');
            }
            creator.createdEvents.push(event);
            await creator.save();

            console.log(result);
            return createdEvent;
        }
        catch (err) {
            console.log(err);
            throw err;
        };
    },
    getEventsFromUser: async ({ userId }) => {
        try {
            const user = await User.findOne({ _id: ObjectId(userId) });
            if (!user) {
                throw new Error('O Usuário não Existe.');
            }
            
            var eventsFromUser = await Event.find({
                '_id': {
                    $in: user.createdEvents,
                }
            });

            return eventsFromUser.map(event => transformEvent(event));
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    searchEventsFromUser: async ({ userId, searchEventsMobile }) => {
        try {
            const user = await User.findOne({ _id: ObjectId(userId) });
            if (!user) {
                throw new Error('O Usuário não Existe.');
            }

            var params = {
                '_id': {
                    $in: user.createdEvents,
                }
            };

            if (searchEventsMobile.title) {
                params['title'] = { $regex: '.*' + searchEventsMobile.title + '.*', $options:'i' };
            }

            if (searchEventsMobile.initialDate) {
                params['date'] = { $gte: new Date(searchEventsMobile.initialDate) };
            }
            
            if (searchEventsMobile.finalDate) {
                params['date'] = {...params['date'], $lt: new Date(searchEventsMobile.finalDate) };
            }

            if (searchEventsMobile.category) {
                params['category'] = searchEventsMobile.category;
            }

            if (searchEventsMobile.priority) {
                params['priority'] = searchEventsMobile.priority;
            }

            var eventsFromUser = await Event.find(params);

            return eventsFromUser.map(event => transformEvent(event));
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    changeStatusEvent: async ({ eventId, status }) => {
        try {
            const event = await Event.findOne({ _id: ObjectId(eventId) });
            if (!event) {
                throw new Error('Evento não existe.');
            }
            
            event.status = status;
    
            await event.save();
            
            return { isChanged: true };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    removeEvent: async ({ eventId }) => {
        try {
            const event = await Event.findOne({ _id: ObjectId(eventId) });
            if (!event) {
                throw new Error('Evento não existe.');
            }
            
            await event.remove();
            
            return { isRemoved: true };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};