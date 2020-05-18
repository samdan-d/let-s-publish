const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {Schema} = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	_images: [{
		type: Schema.Types.ObjectId,
		ref: 'Image'
	}],
	refreshToken: String
}, {timestamps: true});

userSchema.toJSON = function (user) {
	console.log(user);
	return user;
};

userSchema.pre('save', function (next) {
	const user = this;
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}
		user.addRefreshToken();
		user.password = hash;
		next();
	})
});

userSchema.methods.addRefreshToken = function () {
	const user = this;
	user.refreshToken = jwt.sign({
		id: user._id,
	}, 'secret-refresh');
};

userSchema.methods.refreshToken = function (refreshToken) {
	const user = this;
	const decoded = jwt.decode(refreshToken);
	user.refreshToken = null;
}

mongoose.model('User', userSchema);