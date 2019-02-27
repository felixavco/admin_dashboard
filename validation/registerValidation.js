const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = (req, res, next) => {
	let { name, email, password, password2 } = req.body;

	let errors = {};

	name = !isEmpty(name) ? Validator.trim(name) : '';
	email = !isEmpty(email) ? Validator.trim(email) : '';
	password = !isEmpty(password) ? Validator.trim(password) : '';
	password2 = !isEmpty(password2) ? Validator.trim(password2) : '';

	//Name Validation
	if (Validator.isEmpty(name)) {
		errors.name = 'Name is required!';
	} else if (!Validator.isLength(name, { min: 2, max: 30 })) {
		errors.name = 'Name must have between 2 and 30 characters!';
	}

	//Email Validation
	if (Validator.isEmpty(email)) {
		errors.email = 'Email is required';
	} else if (!Validator.isEmail(email)) {
		errors.email = 'Invalid email format';
	}

	//Password Validation
	if (Validator.isEmpty(password)) {
		errors.password = 'Password is required';
	} else if (!Validator.isLength(password, { min: 6, max: 30 })) {
		errors.password = 'Password must have between 6 and 30 characters!';
	}

	if (Validator.isEmpty(password2)) {
		errors.password2 = 'Confirm your password';
	} else if (!Validator.equals(password, password2)) {
		errors.password2 = "Passwords don't match";
	}

	if (!isEmpty(errors)) {
		return res.status(400).json(errors);
	}

	next();
};
