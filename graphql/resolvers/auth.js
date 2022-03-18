const bcrypt = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');

module.exports = {
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
};