var app = angular.module("app", [])

app.controller("angular", function($scope) {

	$scope.jsonString = {
	    "hours": 30,
	    "priorities": [
	        25,
	        12,
	        18,
	        18
	    ],
	    "static_priority": 10,
	    "check_volume": false,
	    "advanced": [
	        {
	            "transfer_time": 45,
	            "dates_received": [
	                "2015-12-04",
	                "2016-01-07",
	                "2016-01-07"
	            ],
	            "permissions": [
	                {
	                    "has_color": false,
	                    "added_on": "2015-06-07"
	                },
	                {
	                    "can_see_add_new_account": true,
	                    "added_on": "2010-08-10"
	                }
	            ]
	        },
	        {
	            "qc suspicious": {
	                "reason": "santa claus",
	                "method": "reindeer",
	                "elves": [
	                    {
	                        "height": 55,
	                        "weight": 45
	                    },
	                    {
	                        "height": 75,
	                        "weight": 87
	                    }
	                ]
	            }
	        }
	    ]
	}

	$scope.fieldsToEdit = function(arr) {
		console.log(arr)
		arr.forEach(function(elem) {
			if(elem) {
				checkForUpdate($scope.jsonString, elem.original, elem.new, elem.field, elem.id)
			}
		})
	}

	$scope.add = function(obj) {
		console.log(obj)
		$scope.jsonString[obj.key] = obj.value
	}

	$scope.delete = function(obj) {
		console.log(obj)
		for (var key in $scope.jsonString) {
			if(key === obj.key) {
				console.log('here')
				delete $scope.jsonString[key]
				break;
			}
			// else if(Array.isArray($scope.jsonString[key])) {
			// 	$scope.jsonString[key].forEach(function(elem) {
			// 		console.log(elem)
			// 		if(typeof elem === 'object') $scope.delete(elem)
			// 	})
			// }
			// else if (typeof $scope.jsonString[key] === 'object') {
			// 	$scope.delete($scope.jsonString[key])
			// }
			// else {
			// 	return
			// }
		}
	}

	function checkForUpdate(obj, original, update, field, id) {
		for (var key in obj) {
			if(field === 'key' && key === original) {
				performKeyUpdate(obj, update, key)
			}
			else if(field === 'value' && obj[key].toString() === original && key === id) {
				performValueUpdate(obj, update, key)
			}
			else if (Array.isArray(obj[key])) {
				obj[key].forEach(function(elem) {
					if(typeof elem === 'object') checkForUpdate(elem, original, update, field, id)
				})
			}
			else if (typeof obj[key] === 'object') {
				checkForUpdate(obj[key], original, update, field, id)
			}
		}
	}

	function performKeyUpdate(obj, update, key) {
		obj[update] = obj[key]
		delete obj[key]
	}

	function performValueUpdate(obj, update, key) {
		obj[key] = update
	}

})