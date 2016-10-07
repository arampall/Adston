
	adston.config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])
        .controller('checkLogin',function($scope,$http,$window,$filter, shuffle){
            $scope.user = {};
			$scope.user.email_id = "krunal57@gmail.com";
			$scope.user.user_pass = "krunal";
			$scope.user.method = "login";
            $scope.submitForm = function(){
                $http({
                method :'POST',
                //url:'http://54.208.229.254/user_controller.php',
				url:'http://localhost:81/test/user_controller.php',
                data:$scope.user,
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
                })
                .then(function successCallback(response) {
                    if(response.data.code==0){
						console.log(response.data);
						$window.localStorage.setItem("access_token",response.data.access_token);				
						var shuffled_arr = shuffle(response.data.queue_data);
						var category_list = response.data.category_data;
						$window.localStorage.setItem("category_list",JSON.stringify(category_list));
						console.log(shuffled_arr[0]);
						$window.localStorage.setItem("daily_list",JSON.stringify(shuffled_arr[0]));
						$window.localStorage.setItem("queue_data",JSON.stringify(shuffled_arr[1]));
						$window.location = "VideoScreen.html";					
                    }
                    else{
                        $scope.status = response.data.message;
						console.log(response);
                    }
                }, function errorCallback(response) {
					console.log(response);
                    $window.alert(response.status);
                });
            };
			
			$scope.goToSignUp = function(){
				$window.location = "signup.html"
			}
			
        });