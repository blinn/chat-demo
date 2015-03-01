'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 _ = require('lodash'),
 User = mongoose.model('User');

 exports.addFriend = function(req, res) {
 	var name = req.query.name;
 	var currentUser = req.user._id;
 	User.findOne({_id: req.user._id}).populate('friends', 'username').exec(function (err, user) {
 		var friends = user.friends;
 		for(var i = 0; i < friends.length; i++){
 			if(friends[i].username === name){
 				return res.status(200).send({
		 			message: 'Already friends with this user',
		 			data: null
		 		});
		 	}
 		}
 		User.findOne({username: name}).populate('friend').exec(function(err, data) {
			if (err) return res.status(500).send('contact addMsg error: ' + err);
			if (!data) {
				return res.status(200).send({
					message: 'No account with that username was found',
					data: null
				});
			}
			if(data){
				User.update({_id: req.user._id}, {$push: {'friends': data._id}}, function(err, numAffected, rawResponse) {
					if (err) {
						return res.status(500).send({
							message: 'Error adding friend',
							data: null
						});
					}
					console.log(data);
					return res.status(200).send({
						message: 'Success',
						data: data});
				});
			}
		});	
	 	
	 });
 };

 exports.getFriends = function(req, res) {
 	User.findOne({_id: req.user.id}).populate('friends').exec(function (err, data) {
 		if(err) {
 			return res.status(500).send({
 				message: 'Error adding friend',
 				data: null
 			});
 		}
 		return res.status(200).send({
 			message: 'Success',
 			data: data.friends});
 	});
 };



// User.findOne({_id: req.user._id}, {friends: 1}).populate('friends', 'id').exec(function (err, data) {
//  		return res.json(data);
//  		if(err) {
//  		} else {
//  			debugger;
//  			var id = data.id;
//  			var friends = data.friends;
//  			for(var i = 0; i < friends.length; i++){
//  				if(friends[i].id.toString() === id) {
//  					return res.status(200).send({
//  						message: 'User already a friend',
//  						data: null
//  					});
//  				}
//  			}
//  			User.findOne({username: name}, {_id:1, username:1}).exec(function(err, data) {
//  				if (err) res.status(500).send('contact addMsg error: ' + err);
//  				if (!data) {
//  					return res.status(200).send({
//  						message: 'No account with that username was found',
//  						data: null
//  					});
//  				}
//  				if(data){
//  					User.update({_id: req.user._id}, {$push: {'friends': data._id}}, function(err, numAffected, rawResponse) {
//  						if (err) {
//  							return res.status(500).send({
//  								message: 'Error adding friend',
//  								data: null
//  							});
//  						}
//  						console.log(data);
//  						return res.status(200).send({
//  							message: 'Success',
//  							data: data});
//  					});
//  				}
//  			});	
//  		}
//  	});