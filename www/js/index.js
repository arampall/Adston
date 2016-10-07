
	adston.config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])
		.controller('navigator',function($scope,$http,$window){
				var elem = document.getElementById("loadBar"); 
				var elem1 = document.getElementById("loadBar1"); 
				var width = 1;
				var id = setInterval(frame, 20);
				function frame() {
					if (width >= 100) {
						clearInterval(id);
						if($window.localStorage.getItem("access_token")!=null){
							accessValidator();
						}else{
							$window.location.href='Login.html';
						}
						
					} else {
						width++; 
						elem.style.width = width + '%'; 
						elem1.style.width = width + '%';
					}
				}
			
			function accessValidator(){
                $http({
                method :'POST',
                //url:'http://54.208.229.254/user_controller.php',
				url:'http://localhost:81/test/user_controller.php',
                data:{access_token:$window.localStorage.getItem("access_token"),method:'access'},
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
                })
				.then(function successCallback(response){
					if(response.data.auth_status=="yes"){
						var host = $window.location.host;
						$window.location.href='VideoScreen.html';
					}
					else{
						var host = $window.location.host;
						$window.location.href='Login.html';
					}
				}, function errorCallback(response) {
                    console.log(response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
					
				});
			}
	});