	adston
		.factory('shuffle',function($window,$filter){
			
				function shuffleArray(array) {
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
			
			return function(videos_list){
				var arr=[], scheduled_arr, daily_arr, queue_arr, list_daily;
				var scheduled_arr = JSON.parse($window.localStorage.getItem("scheduled_list"));
				if(scheduled_arr==null){
					scheduled_arr = [];
				}
				var today = new Date();
				var dd = today.getDate();
				var scheduled_list_arr = $filter("filter")(scheduled_arr, {date:today.getDate()});
				arr = shuffleArray(videos_list);
				list_daily = {};
				daily_arr = arr.slice(0,12-scheduled_list_arr.length);
				for(var i=0;i<scheduled_list_arr.length;i++){
					daily_arr.splice(scheduled_list_arr[i].position,0,scheduled_list_arr[i].video);
				}
				list_daily = {'day': today.getDate(),'videos' : daily_arr};
				queue_arr = arr.slice(12-scheduled_list_arr.length);
				return [
					list_daily,
					queue_arr
				];
			}
		})