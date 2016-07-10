angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', ['$http', '$location', '$q', function($http,  $location, $q){
	var domain = 'http://design2code.in.md-in-25.webhostbox.net/comcom.com/services/';
	return{
		isloggedIn : isloggedIn,
    welcomeText : welcomeText,
    clearCookies : clearCookies,
    getUser : getUser,
		login: doLogin,
		register: doRegister,
		words: getWords
	}

	function isloggedIn() {
    	if (window.localStorage.getItem('loggedin') == 'true') {
    		return true;
    	}else{
    		return false;
    	}
    }

    function getUser(){
    	return window.localStorage.getItem('user');
    }


    function welcomeText(){
    	if(window.localStorage.getItem('loggedin') == 'true'){
    		return "Hello, " + getUser();
    	}else{
    		return "Hello";
    	}
    }

    function getUser(){
    	return window.localStorage.getItem('user');
    }

    function clearCookies(){
    	window.localStorage.removeItem("loggedin");
    	window.localStorage.removeItem("user");
    }

	function doLogin(user){
		var deferred = $q.defer();
		$http.post(domain+"login", user).
		  success(function(data, status, headers, config) {
			  deferred.resolve(data[0]);
		  }).
		  error(function(data, status, headers, config) {
			  deferred.resolve({});
		  });
		return deferred.promise;
	}

	function doRegister(registerUser){
		var deferred = $q.defer();
		$http.post(domain+"register", registerUser).
		  success(function(data, status, headers, config) {
			  deferred.resolve(data[0]);
		  }).
		  error(function(data, status, headers, config) {
			  deferred.resolve({});
		  });
		return deferred.promise;
	}

	function getWords(){
		var deferred = $q.defer();
		$http.get(domain+"words").
		  success(function(data, status, headers, config) {
			  deferred.resolve(data);
		  }).
		  error(function(data, status, headers, config) {
			  deferred.resolve({});
		  });
		return deferred.promise;
	}
}]);
