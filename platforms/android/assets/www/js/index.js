/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		
    },
	
	// Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

angular.module('index',[])
		.config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])
		.controller('navigator',function($scope,$http,$window){
				var elem = document.getElementById("loadBar"); 
				var elem1 = document.getElementById("loadBar1"); 
				var width = 1;
				var id = setInterval(frame, 20);
				function frame() {
					if (width >= 100) {
						clearInterval(id);
						if($window.localStorage.getItem("access_token")!=null){
							accessValidator();
						}else{
							$window.location.href='Login.html';
						}
						
					} else {
						width++; 
						elem.style.width = width + '%'; 
						elem1.style.width = width + '%';
					}
				}
			
			function accessValidator(){
                $http({
                method :'POST',
                url:'http://54.208.229.254/user_controller.php',
                data:{access_token:$window.localStorage.getItem("access_token"),method:'access'},
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
                })
				.then(function successCallback(response){
					console.log(response);
					if(response.data.auth_status=="yes"){
						var host = $window.location.host;
						$window.location.href='VideoScreen.html';
					}
					else{
						var host = $window.location.host;
						$window.location.href='Login.html';
					}
				}, function errorCallback(response) {
                    console.log(response);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
					
				});
			}
	});