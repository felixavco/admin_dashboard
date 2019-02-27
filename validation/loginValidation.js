const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = (req, res, next) => {
	let { email, password } = req.body;

	let errors = {};

	email = !isEmpty(email) ? Validator.trim(email) : '';
	password = !isEmpty(password) ? Validator.trim(password) : '';

	//Email Validation
	if (Validator.isEmpty(email)) {
		errors.email = 'Please enter your Email address';
	} else if (!Validator.isEmail(email)) {
		errors.email = 'Invalid email format';
	}

	//Password Validation
	if (Validator.isEmpty(password)) {
		errors.password = 'Please enter your Password';
	} else if (!Validator.isLength(password, { min: 6, max: 30 })) {
		errors.password = 'Incorrect Password!';
	}

	if (!isEmpty(errors)) {
		return res.status(400).json(errors);
	}

	next();
};
