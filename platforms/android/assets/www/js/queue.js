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

angular.module('video_queue',[])
		.controller('queue-ctrl',function($scope,$http,$window,$sce){
		var queue = JSON.parse($window.localStorage.getItem("queue_data"));
		var daily_list = JSON.parse($window.localStorage.getItem("daily_list"));
		document.addEventListener("backbutton", backKeyDown, false);
		$scope.queue_list = queue;	
		$scope.category_list = JSON.parse($window.localStorage.getItem("category_list"));
		$scope.swapVideo = function(video){
			if ($window.localStorage.getItem("index")) {
				if($window.confirm("Please confirm?")){
					var video_old = daily_list[$window.localStorage.getItem("index")];
					daily_list[$window.localStorage.getItem("index")] = video;
					queue_index = queue.indexOf(video);
					queue.splice(queue_index,1);
					queue.push(video_old);
					$window.localStorage.setItem("queue_data",JSON.stringify(queue));
					$window.localStorage.removeItem("index");
					$window.localStorage.setItem("daily_list",JSON.stringify(daily_list));
					$window.location = "VideoScreen.html";
				}	
				else {
					$window.location = "VideoScreen.html";
				}
			//navigator.notification.confirm(message,replace,[title],[buttonLabels]);
			}
		};
		
		function backKeyDown() {
			$window.location = "VideoScreen.html"
		}
		});