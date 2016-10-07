'use strict';
		adston.controller('play-ctrl',function($scope,$http,$window,$sce){
		document.addEventListener("backbutton", backKeyDown, false);
		$scope.showme=true;
		var vid = document.getElementById("video1");
		vid.addEventListener("canplay", function() {
			document.getElementById("giphy").style.display="none";
			vid.style.display="block";
			vid.play();
		});
		
		var video = JSON.parse($window.localStorage.getItem("video"));
		var auth = $window.localStorage.getItem("access_token");
		$http({
			method :'POST',
			url:'http://54.208.229.254/video_controller.php',
			//url:'http://localhost:81/test/video_controller.php',
			data: {video_id : video.video_id, auth_token : auth},
			headers:{'Content-Type':'application/x-www-form-urlencoded'}
			})
			.then(function successCallback(response) {
				console.log(response);
				$window.localStorage.setItem('questions',JSON.stringify(response.data.questions));
				var video_url = $sce.trustAsResourceUrl(response.data.video_url);
				var element = document.getElementById('video1');
				var source = document.createElement('source');
				source.src = response.data.video_url;
				source.type = "video/mp4";
				element.setAttribute('poster',video.poster_url);
				element.appendChild(source);
				if(element.canPlayType && element.canPlayType('video/mp4').replace(/no/, '')) {
					console.log(true);
				}
				
				element.addEventListener('ended',function(){
                    // $window.localStorage.removeItem("questionCounter");
                    //$window.localStorage.removeItem("score");
                    window.location = 'QuestionScreen.html';
                });

				//$window.screen.lockOrientation('landscape');
			}, function errorCallback(response) {
				console.log(response);
			});	
		
			function backKeyDown() {
				//$window.screen.unlockOrientation();
				//$window.screen.lockOrientation('potrait');
				$window.location = "VideoScreen.html"
			}
		});