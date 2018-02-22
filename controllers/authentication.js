
const User = require('../Model/user')
const JWT = require('jwt-simple');
const keys = require('../config/keys');

function userToken(user){
	const timeStamp = new Date().getTime();
	return JWT.encode({sub: user.id, iat: timeStamp}, keys.jwtSecret);
}

exports.signin = function(req, res, next){

	res.send({token: userToken(req.user)})
}

exports.signup = function (req, res, next){

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({email: email}, function(err, existingUser){

		if(!email || !password){
			return res.status(422).send({error: "You must enter email and password"})
		}

		if(existingUser){

			res.status(422).send({error: "Email is in use"});
		}

		const user = new User({email: email, password: password});

		user.save( function(err){
			if(err){
				return next(err);
			}

			res.send({token: userToken(req.user)});
			})

	})


}