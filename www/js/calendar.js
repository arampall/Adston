angular.module('calendarEvent', ['ngAnimate', 'ui.bootstrap'])
	.controller('DatepickerDemoCtrl', function ($scope,$window,$sce,$filter) {
	$scope.timedisabled=true;
	$scope.calendardisabled=false;
	var scheduled_list = JSON.parse($window.localStorage.getItem("scheduled_list"));
	var timeslots;
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
		if(month==0||month==2||month==4||month==6||month==7||month==19||month==11){
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
	
	$scope.selectDate=function(){
		$scope.calendardisabled=true;
		$scope.timedisabled=false;
		$scope.tempdate=$scope.dt.getDate();
		console.log($scope.tempdate);
		timeslots = $filter("filter")(scheduled_list, {date:$scope.tempdate});
		console.log(timeslots);
		if(timeslots.length>0){
			angular.forEach(timeslots, function(value, key){
				document.getElementById(value.time).className="btn btn-danger";
			}); 
		}
	}
	
	$scope.getTime=function(event){
		$scope.settime = event.target.id;
	}

	$scope.selectTime=function(){
		var video =JSON.parse($window.localStorage.getItem("tempVideo"));
		console.log(timeslots);
	   
		if($scope.settime==null){
			$window.alert("Please select a time slot");
		}else{
			if(timeslots.length>=0){
				var dateObj ={date:$scope.tempdate,time:$scope.settime,video:video};
				scheduled_list.push(dateObj);
				$window.localStorage.setItem("scheduled_list",JSON.stringify(scheduled_list));
			}
			localStorage.removeItem("tempVideo");
			$window.location ="QueueScreen.html";
		}	  
	}
});
