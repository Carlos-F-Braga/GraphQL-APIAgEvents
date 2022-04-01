const Event = require('../../models/event');
const { transformEvent, DeleteEvent } = require('./merge');
const User = require('../../models/user');


module.exports = {
    events: async () => {
        try{
        const events = await Event.find()
            return events
            .map(event => {
                return transformEvent(event);    
        })
    }   catch(err) {
            console.log(err);
            throw err;
        }
    },
    createEvent: async (args, req) => {
          if(!req.isAuth) {
              throw new Error ('Unauthenticated!');
          }
        const event = new Event ({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        });
        let createdEvent;
        try{
        const result = await event
        .save()
            createdEvent = transformEvent(result);
            const creator = await User.findById(req.userId);
      
            if (!creator){
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
        if (!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try{
            const event = await Event.findById(args.eventId).populate('creator');
            const user = DeleteEvent(event.creator);
                console.log(user);
            await Event.deleteOne({_id: args.eventId});
            return user;
        }
        catch (err){
            throw err;
        }
    }

};