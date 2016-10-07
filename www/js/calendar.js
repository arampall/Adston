angular.module('adston-cash',['ngAnimate', 'ui.bootstrap'])
	.controller('DatepickerDemoCtrl', function ($scope,$window,$sce,$filter) {
	$scope.timedisabled=false;
	$scope.calendardisabled=false;
	$scope.timeslots=[];
	var time = ["10:22 am", "11:22 am", "12:22 pm", "01:22 pm", "02:22 pm", "03:22 pm", "04:22 pm","05:22 pm", "06:22 pm", "07:22 pm", "08:22 pm","09:22 pm"];
	var scheduled_list = JSON.parse($window.localStorage.getItem("scheduled_list"));
	var queue = JSON.parse($window.localStorage.getItem("queue_data"));
	if(scheduled_list==null){
		scheduled_list=[];
	}
	var date = new Date();
	var nxt_date = date.getDate()+1;
	$scope.dt = new Date(date.setDate(nxt_date));
		
	var slots;
	
	$scope.options = {
		customClass: getDayClass,
		minDate: setMinDate(),
		showWeeks: false,
		maxDate: setMaxDate()
	};
	
	function setMinDate(){
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow;
	}
  
	function setMaxDate(){
		//var join_date=localStorage.getItem("join_date");
		var join_date=new Date();
		var month=join_date.getMonth();
		var maxDate;
		if(month==0||month==2||month==4||month==6||month==7||month==9||month==11){
			var daysLeft=31-join_date.getDate();
			maxDate=join_date.setDate(join_date.getDate()+daysLeft);
			return maxDate;
		}
		else{
			var daysLeft=30-join_date.getDate();
			console.log(daysLeft);
			maxDate=join_date.setDate(join_date.getDate()+30);
			return maxDate;
		}
	}
  
	$scope.setDate = function(year, month, day) {
		$scope.dt = new Date(year, month, day);
	};

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date(tomorrow);
	afterTomorrow.setDate(tomorrow.getDate() + 1);
	$scope.events = [
	{
		date: tomorrow,
		status: 'full'
    },
    {
		date: afterTomorrow,
		status: 'partially'
    }
	];

	function getDayClass(data) {
		var date = data.date,
		mode = data.mode
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0,0,0,0);
			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}
		return '';
	}
	
	
	$scope.getTime=function(time,index){
		$scope.tempPosition = index;
		$scope.settime = time;
	}

	$scope.selectTime=function(){
		var video = JSON.parse($window.sessionStorage.getItem("tempVideo"));
		if($scope.settime==null){
			$window.alert("Please select a time slot");
		}else{
			var dateObj ={date:$scope.tempdate,time:$scope.settime,position:$scope.tempPosition,video:video};
			scheduled_list.push(dateObj);
			$window.localStorage.setItem("scheduled_list",JSON.stringify(scheduled_list));
			for(var i=0;i<queue.length;i++){
				if(queue[i].video_id == video.video_id){
					queue.splice(i,1);
					break;
				}
			}
			$window.localStorage.setItem("queue_data",JSON.stringify(queue));
			$window.localStorage.removeItem("tempVideo");
			$window.location ="QueueScreen.html";
		}	  
	};
	
	$scope.$watch('dt', function(newVal, oldVal){
		if(newVal){
			$scope.timeslots = [];
			$scope.tempdate=newVal.getDate();
			slots = $filter("filter")(scheduled_list, {date:$scope.tempdate});
			var time_value=null;
			for(var i=0;i<time.length;i++){
				time_value = $filter("filter")(slots, {time:time[i]});
				var slotObj={};
				if(time_value.length>0){
					slotObj = {"time":time[i],"info":"busy","position":i};
					$scope.timeslots.push(slotObj);
				}
				else{
					slotObj = {"time":time[i],"info":"free","position":i};
					$scope.timeslots.push(slotObj);
				}
			}
		}
		
	});
});
