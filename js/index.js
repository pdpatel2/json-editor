var app = angular.module("app", [])

app.controller("angular", function($scope) {

	//update this scope variable to test other JSON strings
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

	//arr will include 1-3 elements(keys or values) to update
	$scope.fieldsToEdit = function(arr) {
		//iterate over elements 
		arr.forEach(function(elem) {
			if(elem) {
				//if element exists (form includes updates), run checkForUpdateFunction
				checkForUpdate($scope.jsonString, elem.original, elem.new, elem.field, elem.id)
			}
		})
		//clear form
		$scope.UpdateForm.$setUntouched()
		$scope.update1={}
		$scope.update2={}
		$scope.update3={}
	}

	//obj will include key and value
	$scope.add = function(obj) {
		$scope.jsonString[obj.key] = obj.value
		//clear form
		$scope.AddForm.$setUntouched()
		$scope.aobj = {}
	}

	//obj is current JSON string and deleteObj includes key and possibly value/index
	$scope.delete = function(obj, deleteObj) {
		//traverse through keys
		for (var key in obj) {
			if(key === deleteObj.key && (!deleteObj.value) && (!deleteObj.index)) {
				delete obj[key]
				break;
			}
			else if(key === deleteObj.key && deleteObj.value === obj[key].toString()) {
				delete obj[key]
				break;
			}
			else if (key === deleteObj.key && Array.isArray(obj[key]) && (deleteObj.index)) {
				//delete element from array if index specified and value associated with key is array
				obj[key].splice(deleteObj.index,1)
			}
			else if(Array.isArray(obj[key])) {
				obj[key].forEach(function(elem) {
					//use recursion to check key/values on nested object
					if(typeof elem === 'object') $scope.delete(elem, deleteObj)
				})
			}
			else if (typeof obj[key] === 'object') {
				//use recursion to check key/values on nested object
				$scope.delete(obj[key], deleteObj)
			}
		}
		//clear form
		$scope.DeleteForm.$setUntouched()
		$scope.dobj = {}
	}

	//obj is current JSON string
	function checkForUpdate(obj, original, update, field, id) {
		for (var key in obj) {
			if(field === 'key' && key === original) {
				performKeyUpdate(obj, update, key)
				break;
			}
			else if(field === 'value' && obj[key].toString() === original && key === id) {
				performValueUpdate(obj, update, key)
				break;
			}
			else if (Array.isArray(obj[key])) {
				obj[key].forEach(function(elem) {
					//use recursion to check key/values on nested object
					if(typeof elem === 'object') checkForUpdate(elem, original, update, field, id)
				})
			}
			else if (typeof obj[key] === 'object') {
				//use recursion to check key/values on nested object
				checkForUpdate(obj[key], original, update, field, id)
			}
		}
	}

	//helper function to update keys
	function performKeyUpdate(obj, update, key) {
		obj[update] = obj[key]
		delete obj[key]

	}

	//helper function to update values
	function performValueUpdate(obj, update, key) {
		obj[key] = update
	}

})