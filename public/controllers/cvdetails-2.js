
app.controller('CvDetailsController-2',['$scope','$http','$location',function($scope,$http,$location){
	console.log("Loading CV 2 Page");
	$scope.location='',
	$scope.wexp='',
	$scope.profile_desc='',
	$scope.key_skills='',
	$scope.industry='',
	$scope.functional_area='',
	$scope.noofeducations=1;
	$scope.noofskills=1;
	$scope.arr=[];
	$scope.skill=[];
	$scope.FullName='';
	$scope.MobileNumber='';
	$scope.results=[];
	$scope.searchnow=function(value){
		$http.post('/searchskill',{searchtag:value}).then(function(response){
			$scope.results=response.data;
	});
	};
$scope.incrementeducation=function(){
		$scope.noofeducations+=1;
	}
	$scope.incrementskills=function(){
		$scope.noofskills+=1;
	}

	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.submit=function(){
		console.log($scope.username)
		$http.post('/cvdetails',{
			FullName:$scope.FullName,
			MobileNumber:$scope.MobileNumber,
			userid:$scope.username,
			Location:$scope.location,
			WorkExperience:$scope.wexp,
			ProfileDescription:$scope.profile_desc,
			Keyskills:$scope.key_skills,
			Industry:$scope.industry,
			FunctionalArea:$scope.functional_area,
			//noofeducations:$scope.noofeducations,
			EducationBackGround:$scope.arr,
				

		}).then(function(resp){
				console.log("form is valid");
				
				$location.path('/cvdetails-3');
			
		})
	};
}]);

