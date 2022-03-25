const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if (!user){
            throw new Error('O Usuário não Existe!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual){
            throw new Error('A Senha está Incorreta!') //possível colocar mesmo erro para deixar genérico e não auxiliar break ins
        }
        const token = jwt.sign({userId: user.id, email: user.email },
             'somesupersecretkey',
           { //jwt de criação do token com sua key
            expiresIn: '1h'
           }
        ); 
        return { userId: user.id, token: token, tokenExpiration: 1 }
    }
};