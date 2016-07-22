angular.module('login',[])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])
        .controller('checkLogin',function($scope,$http,$window){
            $scope.user = {};
			$scope.user.email_id = "krunal57@gmail.com";
			$scope.user.user_pass = "krunal";
			$scope.user.method = "login";
            $scope.submitForm = function(){
                $http({
                method :'POST',
                url:'http://54.208.229.254/user_controller.php',
                data:$scope.user,
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
                })
                .then(function successCallback(response) {
                    if(response.data.code==0){
						console.log(response.data.queue_data);
						$window.localStorage.setItem("access_token",response.data.access_token);
						var arr=[],scheduled_arr=[],i;
						for(i=0;i<Object.keys(response.data.queue_data).length;i++){
							arr.push.apply(arr,response.data.queue_data[Object.keys(response.data.queue_data)[i]]);
						}
						arr = shuffle(arr);
						daily_arr = arr.slice(0,12);
						queue_arr = arr.slice(12);
						var category_list = Object.keys(response.data.queue_data);
						$window.localStorage.setItem("category_list",JSON.stringify(category_list));
						$window.localStorage.setItem("daily_list",JSON.stringify(daily_arr));
						$window.localStorage.setItem("queue_data",JSON.stringify(queue_arr));
						$window.localStorage.setItem("scheduled_list",JSON.stringify(scheduled_arr));
						$window.location = "VideoScreen.html";					
                    }
                    else{
                        $scope.status = response.data.message;
                    }
                     
                // this callback will be called asynchronously
                // when the response is available
                }, function errorCallback(response) {
                    $window.alert(response.status);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                });
            };
			
			function shuffle(array) {
				var currentIndex = array.length, temporaryValue, randomIndex;

				// While there remain elements to shuffle...
				while (0 !== currentIndex) {
					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;
					// And swap it with the current element.
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}
				return array;
			}
        });