var mysql = require('./mysql');
var moment = require('moment');

function getLogin(req, res){
	res.render('login');
};

function postLogin(req, res) {
	// check user already exists
	var getUser="select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0) {
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				res.render('index', { userData: jsonParse[0], moment: moment });
			} else {    
				res.render('badauth');
			}
		}  
	},getUser);
};

function getSignup(req, res){
	res.render('signup');
};

function postSignup(req, res){
	// check user already exists
	var checkUser="select * from users where username='"+req.param("username")+"'";

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		} else {
			if(results.length > 0) {
				res.render('dupuser');
			} else {    
				var createUser = "insert into users (firstName,lastName,dateOfBirth,username,password,gender) " +
						"values ('"+req.param("firstName")+"','"+req.param("lastName")+"','"+req.param("dateOfBirth")+"','"+req.param("username")+"','"+req.param("password")+"','"+req.param("gender")+"')";
				mysql.pushData(function(err,results){
					if(err){
						throw err;
					} else {
						postLogin(req,res);
					}  
				},createUser);
			}
		}  
	},checkUser);
};

function getBadauth(req, res){
	res.render('badauth');
};

exports.getLogin = getLogin;
exports.postLogin = postLogin;
exports.getSignup = getSignup;
exports.postSignup = postSignup;
exports.getBadauth = getBadauth;