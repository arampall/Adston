var app1=angular.module('signup',['ngSanitize']);

app1.config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }]);
app1.controller('signupCtrl',['$scope','$window','$http','$filter','$sce',function($scope,$window,$http,$filter,$sce){
			$scope.patternObj={
			text: /^[-\sa-zA-Z ]+$/,
			number: /^[0-9]{10}$/,
			zip: /^[0-9]{5}$/,
			email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
			};
			$scope.user={};
			if(sessionStorage.getItem("fName")==null||sessionStorage.getItem("fName")==undefined){
			$scope.user.user_fname="";
			}
			else{
				$scope.user.user_fname=sessionStorage.getItem("fName");
			}
			
			if(sessionStorage.getItem("lName")==null){
			$scope.user.user_lname="";
			}
			else{
				$scope.user.user_lname=sessionStorage.getItem("lName");
				
			}
			
			if(sessionStorage.getItem("dob")==null){
			$scope.user.user_dob="";
			}
			else{
				$scope.user.user_dob=sessionStorage.getItem("dob");
			}
			
			if(sessionStorage.getItem("mobile")==null){
			$scope.user.user_contact="";
			}
			else{
				$scope.user.user_contact=sessionStorage.getItem("mobile");
				
			}
			 
			if(sessionStorage.getItem("address_line1")==null){
			$scope.user.user_address_line1="";
			}
			else{
				$scope.user.user_address_line1=sessionStorage.getItem("address_line1");
			}
			
			if(sessionStorage.getItem("address_line2")==null){
			$scope.user.user_address_line2="";
			}
			else{
				$scope.user.user_address_line2=sessionStorage.getItem("address_line2");
			}
			if(sessionStorage.getItem("state")==null){
			$scope.user.user_state="";
			}
			else{
				$scope.user.user_state=sessionStorage.getItem("state");
			}
			
			$scope.getGender=function(event){
				$window.sessionStorage.setItem("gender",event.target.id);
			};
			
			$scope.getState=function(){
				sessionStorage.setItem("fName",$scope.user.user_fname);
				sessionStorage.setItem("lName",$scope.user.user_lname);
				sessionStorage.setItem("dob",$scope.user.user_dob);
				sessionStorage.setItem("mobile",$scope.user.user_contact);
				sessionStorage.setItem("address_line1",$scope.user.user_address_line1);
				sessionStorage.setItem("address_line2",$scope.user.user_address_line2);
				$window.location.href="States.html";
			};
			
			$scope.createAccount=function(){
				console.log("form submitted");
				$scope.user.user_gender=sessionStorage.getItem("gender");
				var date=new Date();
				date=$filter('date')(date,"yyyy-MM-dd");
				if($scope.user.user_dob<date){
					$scope.user.method = "signup";
					$http({
					method :'POST',
					url:'http://localhost:81/test/user_controller.php',
					data:$scope.user,
					headers:{'Content-Type':'application/x-www-form-urlencoded'}
					})
					.then(function successCallback(response) {
						console.log(response);
						//$window.location.href="Login.html";
					}, function errorCallback(response) {
						console.log('fail');
					}); 
				}
				else{
					$scope.user.user_dob="";
					$scope.date="err";
					$scope.doberror = $sce.trustAsHtml("<h5 style='color:red;'>Invalid date of Birth</h5>");
				}
			};
			
		}]);