import express, { Request, Response, Router } from 'express';
import { registerValidation } from '../validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Chat from '../models/Chat';
const route: Router = express.Router();

//get all users
route.get('/', async (req: Request, res: Response) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({ error });
    }
});
// get a user by id
route.get('/:username', async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).json({ error });
    }
});
// register a user
route.post('/register', async (req: Request, res: Response) => {
    const { username, password, email, admin, avatar } = req.body;

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const checkUsernameExist = await User.findOne({
        username: username.toLowerCase(),
    });
    if (checkUsernameExist)
        return res.status(400).send('this username already exists');
    const checkEmailExist = await User.findOne({
        email: email.toLowerCase(),
    });
    if (checkEmailExist)
        return res.status(400).send('this email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username: username.toLowerCase(),
        password: hashedPassword,
        email: email.toLowerCase(),
        admin,
        avatar,
    });
    try {
        await user.save();
        res.status(200).send('Your registration was successful , welcome');
    } catch (e) {
        res.status(400).json({ error });
    }
});
// a user login
route.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const userFind = await User.findOne({ username: username.toLowerCase() });
    if (!userFind) return res.status(400).send('Invalid username or password');

    const validPass = await bcrypt.compare(password, userFind.password);
    if (!validPass) return res.status(400).send('Invalid username or password');

    const secretKey = process.env.SECRET || '';
    let token: string = jwt.sign({ _id: userFind._id }, secretKey, {
        expiresIn: '30d',
    });
    // res.send({ userFind, token });
    res.header('auth-header', token).send({
        _id: userFind._id,
        username: userFind.username,
        email: userFind.email,
        admin: userFind.admin,
        token,
        avatar: userFind.avatar,
    });
});
// create contact
route.post('/contacts/:username', async (req: Request, res: Response) => {
    const { contactName } = req.body;
    const { username } = req.params;

    // check if user is in DB so we can add contact it
    const findUser = await User.findOne({
        username: contactName.toLowerCase(),
    });
    if (!findUser) return res.status(404).send({ msg: 'user not found' });
    // check if contact is in contact list so we dont need to add it again
    const findContact = await User.findOne({
        username: username.toLowerCase(),
        'contactList.name': contactName,
    });
    if (findContact) return res.status(400).send({ msg: 'contact already in' });
    try {
        const addContact = await User.updateOne(
            {
                username: username.toLowerCase(),
            },
            {
                $push: {
                    contactList: {
                        name: contactName.toLowerCase(),
                    },
                },
            }
        );
        // check if we have a chat db with these two. so we dont need to add it in messages document
        const isChat = await Chat.findOne({
            users: {
                $all: [username, contactName],
            },
        });
        if (!isChat) {
            const addChat = new Chat({
                users: [username, contactName],
                chat: [],
            });
            await addChat.save();
        }

        res.status(200).send(addContact);
    } catch (error) {
        res.status(400).send({ error });
    }
});
route.get('/contacts/:username', async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const contacts = await User.findOne({
            username: username.toLowerCase(),
        });
        res.status(200).send(contacts.contactList);
    } catch (error) {
        res.status(400).send({ error });
    }
});
export default route;
