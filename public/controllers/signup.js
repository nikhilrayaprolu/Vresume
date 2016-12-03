
app.controller('SignUpController',['$scope','$http','AuthService','$location',function($scope,$http,AuthService,$location){
	if(AuthService.isAuthenticated()){
//		console.log(AuthService.isAuthenticated());
		$location.path('/dashboard');
	}

	console.log("Loading Page");
	$scope.name='',
	$scope.password='',
	$scope.FirstName='',
	$scope.LastName='',
	$scope.email='',
	$scope.phone='',
	$scope.dob='',


$scope.submit=function(){
AuthService.register({
	name:$scope.name,
	password:$scope.password,
	FirstName:$scope.FirstName,
	LastName:$scope.LastName,
	email:$scope.email,
	phone:$scope.phone,
	dob:$scope.dob,
	userType:0,
}).then(function(msg) {
   AuthService.login({
	name:$scope.name,
	password:$scope.password,

}).then(function(msg) {
	console.log(msg);
      if($scope.userType==0){
      	$location.path('/dashboard');
      	//window.location="http://localhost:8080/coursesfaculty";

      }else if($scope.userType==1){
      	//window.location="/coursesstudent";
      	$location.path('/dashboard')
      }else{
      	Materialize.toast("wrong login", 4000)
		 $scope.msg="wrong login";
		 $scope.$digest();
      	$location.path('/signup')


      };

    }, function(errMsg) {
      alert("unsuccess");
    });
    }, function(errMsg) {
      alert("registration is not successfull")
    });
  };
}]);


app.controller('SignInController',['$scope','$http','AuthService','$location',function($scope,$http,AuthService,$location){

	$scope.password='',
			$scope.user={
	name:$scope.name,
	password:$scope.password,

};
$scope.forgotpassword=function(){
	$location.path('/forgotpasswordrequest');
}
$scope.submit=function(){

    AuthService.login({
	name:$scope.name,
	password:$scope.password,

}).then(function(msg) {
	$scope.username=window.localStorage.user;
	$scope.profilepic=window.localStorage.profilepic;
	$scope.userType=0;
	$scope.$digest();
	console.log(msg);
      if($scope.userType==0){
      	//$location.path('/dashboarduser');
      	window.location="/dashboard";

      }else if($scope.userType==1){
      	window.location="/dashboard";
      	//$location.path('/dashboarduser')
      }else{
		Materialize.toast("wrong login", 4000)
		 $scope.msg="wrong login";
		 $scope.$digest();
      	$location.path('/signup')

      };

    }, function(errMsg) {
      alert("unsuccess");
      Materialize.toast("wrong login", 4000)
		 $scope.msg="wrong login";
		 $scope.$digest();
      	$location.path('/signup')

    });

};

	$scope.$on('auth-not-authenticated',function(event){
		AuthService.logout();
	alert("login again");
	});

}]);
