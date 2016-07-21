'use strict';

$(function(){

	//$('.list-group').hide();
	
	$('#slide-submenu').closest('.list-group').fadeOut('slide',function(){
        	$('.mini-submenu').fadeIn();	
        });

	$('#slide-submenu').on('click',function() {			        
        $(this).closest('.list-group').fadeOut('slide',function(){
        	$('.mini-submenu').fadeIn();	
        });
        
      });

	$('.mini-submenu').on('click',function(){		
        $(this).next('.list-group').toggle('slide');
        //$('.mini-submenu').hide();
	})
})

angular.module('video_app',[])
		.controller('video-ctrl',function($scope,$http,$window,$sce,$timeout){
			document.addEventListener("backbutton", backKeyDown, false);
			var videos = JSON.parse($window.localStorage.getItem("daily_list"));
			$scope.videos_daily = videos;
			
			$scope.getVideo = function(video_details){
				$window.localStorage.setItem("video",JSON.stringify(video_details));
				$window.location = "PlayScreen.html";				
			};
			
			$scope.goToQueue = function(index){
				$window.localStorage.setItem("index",index);
				$window.location = "QueueScreen.html";		
			};
			
			function backKeyDown() {
				navigator.app.exitApp();
			}
		});