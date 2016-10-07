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

		adston.controller('video-ctrl',function($scope,$http,$window,$sce,$timeout,$interval, shuffle){
			document.addEventListener("backbutton", backKeyDown, false);
			var videos = JSON.parse($window.localStorage.getItem("daily_list"));
			var queue_videos = JSON.parse($window.localStorage.getItem("queue_data"));
			
			var total_videos = queue_videos.concat(videos['videos']);
			var today = new Date();
			if(videos['day'] != today.getDate()){
				var shuffled_arr = shuffle(total_videos);
				$window.localStorage.setItem("daily_list",JSON.stringify(shuffled_arr[0]));
				$window.localStorage.setItem("queue_data",JSON.stringify(shuffled_arr[1]));
				console.log(shuffled_arr);
				$scope.videos_daily = shuffled_arr[0]['videos'];
			}
			else{
				var videos_list = videos['videos'];
				$scope.videos_daily = videos_list;
			}
			
			$scope.play=-1;
			var time = ["10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm", "03:00 pm", "04:00 pm","05:00 pm", "06:00 pm", "07:00 pm", "08:00 pm","09:00 pm"];
			$scope.timeslots = time;
			
			var today = new Date();
			$scope.play = today.getHours()-10;
			//$scope.play = today.getHours();
			
			
			$scope.getVideo = function(video_details, index){
				if($scope.play==index){
					$window.localStorage.setItem("video",JSON.stringify(video_details));
					$window.location = "PlayScreen.html";	
				}			
			};
			
			$scope.goToQueue = function(index){
				$window.localStorage.setItem("index",index);
				$window.location = "QueueScreen.html";		
			};
			
			$scope.getTime = function(index){
				if(index>$scope.play){
					var reqd_time = time[index].split(" ");
					return reqd_time[0];
				}
			};
			
			$scope.getAmPm = function(index){
				if(index>$scope.play){
					var reqd_time = time[index].split(" ");
					return reqd_time[1];
				}
			};
			
			$window.onload = function(e) {
				$scope.isloaded=false;			}

			
			function backKeyDown() {
				navigator.app.exitApp();
			}
		})
		.directive('myCurrentTime', ['$interval',
			function($interval) {
				return {
				scope: {
					myCurrentTime:"="
				},
				link:	function(scope, element, attrs) {
					var format = 'hh:mm:ss',  // date format
					stopTime, remaining_time,now, nxt_time, nxt_hour, nxt_min , slot = 0; // so that we can cancel the time updates

					// used to update the UI
					function updateTime() {
						if(remaining_time<0){
								scope.myCurrentTime = scope.myCurrentTime+1;
						}
						else{
							remaining_time = currTime(slot);
							element.text(remaining_time.toHHMMSS());
							//remaining_time--;
						}
					}
					
					// watch the expression, and update the UI on change.
					scope.$watch('myCurrentTime', function(value) {		
						slot = value;
						remaining_time = currTime(slot);
						updateTime();
					});
					
					function currTime(value){
						now = new Date();
						nxt_time = new Date();
						if(value>=0 && value<11){
							nxt_hour = parseInt(JSON.parse(attrs.slot)[value+1].split(":")[0]); 
							if(JSON.parse(attrs.slot)[value+1].split(":")[1].split(" ")[1] =="pm"){
								nxt_hour = nxt_hour+12;
							}
							nxt_min = parseInt(JSON.parse(attrs.slot)[value+1].split(":")[1].split(" ")[0]);							
						}
						else{
							nxt_hour = parseInt(JSON.parse(attrs.slot)[0].split(":")[0]);
							nxt_min = parseInt(JSON.parse(attrs.slot)[0].split(":")[1].split(" ")[0]);
							if(value<=13 && value>=11){
								nxt_time.setDate(now.getDate()+1);
							}
						}
						nxt_time.setHours(nxt_hour);
						nxt_time.setMinutes(nxt_min);
						nxt_time.setSeconds(0);
						remaining_time = (nxt_time-now)/1000;
						return remaining_time;
					}
					
					Number.prototype.toHHMMSS = function () {
						var sec_num = this;
						var hours   = Math.floor(sec_num / 3600);
						var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
						var seconds = Math.round(sec_num - (hours * 3600) - (minutes * 60));

						if (hours   < 10) {hours   = "0"+hours;}
						if (minutes < 10) {minutes = "0"+minutes;}
						if (seconds < 10) {seconds = "0"+seconds;}
						return hours+':'+minutes+':'+seconds;
					}

					stopTime = $interval(updateTime, 1000);

					// listen on DOM destroy (removal) event, and cancel the next UI update
					// to prevent updating time after the DOM element was removed.
					element.on('$destroy', function() {
						$interval.cancel(stopTime);
					});
				}
				}
			}
		]);