var mongoose = require('mongoose');
var dbURI = 'mongodb://personal-page:312171@ds059634.mongolab.com:59634/personal-page';

mongoose.connection.on('connected', function(){
  console.log('connected');
})

mongoose.connection.on('error', function(err){
  console.log('err', err);
})

mongoose.connection.on('disconnected', function(){
  console.log('disconnected');
})

var userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true}, // MongoDB defines a index on email field
  createdOn: {type: Date, default: Date.now},
  modifiedOn: Date,
  lastLogin: Date
});

mongoose.model('User', userSchema);

mongoose.connect(dbURI);



var User = mongoose.model('User');

module.exports.FindUser = function() {
 User.findOne({}, function (err, res){
  console.log(res)
 });
};

