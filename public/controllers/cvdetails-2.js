
app.controller('CvDetailsController-2',['$scope','$http','$location',function($scope,$http,$location){
	console.log("Loading CV 2 Page");
	$scope.location='',
	$scope.wexp='',
	$scope.profile_desc='',
	$scope.key_skills='',
	$scope.industry='',
	$scope.functional_area='',
	$scope.noofeducations=1;
	$scope.arr=[];
	$scope.incrementeducation=function(){
		$scope.noofeducations+=1;
	}
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.submit=function(){
		$http.post('/cvdetails',{
			userid:$scope.userid,
			Location:$scope.location,
			WorkExperience:$scope.wexp,
			ProfileDescription:$scope.profile_desc,
			Keyskills:$scope.key_skills,
			Industry:$scope.industry,
			FunctionalArea:$scope.functional_area,
			//noofeducations:$scope.noofeducations,
			EducationBackGround:$scope.arr,
				

		}).then(function(resp){
			if(cv2form.$valid)
			{
				console.log("form is valid");
				console.log(req.params);
				$location.path('/cvdetails-3');
			}
		})
	};
}]);

