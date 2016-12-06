app.config(function($routeProvider){
	$routeProvider
	.when('/signup',{
		templateUrl:'html/signup.html',
		controller:'SignUpController'

	})
	.when('/signupfacebook',{
		templateUrl:'html/signupfacebook.html',
		controller:'facebookcontroller'
	})
	
})
