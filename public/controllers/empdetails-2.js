app.controller('EmpDetailsController-2',['$scope','$http','$location',function($scope,$http,$location){
	console.log("Loading EMP 2 Page");
	$scope.location='',
	$scope.cno='',
	$scope.designation='',
	$scope.industry='',
	$scope.submit=function(){
		console.log($scope.username)
		$http.post('/empdetails',{
			CompanyNumber:$scope.cno,
			userid:$scope.username,
			Location:$scope.location,
			Designation:$scope.designation,	
			Industry:$scope.industry,
				

		}).then(function(resp){
				console.log("form is valid");
				
				$location.path('/dashboard');
			
		})
	};
}]);