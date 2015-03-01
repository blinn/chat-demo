'use strict';

module.exports = function(app) {
	// Routing logic   
	var chat = require('../../app/controllers/chat.server.controller');
	app.route('/addFriend').get(chat.addFriend);
	app.route('/getFriends').get(chat.getFriends);
};