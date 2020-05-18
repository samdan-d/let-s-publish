const Joi = require('@hapi/joi');

module.exports.registerSchema = Joi.object({
	username: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password');

module.exports.loginSchema = Joi.object({
	username: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

module.exports.validateBodySchema = (schema, property) => {
	return (req, res, next) => {
		const {value, error} = schema.validate(
			req.body, {
				presence: 'required',
				abortEarly: false
			});
		const valid = error == null;
		if (valid) {
			req.value = value;
			next();
		} else {
			const {details} = error;
			const message = details.map(i => ({
				[i.path[0]]: {
					message: i.message,
					type: i.type
				}
			}));
			res.status(400).json({error: message})
		}
	};
};
