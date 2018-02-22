
const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');

const saltRounds = 10;

const UserSchema = new Schema({
	
	email: {type: String, unique: true, lowercase:true},
	password: String
})

UserSchema.pre('save', function(next){

	const user = this; 

	bcrypt.genSalt(saltRounds, function(err, salt){

		if(err){
				return next(err);
			}

		bcrypt.hash(user.password, salt, null, function(err, hash){

			if(err){
				return next(err);
			}

			user.password = hash;
			next();
		})
	})
})


UserSchema.methods.comparePassword = function(candPassword, callback){
	bcrypt.compare(candPassword, this.password, function(err, isMatch){
		if(err){
			return callback(err);
		}
		callback(null, isMatch);
	})
} 


const User = mongoose.model("users", UserSchema);

module.exports = User;