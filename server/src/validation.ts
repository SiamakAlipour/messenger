import Joi from 'joi';

export const registerValidation = (data: object) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(30),
        password: Joi.string().min(8),
        repeat_password: Joi.ref('password'),
        email: Joi.string().email(),
        admin: Joi.bool(),
        avatar: Joi.string(),
    });

    return schema.validate(data);
};
