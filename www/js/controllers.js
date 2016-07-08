angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope, BlankService, $state) {
	$scope.isLoggedIn = BlankService.isloggedIn();
	$scope.user = {username:null,password:null};
    $scope.submit = function() {
    	BlankService.login($scope.user).then(function(data){
    		if(data.first_name == undefined){
				  ngToast.warning({content: 'Invalid credentials! Please try again!'});
			  }else{
				  window.localStorage.setItem('loggedin', 'true');
				  window.localStorage.setItem('user', data);
				  $state.go('menu.face');
			  }
    	});
	};
})
   
.controller('signupCtrl', function($scope, BlankService,$state) {
	$scope.isLoggedIn = BlankService.isloggedIn();
	$scope.user = {first_name:null,last_name:null,address:null,phone:null,city:null,state:null,email:null,reemail:null,username:null,password:null};
    $scope.submit = function() {
    	BlankService.register($scope.user).then(function(data){
    		if(data.first_name == undefined){
    			  ngToast.warning({content: 'Failed to register User! Please try again!'});
    		  }else{
    			  window.localStorage.setItem('loggedin', 'true');
    			  window.localStorage.setItem('user', data);
    			  $state.go('menu.face');
    		  }
    	});
	};
})
      
.controller('faceCtrl', function($scope, BlankService,$state) {
	$scope.isLoggedIn = BlankService.isloggedIn();
	if(!$scope.isLoggedIn){
		$state.go('menu.login');
	}
})
   
.controller('speechCtrl', function($scope,BlankService,$state) {
	$scope.isLoggedIn = BlankService.isloggedIn();
	if(!$scope.isLoggedIn){
		$state.go('menu.login');
	}
})

.controller('logoutCtrl', function($scope,BlankService) {
	BlankService.clearCookies();
})
 