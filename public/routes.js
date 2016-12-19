app.config(function($routeProvider){
	$routeProvider
	.when('/signup',{
		templateUrl:'html/signup.html',
		controller:'SignUpController'

	})
	.when('/signupemployer',{
		templateUrl:'html/signupemployer.html',
		controller:'SignUpEmpController'

	})
	.when('/empdetatils-2',{
		templateUrl:'html/empdetatils-2.html',
		controller:'EmpDetailsController-2'

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
