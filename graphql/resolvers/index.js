const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const events = async eventIds => {
   const events = await Event.find({_id: {$in: eventIds}})
    try{
         events.map(event => {
            return {
                ...event._doc,
                 _id: event.id/*event._doc._id.toString() não mais necessário*/,
                 date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator) 
                
        };
    });
    return events; //fix events map
   }
   catch (err){

           throw err;
    }
};

const user =  async userId => {
    try{
     const user = await User.findById(userId);
        return { 
             ...user._doc,
              _id: user.id/*event._doc._id.toString() não mais necessário*/,
            createdEvents: events.bind(this, user._doc.createdEvents)
            };
        }
        catch (err){
        throw err;
    }
    
};

module.exports = {
    events: async () => {
        try{
        const events = await Event.find()
            return events
            .map(event => {
                return { 
                    ...event._doc,
                     _id: event.id/*event._doc._id.toString() não mais necessário*/,
                     date: new Date(event._doc.date).toISOString(),
                      creator:user.bind(this, event._doc.creator) 
                 };    
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
            createdEvent = {
                ...result._doc,
                 _id: result.id/*event._doc._id.toString() não mais necessário*/,
                 date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)};
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
    },
    createUser: async args => {
        try{
        const existingUser = await User.findOne({email: args.userInput.email})
            if (existingUser){
                throw new Error('Usuário já Existe!');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })
            const result = await user.save();
        
     
            return {...result._doc, password: null, _id: result.id};
        }
        catch (err) {
            console.log(err);
            throw err;
        };   
    }
}