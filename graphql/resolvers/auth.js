const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { ObjectId } = require("mongodb");

module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) {
                throw new Error('E-mail inválido. Por favor, tente outro.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                name: args.userInput.name,
                phone: args.userInput.phone,
                email: args.userInput.email,
                password: hashedPassword,
            })
            const result = await user.save();


            return { ...result._doc, password: null, _id: result.id };
        }
        catch (err) {
            console.log(err);
            throw err;
        };
    },
    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('Credenciais inválidas. Por favor, tente novamente');
            }

            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Credenciais inválidas, Por favor, tente novamente'); //possível colocar mesmo erro para deixar genérico e não auxiliar break ins
            }

            const token = jwt.sign({ userId: user.id, email: user.email },
                'somesupersecretkey',
                { //jwt de criação do token com sua key
                    expiresIn: '8h'
                }
            );

            return { userId: user.id, token: token, tokenExpiration: 1 }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getUserById: async ({ userId }) => {
        try {
            const user = await User.findOne({ _id: ObjectId(userId) });
            if (!user) {
                throw new Error('O Usuário não Existe.');
            }
            
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getUserByPhone: async ({ phone }) => {
        try {
            const user = await User.findOne({ phone });
            if (!user) {
                throw new Error('Número de telefone inválido.');
            }
            
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    changeUserPassword: async ({ userId, password }) => {
        try {
            const user = await User.findOne({ _id: ObjectId(userId) });
            if (!user) {
                throw new Error('Usuário não existe.');
            }
            
            user.password = await bcrypt.hash(password, 12);
    
            await user.save();
            
            return { isChanged: true };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};