const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = mongoose.model('User');
const v = require('./validation');

module.exports = r => {
	r.get('/', async (req, res) => {
		res.send('profile api');
	});

	// authentication & authorization
	// check username & username and create new user then return access & refresh token
	r.post('/register', v.validateBodySchema(v.registerSchema), async (req, res) => {
		try {
			const {username, password} = req.value;
			const newUser = await User.create({username, password});
			res.json({
				access_token: createAccessToken(newUser),
				refresh_token: newUser.refreshToken
			});
		} catch (e) {
			res.status(400).json(e);
		}
	});

	// gets access & refresh token
	r.get('/login', v.validateBodySchema(v.loginSchema), async (req, res) => {
		try {
			const {username, password} = req.value;
			const user = await User.findOne({username});
			const authenticated = await bcrypt.compare(password, user.password);
			if (!authenticated) throw Error('missing data')
			user.refreshToken();
			res.json({
				access_token: createAccessToken(user),
				refresh_token: user.refreshToken
			});
		} catch (e) {
			console.log(e);
			res.status(401).send({error: "username or password wrong"});
		}
	});

	// check refresh token and return access token
	r.post('/refresh-token');

	// features
	// only admin can get this
	r.get('/all', authenticate);

	// user get own information
	r.get('/self', authenticate);
	return r;
};

function authenticate(req, res, next) {
}

function createAccessToken(user) {
	return jwt.sign({
		id: user._id,
		username: user.username,
		isAdmin: user.isAdmin,
		images: user._images
	}, 'secret-access');
}