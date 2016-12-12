app.config(function($routeProvider){
	$routeProvider
	.when('/signup',{
		templateUrl:'html/signup.html',
		controller:'SignUpController'

	})
	.when('/cvdetails-2',{
		templateUrl:'html/cvdetails-2.html',
		controller:'CvDetailsController-2'
	})
	.when('/cvdetails-3',{
		templateUrl:'html/cvdetails-3.html',
		controller:'CvDetailsController-3'
	})
	.when('/signupfacebook',{
		templateUrl:'html/signupfacebook.html',
		controller:'facebookcontroller'
	})
	.when('/dashboard',{
		templateUrl:'html/dashboard.html',
		controller:'DashboardController'
	})
	
})
