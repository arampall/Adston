angular.module('login',[])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])
        .controller('checkLogin',function($scope,$http,$window,$filter){
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
						console.log(response.data);
						$window.localStorage.setItem("access_token",response.data.access_token);
						var arr=[], scheduled_arr;
						scheduled_arr = JSON.parse($window.localStorage.getItem("scheduled_list"));
						if(scheduled_arr==null){
							scheduled_arr = [];
						}
						//scheduled_arr = [{date:28,position:2,time:"",video:{}}, {date:28,position:6,time:"",video:{}}];
						var today = new Date();
						var dd = today.getDate();
						var scheduled_list_arr = $filter("filter")(scheduled_arr, {date:today.getDate()});
						console.log(scheduled_list_arr);
						
						for(var i=0;i<Object.keys(response.data.queue_data).length;i++){
							arr.push.apply(arr,response.data.queue_data[Object.keys(response.data.queue_data)[i]]);
						}
						arr = shuffle(arr);
						//daily_arr = arr.slice(0,12);
						//queue_arr = arr.slice(12);
						daily_arr = arr.slice(0,12-scheduled_list_arr.length);
						for(var i=0;i<scheduled_list_arr.length;i++){
							daily_arr.splice(scheduled_list_arr[i].position,0,scheduled_list_arr[i].video);
						}
						console.log(daily_arr);
						queue_arr = arr.slice(12-scheduled_list_arr.length);
						var category_list = Object.keys(response.data.queue_data);
						$window.localStorage.setItem("category_list",JSON.stringify(category_list));
						$window.localStorage.setItem("daily_list",JSON.stringify(daily_arr));
						$window.localStorage.setItem("queue_data",JSON.stringify(queue_arr));
						//$window.localStorage.removeItem("scheduled_list");
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