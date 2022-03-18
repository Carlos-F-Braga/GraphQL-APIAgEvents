const Event = require('../../models/event');
const { transformEvent } = require('./merge');


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
    createEvent: async (args) => {
        const event = new Event ({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '622b67133f74f5afda3a734b'
        });
        let createdEvent;
        try{
        const result = await event
        .save()
            createdEvent = transformEvent(result);
            const creator = await User.findById('622b67133f74f5afda3a734b');
      
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
    }

};