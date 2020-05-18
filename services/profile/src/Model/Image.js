const mongoose = require('mongoose');
const {Schema} = mongoose;

const imageSchema = new Schema({
	url: {
		type: String,
		required: true
	},
	isMain: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Image', imageSchema);