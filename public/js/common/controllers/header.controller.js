/*jslint */
/*global angular */

(function () {
    "use strict";
    angular
        .module("rehearsalApp")
        .controller("HeaderController", ['$http', function ($http) {
            var self = this;

            self.isUserAuthenticated = false;
            self.userInfo = {};

            $http.get('/api/is-signed-in')
                .success(function (data) {
                    self.isUserAuthenticated = data;
                })
                .error(function (data) {
                    console.log("Error: " + data);
                });

            $http.get('/api/user-info')
                .success(function (data) {
                    self.userInfo.email = data.email;
                })
                .error(function (data) {
                    console.log("Error: " + data);
                });
        }]);
}());
