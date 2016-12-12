var app=angular.module('Vresume',['ngRoute','ngAnimate','ngFileUpload']);
app.controller('MainController',['$location','$scope','$http','$routeParams','AuthService',function($location,$scope,$http,$routeParams,AuthService){
	$scope.isAuthenticated=function(){
		return AuthService.isAuthenticated()};
	$scope.username=window.localStorage.user;
	console.log($scope.username);
	AuthService.usertoken();

	$scope.LogOut=function(){
		AuthService.logout();
		window.location='/index.html'
	}

/*	var socket = io.connect();
	$scope.socket=socket;
	socket.on('connect',function(){
		if($scope.username){
			socket.emit('username',$scope.username);
		}else{

		}
	});
	$scope.usersonline={};
	socket.on('usersonline',function(data){
		console.log(data);
		$scope.usersonline=data;

		$scope.$digest();
		console.log("checkme");
		console.log($scope.usersonline);
	})

	socket.on('online',function(data){

		$scope.usersonline[data]=true;
		$scope.$digest();
		console.log(data);
	})

	socket.on('offline',function(data){
		$scope.usersonline[data]=false;
		$scope.$digest();
		console.log(data);
	})
	socket.on('notification',function(data){
		console.log("success");
		//alert(data.msg);
		 $('#modal1').openModal();
		 Materialize.toast(data.msg, 4000)
		 $scope.msg=data.msg;
		 $scope.$digest();
	})
	*/
	$scope.LogOut=function(){
		AuthService.logout();
		window.location='/'
	}
	$scope.searchtag='';
	
	$scope.results=[];
	$scope.searchnow=function(){
		$http.post('/searchtag',{searchtag:$scope.searchtag}).then(function(response){
			$scope.results=response.data;
		})
	}
	$scope.getuser=function(){
    $http.post("/users",{username:$scope.username}).then(function(response){
      $scope.name=response.data.name;
      $scope.FirstName=response.data.FirstName;
      $scope.email=response.data.email;
      $scope.LastName=response.data.LastName;
      $scope.userType=response.data.userType;
      $scope.Speciality=response.data.Speciality;
      console.log("the data is "+ $scope.name);
		});
	};
  console.log("loaded updateprofile")
  $scope.getuser();

	}]);
