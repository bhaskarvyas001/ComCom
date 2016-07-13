angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, BlankService, $rootScope) {
	$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromStateParams) {
		$rootScope.isLoggedIn = BlankService.isloggedIn();
		$rootScope.usersName = BlankService.getUser() == undefined ? "" : JSON.parse(BlankService.getUser()).first_name;
	})
})

.controller('loginCtrl', function($scope, BlankService, $state, $rootScope, $ionicPopup) {
	$rootScope.isLoggedIn = false;
	$scope.user = {username:null,password:null};
    $scope.submit = function() {
    	BlankService.login($scope.user).then(function(data){
    		if(data.first_name == undefined){
				  $ionicPopup.alert({title: 'Error',template:'Invalid credentials! Please try again!'});
			  }else{
				  window.localStorage.setItem('loggedin', 'true');
				  window.localStorage.setItem('user', JSON.stringify(data));
				  $state.go('menu.face');
			  }
    	});
	};
})

.controller('signupCtrl', function($scope, BlankService,$state, $rootScope, $ionicPopup) {
	$rootScope.isLoggedIn = false;
	$scope.user = {first_name:null,last_name:null,address:null,phone:null,city:null,state:null,email:null,reemail:null,username:null,password:null};
    $scope.submit = function() {
      if($scope.user.email == $scope.user.reemail && $scope.user.username != null && $scope.user.password != null){
        	BlankService.register($scope.user).then(function(data){
        		if(data.first_name == undefined){
        			  $ionicPopup.alert({title: 'Error',template:'Failed to register User! Please try again!'});
        		  }else{
        			  window.localStorage.setItem('loggedin', 'true');
        			  window.localStorage.setItem('user', JSON.stringify(data));
        			  $state.go('menu.face');
        		  }
        	});
      }else{
        $ionicPopup.alert({title: 'Error',template:'Please fill all details.'});
      }
	};
})

.controller('faceCtrl', function($scope, BlankService, $state, $rootScope, $cordovaCamera, $ionicPopup) {
	$rootScope.isLoggedIn = BlankService.isloggedIn();
	if(!$rootScope.isLoggedIn){
		$state.go('menu.login');
	}

  //function to take photo
  $scope.takePhoto = function(){
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
        $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
     }, function(err) {
         $ionicPopup.alert({title: 'Error',template:'Error while taking photo -' + err});
     });
}

})

.controller('speechCtrl', function($scope, BlankService, $state, $rootScope, $ionicPopup) {
	$rootScope.isLoggedIn = BlankService.isloggedIn();
	if(!$rootScope.isLoggedIn){
		$state.go('menu.login');
	}

  $scope.textToSpeak = null;
  $scope.selectedTextToSpeak = null;
  $scope.words = [];
  BlankService.words().then(function(data){
    $scope.words = data;
  })

  //function to speak the text
  $scope.speak = function(){
		$scope.textToSpeak =  angular.element( document.querySelector( '#textToSpeak' ) )[0].value;
		$scope.selectedTextToSpeak =  angular.element( document.querySelector( '#selectedTextToSpeak' ) )[0].value;
		$scope.selectedTextToSpeak = $scope.selectedTextToSpeak.split(":")[1];
		$scope.isAndroid = ionic.Platform.isAndroid();
		if($scope.isAndroid){
		    TTS.speak({
            text: $scope.textToSpeak || $scope.selectedTextToSpeak,
            locale: 'en-GB',
            rate: 0.75
        }, function () {
            alert('success');
        }, function (reason) {
            alert(reason);
        });
		}else{
			var speech = new SpeechSynthesisUtterance($scope.textToSpeak || $scope.selectedTextToSpeak);
			speech.lang = 'en-US';
			speech.rate = .0001;
			speechSynthesis.speak(speech);
		}
  }
})

.controller('logoutCtrl', function($scope,BlankService, $state) {
	BlankService.clearCookies();
  $state.go('menu.logout');
})
