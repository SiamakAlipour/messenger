import express, { Request, Response, Router } from 'express';
import { registerValidation } from '../validation';
import bcrypt, { hash } from 'bcryptjs';
import User from '../models/User';
import user from '../models/User';
const route: Router = express.Router();

route.get('/', (req: Request, res: Response) => {
    res.send('user route');
    // send users list
});
route.get('/register', async (req: Request, res: Response) => {
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
    if (checkEmailExist) res.status(400).send('this email already exists');

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
route.get('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const userFind = await User.findOne({ username: username.toLowerCase() });
    if (!userFind) return res.status(400).send('Invalid username or password');

    let token: string = 'token';

    res.header('auth-header', token).send({
        _id: userFind._id,
        username: userFind.username,
        password: userFind.password,
        email: userFind.email,
        admin: userFind.admin,
        token,
    });
});
export default route;
