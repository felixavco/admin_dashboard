const bcrypt = require('bcrypt');
const User = require('../models/User');

//Renders the register Page
exports.GET = (req, res) => {
	res.render('auth/register', { title: 'Register' });
};

//Encrypts the password and saves the new user in the DB
exports.POST = async (req, res) => {
	try {
		let { email, password, name } = req.body;

		const user = await User.findOne({ email });

		if (user) {
      return res.status(409).json({error: "Email address already in use"});
    }
    
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) throw err;
				const newUser = { name, email, password:hash };
        //Saves the new user 
				await User.create(newUser);
			});
		});

		res.status(200).json({ msg: 'user created!' });
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
