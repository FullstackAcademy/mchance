var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/instert-db-name-here').connection;
var mchance = require('./index')(db);

db.model('User', new mongoose.Schema({
	email: {
		type: String,
		seed: mchance.email
	}
}));

db.model('Comment', new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	text: {
		type: String,
		seed: mchance.paragraph
	}
}));

db.seed({
	User: 1, 	// generate 1 user
	Comment: 2 	// generate 2 comments
})
.then(function (dbCache) {
	// dbCache contains refs and *saved* documents
	console.log('---seeded users---');
	console.log(dbCache.User);
	console.log('---seeded comments---');
	console.log(dbCache.Comment);
});