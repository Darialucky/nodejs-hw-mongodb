import Joi from 'joi';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\d+$/)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Phone number should be a string',
      'string.pattern.base': 'Phone number should contain only digits',
      'string.min': 'Phone number should have at least {#limit} characters',
      'string.max': 'Phone number should have at most {#limit} characters',
      'any.required': 'Phone number is required',
    }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .default('personal')
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': 'Contact type must be one of [work, home, personal]',
      'any.required': 'Contact type is required',
    }),
  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'IsFavourite should be a boolean value',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^\d+$/).min(3).max(20),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  isFavourite: Joi.boolean().default(false),
});
