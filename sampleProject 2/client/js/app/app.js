var sampleApp = angular.module("sampleApp", []);



sampleApp.controller("RegController", ['$scope','$http','$location','fileReader',function($scope, $http,$location,fileReader) {


    console.log(fileReader)
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                $scope.imageSrc = result;

              //  $scope.user.imageSrc = result;
            });
    };

    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });


    $scope.rForm = function () {



        //if(typeof $scope.username!="undefined" && typeof $scope.password!="undefined") {
          //  console.log($scope.fname+" -inside log form--- "+ $scope.fname );

//        console.log(JSON.stringify({user : $scope.user})+" img== "+$scope.imageSrc);
       console.log($scope.imageSrc)
        $scope.user.imageSrc=$scope.imageSrc;
            $http({
                method: 'POST',
                url: '/apitest',
                data: $scope.user,
              //  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                console.log(data);

            })
                .error(function (data, status, headers, config) {
                    console.log(data);
                    $scope.errorMsg = " ERROR";

                    alert("ERROR");
                })

        }


  //  }


}]);

$(document).ready(function() {
    $('.datepicker').datepicker();
    //  $('#dobicon').trigger("click");
    $('#hobby').multiselect();

});

/*
var UploadController = function ($scope, fileReader) {
    console.log(fileReader)
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                $scope.imageSrc = result;
            });
    };

    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });

};*/

sampleApp.directive("ngFileSelect",function(){

    return {
        link: function($scope,el){

            el.bind("change", function(e){

                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
            })

        }

    }


})