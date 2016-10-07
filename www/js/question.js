'use strict';
angular.module('questionApp',[])
.controller('questionCtrl',function($scope,$http,$window){
	document.addEventListener("backbutton", backKeyDown, false);
	var video = JSON.parse($window.localStorage.getItem("video"));
	$scope.questions = JSON.parse($window.localStorage.getItem('questions'));
	$scope.options = []
	$scope.answer='';
	$scope.score=0;
	if($window.localStorage.getItem("questionCounter") == null){
		$scope.questionType=$scope.questions[0].type;
		$scope.questionText=$scope.questions[0].question;
		$scope.options=$scope.questions[0].options.split(",");
		$scope.answer = $scope.questions[0].answer;
		$scope.score = $scope.questions[0].no_of_points;
	}
	else{
		var count = parseInt($window.localStorage.getItem("questionCounter"));
		$scope.questionType = $scope.questions[count].type;
		$scope.questionText = $scope.questions[count].question;
		$scope.options = $scope.questions[count].options.split(",");
		$scope.answer = $scope.questions[count].answer;
		$scope.score = $scope.questions[count].no_of_points;
	}
	
	document.getElementById("next").addEventListener("click", function(){
		console.log($scope);
		var options = document.getElementsByName('options');
		var selectedValue;
		for(var i = 0; i < options.length; i++){
			if(options[i].checked){
				selectedValue = $scope.options[i];
			}
		}
		
		if(selectedValue == $scope.answer){
			console.log(selectedValue);
			var score = $window.localStorage.getItem("score");
			if(score == null){
				$window.localStorage.setItem("score", $scope.score);	
			}
			else{
				$window.localStorage.setItem("score", parseInt(score) + parseInt($scope.score));
			}
			console.log($window.localStorage.getItem("score"));
		}
		
		
		/*if(parseInt($window.localStorage.getItem("questionCounter")) == ($scope.questions.length - 1)){
						
			$http({
				method :'POST',
				url:'http://localhost:81/test/question_controller.php',
				data: {access_token : $window.localStorage.getItem("access_token"), score : parseInt($window.localStorage.getItem("score"))},
				headers:{'Content-Type':'application/x-www-form-urlencoded'}
			})
			.then(function successCallback(response) {
				alert($window.localStorage.getItem("score"));
				console.log(response);
			}, 
			function errorCallback(response) {
				console.log(response);
			});
		}*/
		if(($window.localStorage.getItem("questionCounter") == null) || parseInt($window.localStorage.getItem("questionCounter")) < ($scope.questions.length) - 1){
			$window.localStorage.setItem("questionCounter", parseInt($window.localStorage.getItem("questionCounter") + 1));
			$window.location = "QuestionScreen.html";
		}
		
	},false);
	
	
	function backKeyDown() {
		$window.location = "VideoScreen.html"
	}
	
	
	
	
});