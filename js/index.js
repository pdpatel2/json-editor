var app = angular.module("app", [])

app.controller("angular", function($scope) {
	// $scope.jsonString = {
	// 	"name": "Priti",
	// 	"location": "NYC"
	// }

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

	function checkForUpdate(obj, original, update) {
		for (var key in obj) {
			if(key === original) {
				performUpdate(obj, update, key)
			}
			else if (Array.isArray(obj[key])) {
				obj[key].forEach(function(elem) {
					if(typeof elem === 'object') checkForUpdate(elem, original, update)
				})
			}
			else if (typeof obj[key] === 'object') {
				checkForUpdate(obj[key], original, update)
			}
		}
	}

	function performUpdate(obj, update, key) {
		obj[update] = obj[key]
		delete obj[key]
	}

	function editJson = function(original, update, field) {
		if (field === "key") {
			checkForUpdate($scope.jsonString, original, update)
		}
		else {
			for (var key in $scope.jsonString) {
				if ($scope.jsonString[key] === original) {
					$scope.jsonString[key] = update
				}
			}
		}
	}

	$scope.fieldsToEdit = function(arr) {
		arr.forEach(function(elem) {
			if(elem[0] && elem[1]) {
				editJson(elem[0], elem[1], elem[2])
			}
		})
	}
})