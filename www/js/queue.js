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
		.controller('queue-ctrl',function($scope,$http,$window,$sce,$filter){
		var queue = JSON.parse($window.localStorage.getItem("queue_data"));
		var daily_list = JSON.parse($window.localStorage.getItem("daily_list"));
		var scheduled_array=JSON.parse($window.localStorage.getItem("scheduled_list"))
		document.addEventListener("backbutton", backKeyDown, false);
		console.log(scheduled_array);
		if(scheduled_array==null){
			scheduled_array=[];
		}
		for(var i=0;i<scheduled_array.length;i++){
			queue.push(scheduled_array[i].video);
		}
		$scope.queue_list = queue;	
		$scope.category_list = JSON.parse($window.localStorage.getItem("category_list"));
		$scope.manageVideo = function(video){
		console.log($window.localStorage.getItem("index"));
			if ($window.localStorage.getItem("index")) {
				if($window.confirm("Please confirm?")){
					var video_old = daily_list[$window.localStorage.getItem("index")];
					daily_list[$window.localStorage.getItem("index")] = video;
					var timeslots = $filter("filter")(scheduled_array, {video:video});
					if(timeslots==null){
						timeslots=[];
					}
					var queue_change = JSON.parse($window.localStorage.getItem("queue_data"));
					if(timeslots.length!=0){
						var scheduled_index = scheduled_array.indexOf(timeslots[0].video);
						scheduled_array.splice(scheduled_index,1);
						$window.localStorage.setItem("scheduled_list",JSON.stringify(scheduled_array));
						queue_change.push(video_old);
					}
					else{
						queue_index = queue_change.indexOf(video);
						console.log(queue_index);
						for(var i=0;i<queue_change.length;i++){
							if(queue_change[i].video_id == video.video_id){
								queue_change.splice(i,1);
								break;	
							}
						}
						queue_change.push(video_old);
					}	
					$window.localStorage.setItem("queue_data",JSON.stringify(queue_change));
					$window.localStorage.removeItem("index");
					$window.localStorage.setItem("daily_list",JSON.stringify(daily_list));
					$window.location = "VideoScreen.html";
				}	
				else {
					$window.location = "VideoScreen.html";
				}

			}else{
				var timeslots = $filter("filter")(scheduled_array, {video:video});
				console.log(timeslots);
				var queue_index = queue.indexOf(video);
				if(timeslots==null){
					timeslots=[];
				}

				if(timeslots.length!=0){
					if($window.confirm("Video already scheduled.Change it?")){
						scheduled_array.splice(scheduled_array.indexOf(timeslots[0]),1);
						$window.localStorage.setItem("scheduled_list",JSON.stringify(scheduled_array));
						$window.sessionStorage.setItem("tempVideo",JSON.stringify(video));
						$window.location="calendar.html";
					}
				}
				else{
				$window.sessionStorage.setItem("tempVideo",JSON.stringify(video));
				$window.location="calendar.html";
				}		
			}
		};
		
		function backKeyDown() {
			$window.location = "VideoScreen.html";
		}
		});