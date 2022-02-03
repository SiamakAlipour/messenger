import express, { Request, Response, Router } from 'express';
import { registerValidation } from '../validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

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
route.get('/:_id', (req: Request, res: Response) => {
    const { _id } = req.params;
    try {
        const user = User.findOne({ _id: _id });
    } catch (error) {
        res.status(400).json({ error });
    }
});
// register a user
route.post('/register', async (req: Request, res: Response) => {
    const { username, password, repeat_password, email, admin } = req.body;

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
    res.send({ userFind, token });
    // res.header('auth-header', token).send({
    //     _id: userFind._id,
    //     username: userFind.username,
    //     email: userFind.email,
    //     admin: userFind.admin,
    //     token,
    // });
});
export default route;
